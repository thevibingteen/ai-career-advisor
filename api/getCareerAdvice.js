// api/getCareerAdvice.js
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  // If you prefer, you can omit apiKey here and let the lib read GEMINI_API_KEY from env.
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userData } = req.body;
    const keyPresent = !!process.env.GEMINI_API_KEY;
    if (!userData || !keyPresent) {
      throw new Error("Missing user data or GEMINI_API_KEY environment variable.");
    }

    const prompt = createPrompt(userData);
    const model = "gemini-2.5-flash"; // change if you have access to another model

    console.log("Calling Gemini model:", model);
    console.log("Prompt length:", prompt.length);

    // Example: disable thinking to prioritize speed/cost; remove config to use default "thinking"
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    // The SDK commonly exposes `response.text` for simple text; defensive fallback below:
    const responseText =
      response?.text ??
      (Array.isArray(response?.candidates) ? response.candidates?.[0]?.content?.parts?.[0]?.text : "");

    if (!responseText) {
      console.error("Empty or unexpected Gemini response shape:", JSON.stringify(response));
      return res.status(502).json({ error: "Unexpected Gemini response shape", body: response });
    }

    const careers = parseGeminiResponse(responseText);
    return res.status(200).json({ careers });
  } catch (err) {
    console.error("Error in serverless function:", err?.message ?? err);
    const fallbackCareers = getFallbackResponse();
    return res.status(200).json({ careers: fallbackCareers });
  }
}

// ---- helper functions ----
function createPrompt(userData) {
  const name = userData.name ?? "Unknown";
  const skills = Array.isArray(userData.skills) ? userData.skills.join(", ") : userData.skills ?? "";
  const experience = userData.experience ?? "";
  const interests = Array.isArray(userData.interests) ? userData.interests.join(", ") : userData.interests ?? "";
  const goals = userData.goals ?? "";

  return `
Analyze this user profile and recommend 3 suitable tech career paths with detailed information:
Name: ${name}, Skills: ${skills}, Experience: ${experience}, Interests: ${interests}, Career Goals: ${goals}.
For each career, provide: Career title, Match percentage (0-100%), Brief description, Key skills required, Missing skills from user's current skillset, Salary range in INR, Market demand (e.g., High), Growth potential, A current industry trend.
Format the response as a valid JSON array of objects only, with these properties: "career", "match", "description", "requiredSkills", "missingSkills", "salary", "demand", "growth", "trend".
  `.trim();
}

function parseGeminiResponse(text) {
  try {
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
    throw new Error("No JSON array found in response");
  } catch (e) {
    // bubble up to main catch which returns fallback
    throw e;
  }
}

function getFallbackResponse() {
  console.log("Providing fallback response due to an error.");
  return [
    {
      career: "Full Stack Developer (Sample)",
      match: 85,
      description:
        "Build both front-end and back-end of web applications. This is a sample response because the AI is currently unavailable.",
      requiredSkills: ["JavaScript", "React", "Node.js", "HTML/CSS", "SQL"],
      missingSkills: ["React", "Node.js"],
      salary: "₹6-15 LPA",
      demand: "High",
      growth: "22% by 2029",
      trend: "Increasing demand for developers with cloud experience",
    },
    {
      career: "Data Scientist (Sample)",
      match: 75,
      description: "Analyze and interpret complex data to help organizations make informed decisions.",
      requiredSkills: ["Python", "Machine Learning", "Statistics", "Data Visualization"],
      missingSkills: ["Machine Learning", "Statistics"],
      salary: "₹8-20 LPA",
      demand: "Very High",
      growth: "31% by 2029",
      trend: "Rising need for AI and machine learning expertise",
    },
    {
      career: "UX/UI Designer (Sample)",
      match: 65,
      description: "Create user-friendly interfaces that provide meaningful experiences to users.",
      requiredSkills: ["Figma", "User Research", "Wireframing", "Prototyping"],
      missingSkills: ["Figma", "User Research"],
      salary: "₹5-12 LPA",
      demand: "High",
      growth: "13% by 2029",
      trend: "Growing emphasis on user experience in digital products",
    },
  ];
}
