
const analyzeSentiment = async (review, maxRetries = 3) => {
    const API_URL = "https://api-inference.huggingface.co/models/nlptown/bert-base-multilingual-uncased-sentiment";
    const API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Attempt ${attempt} of ${maxRetries} for sentiment analysis`);
            
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputs: [review] }),
            });

            if (response.status === 503) {
                console.log(`Service unavailable (503), attempt ${attempt}`);
                if (attempt < maxRetries) {
                    await delay(2000 * attempt); // Exponential backoff
                    continue;
                }
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const results = await response.json();
            console.log('API Response:', JSON.stringify(results, null, 2));
            
            return results[0];

        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error.message);
            if (attempt === maxRetries) {
                console.error("All retry attempts failed");
                return null;
            }
            await delay(2000 * attempt);
        }
    }
    return null;
};

module.exports = analyzeSentiment;
