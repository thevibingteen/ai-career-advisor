// This is the final and best code for: api/getCareerAdvice.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userData } = req.body;
    const geminiApiKey = process.env.GEMINI_API_KEY;

    if (!userData || !geminiApiKey) {
      throw new Error('Missing user data or API key configuration.');
    }

    const prompt = createPrompt(userData);
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${geminiApiKey}`;

    const geminiResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
        }),
    });

    if (!geminiResponse.ok) {
        console.error(`Gemini API responded with status: ${geminiResponse.status}`);
        throw new Error('API call failed');
    }

    const geminiData = await geminiResponse.json();
    
    const responseText = geminiData.candidates[0].content.parts[0].text;
    const careers = parseGeminiResponse(responseText);
    
    res.status(200).json({ careers });

  } catch (error) {
    console.error('Error in serverless function:', error);
    const fallbackCareers = getFallbackResponse();
    res.status(200).json({ careers: fallbackCareers });
  }
}

// Creates the detailed instructions for the AI
function createPrompt(userData) {
  return `
    Analyze this user profile and recommend 3 suitable tech career paths with detailed information:
    Name: ${userData.name}, Skills: ${userData.skills}, Experience: ${userData.experience}, Interests: ${userData.interests.join(', ')}, Career Goals: ${userData.goals}.
    For each career, provide: Career title, Match percentage (0-100%), Brief description, Key skills required, Missing skills from user's current skillset, Salary range in INR, Market demand (e.g., High), Growth potential, A current industry trend.
    Format the response as a valid JSON array of objects only, with these properties: "career", "match", "description", "requiredSkills", "missingSkills", "salary", "demand", "growth", "trend".
  `;
}

// Cleans up the AI's response.
function parseGeminiResponse(text) {
  try {
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('No JSON array found in response');
  } catch (error) {
    throw error;
  }
}

// Provides a full, sample response if the live API call fails.
function getFallbackResponse() {
  console.log("Providing fallback response due to an error.");
  return [
    {
      career: "Full Stack Developer (Sample)",
      match: 85,
      description: "This is a sample response because the AI is currently unavailable.",
      requiredSkills: ["JavaScript", "React", "Node.js", "HTML/CSS", "SQL"],
      missingSkills: ["React", "Node.js"],
      salary: "₹6-15 LPA",
      demand: "High",
      growth: "22% by 2029",
      trend: "Increasing demand for developers with cloud experience"
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
      trend: "Rising need for AI and machine learning expertise"
    }
  ];
}
