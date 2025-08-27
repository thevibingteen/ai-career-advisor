# 🤖 CareerPath AI

A personalized AI career advisor that maps skills, recommends career paths, and prepares students for the evolving job market. This project was built for the GEN AI Hackathon on Hack2Skill.

---

## 🚀 Features

* **Multi-Step User Input:** Gathers comprehensive user data including skills, experience, interests, and goals.
* **AI-Powered Analysis:** Uses the Google Gemini API to analyze user data and provide three personalized career path recommendations.
* **Detailed Career Insights:** For each recommended career, the app displays:
    * A match percentage.
    * Skill gap analysis (skills you have vs. skills you need).
    * Market demand and salary expectations.
    * Curated learning resources and a sample learning plan.
* **Secure API Handling:** All API calls to the Gemini API are handled securely through a Vercel serverless function, ensuring the API key is never exposed on the front-end.
* **Robust Fallback:** If the live AI call fails, the application provides a sample response to ensure a smooth user experience.

---

## 🛠️ Tech Stack

* **Front-End:** HTML, Tailwind CSS, Vanilla JavaScript
* **Back-End:** Vercel Serverless Functions (Node.js)
* **AI:** Google Gemini Pro API
* **Deployment:** Vercel

---

## ⚙️ How It Works

1.  The user fills out a multi-step form on the front-end (`index.html`, `script.js`).
2.  The `script.js` file sends the user's data to a local API endpoint (`/api/getCareerAdvice`).
3.  The Vercel serverless function at `api/getCareerAdvice.js` receives the data.
4.  This serverless function securely accesses the `GEMINI_API_KEY` from Vercel's environment variables.
5.  It makes a `fetch` call to the official Google Gemini API, sending the user's data in a detailed prompt.
6.  It receives the AI-generated career plan, parses it, and sends it back to the front-end.
7.  The `script.js` file receives the data and dynamically renders the results on the page.

---

## 👨‍💻 Author

* **Name:** Suraj Singh
* **GitHub:** `https://github.com/thevibingteen`