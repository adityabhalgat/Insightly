# 🔍 Insightly – Authentic Product Review Platform

**Insightly** is a smart, AI-powered review platform designed to bring authenticity back to product reviews. It enables companies to gather genuine user feedback while incentivizing verified customers — creating a win-win for businesses and consumers.

![Stack](https://img.shields.io/badge/stack-MERN%2BPython-blue)
![Payments](https://img.shields.io/badge/Payments-Razorpay-informational)

---

## 🚀 What Makes Insightly Different?

- ✅ **Serial-Based Review Verification:** Only users who own a product (verified via serial number) can post reviews.
- 💰 **Incentivized Feedback System:** Genuine reviewers earn micro-payments for valuable feedback.
- 🤖 **AI-Based Fake Review Detection:** A Python-based ML model classifies reviews as real or fake.
- 📊 **Sentiment-Based Product Insights:** Companies receive detailed analytics using sentiment analysis.
- 🧾 **Razorpay Integration:** Secure, seamless transactions for both users and companies.
- 🧪 **Company Subscriptions:** Companies pay per review or opt for premium insight subscriptions.
- 🛠️ **Admin Dashboard:** Manage products, payments, user reports, and insights in one place.

---

## 🛠️ Tech Stack

| Frontend | Backend | Database | AI/ML | Auth | Payments |
|----------|---------|----------|-------|------|----------|
| React    | Node.js + Express | MongoDB | Python (Scikit-learn/NLP) | JWT | Razorpay |


---

## 💻 How It Works

1. **Company Signup → Add Product → Purchase Review Credits**
2. **User Verifies Purchase (via Serial Number) → Writes Review**
3. **ML Model runs Sentiment & Authenticity Check**
4. **If Genuine → Razorpay triggers micro-payment**
5. **Company Dashboard gets Insights + Export Options**

---

## 🧠 AI Model

- **Language Processing:** Tokenization, stop-word removal, TF-IDF
- **Fake Review Detection:** Trained classifier using labeled review datasets
- **Sentiment Analysis:** TextBlob/VADER or custom fine-tuned model
- **Deployment:** Flask or FastAPI (Python backend) integrated with Node.js server

---

## 📈 Future Scope

- 🔍 Scrape reviews from platforms like Amazon/Flipkart and verify via ML
- 🏆 Add user **badges**, **competitions**, and **reputation points**
- 💼 Add **subscription tiers** for companies (Starter, Premium, Enterprise)
- 🧠 Improve fake review detection using **transformers (BERT)** or **LLMs**
- 📦 Browser extension to show verified ratings from Insightly across the web

---

## 🔧 Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/Insightly.git
cd insightly

# Install backend
cd backend
npm install

# Install frontend
cd ../frontend
npm install

```

## 👨‍💻 Author

**Aditya Bhalgat**

- 📫 [LinkedIn](https://linkedin.com/in/adityabhalgat)
- 💻 [GitHub](https://github.com/adityabhalgat)
- 🧠 [LeetCode](https://leetcode.com/u/adityabhalgat81)
- 🏅 [Codeforces](https://codeforces.com/profile/adityabhalgat81)
- 📧 Email: adityabhalgat@gmail.com

