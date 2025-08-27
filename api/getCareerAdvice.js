// api/getCareerAdvice.js  (replace your file with this)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userData } = req.body;
    const geminiApiKey = process.env.GEMINI_API_KEY;

    if (!userData || !geminiApiKey) {
      throw new Error('Missing user data or GEMINI_API_KEY environment variable.');
    }

    const prompt = createPrompt(userData);

    // --- Use a known-valid model name; change if you have access to another one ---
    const model = 'gemini-2.5-flash'; // alternatives to try: 'gemini-1.5-pro', 'gemini-2.5-pro'
    // Use the v1beta generateContent endpoint (commonly used) — switch if your account requires v1.
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`;

    console.log('Calling Gemini API URL:', apiUrl);
    console.log('Prompt length:', prompt.length);

    const geminiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    // If not ok, log the full body so you can see the exact error message (helps debug 404/401/etc.)
    if (!geminiResponse.ok) {
      const bodyText = await geminiResponse.text();
      console.error('Gemini API returned non-OK status:', geminiResponse.status, bodyText);
      // Return an error for debugging (you can change to fallback-only later)
      return res.status(502).json({ error: 'Gemini API error', status: geminiResponse.status, body: bodyText });
    }

    const geminiData = await geminiResponse.json();

    // Defensive extraction to avoid undefined errors
    const responseText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    if (!responseText) {
      console.error('Unexpected Gemini response shape:', JSON.stringify(geminiData));
      return res.status(502).json({ error: 'Unexpected Gemini response shape', body: geminiData });
    }

    const careers = parseGeminiResponse(responseText);
    res.status(200).json({ careers });

  } catch (error) {
    console.error('Error in serverless function:', error);
    const fallbackCareers = getFallbackResponse();
    res.status(200).json({ careers: fallbackCareers });
  }
}

// Creates prompt safely (defensive for missing fields)
function createPrompt(userData) {
  const name = userData.name ?? 'Unknown';
  const skills = Array.isArray(userData.skills) ? userData.skills.join(', ') : (userData.skills ?? '');
  const experience = userData.experience ?? '';
  const interests = Array.isArray(userData.interests) ? userData.interests.join(', ') : (userData.interests ?? '');
  const goals = userData.goals ?? '';

  return `
    Analyze this user profile and recommend 3 suitable tech career paths with detailed information:
    Name: ${name}, Skills: ${skills}, Experience: ${experience}, Interests: ${interests}, Career Goals: ${goals}.
    For each career, provide: Career title, Match percentage (0-100%), Brief description, Key skills required, Missing skills from user's current skillset, Salary range in INR, Market demand (e.g., High), Growth potential, A current industry trend.
    Format the response as a valid JSON array of objects only, with these properties: "career", "match", "description", "requiredSkills", "missingSkills", "salary", "demand", "growth", "trend".
  `;
}

// Cleans up the AI's response. If it fails, it triggers the fallback.
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

// Fallback (unchanged)
function getFallbackResponse() {
  console.log("Providing fallback response due to an error.");
  return [
    {
      career: "Full Stack Developer (Sample)",
      match: 85,
      description: "Build both front-end and back-end of web applications. This is a sample response because the AI is currently unavailable.",
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
      trend: "Growing emphasis on user experience in digital products"
    }
  ];
}
