const jwt = require('jsonwebtoken');
const Review = require('../../models/Review');
const User = require('../../models/user');
const Product = require('../../models/Product');
const analyzeSentiment = require('../../middleware/mlmodel');


const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; 

const mlClassifyReview = async (content) => {
    try {
        console.log('Starting sentiment analysis for review:', content.substring(0, 50) + '...');
        
        const result = await analyzeSentiment(content);
        console.log('Raw ML Result:', JSON.stringify(result, null, 2));
        
        if (!result) {
            console.log('No result from ML model after retries, marking for review');
            return 'mark_for_review';
        }

        if (!Array.isArray(result)) {
            console.error('Expected array result from ML model, got:', typeof result);
            return 'mark_for_review';
        }

        const predictions = result.sort((a, b) => b.score - a.score);
        console.log('Sorted predictions:', JSON.stringify(predictions, null, 2));
        
        const topScore = predictions[0]?.score || 0;
        const runnerUpScore = predictions[1]?.score || 0;
        console.log('Top score:', topScore, 'Runner-up score:', runnerUpScore);
        
        const scoreDifference = topScore - runnerUpScore;
        console.log('Score difference:', scoreDifference);
        
        const CLEAR_MAJORITY_THRESHOLD = 0.7;
        const SCORE_DIFFERENCE_THRESHOLD = 0.5;
        const UNCERTAINTY_THRESHOLD = 0.3;
        
        const starRating = parseInt(predictions[0]?.label?.split(' ')[0]) || 0;
        console.log('Star rating:', starRating);
        
        if (!starRating || topScore < UNCERTAINTY_THRESHOLD) {
            console.log('Rejected: Invalid rating or low confidence');
            return 'rejected';
        }
        
        if(scoreDifference > CLEAR_MAJORITY_THRESHOLD){
            console.log('Accepted: Clear majority for rating', starRating);
            return 'accepted';
        }

        if (scoreDifference < SCORE_DIFFERENCE_THRESHOLD) {
            console.log('Marking for review: Uncertainty in classification');
            return 'mark_for_review';
        }

        if(scoreDifference < UNCERTAINTY_THRESHOLD){
            console.log('Marking for review: Uncertainty in classification');
            return 'rejected'; 
        }
        
        console.log('No clear decision possible, marking for review');
        return 'mark_for_review';
    } catch (error) {
        console.error('Error in ML classification:', error);
        console.error('Stack trace:', error.stack);
        return 'mark_for_review';
    }
};

const createReview = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    const userId = decoded.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token data' });
    }

    const { productId, rating, usageDuration, pros, cons, recommend, review, productSequenceNumber, reviewPrice = 50, suggestions } = req.body;

    const existingReview = await Review.findOne({ userId, productId });
    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this product.' });
    }

    const mlStatus = await mlClassifyReview(review);
    let status, adminApprovalStatus;

    if (mlStatus === 'accepted') {
      status = 'approved';
      adminApprovalStatus = 'approved';
    } else if (mlStatus === 'mark_for_review') {
      status = 'pending';
      adminApprovalStatus = 'pending';
    } else {
      status = 'rejected';
      adminApprovalStatus = 'rejected';
    }

    const newReview = await Review.create({
      userId,
      productId,
      productSequenceNumber,
      rating,
      usageDuration,
      pros,
      cons,
      recommend,
      review,
      reviewPrice,
      mlStatus,
      status,
      adminApprovalStatus,
      suggestions,
    });

 

    const userUpdate = await User.findByIdAndUpdate(userId, {
      $push: { reviews: newReview._id },
      $inc: { 
        totalReviewsWritten: 1,
        claimableEarnings: reviewPrice,  
        totalEarnings: reviewPrice      
      }
    }, { new: true });
    if (!userUpdate) {
      return res.status(500).json({ error: 'Failed to update user data' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updatedReviewCount = product.reviewCount + 1;
    const updatedAvgRating = ((product.avgRating * product.reviewCount) + rating) / updatedReviewCount;
    


    const productUpdate = await Product.findByIdAndUpdate(productId, {
      avgRating: updatedAvgRating.toFixed(2),
      reviewCount: updatedReviewCount,
    }, { new: true });

    if (!productUpdate) {
      return res.status(500).json({ error: 'Failed to update product data' });
    }

    res.status(201).json({ message: 'Review created successfully', review: newReview });

  } catch (error) {
    console.error('Error in createReview:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
};


module.exports = createReview;
