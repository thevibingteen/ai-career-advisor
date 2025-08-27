// Application State
const state = {
    currentStep: 1,
    totalSteps: 4,
    userData: {
        name: '',
        email: '',
        skills: '',
        experience: '',
        employmentStatus: '',
        interests: [],
        goals: '',
        constraints: '',
        salaryRange: ''
    },
    results: null,
    acceptedTerms: false,
    topCareers: [],
    errors: {}
};

// DOM Elements
const app = document.getElementById('app');
const careerModal = document.getElementById('careerModal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const shareModal = document.getElementById('shareModal');

// Career trends data (will be enhanced with Gemini API)
const careerTrends = {
    "Full Stack Developer": {
        demand: "High",
        growth: "22% by 2029",
        skills: ["JavaScript", "React", "Node.js", "HTML/CSS", "SQL", "Git", "REST APIs"],
        salary: "₹6-15 LPA",
        trend: "Increasing demand for full-stack developers with cloud experience",
        description: "Full Stack Developers build both the front-end and back-end of web applications. They work with various technologies to create seamless user experiences and robust server-side functionality.",
        resources: [
            { name: "FreeCodeCamp", provider: "Free", type: "Course", duration: "300 hours", free: true, link: "https://www.freecodecamp.org/" },
            { name: "The Complete Web Developer Bootcamp", provider: "Udemy", type: "Course", duration: "60 hours", free: false, link: "https://www.udemy.com/course/the-complete-web-development-bootcamp/" },
            { name: "Full Stack Open", provider: "University of Helsinki", type: "Course", duration: "Free", free: true, link: "https://fullstackopen.com/en/" },
            { name: "JavaScript: The Advanced Concepts", provider: "ZeroToMastery", type: "Course", duration: "25 hours", free: false, link: "https://www.udemy.com/course/advanced-javascript-concepts/" }
        ],
        companies: ["Infosys", "TCS", "Wipro", "HCL", "Startups"],
        learningPath: "Start with HTML/CSS and JavaScript, then learn a frontend framework like React, followed by backend technologies like Node.js and databases.",
        freelancing: true,
        freelancingPlatforms: ["Upwork", "Freelancer", "Fiverr", "Toptal"]
    },
    "Data Scientist": {
        demand: "Very High",
        growth: "31% by 2029",
        skills: ["Python", "R", "Machine Learning", "Statistics", "Data Visualization", "SQL", "TensorFlow"],
        salary: "₹8-20 LPA",
        trend: "Rising need for AI and machine learning expertise across industries",
        description: "Data Scientists analyze and interpret complex data to help organizations make informed decisions. They use statistical methods, machine learning, and data visualization techniques.",
        resources: [
            { name: "Kaggle Learn", provider: "Free", type: "Courses", duration: "Free", free: true, link: "https://www.kaggle.com/learn" },
            { name: "Data Science Specialization", provider: "Coursera", type: "Specialization", duration: "11 months", free: false, link: "https://www.coursera.org/specializations/jhu-data-science" },
            { name: "Python for Data Science and Machine Learning", provider: "Udemy", type: "Course", duration: "44 hours", free: false, link: "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/" },
            { name: "Introduction to Machine Learning", provider: "Kaggle", type: "Course", duration: "Free", free: true, link: "https://www.kaggle.com/learn/intro-to-machine-learning" }
        ],
        companies: ["Google", "Microsoft", "Amazon", "IBM", "JPMorgan Chase"],
        learningPath: "Start with Python programming, then learn statistics and data analysis, followed by machine learning algorithms and data visualization.",
        freelancing: true,
        freelancingPlatforms: ["Upwork", "Toptal", "Kaggle"]
    },
    "UX/UI Designer": {
        demand: "High",
        growth: "13% by 2029",
        skills: ["Figma", "User Research", "Wireframing", "Prototyping", "UI Design", "User Testing", "Adobe XD"],
        salary: "₹5-12 LPA",
        trend: "Growing emphasis on user experience in digital products",
        description: "UX/UI Designers create user-friendly interfaces that provide meaningful and relevant experiences to users. They combine design, psychology, and business needs.",
        resources: [
            { name: "Figma Tutorials", provider: "Figma", type: "Tutorials", duration: "Free", free: true, link: "https://www.figma.com/resources/learn/" },
            { name: "UI/UX Design Specialization", provider: "Coursera", type: "Specialization", duration: "6 months", free: false, link: "https://www.coursera.org/specializations/ui-ux-design" },
            { name: "Learn Figma - UI/UX Design Essential Training", provider: "Udemy", type: "Course", duration: "12 hours", free: false, link: "https://www.udemy.com/course/learn-figma/" },
            { name: "Google UX Design Certificate", provider: "Coursera", type: "Certificate", duration: "6 months", free: false, link: "https://www.coursera.org/professional-certificates/google-ux-design" }
        ],
        companies: ["Apple", "Google", "Adobe", "Airbnb", "Facebook"],
        learningPath: "Start with design principles and color theory, then learn wireframing and prototyping tools, followed by user research methodologies.",
        freelancing: true,
        freelancingPlatforms: ["Dribbble", "Behance", "Upwork", "99designs"]
    },
    "Cloud Engineer": {
        demand: "Very High",
        growth: "26% by 2029",
        skills: ["AWS", "Azure", "Docker", "Kubernetes", "Infrastructure as Code", "Linux", "Networking"],
        salary: "₹7-18 LPA",
        trend: "Accelerated cloud adoption across all business sectors",
        description: "Cloud Engineers design, implement, and maintain cloud infrastructure and services. They help organizations leverage cloud computing for scalability and efficiency.",
        resources: [
            { name: "AWS Free Tier", provider: "Amazon", type: "Hands-on", duration: "Free", free: true, link: "https://aws.amazon.com/free/" },
            { name: "AWS Certified Solutions Architect", provider: "A Cloud Guru", type: "Course", duration: "40 hours", free: false, link: "https://acloudguru.com/course/aws-certified-solutions-architect-associate-saa-c03" },
            { name: "Docker and Kubernetes: The Complete Guide", provider: "Udemy", type: "Course", duration: "23 hours", free: false, link: "https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/" },
            { name: "Google Cloud Platform Fundamentals", provider: "Coursera", type: "Course", duration: "15 hours", free: false, link: "https://www.coursera.org/learn/gcp-fundamentals" }
        ],
        companies: ["Amazon", "Microsoft", "Google", "IBM", "Netflix"],
        learningPath: "Start with cloud fundamentals and Linux, then learn a specific cloud platform (AWS/Azure/GCP), followed by containerization and orchestration tools.",
        freelancing: false,
        freelancingPlatforms: []
    },
    "DevOps Engineer": {
        demand: "High",
        growth: "21% by 2029",
        skills: ["CI/CD", "Docker", "Kubernetes", "AWS", "Scripting", "Jenkins", "Monitoring"],
        salary: "₹7-16 LPA",
        trend: "Increasing focus on automation and deployment efficiency",
        description: "DevOps Engineers bridge the gap between development and operations teams. They automate processes and ensure reliable software delivery.",
        resources: [
            { name: "DevOps Bootcamp", provider: "Udemy", type: "Course", duration: "55 hours", free: false, link: "https://www.udemy.com/course/devops-bootcamp/" },
            { name: "Kubernetes for Absolute Beginners", provider: "YouTube", type: "Course", duration: "4 hours", free: true, link: "https://www.youtube.com/watch?v=7XDeI5fyj2w" },
            { name: "Introduction to DevOps", provider: "Coursera", type: "Course", duration: "10 hours", free: true, link: "https://www.coursera.org/learn/intro-to-devops" },
            { name: "GitLab CI/CD Tutorial", provider: "GitLab", type: "Tutorial", duration: "Free", free: true, link: "https://docs.gitlab.com/ee/ci/" }
        ],
        companies: ["Netflix", "Amazon", "Google", "Etsy", "Target"],
        learningPath: "Start with Linux and scripting, then learn CI/CD tools and containerization, followed by infrastructure as code and monitoring solutions.",
        freelancing: true,
        freelancingPlatforms: ["Upwork", "Toptal", "Freelancer"]
    },
    "Digital Marketer": {
        demand: "High",
        growth: "10% by 2029",
        skills: ["SEO", "SEM", "Social Media", "Content Marketing", "Google Analytics", "Email Marketing"],
        salary: "₹3-8 LPA",
        trend: "Growing digital presence for businesses across industries",
        description: "Digital Marketers promote products and services through digital channels. They analyze market trends and create strategies to reach target audiences.",
        resources: [
            { name: "Google Digital Garage", provider: "Google", type: "Course", duration: "40 hours", free: true, link: "https://learndigital.withgoogle.com/digitalgarage/" },
            { name: "HubSpot Academy", provider: "HubSpot", type: "Courses", duration: "Free", free: true, link: "https://academy.hubspot.com/" },
            { name: "Digital Marketing Specialization", provider: "Coursera", type: "Specialization", duration: "6 months", free: false, link: "https://www.coursera.org/specializations/digital-marketing" },
            { name: "Facebook Blueprint", provider: "Facebook", type: "Certification", duration: "Free", free: true, link: "https://www.facebook.com/business/learn" }
        ],
        companies: ["Any industry with online presence", "Startups", "E-commerce", "Agencies"],
        learningPath: "Start with fundamentals of marketing, then learn SEO and SEM, followed by social media marketing and analytics.",
        freelancing: true,
        freelancingPlatforms: ["Upwork", "Fiverr", "PeoplePerHour"]
    }
};

// Render the application based on current step
function render() {
    switch(state.currentStep) {
        case 1:
            renderSkillsStep();
            break;
        case 2:
            renderInterestsStep();
            break;
        case 3:
            renderGoalsStep();
            break;
        case 4:
            renderResultsStep();
            break;
    }
}

// Validation functions
function validateName(name) {
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(name) && name.length >= 2;
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validateSkills(skills) {
    return skills.trim().length > 0;
}

function validateStep1() {
    const errors = {};
    
    if (!validateName(state.userData.name)) {
        errors.name = "Please enter a valid name (letters and spaces only)";
    }
    
    if (!validateEmail(state.userData.email)) {
        errors.email = "Please enter a valid email address";
    }
    
    if (!validateSkills(state.userData.skills)) {
        errors.skills = "Please enter at least one skill";
    }
    
    if (!state.userData.employmentStatus) {
        errors.employmentStatus = "Please select your employment status";
    }
    
    if (!state.userData.experience) {
        errors.experience = "Please select your experience level";
    }
    
    state.errors = errors;
    return Object.keys(errors).length === 0;
}

function validateStep2() {
    if (state.userData.interests.length === 0) {
        state.errors.interests = "Please select at least one interest area";
        return false;
    }
    
    if (state.userData.interests.length > 3) {
        state.errors.interests = "Please select no more than 3 interest areas";
        return false;
    }
    
    return true;
}

function validateStep3() {
    const errors = {};
    
    if (!state.userData.goals.trim()) {
        errors.goals = "Please describe your career goals";
    }
    
    if (!state.userData.salaryRange) {
        errors.salaryRange = "Please select your expected salary range";
    }
    
    state.errors = errors;
    return Object.keys(errors).length === 0;
}

// Step 1: Skills
function renderSkillsStep() {
    app.innerHTML = `
        <div class="md:flex">
            <div class="md:w-1/2 p-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Let's plan your career path</h2>
                
                <div class="mb-6">
                    <div class="flex mb-2">
                        <div class="w-1/4">
                            <div class="text-center p-2 bg-blue-100 text-blue-800 rounded-lg font-semibold">1. Skills</div>
                        </div>
                        <div class="w-1/4">
                            <div class="text-center p-2 bg-gray-100 text-gray-600 rounded-lg">2. Interests</div>
                        </div>
                        <div class="w-1/4">
                            <div class="text-center p-2 bg-gray-100 text-gray-600 rounded-lg">3. Goals</div>
                        </div>
                        <div class="w-1/4">
                            <div class="text-center p-2 bg-gray-100 text-gray-600 rounded-lg">4. Results</div>
                        </div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div class="bg-blue-600 h-2.5 rounded-full progress-bar" style="width: 25%"></div>
                    </div>
                </div>
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Your Name*</label>
                        <input type="text" value="${state.userData.name}" oninput="updateUserData('name', event)" class="w-full px-4 py-3 border ${state.errors.name ? 'error' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="John Doe">
                        ${state.errors.name ? `<p class="error-message">${state.errors.name}</p>` : ''}
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Your Email*</label>
                        <input type="email" value="${state.userData.email}" oninput="updateUserData('email', event)" class="w-full px-4 py-3 border ${state.errors.email ? 'error' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="john@example.com">
                        ${state.errors.email ? `<p class="error-message">${state.errors.email}</p>` : ''}
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Your Current Skills*</label>
                        <textarea oninput="updateUserData('skills', event)" class="w-full px-4 py-3 border ${state.errors.skills ? 'error' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows="3" placeholder="Python, JavaScript, UI Design, Project Management...">${state.userData.skills}</textarea>
                        <p class="text-xs text-gray-500 mt-1">Separate skills with commas</p>
                        ${state.errors.skills ? `<p class="error-message">${state.errors.skills}</p>` : ''}
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Employment Status*</label>
                        <select onchange="updateUserData('employmentStatus', event)" class="w-full px-4 py-3 border ${state.errors.employmentStatus ? 'error' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select your status</option>
                            <option ${state.userData.employmentStatus === 'Student' ? 'selected' : ''}>Student</option>
                            <option ${state.userData.employmentStatus === 'Fresher' ? 'selected' : ''}>Fresher (0-1 years)</option>
                            <option ${state.userData.employmentStatus === 'Experienced' ? 'selected' : ''}>Experienced (1+ years)</option>
                            <option ${state.userData.employmentStatus === 'Job Seeker' ? 'selected' : ''}>Job Seeker</option>
                            <option ${state.userData.employmentStatus === 'Freelancer' ? 'selected' : ''}>Freelancer</option>
                        </select>
                        ${state.errors.employmentStatus ? `<p class="error-message">${state.errors.employmentStatus}</p>` : ''}
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Years of Experience*</label>
                        <select onchange="updateUserData('experience', event)" class="w-full px-4 py-3 border ${state.errors.experience ? 'error' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select experience</option>
                            <option ${state.userData.experience === 'Fresher (0 years)' ? 'selected' : ''}>Fresher (0 years)</option>
                            <option ${state.userData.experience === '0-1 years' ? 'selected' : ''}>0-1 years</option>
                            <option ${state.userData.experience === '1-3 years' ? 'selected' : ''}>1-3 years</option>
                            <option ${state.userData.experience === '3-5 years' ? 'selected' : ''}>3-5 years</option>
                            <option ${state.userData.experience === '5-10 years' ? 'selected' : ''}>5-10 years</option>
                            <option ${state.userData.experience === '10+ years' ? 'selected' : ''}>10+ years</option>
                        </select>
                        ${state.errors.experience ? `<p class="error-message">${state.errors.experience}</p>` : ''}
                    </div>
                    
                    <button onclick="validateAndProceed()" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center">
                        <i class="fas fa-arrow-right mr-2"></i> Continue to Interests
                    </button>
                </div>
            </div>
            
            <div class="md:w-1/2 gradient-bg text-white p-8 flex flex-col justify-center">
                <div class="text-center mb-6">
                    <i class="fas fa-brain text-5xl mb-4 opacity-90"></i>
                    <h2 class="text-2xl font-bold mb-2">AI-Powered Career Guidance</h2>
                    <p class="opacity-90">We analyze your skills and goals to build a personalized career roadmap</p>
                </div>
                
                <div class="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-4 mb-6">
                    <h3 class="font-semibold mb-2">What you'll get:</h3>
                    <ul class="space-y-2">
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-300 mt-1 mr-2"></i>
                            <span>Personalized career paths matched to your profile</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-300 mt-1 mr-2"></i>
                            <span>Skill gap analysis and learning roadmap</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-300 mt-1 mr-2"></i>
                            <span>Job readiness score and probability matching</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-300 mt-1 mr-2"></i>
                            <span>Weekly learning plan with curated resources</span>
                        </li>
                    </ul>
                </div>
                
                <div class="flex justify-center">
                    <div class="bg-white rounded-lg p-3 shadow-lg w-64">
                        <div class="text-gray-800">
                            <div class="font-semibold mb-2">Sample Career Match</div>
                            <div class="flex items-center mb-2">
                                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                    <i class="fas fa-code text-blue-600"></i>
                                </div>
                                <div>
                                    <div class="font-bold">Full Stack Developer</div>
                                    <div class="text-xs text-gray-500">85% match</div>
                                </div>
                            </div>
                            <div class="flex justify-between text-xs text-gray-600">
                                <span>Salary: ₹6-15 LPA</span>
                                <span>Time: 6-9 months</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Step 2: Interests
function renderInterestsStep() {
    const interests = ['Software Development', 'Data Science', 'UI/UX Design', 'Cloud Computing', 'Digital Marketing', 'DevOps'];
    
    app.innerHTML = `
        <div class="md:flex">
            <div class="md:w-1/2 p-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Your Interests & Passions</h2>
                
                <div class="mb-6">
                    <div class="flex mb-2">
                        <div class="w-1/4">
                            <div class="text-center p-2 bg-gray-100 text-gray-600 rounded-lg">1. Skills</div>
                        </div>
                        <div class="w-1/4">
                            <div class="text-center p-2 bg-blue-100 text-blue-800 rounded-lg font-semibold">2. Interests</div>
                        </div>
                        <div class="w-1/4">
                            <div class="text-center p-2 bg-gray-100 text-gray-600 rounded-lg">3. Goals</div>
                        </div>
                        <div class="w-1/4">
                            <div class="text-center p-2 bg-gray-100 text-gray-600 rounded-lg">4. Results</div>
                        </div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div class="bg-blue-600 h-2.5 rounded-full progress-bar" style="width: 50%"></div>
                    </div>
                </div>
                
                <div class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-3">What are you passionate about? (Select 2-3)*</label>
                        ${state.errors.interests ? `<p class="error-message">${state.errors.interests}</p>` : ''}
                        <div class="grid grid-cols-2 gap-3">
                            ${interests.map(interest => `
                                <div class="interest-option border border-gray-300 rounded-lg p-4 text-center cursor-pointer transition-colors ${state.userData.interests.includes(interest) ? 'selected' : ''}" data-interest="${interest}">
                                    <i class="fas ${getInterestIcon(interest)} text-2xl mb-2 text-blue-600"></i>
                                    <div>${interest}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="flex gap-3">
                        <button onclick="prevStep()" class="w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center">
                            <i class="fas fa-arrow-left mr-2"></i> Back
                        </button>
                        <button onclick="validateInterestsAndProceed()" class="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center">
                            Continue to Goals <i class="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="md:w-1/2 gradient-bg text-white p-8 flex flex-col justify-center">
                <div class="text-center mb-6">
                    <i class="fas fa-lightbulb text-5xl mb-4 opacity-90"></i>
                    <h2 class="text-2xl font-bold mb-2">Follow Your Passions</h2>
                    <p class="opacity-90">Your interests help us recommend careers you'll truly enjoy</p>
                </div>
                
                <div class="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-4 mb-6">
                    <h3 class="font-semibold mb-2">Why interests matter:</h3>
                    <ul class="space-y-2">
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-300 mt-1 mr-2"></i>
                            <span>People who work in fields they're passionate about report higher job satisfaction</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-300 mt-1 mr-2"></i>
                            <span>Interest alignment leads to better long-term career growth</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-300 mt-1 mr-2"></i>
                            <span>You're more likely to excel in areas that genuinely interest you</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    // Add event listeners to interest options
    setTimeout(() => {
        const options = document.querySelectorAll('.interest-option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                const interest = this.getAttribute('data-interest');
                
                if (state.userData.interests.includes(interest)) {
                    // Remove if already selected
                    state.userData.interests = state.userData.interests.filter(i => i !== interest);
                    this.classList.remove('selected');
                } else {
                    // Add if not selected and less than 3
                    if (state.userData.interests.length < 3) {
                        state.userData.interests.push(interest);
                        this.classList.add('selected');
                    } else {
                        alert("You can select up to 3 interests only");
                    }
                }
            });
        });
    }, 100);
}

// Step 3: Goals
function renderGoalsStep() {
    app.innerHTML = `
        <div class="md:flex">
            <div class="md:w-1/2 p-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Your Career Goals</h2>
                
                <div class="mb-6">
                    <div class="flex mb-2">
                        <div class="w-1/4">
                            <div class="text-center p-2 bg-gray-100 text-gray-600 rounded-lg">1. Skills</div>
                        </div>
                        <div class="w-1/4">
                            <div class="text-center p-2 bg-gray-100 text-gray-600 rounded-lg">2. Interests</div>
                        </div>
                        <div class="w-1/4">
                            <div class="text-center p-2 bg-blue-100 text-blue-800 rounded-lg font-semibold">3. Goals</div>
                        </div>
                        <div class="w-1/4">
                            <div class="text-center p-2 bg-gray-100 text-gray-600 rounded-lg">4. Results</div>
                        </div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div class="bg-blue-600 h-2.5 rounded-full progress-bar" style="width: 75%"></div>
                    </div>
                </div>
                
                <div class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Career Goals*</label>
                        <textarea oninput="updateUserData('goals', event)" class="w-full px-4 py-3 border ${state.errors.goals ? 'error' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows="3" placeholder="I want to transition to a tech career within 12 months...">${state.userData.goals}</textarea>
                        ${state.errors.goals ? `<p class="error-message">${state.errors.goals}</p>` : ''}
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Constraints (time, location, etc.)</label>
                        <textarea oninput="updateUserData('constraints', event)" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows="2" placeholder="I can study 10 hours per week...">${state.userData.constraints}</textarea>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Target Salary Range (INR)*</label>
                        <select onchange="updateUserData('salaryRange', event)" class="w-full px-4 py-3 border ${state.errors.salaryRange ? 'error' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select expected salary</option>
                            <option ${state.userData.salaryRange === 'Under ₹3 LPA' ? 'selected' : ''}>Under ₹3 LPA</option>
                            <option ${state.userData.salaryRange === '₹3-5 LPA' ? 'selected' : ''}>₹3-5 LPA</option>
                            <option ${state.userData.salaryRange === '₹5-7 LPA' ? 'selected' : ''}>₹5-7 LPA</option>
                            <option ${state.userData.salaryRange === '₹7-10 LPA' ? 'selected' : ''}>₹7-10 LPA</option>
                            <option ${state.userData.salaryRange === '₹10-15 LPA' ? 'selected' : ''}>₹10-15 LPA</option>
                            <option ${state.userData.salaryRange === '₹15-20 LPA' ? 'selected' : ''}>₹15-20 LPA</option>
                            <option ${state.userData.salaryRange === '₹20+ LPA' ? 'selected' : ''}>₹20+ LPA</option>
                        </select>
                        ${state.errors.salaryRange ? `<p class="error-message">${state.errors.salaryRange}</p>` : ''}
                    </div>
                    
                    <div class="flex gap-3">
                        <button onclick="prevStep()" class="w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center">
                            <i class="fas fa-arrow-left mr-2"></i> Back
                        </button>
                        <button onclick="validateGoalsAndGenerate()" class="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center">
                            Generate Results <i class="fas fa-bolt ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="md:w-1/2 gradient-bg text-white p-8 flex flex-col justify-center">
                <div class="text-center mb-6">
                    <i class="fas fa-bullseye text-5xl mb-4 opacity-90"></i>
                    <h2 class="text-2xl font-bold mb-2">Set Clear Goals</h2>
                    <p class="opacity-90">Define what success looks like for your career journey</p>
                </div>
                
                <div class="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-4 mb-6">
                    <h3 class="font-semibold mb-2">Realistic planning:</h3>
                    <ul class="space-y-2">
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-300 mt-1 mr-2"></i>
                            <span>Be specific about your timeline and constraints</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-300 mt-1 mr-2"></i>
                            <span>Consider your financial needs and salary expectations</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-300 mt-1 mr-2"></i>
                            <span>We'll create a personalized plan based on your goals</span>
                        </li>
                    </ul>
                </div>
                
                <div class="flex justify-center">
                    <div class="bg-white rounded-lg p-3 shadow-lg w-64">
                        <div class="text-gray-800">
                            <div class="font-semibold mb-2">Sample Timeline</div>
                            <div class="space-y-2">
                                <div class="flex justify-between">
                                    <span>Learning Foundation</span>
                                    <span>3 months</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Projects & Portfolio</span>
                                    <span>2 months</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Job Search</span>
                                    <span>1-2 months</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Step 4: Results
function renderResultsStep() {
    app.innerHTML = `
        <div class="p-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Your Personalized Career Plan</h2>
            
            <div class="mb-6">
                <div class="flex mb-2">
                    <div class="w-1/4">
                        <div class="text-center p-2 bg-gray-100 text-gray-600 rounded-lg">1. Skills</div>
                    </div>
                    <div class="w-1/4">
                        <div class="text-center p-2 bg-gray-100 text-gray-600 rounded-lg">2. Interests</div>
                    </div>
                    <div class="w-1/4">
                        <div class="text-center p-2 bg-gray-100 text-gray-600 rounded-lg">3. Goals</div>
                    </div>
                    <div class="w-1/4">
                        <div class="text-center p-2 bg-blue-100 text-blue-800 rounded-lg font-semibold">4. Results</div>
                    </div>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="bg-blue-600 h-2.5 rounded-full progress-bar" style="width: 100%"></div>
                </div>
            </div>
            
            <div class="grid md:grid-cols-3 gap-6 mb-8">
                ${state.topCareers.map((career, index) => `
                    <div class="career-path-card bg-white p-5 rounded-lg shadow-md">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 ${index === 0 ? 'bg-blue-100' : index === 1 ? 'bg-green-100' : 'bg-purple-100'} rounded-lg flex items-center justify-center mr-3">
                                <i class="fas ${getCareerIcon(career.career)} ${index === 0 ? 'text-blue-600' : index === 1 ? 'text-green-600' : 'text-purple-600'}"></i>
                            </div>
                            <div>
                                <h3 class="font-bold">${career.career}</h3>
                                <div class="text-xs ${index === 0 ? 'text-blue-600' : index === 1 ? 'text-green-600' : 'text-purple-600'}">${career.match}% Match</div>
                            </div>
                        </div>
                        <p class="text-sm text-gray-600 mb-4">${career.description || 'Build a successful career in this high-demand field'}</p>
                        <div class="mb-4">
                            <div class="flex justify-between text-xs mb-1">
                                <span>Salary Range</span>
                                <span>${career.salary}</span>
                            </div>
                            <div class="flex justify-between text-xs mb-1">
                                <span>Market Demand</span>
                                <span>${career.demand}</span>
                            </div>
                            <div class="flex justify-between text-xs">
                                <span>Growth</span>
                                <span>${career.growth}</span>
                            </div>
                        </div>
                        ${career.freelancing ? `<div class="text-xs text-green-600 mb-2"><i class="fas fa-check-circle"></i> Freelancing opportunities available</div>` : ''}
                        <div class="text-xs text-gray-500 mb-3">Trend: ${career.trend}</div>
                        <button onclick="showCareerDetails('${career.career}')" class="w-full ${index === 0 ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : index === 1 ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-purple-50 text-purple-600 hover:bg-purple-100'} py-2 rounded-lg text-sm font-semibold transition-colors">View Details</button>
                    </div>
                `).join('')}
            </div>
            
            <div class="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 class="font-bold text-lg mb-4">Your Skill Gap Analysis</h3>
                ${state.topCareers[0].missingSkills.map((skill, i) => `
                    <div class="mb-4 animate-skill" style="animation-delay: ${i * 0.1}s">
                        <div class="flex justify-between mb-1">
                            <span class="font-medium">${skill}</span>
                            <span class="text-blue-600 font-semibold">0%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2.5">
                            <div class="bg-blue-600 h-2.5 rounded-full skill-bar" style="width: 0%"></div>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">Critical skill for ${state.topCareers[0].career}. Consider learning through online courses.</p>
                    </div>
                `).join('')}
                <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 class="font-semibold text-blue-800 mb-2">Skill Improvement Strategy</h4>
                    <p class="text-sm text-blue-700">Based on your current skills, we recommend focusing on ${state.topCareers[0].missingSkills.slice(0, 2).join(' and ')} first, as these are fundamental to your chosen career path.</p>
                </div>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 class="font-bold text-lg mb-4">12-Week Learning Plan</h3>
                <div class="space-y-4">
                    <div class="flex items-start">
                        <div class="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded mr-3">Weeks 1-4</div>
                        <div>
                            <div class="font-semibold">Foundational Skills</div>
                            <div class="text-sm text-gray-600">Focus on ${state.topCareers[0].missingSkills.slice(0, 2).join(' and ')}</div>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <div class="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded mr-3">Weeks 5-8</div>
                        <div>
                            <div class="font-semibold">Intermediate Concepts</div>
                            <div class="text-sm text-gray-600">Build projects using ${state.topCareers[0].missingSkills.slice(2, 4).join(' and ')}</div>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <div class="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded mr-3">Weeks 9-12</div>
                        <div>
                            <div class="font-semibold">Portfolio Development</div>
                            <div class="text-sm text-gray-600">Create a portfolio showcasing your new skills</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="flex gap-4 flex-wrap">
                <button onclick="generatePDF()" class="download-btn px-6 py-3 text-white rounded-lg flex items-center">
                    <i class="fas fa-file-pdf mr-2"></i> Export PDF Plan
                </button>
                <button onclick="openShareModal()" class="bg-gray-200 px-6 py-3 text-gray-800 rounded-lg flex items-center">
                    <i class="fas fa-share-alt mr-2"></i> Share Results
                </button>
                <button onclick="saveToServer()" class="bg-green-600 px-6 py-3 text-white rounded-lg flex items-center">
                    <i class="fas fa-save mr-2"></i> Save to Server
                </button>
                <button onclick="restartProcess()" class="bg-white border border-gray-300 px-6 py-3 text-gray-800 rounded-lg flex items-center">
                    <i class="fas fa-redo mr-2"></i> Start Over
                </button>
            </div>
        </div>
    `;

    // Animate skill bars after a short delay
    setTimeout(() => {
        document.querySelectorAll('.skill-bar').forEach(bar => {
            bar.style.width = '0%';
        });
    }, 500);
}

// Helper functions
function getInterestIcon(interest) {
    const icons = {
        'Software Development': 'fa-laptop-code',
        'Data Science': 'fa-chart-line',
        'UI/UX Design': 'fa-paint-brush',
        'Cloud Computing': 'fa-server',
        'Digital Marketing': 'fa-bullhorn',
        'DevOps': 'fa-code-branch'
    };
    return icons[interest] || 'fa-star';
}

function getCareerIcon(career) {
    const icons = {
        'Full Stack Developer': 'fa-code',
        'Data Scientist': 'fa-chart-line',
        'UX/UI Designer': 'fa-paint-brush',
        'Cloud Engineer': 'fa-cloud',
        'DevOps Engineer': 'fa-code-branch',
        'Digital Marketer': 'fa-bullhorn'
    };
    return icons[career] || 'fa-briefcase';
}

// Show career details in modal
function showCareerDetails(careerName) {
    const career = careerTrends[careerName];
    const userSkills = state.userData.skills.split(',').map(skill => skill.trim().toLowerCase());
    const requiredSkills = career.skills.map(skill => skill.toLowerCase());
    
    modalTitle.textContent = careerName;
    
    modalContent.innerHTML = `
        <div class="space-y-6">
            <div>
                <h3 class="font-semibold text-lg mb-2">Career Overview</h3>
                <p class="text-gray-700">${career.description}</p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-blue-800 mb-2">Market Information</h4>
                    <p class="text-sm"><span class="font-medium">Demand:</span> ${career.demand}</p>
                    <p class="text-sm"><span class="font-medium">Growth:</span> ${career.growth}</p>
                    <p class="text-sm"><span class="font-medium">Salary Range:</span> ${career.salary}</p>
                </div>
                
                <div class="bg-green-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-green-800 mb-2">Current Trend</h4>
                    <p class="text-sm">${career.trend}</p>
                </div>
            </div>
            
            <div>
                <h3 class="font-semibold text-lg mb-3">Required Skills</h3>
                <div class="space-y-3">
                    ${requiredSkills.map(skill => {
                        const hasSkill = userSkills.some(userSkill => 
                            userSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(userSkill)
                        );
                        
                        return `
                            <div class="flex items-center justify-between p-3 ${hasSkill ? 'bg-green-50' : 'bg-red-50'} rounded-lg">
                                <span class="font-medium">${skill}</span>
                                <span class="text-sm ${hasSkill ? 'text-green-600' : 'text-red-600'}">
                                    ${hasSkill ? '✓ You have this skill' : '✗ You need to learn this'}
                                </span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            
            <div>
                <h3 class="font-semibold text-lg mb-3">Learning Resources</h3>
                <div class="space-y-3">
                    ${career.resources.map(resource => `
                        <a href="${resource.link}" target="_blank" class="resource-card bg-gray-50 p-4 rounded-lg block hover:bg-gray-100">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h4 class="font-semibold">${resource.name}</h4>
                                    <p class="text-sm text-gray-600">${resource.provider} • ${resource.type} • ${resource.duration}</p>
                                </div>
                                <span class="resource-badge ${resource.free ? 'free' : 'paid'}">${resource.free ? 'Free' : 'Paid'}</span>
                            </div>
                        </a>
                    `).join('')}
                </div>
            </div>
            
            ${career.freelancing ? `
            <div>
                <h3 class="font-semibold text-lg mb-2">Freelancing Opportunities</h3>
                <p class="text-gray-700 mb-2">This career has good freelancing potential. You can find work on these platforms:</p>
                <div class="flex flex-wrap gap-2">
                    ${career.freelancingPlatforms.map(platform => `
                        <span class="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">${platform}</span>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            <div>
                <h3 class="font-semibold text-lg mb-2">Learning Path</h3>
                <p class="text-gray-700">${career.learningPath}</p>
            </div>
            
            <div>
                <h3 class="font-semibold text-lg mb-2">Companies Hiring</h3>
                <div class="flex flex-wrap gap-2">
                    ${career.companies.map(company => `
                        <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">${company}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    careerModal.style.display = 'flex';
}

// Close modal
function closeModal() {
    careerModal.style.display = 'none';
}

// Share modal functions
function openShareModal() {
    // Generate a shareable link
    document.getElementById('shareableLink').value = window.location.href;
    shareModal.style.display = 'flex';
}

function closeShareModal() {
    shareModal.style.display = 'none';
}

function shareOnWhatsApp() {
    const text = `Check out my career path recommendations from CareerPath AI!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + window.location.href)}`, '_blank');
}

function shareOnTelegram() {
    const text = `Check out my career path recommendations from CareerPath AI!`;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`, '_blank');
}

function shareOnTwitter() {
    const text = `Check out my career path recommendations from CareerPath AI!`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
}

function shareOnLinkedIn() {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
}

function shareOnFacebook() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
}

function copyShareLink() {
    const linkInput = document.getElementById('shareableLink');
    linkInput.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
}

// Update user data in state
function updateUserData(field, event) {
    state.userData[field] = event.target.value;
    // Clear error when user starts typing
    if (state.errors[field]) {
        delete state.errors[field];
        render();
    }
}

// Navigation functions
function nextStep() {
    if (state.currentStep < state.totalSteps) {
        state.currentStep++;
        render();
    }
}

function prevStep() {
    if (state.currentStep > 1) {
        state.currentStep--;
        state.errors = {};
        render();
    }
}

function validateAndProceed() {
    if (validateStep1()) {
        nextStep();
    } else {
        render();
    }
}

function validateInterestsAndProceed() {
    if (validateStep2()) {
        nextStep();
    } else {
        render();
    }
}

function validateGoalsAndGenerate() {
    if (validateStep3()) {
        generateResults();
    } else {
        render();
    }
}

// Call Gemini API for career recommendations (using serverless function)
async function callGeminiAPI(userData) {
    try {
        const response = await fetch('/api/getCareerAdvice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userData: userData })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error calling API:', error);
        throw error;
    }
}

// Generate results using Gemini API
async function generateResults() {
    // Show loading state
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
        // Call Gemini API
        const geminiResults = await callGeminiAPI(state.userData);
        
        // Combine Gemini results with our career trends data
        const combinedResults = geminiResults.map(result => {
            const careerData = careerTrends[result.career] || {};
            return {
                ...careerData,
                ...result,
                // Ensure we have all required fields
                salary: careerData.salary || "₹5-12 LPA",
                demand: careerData.demand || "High",
                growth: careerData.growth || "15% by 2029",
                description: careerData.description || "A promising career path with good growth potential."
            };
        });
        
        state.topCareers = combinedResults;
        state.currentStep = 4;
        render();
    } catch (error) {
        console.error("Error generating results with Gemini:", error);
        
        // Fallback to static analysis if API fails
        alert("API is not responding. Using our expert analysis instead.");
        
        // Use the existing static analysis as fallback
        const userSkills = state.userData.skills.split(',').map(skill => skill.trim().toLowerCase());
        
        // Calculate match scores for each career
        const careerMatches = Object.keys(careerTrends).map(career => {
            const requiredSkills = careerTrends[career].skills.map(skill => skill.toLowerCase());
            const matchedSkills = requiredSkills.filter(skill => 
                userSkills.some(userSkill => userSkill.includes(skill) || skill.includes(userSkill))
            );
            
            const matchPercentage = Math.round((matchedSkills.length / requiredSkills.length) * 100);
            
            return {
                ...careerTrends[career],
                career,
                match: matchPercentage,
                matchedSkills,
                missingSkills: requiredSkills.filter(skill => !matchedSkills.includes(skill)),
                trend: careerTrends[career].trend
            };
        });
        
        // Sort by best match
        careerMatches.sort((a, b) => b.match - a.match);
        
        // Get top 3 careers
        state.topCareers = careerMatches.slice(0, 3);
        state.currentStep = 4;
        render();
    }
}

// Generate PDF (simulated)
function generatePDF() {
    alert("PDF generation would be implemented in a production version. For now, you can use your browser's Print function to save as PDF.");
}

// Save data to server
function saveToServer() {
    alert("In a production environment, this would save your data to the server. Your data has been stored locally for this demo.");
    
    // Store data in localStorage for demo purposes
    const timestamp = new Date().toISOString();
    const userDataWithResults = {
        ...state.userData,
        results: state.results,
        timestamp: timestamp,
        topCareers: state.topCareers
    };
    
    // Get existing data or initialize empty array
    const existingData = JSON.parse(localStorage.getItem('careerAdvisorData') || '[]');
    existingData.push(userDataWithResults);
    
    // Save back to localStorage
    localStorage.setItem('careerAdvisorData', JSON.stringify(existingData));
    
    alert("Your data has been saved locally. In a real application, this would be sent to your server.");
}

function restartProcess() {
    state.currentStep = 1;
    state.userData = {
        name: '',
        email: '',
        skills: '',
        experience: '',
        employmentStatus: '',
        interests: [],
        goals: '',
        constraints: '',
        salaryRange: ''
    };
    state.results = null;
    state.topCareers = [];
    state.errors = {};
    render();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    render();
});