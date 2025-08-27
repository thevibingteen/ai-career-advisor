// ---- GLOBAL STATE ----
const state = {
  currentStep: 1,
  userData: {},
  topCareers: [],
  isFallback: false, // ✅ new flag
};

// ---- MAIN RENDER FUNCTION ----
function render() {
  const app = document.getElementById("app");
  switch (state.currentStep) {
    case 1:
      app.innerHTML = renderStep1();
      break;
    case 2:
      app.innerHTML = renderStep2();
      break;
    case 3:
      app.innerHTML = renderStep3();
      break;
    case 4:
      app.innerHTML = renderResults();
      break;
  }
}

// ---- STEP 1 ----
function renderStep1() {
  return `
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Step 1: Tell us about yourself</h2>
      <input id="name" type="text" placeholder="Your Name" class="border p-2 w-full mb-4"/>
      <button onclick="nextStep1()" class="px-4 py-2 bg-blue-600 text-white rounded">Next</button>
    </div>
  `;
}

function nextStep1() {
  const name = document.getElementById("name").value.trim();
  if (!name) return alert("Please enter your name.");
  state.userData.name = name;
  state.currentStep = 2;
  render();
}

// ---- STEP 2 ----
function renderStep2() {
  return `
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Step 2: Your Skills</h2>
      <textarea id="skills" placeholder="List your skills" class="border p-2 w-full mb-4"></textarea>
      <button onclick="nextStep2()" class="px-4 py-2 bg-blue-600 text-white rounded">Next</button>
    </div>
  `;
}

function nextStep2() {
  const skills = document.getElementById("skills").value.trim();
  if (!skills) return alert("Please enter your skills.");
  state.userData.skills = skills.split(",").map(s => s.trim());
  state.currentStep = 3;
  render();
}

// ---- STEP 3 ----
function renderStep3() {
  return `
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Step 3: Career Goals</h2>
      <textarea id="goals" placeholder="What are your career goals?" class="border p-2 w-full mb-4"></textarea>
      <button onclick="generateResults()" class="px-4 py-2 bg-green-600 text-white rounded">Generate Results</button>
    </div>
  `;
}

// ---- GENERATE RESULTS ----
async function generateResults() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="p-8 text-center">
      <div class="flex justify-center mb-6">
        <div class="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">Generating Your Career Plan</h2>
      <p class="text-gray-600">Analyzing your skills against current market trends using Gemini AI...</p>
    </div>
  `;

  try {
    const geminiResults = await callGeminiAPI(state.userData);
    const careers = geminiResults.careers || [];

    state.topCareers = careers.map(result => {
      return {
        career: result.career,
        match: result.match,
        description: result.description,
        requiredSkills: result.requiredSkills || [],
        missingSkills: result.missingSkills || [],
        salary: result.salary || "₹5-12 LPA",
        demand: result.demand || "High",
        growth: result.growth || "15% by 2029",
        trend: result.trend || "Strong industry demand",
      };
    });

    state.isFallback = false; // ✅ live Gemini
    state.currentStep = 4;
    render();
  } catch (error) {
    console.error("Error generating results with Gemini:", error);

    // ✅ fallback with same structure
    state.topCareers = [
      {
        career: "Full Stack Developer (Sample)",
        match: 85,
        description:
          "Build both front-end and back-end of web applications. This is a sample response because Gemini AI is unavailable.",
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
        description:
          "Analyze and interpret complex data to help organizations make informed decisions.",
        requiredSkills: ["Python", "Machine Learning", "Statistics", "Data Visualization"],
        missingSkills: ["Machine Learning", "Statistics"],
        salary: "₹8-20 LPA",
        demand: "Very High",
        growth: "31% by 2029",
        trend: "Rising need for AI and machine learning expertise",
      },
    ];

    state.isFallback = true; // ✅ fallback mode
    state.currentStep = 4;
    render();
  }
}

// ---- CALL BACKEND ----
async function callGeminiAPI(userData) {
  const response = await fetch("/api/getCareerAdvice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userData }),
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return await response.json();
}

// ---- RESULTS SCREEN ----
function renderResults() {
  return `
    <div class="p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-2">Your Career Matches</h2>
      <p class="text-sm mb-4 ${state.isFallback ? "text-red-500" : "text-green-600"}">
        ${state.isFallback ? "⚠️ Showing fallback expert analysis (Gemini API unavailable)" : "✅ Live Gemini AI response"}
      </p>
      <div class="space-y-4">
        ${state.topCareers
          .map(
            career => `
          <div class="p-4 bg-white rounded-xl shadow">
            <h3 class="text-xl font-semibold text-blue-600">${career.career}</h3>
            <p class="text-gray-700 mt-2">${career.description}</p>
            <p class="text-sm text-gray-500">Match: ${career.match || "N/A"}%</p>
            <p class="text-sm text-gray-500">Salary: ${career.salary}</p>
            <p class="text-sm text-gray-500">Demand: ${career.demand}</p>
            <p class="text-sm text-gray-500">Growth: ${career.growth}</p>
            <p class="text-sm text-gray-500">Trend: ${career.trend}</p>
            <p class="text-sm text-gray-500">Missing Skills: ${career.missingSkills.join(", ") || "None"}</p>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
}

// ---- INIT ----
render();
