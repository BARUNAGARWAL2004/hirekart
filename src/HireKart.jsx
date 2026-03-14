import { supabase } from "./supabaseClient";
import { useState, useEffect, useCallback, createContext, useContext } from "react";

// ─── i18n ─────────────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    // Nav
    navLogo: "HireKart",
    navJobs: "Jobs",
    navLogin: "Login",
    navSignup: "Sign Up",
    navDashboard: "Dashboard",
    navLogout: "Logout",
    navHi: "Hi",
    // Home
    heroBadge: "🇮🇳 Odisha's Local Job Platform",
    heroTitle1: "Find Jobs at",
    heroTitle2: "Local Shops",
    heroTitle3: "Near You",
    heroSubtitle: "HireKart connects workers with small retail shops in Angul, Talcher, Dhenkanal, Athmalik and nearby cities.",
    heroWorkerBtn: "🙋 I'm Looking for Work",
    heroOwnerBtn: "👥 Need Employees",
    statActiveJobs: "Active Jobs",
    statWorkers: "Workers",
    statCities: "Cities",
    statFree: "Free",
    howTitle: "How HireKart Works",
    howSub: "Simple steps to get hired or hire someone",
    how1Title: "1. Create Profile",
    how1Desc: "Sign up as a worker. Add your skills, experience and location.",
    how2Title: "2. Browse Jobs",
    how2Desc: "See jobs in your city — kirana, mobile, clothing, medical shops.",
    how3Title: "3. Apply Easily",
    how3Desc: "One click apply. No resume needed. Your profile does the work.",
    how4Title: "4. Get Connected",
    how4Desc: "Shop owner contacts you directly or HireKart team connects you.",
    recentJobs: "Recent Job Openings",
    recentJobsSub: "Latest opportunities in your area",
    viewAllJobs: "View All Jobs →",
    ownerCta: "Are you a shop owner?",
    ownerCtaDesc: "Post jobs for free and find reliable workers from your own city.",
    ownerCtaBtn: "Post a Job Free →",
    // Login
    welcomeBack: "Welcome Back",
    loginSub: "Login to your HireKart account",
    loginEmail: "Email / Phone",
    loginPassword: "Password",
    loginBtn: "Login →",
    loginNewHere: "New here?",
    signupAsWorker: "Sign up as Worker",
    or: "or",
    signupAsOwner: "Shop Owner",
    // Worker Signup
    workerSignupTitle: "👷 Worker Sign Up",
    workerSignupSub: "Create your free profile and find jobs nearby",
    personalDetails: "Personal Details",
    fullName: "Full Name *",
    fullNamePlaceholder: "e.g. Raju Pradhan",
    phone: "Phone Number *",
    phonePlaceholder: "10-digit mobile number",
    yourLocation: "Your Location *",
    email: "Email",
    emailPlaceholder: "your@email.com",
    emailOptional: "Email (Optional)",
    password: "Password *",
    passwordPlaceholder: "Min 6 chars",
    workDetails: "Work Details",
    yourSkills: "Your Skills (select all that apply)",
    otherSkillLabel: "Enter your skill",
    otherSkillPlaceholder: "e.g. Driving, Photography...",
    experience: "Experience (Years)",
    experiencePlaceholder: "0 for fresher",
    experienceHint: "0 if no experience",
    expectedSalary: "Expected Salary (₹/month)",
    expectedSalaryPlaceholder: "e.g. 8000",
    willingToRelocate: "Willing to Relocate?",
    yes: "Yes",
    no: "No",
    aboutYourself: "About Yourself",
    aboutPlaceholder: "Write a few lines about yourself, your work style, etc.",
    createProfile: "Create My Profile →",
    alreadyHaveAccount: "Already have account?",
    loginHere: "Login here",
    // Owner Signup
    ownerSignupTitle: "🏪 Shop Owner Sign Up",
    ownerSignupSub: "Post jobs and find reliable workers for your shop",
    ownerDetails: "Owner Details",
    yourName: "Your Name *",
    yourNamePlaceholder: "e.g. Ramesh Nayak",
    emailRequired: "Email *",
    shopDetails: "Shop Details",
    shopName: "Shop Name *",
    shopNamePlaceholder: "e.g. Nayak Electronics",
    shopType: "Shop Type *",
    city: "City *",
    shopContact: "Shop Contact Number",
    shopContactPlaceholder: "Contact number shown to workers",
    shopContactHint: "Leave blank to use your phone number",
    aboutShop: "About Your Shop",
    aboutShopPlaceholder: "What you sell, how many years in business, etc.",
    registerShop: "Register My Shop →",
    alreadyRegistered: "Already registered?",
    // Jobs
    browseJobs: "🔍 Browse Jobs",
    jobsAvailable: "job(s) available in your area",
    searchPlaceholder: "Search jobs, shop names...",
    clearFilters: "✕ Clear Filters",
    signupToApply: "🙋 Want to apply?",
    signupToApplyLink: "Sign up as a worker",
    signupToApplyText: " to apply for jobs.",
    freshersOk: "Freshers OK",
    yrExp: "yr exp",
    perMonth: "/mo",
    // Job Detail
    backToJobs: "← Back to Jobs",
    jobDescription: "Job Description",
    postedOn: "Posted on",
    aboutShopSection: "About the Shop",
    applicantsSection: "Applicants",
    noApplicants: "No applicants yet.",
    applyNow: "Apply Now →",
    alreadyApplied: "✅ Already Applied",
    signupToApplyBtn: "Sign Up to Apply →",
    applySuccess: "✅ Applied successfully! The shop owner will contact you.",
    alreadyAppliedMsg: "You have already applied for this job.",
    onlyWorkers: "Only workers can apply for jobs.",
    // Worker Dashboard
    myDashboard: "👷 My Dashboard",
    welcomeBack2: "Welcome back",
    jobsApplied: "Jobs Applied",
    openJobs: "Open Jobs",
    browseJobsTab: "Browse Jobs",
    myApplications: "My Applications",
    myProfile: "My Profile",
    tipBrowse: "💡 Tip: Click on any job to see details and apply!",
    noJobsYet: "No jobs right now. Check back soon!",
    noApplications: "You haven't applied to any jobs yet. Browse jobs and apply!",
    applied: "Applied:",
    // Owner Dashboard
    ownerDashboard: "🏪 My Shop Dashboard",
    postNewJob: "+ Post a New Job",
    myJobs: "My Jobs",
    browseWorkers: "Browse Workers",
    noJobsPosted: "No jobs posted yet. Post your first job!",
    viewApplicants: "View Applicants",
    viewJob: "View Job",
    tipWorkers: "💡 Browse workers and contact them directly for your shop.",
    // Post Job
    postJobTitle: "📝 Post a Job",
    postJobSub: "Fill in the details to find the right worker",
    jobDetailsSection: "Job Details",
    jobTitle: "Job Title *",
    jobTitlePlaceholder: "e.g. Sales Executive, Shop Helper, Cashier",
    minSalary: "Minimum Salary (₹) *",
    minSalaryPlaceholder: "e.g. 8000",
    maxSalary: "Maximum Salary (₹) *",
    maxSalaryPlaceholder: "e.g. 12000",
    expRequired: "Experience Required (Years)",
    expRequiredPlaceholder: "0 for freshers",
    expRequiredHint: "Enter 0 to welcome freshers",
    jobDescLabel: "Job Description *",
    jobDescPlaceholder: "Describe the work, timings, responsibilities...",
    locationNote: "📍 Location and shop details will be taken from your shop profile:",
    postJobBtn: "Post Job →",
    jobPostedTitle: "Job Posted!",
    jobPostedDesc: "Workers in your area can now see and apply for this job.",
    goToDashboard: "Go to Dashboard",
    salaryError: "Minimum salary must be less than or equal to maximum salary.",
    // Applicants
    applicantsTitle: "Applicants",
    noApplicantsYet: "No one has applied yet. Share the job with people you know!",
    callBtn: "📞 Call",
    shortlist: "✅ Shortlist",
    reject: "✕ Reject",
    // Worker Profile
    workerProfile: "Worker Profile",
    backBtn: "← Back",
    contactWorker: "Contact This Worker",
    contactWorkerDesc: "You can contact {name} directly via phone, or let HireKart connect you.",
    callWorker: "📞 Call",
    hirekartConnect: "📩 Request HireKart to Connect",
    // Admin
    adminTitle: "⚙️ Admin Panel",
    adminSub: "HireKart Platform Management",
    workersTab: "Workers",
    ownersTab: "Owners",
    appsTab: "Applications",
    jobsTab: "Job Listings",
    allWorkers: "All Workers",
    allOwners: "All Shop Owners",
    allApplications: "All Applications",
    allJobs: "All Job Listings",
    noAppsYet: "No applications yet.",
    connectBtn: "Connect",
    deleteJob: "Delete Job",
    confirmDelete: "Are you sure you want to delete this job listing?",
    jobDeleted: "Job deleted successfully.",
    // Misc
    selectPlaceholder: "-- Select --",
    phoneError: "Please enter a valid 10-digit mobile number.",
    fillRequired: "Please fill all required fields.",
    fresher: "Fresher",
    yearsExp: "yr exp",
    expects: "Expects",
    salaryRange: "₹{min} – ₹{max} per month",
    perMonthSuffix: "/month",
    shrExp: "yr",
  },
  od: {
    // Nav
    navLogo: "ହାୟରକାର୍ଟ",
    navJobs: "ଚାକିରି",
    navLogin: "ଲଗଇନ",
    navSignup: "ସାଇନ ଅପ",
    navDashboard: "ଡ୍ୟାଶବୋର୍ଡ",
    navLogout: "ଲଗଆଉଟ",
    navHi: "ନମସ୍କାର",
    // Home
    heroBadge: "🇮🇳 ଓଡ଼ିଶାର ସ୍ଥାନୀୟ ଚାକିରି ମଞ୍ଚ",
    heroTitle1: "ଆପଣ ଆପଣଙ୍କ",
    heroTitle2: "ପାଖ ଦୋକାନରେ",
    heroTitle3: "ଚାକିରି ପ୍ରାପ୍ତ କରନ୍ତୁ",
    heroSubtitle: "ହାୟରକାର୍ଟ ଅଙ୍ଗୁଲ, ତଳଚର, ଢ଼େଙ୍କାନାଳ, ଆଠମଳ୍ଲିକ ଇତ୍ୟାଦି ସ୍ଥାନରେ ଶ୍ରମିକ ଓ ଦୋକାନ ମାଲିକଙ୍କୁ ଯୋଡ଼େ।",
    heroWorkerBtn: "🙋 ମୁଁ ଚାକିରି ଖୋଜୁଛି",
    heroOwnerBtn: "🏪 ମୋର ଦୋକାନ ଅଛି",
    statActiveJobs: "ଖୋଲା ଚାକିରି",
    statWorkers: "ଶ୍ରମିକ",
    statCities: "ସହର",
    statFree: "ମାଗଣା",
    howTitle: "ହାୟରକାର୍ଟ କିଭଳି କାମ କରେ",
    howSub: "ଚାକିରି ପ୍ରାପ୍ତ କରିବା ବା ଦେବার ସଂକ୍ଷିପ୍ତ ପଦ୍ଧତି",
    how1Title: "୧. ପ୍ରୋଫାଇଲ ତିଆରି",
    how1Desc: "ଶ୍ରମିକ ଭାବରେ ସାଇନ ଅପ କରନ୍ତୁ। ଆପଣଙ୍କ କୌଶଳ ଓ ଅଭିଜ୍ଞତା ଯୋଡ଼ନ୍ତୁ।",
    how2Title: "୨. ଚାକିରି ଦେଖନ୍ତୁ",
    how2Desc: "ଆପଣଙ୍କ ସହରରେ ଦୋକାନ ଚାକିରି ଦେଖନ୍ତୁ।",
    how3Title: "୩. ସହଜରେ ଆବେଦନ",
    how3Desc: "ଏକ କ୍ଲିକ୍‌ରେ ଆବେଦନ। CV ଦରକାର ନାହିଁ।",
    how4Title: "୪. ଯୋଗାଯୋଗ",
    how4Desc: "ଦୋକାନ ମାଲିକ ସିଧା ଯୋଗାଯୋଗ କରିବେ।",
    recentJobs: "ସ୍ୱଳ୍ପ ସମୟ ପୂର୍ବରୁ ଖୋଲା ଚାକିରି",
    recentJobsSub: "ଆପଣଙ୍କ ଅଞ୍ଚଳରେ ସୁଯୋଗ",
    viewAllJobs: "ସବୁ ଚାକିରି ଦେଖନ୍ତୁ →",
    ownerCta: "ଆପଣ ଦୋକାନ ମାଲିକ?",
    ownerCtaDesc: "ମାଗଣାରେ ଚାକିରି ପ୍ରକାଶ କରନ୍ତୁ।",
    ownerCtaBtn: "ମାଗଣାରେ ଚାକିରି ପ୍ରକାଶ →",
    // Login
    welcomeBack: "ସ୍ୱାଗତ",
    loginSub: "ଆପଣଙ୍କ ଅ୍ୟାକାଉଣ୍ଟରେ ଲଗଇନ କରନ୍ତୁ",
    loginEmail: "ଇମେଲ / ଫୋନ",
    loginPassword: "ପାସୱାର୍ଡ",
    loginBtn: "ଲଗଇନ →",
    loginNewHere: "ନୂଆ ସଦସ୍ୟ?",
    signupAsWorker: "ଶ୍ରମିକ ଭାବେ ସାଇନ ଅପ",
    or: "ବା",
    signupAsOwner: "ଦୋକାନ ମାଲିକ",
    // Worker Signup
    workerSignupTitle: "👷 ଶ୍ରମିକ ସାଇନ ଅପ",
    workerSignupSub: "ଆପଣଙ୍କ ମାଗଣା ପ୍ରୋଫାଇଲ ତିଆରି କରି ଚାକିରି ଖୋଜନ୍ତୁ",
    personalDetails: "ବ୍ୟକ୍ତିଗତ ବିବରଣ",
    fullName: "ପୂର୍ଣ ନାମ *",
    fullNamePlaceholder: "ଉଦାହରଣ: ରାଜୁ ପ୍ରଧାନ",
    phone: "ଫୋନ ନଂ *",
    phonePlaceholder: "୧୦ ଅଙ୍କ ବିଶିଷ୍ଟ ନଂ",
    yourLocation: "ଆପଣଙ୍କ ସ୍ଥାନ *",
    email: "ଇମେଲ",
    emailPlaceholder: "your@email.com",
    emailOptional: "ଇମେଲ (ଐଚ୍ଛିକ)",
    password: "ପାସୱାର୍ଡ *",
    passwordPlaceholder: "ସର୍ବନିମ୍ନ ୬ ଅକ୍ଷର",
    workDetails: "କାର୍ଯ୍ୟ ବିବରଣ",
    yourSkills: "ଆପଣଙ୍କ କୌଶଳ (ସବୁ ଚୟନ କରନ୍ତୁ)",
    otherSkillLabel: "ଆପଣଙ୍କ କୌଶଳ ଲିଖନ୍ତୁ",
    otherSkillPlaceholder: "ଉଦାହରଣ: ଡ୍ରାଇଭିଂ, ଫଟୋଗ୍ରାଫି...",
    experience: "ଅଭିଜ୍ଞତା (ବର୍ଷ)",
    experiencePlaceholder: "ନୂଆ ହଲେ ୦",
    experienceHint: "ଅଭିଜ୍ଞତା ନ ଥଲେ ୦ ଦିଅନ୍ତୁ",
    expectedSalary: "ଆଶାନୁରୂପ ଦରମା (₹/ମାସ)",
    expectedSalaryPlaceholder: "ଉଦାହରଣ: ୮୦୦୦",
    willingToRelocate: "ଅନ୍ୟ ସ୍ଥାନକୁ ଯିବାକୁ ଇଚ୍ଛୁକ?",
    yes: "ହଁ",
    no: "ନା",
    aboutYourself: "ଆପଣଙ୍କ ବିଷୟରେ",
    aboutPlaceholder: "ଆପଣଙ୍କ ବିଷୟରେ ଟିକ ଲିଖନ୍ତୁ...",
    createProfile: "ଆମ ପ୍ରୋଫାଇଲ ତିଆରି →",
    alreadyHaveAccount: "ଆଗରୁ ଅ୍ୟାକାଉଣ୍ଟ ଅଛି?",
    loginHere: "ଏଠି ଲଗଇନ",
    // Owner Signup
    ownerSignupTitle: "🏪 ଦୋକାନ ମାଲିକ ସାଇନ ଅପ",
    ownerSignupSub: "ଚାକିରି ଦିଅନ୍ତୁ ଓ ଶ୍ରମିକ ଖୋଜନ୍ତୁ",
    ownerDetails: "ମାଲିକ ବିବରଣ",
    yourName: "ଆପଣଙ୍କ ନାମ *",
    yourNamePlaceholder: "ଉଦାହରଣ: ରମେଶ ନାୟକ",
    emailRequired: "ଇମେଲ *",
    shopDetails: "ଦୋକାନ ବିବରଣ",
    shopName: "ଦୋକାନ ନାମ *",
    shopNamePlaceholder: "ଉଦାହରଣ: ନାୟକ ଇଲେକ୍ଟ୍ରୋନିକ୍ସ",
    shopType: "ଦୋକାନ ପ୍ରକାର *",
    city: "ସହର *",
    shopContact: "ଦୋକାନ ଯୋଗାଯୋଗ ନଂ",
    shopContactPlaceholder: "ଶ୍ରମିକଙ୍କୁ ଦେଖାଯିବ",
    shopContactHint: "ଖାଲି ଛାଡ଼ିଲେ ଆପଣଙ୍କ ଫୋନ ବ୍ୟବହାର ହବ",
    aboutShop: "ଦୋକାନ ବିଷୟରେ",
    aboutShopPlaceholder: "ଆପଣ କ'ଣ ବିକ୍ରୀ କରନ୍ତି, କେତେ ବର୍ଷ ଧରି ଅଛି...",
    registerShop: "ଦୋକାନ ପଞ୍ଜୀକୃତ କରନ୍ତୁ →",
    alreadyRegistered: "ଆଗରୁ ପଞ୍ଜୀକୃତ?",
    // Jobs
    browseJobs: "🔍 ଚାକିରି ଦେଖନ୍ତୁ",
    jobsAvailable: "ଟି ଚାକିରି ଉପଲବ୍ଧ",
    searchPlaceholder: "ଚାକିରି, ଦୋକାନ ଖୋଜନ୍ତୁ...",
    clearFilters: "✕ ଫିଲ୍ଟର ସଫ",
    signupToApply: "🙋 ଆବେଦନ କରିବେ?",
    signupToApplyLink: "ଶ୍ରମିକ ଭାବେ ସାଇନ ଅପ",
    signupToApplyText: " ଚାକିରି ପାଇଁ ଆବେଦନ କରନ୍ତୁ।",
    freshersOk: "ନୂଆ ଚଲବ",
    yrExp: "ବର୍ଷ ଅଭିଜ୍ଞ",
    perMonth: "/ମାସ",
    // Job Detail
    backToJobs: "← ଚାକିରି ସୂଚୀ",
    jobDescription: "ଚାକିରି ବିବରଣ",
    postedOn: "ପ୍ରକାଶ ତାରିଖ:",
    aboutShopSection: "ଦୋକାନ ବିଷୟରେ",
    applicantsSection: "ଆବେଦନକାରୀ",
    noApplicants: "ଏ ପର୍ଯ୍ୟନ୍ତ କେହି ଆବେଦନ କରି ନାହାଁନ୍ତି।",
    applyNow: "ଆବେଦନ କରନ୍ତୁ →",
    alreadyApplied: "✅ ଆବେଦନ ହୋଇ ଗଲା",
    signupToApplyBtn: "ସାଇନ ଅପ ଓ ଆବେଦନ →",
    applySuccess: "✅ ଆବେଦନ ସଫଳ! ଦୋକାନ ମାଲିକ ଯୋଗାଯୋଗ କରିବେ।",
    alreadyAppliedMsg: "ଆପଣ ଆଗରୁ ଆବେଦନ କରି ସାରିଛନ୍ତି।",
    onlyWorkers: "କେବଳ ଶ୍ରମିକ ଆବେଦନ କରି ପାରିବେ।",
    // Worker Dashboard
    myDashboard: "👷 ମୋ ଡ୍ୟାଶବୋର୍ଡ",
    welcomeBack2: "ସ୍ୱାଗତ",
    jobsApplied: "ଆବେଦିତ ଚାକିରି",
    openJobs: "ଖୋଲା ଚାକିରି",
    browseJobsTab: "ଚାକିରି ଦେଖନ୍ତୁ",
    myApplications: "ଆମ ଆବେଦନ",
    myProfile: "ଆମ ପ୍ରୋଫାଇଲ",
    tipBrowse: "💡 ଯେ କୌଣସି ଚାକିରିରେ କ୍ଲିକ୍ କରି ବିସ୍ତାର ଦେଖନ୍ତୁ!",
    noJobsYet: "ଏ ବେଳ ଚାକିରି ନାହିଁ। ପରେ ଆସନ୍ତୁ!",
    noApplications: "ଆପଣ ଏ ପର୍ଯ୍ୟନ୍ତ ଆବେଦନ କରି ନାହାଁନ୍ତି।",
    applied: "ଆବେଦନ:",
    // Owner Dashboard
    ownerDashboard: "🏪 ଦୋକାନ ଡ୍ୟାଶବୋର୍ଡ",
    postNewJob: "+ ନୂଆ ଚାକିରି ଦିଅନ୍ତୁ",
    myJobs: "ଆମ ଚାକିରି",
    browseWorkers: "ଶ୍ରମିକ ଦେଖନ୍ତୁ",
    noJobsPosted: "ଏ ପର୍ଯ୍ୟନ୍ତ ଚାକିରି ଦିଅ ହୋଇ ନାହିଁ।",
    viewApplicants: "ଆବେଦନକାରୀ ଦେଖନ୍ତୁ",
    viewJob: "ଚାକିରି ଦେଖନ୍ତୁ",
    tipWorkers: "💡 ଶ୍ରମିକ ଦେଖନ୍ତୁ ଓ ସିଧା ଯୋଗାଯୋଗ କରନ୍ତୁ।",
    // Post Job
    postJobTitle: "📝 ଚାକିରି ଦିଅନ୍ତୁ",
    postJobSub: "ଉପଯୁକ୍ତ ଶ୍ରମିକ ପ୍ରାପ୍ତ ପାଇଁ ବିବରଣ ଦିଅନ୍ତୁ",
    jobDetailsSection: "ଚାକିରି ବିବରଣ",
    jobTitle: "ଚାକିରି ଶୀର୍ଷକ *",
    jobTitlePlaceholder: "ଉଦା: ସେଲ୍ସ ଏକ୍ଜିକ୍ୟୁଟିଭ, ଦୋକାନ ସହାୟକ",
    minSalary: "ସର୍ବନିମ୍ନ ଦରମା (₹) *",
    minSalaryPlaceholder: "ଉଦା: ୮୦୦୦",
    maxSalary: "ସର୍ବାଧିକ ଦରମା (₹) *",
    maxSalaryPlaceholder: "ଉଦା: ୧୨୦୦୦",
    expRequired: "ଆବଶ୍ୟକ ଅଭିଜ୍ଞତା (ବର୍ଷ)",
    expRequiredPlaceholder: "ନୂଆ ହଲେ ୦",
    expRequiredHint: "ନୂଆ ଗ୍ରହଣ ଯୋଗ୍ୟ ହଲେ ୦ ଦିଅନ୍ତୁ",
    jobDescLabel: "ଚାକିରି ବିବରଣ *",
    jobDescPlaceholder: "କାର୍ଯ୍ୟ, ସମୟ, ଦାୟିତ୍ୱ ବର୍ଣ୍ଣନା...",
    locationNote: "📍 ଆପଣଙ୍କ ଦୋକାନ ଓ ସ୍ଥାନ ବ୍ୟବହୃତ ହବ:",
    postJobBtn: "ଚାକିରି ଦିଅନ୍ତୁ →",
    jobPostedTitle: "ଚାକିରି ଦିଅ ହୋଇ ଗଲା!",
    jobPostedDesc: "ଆପଣଙ୍କ ଅଞ୍ଚଳର ଶ୍ରମିକ ଏ ଚାକିରି ଦେଖି ଆବେଦନ କରି ପାରିବେ।",
    goToDashboard: "ଡ୍ୟାଶବୋର୍ଡ",
    salaryError: "ସର୍ବନିମ୍ନ ଦରମା, ସର୍ବାଧିକ ଦରମାଠୁ ଅଧିକ ହୋଇ ପାରିବ ନାହିଁ।",
    // Applicants
    applicantsTitle: "ଆବେଦନକାରୀ",
    noApplicantsYet: "ଏ ପର୍ଯ୍ୟନ୍ତ କେହି ଆବେଦନ କରି ନାହାଁନ୍ତି।",
    callBtn: "📞 ଫୋନ",
    shortlist: "✅ ବାଛ",
    reject: "✕ ବାତିଲ",
    // Worker Profile
    workerProfile: "ଶ୍ରମିକ ପ୍ରୋଫାଇଲ",
    backBtn: "← ପଛକୁ",
    contactWorker: "ଏହି ଶ୍ରମିକଙ୍କ ସହ ଯୋଗାଯୋଗ",
    contactWorkerDesc: "ଆପଣ ସିଧା ଫୋନ କରି ପାରନ୍ତି।",
    callWorker: "📞 ଫୋନ",
    hirekartConnect: "📩 ହାୟରକାର୍ଟ ମାଧ୍ୟମରେ ଯୋଗାଯୋଗ",
    // Admin
    adminTitle: "⚙️ ଆଡ୍ମିନ ପ୍ୟାନେଲ",
    adminSub: "ହାୟରକାର୍ଟ ପ୍ଲାଟଫର୍ମ ପ୍ରବନ୍ଧ",
    workersTab: "ଶ୍ରମିକ",
    ownersTab: "ମାଲିକ",
    appsTab: "ଆବେଦନ",
    jobsTab: "ଚାକିରି",
    allWorkers: "ସବୁ ଶ୍ରମିକ",
    allOwners: "ସବୁ ଦୋକାନ ମାଲିକ",
    allApplications: "ସବୁ ଆବେଦନ",
    allJobs: "ସବୁ ଚାକିରି",
    noAppsYet: "ଏ ପର୍ଯ୍ୟନ୍ତ ଆବେଦନ ନାହିଁ।",
    connectBtn: "ଯୋଡ଼ନ୍ତୁ",
    deleteJob: "ଚାକିରି ଡିଲିଟ",
    confirmDelete: "ଆପଣ ଏ ଚାକିରି ଡିଲିଟ କରିବାକୁ ନିଶ୍ଚିତ?",
    jobDeleted: "ଚାକିରି ସଫଳଭାବେ ଡିଲିଟ ହୋଇ ଗଲା।",
    // Misc
    selectPlaceholder: "-- ଚୟନ କରନ୍ତୁ --",
    phoneError: "ଦୟାକରି ୧୦ ଅଙ୍କ ବିଶିଷ୍ଟ ଭ୍ରାମ୍ୟ ଫୋନ ନଂ ଦିଅନ୍ତୁ।",
    fillRequired: "ଦୟାକରି ସମସ୍ତ ଆବଶ୍ୟକ ଘର ପୂରଣ କରନ୍ତୁ।",
    fresher: "ନୂଆ",
    yearsExp: "ବ. ଅଭି.",
    expects: "ଆଶା",
    salaryRange: "₹{min} – ₹{max} ପ୍ରତି ମାସ",
    perMonthSuffix: "/ମାସ",
    shrExp: "ବ.",
  }
};

const LangContext = createContext({ lang: "en", t: (k) => k });

function useLang() { return useContext(LangContext); }

function LangProvider({ children }) {
  const [lang, setLang] = useState("en");
  const t = useCallback((key, vars = {}) => {
    let str = TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS["en"]?.[key] ?? key;
    Object.entries(vars).forEach(([k, v]) => { str = str.replace(`{${k}}`, v); });
    return str;
  }, [lang]);
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

// ─── Phone validation ─────────────────────────────────────────────────────────
function validatePhone(phone) {
  return /^\d{10}$/.test(phone);
}

// ─── Seed data ────────────────────────────────────────────────────────────────
const SEED = {
  users: [
    { id: "u1", role: "worker", name: "Raju Pradhan", phone: "9861234567", email: "raju@example.com", password: "pass", location: "Angul", skills: ["Sales", "Cashier"], experience: 2, expectedSalary: 8000, willingToRelocate: true, about: "Hardworking and honest" },
    { id: "u2", role: "owner", name: "Priya Sahoo", phone: "9437654321", email: "priya@example.com", password: "pass", shopName: "Sahoo Electronics", shopType: "Electronics", location: "Talcher", contact: "9437654321", about: "Quality electronics since 2010" },
    { id: "admin", role: "admin", name: "Admin", email: "admin@hirekart.in", password: "admin123" },
  ],
  jobs: [
    { id: "j1", ownerId: "u2", title: "Sales Executive", shopName: "Sahoo Electronics", shopType: "Electronics", location: "Talcher", minSalary: 8000, maxSalary: 12000, experience: 1, description: "Handle customer walk-ins, demonstrate products, manage billing. Must be fluent in Odia.", posted_date: "2026-03-01", active: true },
    { id: "j2", ownerId: "u2", title: "Shop Helper", shopName: "Sahoo Electronics", shopType: "Electronics", location: "Talcher", minSalary: 6000, maxSalary: 8000, experience: 0, description: "Assist in stock management, cleaning, delivery within city.", posted_date: "2026-03-05", active: true },
  ],
  applications: [
    { id: "a1", jobId: "j1", workerId: "u1", status: "pending", appliedDate: "2026-03-06" },
  ],
};

function useStore() {
  const [data, setData] = useState({
    users: [],
    jobs: [],
    applications: []
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState("home");
  const [pageParams, setPageParams] = useState({});

  const navigate = useCallback((p, params = {}) => {
    setPage(p);
    setPageParams(params);
    window.scrollTo(0, 0);
  }, []);

  // ─────────────────────────────
  // Fetch Data
  // ─────────────────────────────

const fetchData = async () => {

  const [usersRes, jobsRes, appsRes] = await Promise.all([
    supabase.from("users").select("*"),
    supabase.from("jobs").select("*").order("posted_date", { ascending: false }),
    supabase.from("applications").select("*")
  ]);

  if (usersRes.error || jobsRes.error || appsRes.error) {
    console.error("Supabase Error:", usersRes.error || jobsRes.error || appsRes.error);
    return;
  }

  const jobs = (jobsRes.data || []).map(j => ({
    ...j,
    ownerId: j.owner_id,
    shopName: j.shop_name,
    shopType: j.shop_type,
    minSalary: j.min_salary,
    maxSalary: j.max_salary
  }));

  setData({
    users: usersRes.data || [],
    jobs: jobs,
    applications: appsRes.data || []
  });
};

  // ─────────────────────────────
  // Auth
  // ─────────────────────────────

  const login = (email, password) => {
    const u = data.users.find(u => u.email === email && u.password === password);
    if (u) {
      setCurrentUser(u);
      return u;
    }
    return null;
  };

  const logout = () => {
    setCurrentUser(null);
    navigate("home");
  };

  // ─────────────────────────────
  // Register Worker
  // ─────────────────────────────

  const registerWorker = async (form) => {
    const { data: newUser, error } = await supabase
      .from("users")
      .insert([{ role: "worker", ...form }])
      .select()
      .single();

    if (error) {
      console.error(error);
      return null;
    }

    await fetchData();
    setCurrentUser(newUser);

    return newUser;
  };

  // ─────────────────────────────
  // Register Owner
  // ─────────────────────────────

  const registerOwner = async (form) => {
    const { data: newUser, error } = await supabase
      .from("users")
      .insert([{ role: "owner", ...form }])
      .select()
      .single();

    if (error) {
      console.error(error);
      return null;
    }

    await fetchData();
    setCurrentUser(newUser);

    return newUser;
  };

  // ─────────────────────────────
  // Post Job
  // ─────────────────────────────

  const postJob = async (form) => {
    const job = {
      owner_id: currentUser.id,
      title: form.title,
      shop_name: currentUser.shopName,
      shop_type: currentUser.shopType,
      location: currentUser.location,
      posted_date: new Date().toISOString().slice(0,10),
      min_salary: form.minSalary,
      max_salary: form.maxSalary,
      experience: form.experience,
      description: form.description,
      active: true
    };

  const { data, error } = await supabase
      .from("jobs")
      .insert([job])
      .select();

    if (error) {
      console.error(error);
      return;
    }

    await fetchData();
  };

  // ─────────────────────────────
  // Delete Job
  // ─────────────────────────────

  const deleteJob = async (jobId) => {
    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", jobId);

    if (error) {
      console.error(error);
      return;
    }

    await fetchData();
  };

  // ─────────────────────────────
  // Apply Job
  // ─────────────────────────────

  const applyJob = async (jobId) => {

  if (!currentUser) return false;

    if (data.applications.find(a => a.jobId === jobId && a.workerId === currentUser.id))
      return false;

    const application = {
      jobId,
      workerId: currentUser.id,
      status: "pending",
      appliedDate: new Date().toISOString().slice(0, 10)
    };

    const { error } = await supabase
      .from("applications")
      .insert([application]);

    if (error) {
      console.error(error);
      return false;
    }

    await fetchData();

    return true;
  };

  // ─────────────────────────────
  // Update Application Status
  // ─────────────────────────────

  const updateAppStatus = async (appId, status) => {

    const { error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", appId);

    if (error) {
      console.error(error);
      return;
    }

    await fetchData();
  };

  // ─────────────────────────────
  // Helpers
  // ─────────────────────────────

  const getJobsForOwner = () =>
    data.jobs.filter(j => j.ownerId === currentUser?.id);

  const getApplicantsForJob = (jobId) =>
    data.applications
      .filter(a => a.jobId === jobId)
      .map(a => ({
        ...a,
        worker: data.users.find(u => u.id === a.workerId)
      }));

  const getAppliedJobs = () =>
    data.applications
      .filter(a => a.workerId === currentUser?.id)
      .map(a => ({
        ...a,
        job: data.jobs.find(j => j.id === a.jobId)
      }));

  return {
    data,
    currentUser,
    page,
    pageParams,
    navigate,
    login,
    logout,
    registerWorker,
    registerOwner,
    postJob,
    deleteJob,
    applyJob,
    updateAppStatus,
    getJobsForOwner,
    getApplicantsForJob,
    getAppliedJobs
  };
}

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700;800&family=Noto+Sans:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --saffron: #FF6B00; --saffron-light: #FF8C3A; --saffron-pale: #FFF3E8;
    --green: #1B8A4E; --green-light: #22A860; --green-pale: #E8F7EE;
    --navy: #0F2044; --navy-mid: #1A3260;
    --sky: #3B82F6; --sky-pale: #EFF6FF;
    --red: #DC2626;
    --gray-50: #F9FAFB; --gray-100: #F3F4F6; --gray-200: #E5E7EB;
    --gray-400: #9CA3AF; --gray-500: #6B7280; --gray-700: #374151; --gray-900: #111827;
    --white: #FFFFFF; --radius: 14px; --radius-sm: 8px;
    --shadow: 0 2px 12px rgba(15,32,68,0.10); --shadow-lg: 0 6px 30px rgba(15,32,68,0.14);
  }
  body { font-family: 'Noto Sans', sans-serif; background: var(--gray-50); color: var(--gray-900); min-height: 100vh; }
  h1,h2,h3,h4,h5 { font-family: 'Baloo 2', cursive; }
  .app { display: flex; flex-direction: column; min-height: 100vh; }

  /* NAV */
  .nav { background: var(--navy); padding: 0 1rem; display: flex; align-items: center; justify-content: space-between; height: 58px; position: sticky; top: 0; z-index: 100; box-shadow: 0 2px 10px rgba(0,0,0,0.25); gap: 0.5rem; }
  .nav-logo { font-family: 'Baloo 2', cursive; font-size: 1.4rem; font-weight: 800; color: var(--white); cursor: pointer; white-space: nowrap; }
  .nav-logo span { color: var(--saffron); }
  .nav-center { display: flex; align-items: center; gap: 0.4rem; }
  .nav-actions { display: flex; gap: 0.4rem; align-items: center; flex-wrap: nowrap; }
  .nav-btn { padding: 0.38rem 0.75rem; border-radius: 20px; font-size: 0.78rem; font-weight: 600; cursor: pointer; border: none; transition: all 0.18s; font-family: 'Noto Sans', sans-serif; white-space: nowrap; }
  .nav-btn-outline { background: transparent; color: var(--white); border: 1.5px solid rgba(255,255,255,0.4); }
  .nav-btn-outline:hover { background: rgba(255,255,255,0.1); }
  .nav-btn-primary { background: var(--saffron); color: var(--white); }
  .nav-btn-primary:hover { background: var(--saffron-light); }
  .nav-user { font-size: 0.75rem; color: var(--gray-400); white-space: nowrap; }
  .nav-user strong { color: var(--white); }

  /* LANG TOGGLE */
  .lang-toggle { display: flex; align-items: center; background: rgba(255,255,255,0.08); border-radius: 20px; padding: 2px; border: 1px solid rgba(255,255,255,0.2); flex-shrink: 0; }
  .lang-btn { padding: 0.25rem 0.6rem; border-radius: 18px; font-size: 0.72rem; font-weight: 700; cursor: pointer; border: none; background: transparent; color: rgba(255,255,255,0.55); transition: all 0.18s; font-family: 'Noto Sans', sans-serif; }
  .lang-btn.active { background: var(--saffron); color: white; }

  /* HERO */
  .hero { background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 60%, #0D3B5E 100%); padding: 3rem 1.2rem 2.5rem; text-align: center; }
  .hero-badge { display: inline-block; background: var(--saffron); color: white; font-size: 0.72rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 20px; margin-bottom: 1rem; letter-spacing: 0.06em; text-transform: uppercase; }
  .hero h1 { font-size: clamp(1.7rem, 5vw, 2.8rem); color: var(--white); font-weight: 800; line-height: 1.2; margin-bottom: 0.75rem; }
  .hero h1 span { color: var(--saffron); }
  .hero p { color: #B8C8E0; font-size: 0.93rem; max-width: 480px; margin: 0 auto 1.8rem; line-height: 1.6; }
  .hero-btns { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }

  /* BUTTONS */
  .btn { padding: 0.72rem 1.4rem; border-radius: 30px; font-size: 0.9rem; font-weight: 700; cursor: pointer; border: none; transition: all 0.2s; font-family: 'Noto Sans', sans-serif; display: inline-flex; align-items: center; gap: 0.4rem; }
  .btn-saffron { background: var(--saffron); color: white; box-shadow: 0 4px 14px rgba(255,107,0,0.35); }
  .btn-saffron:hover { background: var(--saffron-light); transform: translateY(-1px); }
  .btn-green { background: var(--green); color: white; box-shadow: 0 4px 14px rgba(27,138,78,0.35); }
  .btn-green:hover { background: var(--green-light); transform: translateY(-1px); }
  .btn-outline-white { background: transparent; color: white; border: 2px solid rgba(255,255,255,0.5); }
  .btn-sm { padding: 0.45rem 0.9rem; font-size: 0.8rem; }
  .btn-full { width: 100%; justify-content: center; }
  .btn-outline-saffron { background: transparent; color: var(--saffron); border: 2px solid var(--saffron); }
  .btn-outline-saffron:hover { background: var(--saffron-pale); }
  .btn-red { background: var(--red); color: white; }
  .btn-red:hover { opacity: 0.88; }
  .btn-sky { background: var(--sky); color: white; }
  .btn-sky:hover { opacity: 0.88; }
  .btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none !important; }

  /* STATS */
  .stats-bar { background: var(--white); border-bottom: 1px solid var(--gray-200); padding: 0.9rem 1.2rem; display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; }
  .stat-item { text-align: center; }
  .stat-num { font-family: 'Baloo 2', cursive; font-size: 1.3rem; font-weight: 800; color: var(--saffron); }
  .stat-label { font-size: 0.72rem; color: var(--gray-500); }

  /* SECTION */
  .section { padding: 2rem 1.2rem; max-width: 700px; margin: 0 auto; }
  .section-title { font-size: 1.3rem; font-weight: 800; color: var(--navy); margin-bottom: 0.25rem; }
  .section-sub { font-size: 0.85rem; color: var(--gray-500); margin-bottom: 1.2rem; }

  /* HOW IT WORKS */
  .how-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .how-card { background: var(--white); border-radius: var(--radius); padding: 1.2rem; box-shadow: var(--shadow); border-top: 3px solid var(--saffron); }
  .how-card.green { border-top-color: var(--green); }
  .how-icon { font-size: 1.8rem; margin-bottom: 0.5rem; }
  .how-card h4 { font-size: 0.9rem; font-weight: 700; color: var(--navy); margin-bottom: 0.3rem; }
  .how-card p { font-size: 0.78rem; color: var(--gray-500); line-height: 1.5; }

  /* JOB CARD */
  .job-card { background: var(--white); border-radius: var(--radius); padding: 1.1rem; box-shadow: var(--shadow); margin-bottom: 0.85rem; border-left: 4px solid var(--saffron); transition: box-shadow 0.2s; cursor: pointer; }
  .job-card:hover { box-shadow: var(--shadow-lg); }
  .job-card-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; }
  .job-title { font-family: 'Baloo 2', cursive; font-size: 1.05rem; font-weight: 700; color: var(--navy); }
  .job-shop { font-size: 0.8rem; color: var(--gray-500); margin-top: 0.1rem; }
  .salary-range { font-family: 'Baloo 2', cursive; font-size: 0.95rem; font-weight: 800; color: var(--saffron); white-space: nowrap; }

  /* BADGE */
  .badge { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.72rem; font-weight: 600; }
  .badge-saffron { background: var(--saffron-pale); color: var(--saffron); }
  .badge-green { background: var(--green-pale); color: var(--green); }
  .badge-sky { background: var(--sky-pale); color: var(--sky); }
  .badge-gray { background: var(--gray-100); color: var(--gray-500); }
  .badge-red { background: #FEE2E2; color: var(--red); }
  .job-meta { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.6rem; }
  .job-desc { font-size: 0.82rem; color: var(--gray-500); margin-top: 0.5rem; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

  /* CARD */
  .card { background: var(--white); border-radius: var(--radius); padding: 1.2rem; box-shadow: var(--shadow); margin-bottom: 1rem; }
  .card-title { font-family: 'Baloo 2', cursive; font-size: 1.1rem; font-weight: 700; color: var(--navy); margin-bottom: 0.6rem; }

  /* FORM */
  .form-group { margin-bottom: 1rem; }
  .form-label { display: block; font-size: 0.82rem; font-weight: 600; color: var(--gray-700); margin-bottom: 0.35rem; }
  .form-input { width: 100%; padding: 0.65rem 0.9rem; border: 1.5px solid var(--gray-200); border-radius: var(--radius-sm); font-size: 0.9rem; font-family: 'Noto Sans', sans-serif; transition: border 0.18s; background: var(--white); color: var(--gray-900); }
  .form-input:focus { outline: none; border-color: var(--saffron); box-shadow: 0 0 0 3px rgba(255,107,0,0.12); }
  .form-input.error { border-color: var(--red); }
  .form-input::placeholder { color: var(--gray-400); }
  textarea.form-input { resize: vertical; min-height: 90px; }
  select.form-input { cursor: pointer; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
  .form-hint { font-size: 0.75rem; color: var(--gray-400); margin-top: 0.2rem; }
  .form-error { font-size: 0.78rem; color: var(--red); margin-top: 0.25rem; font-weight: 600; }

  /* PAGE HEADER */
  .page-header { background: linear-gradient(135deg, var(--navy), var(--navy-mid)); padding: 1.5rem 1.2rem 1.2rem; }
  .page-header h2 { font-size: 1.4rem; color: white; font-weight: 800; }
  .page-header p { font-size: 0.82rem; color: #B8C8E0; margin-top: 0.2rem; }
  .page-header-green { background: linear-gradient(135deg, var(--green), #145F38); }

  /* DASHBOARD */
  .dash-stat-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-bottom: 1.2rem; }
  .dash-stat { background: var(--white); border-radius: var(--radius); padding: 1rem; box-shadow: var(--shadow); text-align: center; }
  .dash-stat-num { font-family: 'Baloo 2', cursive; font-size: 2rem; font-weight: 800; color: var(--saffron); }
  .dash-stat-label { font-size: 0.78rem; color: var(--gray-500); margin-top: 0.1rem; }

  /* WORKER CARD */
  .worker-card { background: var(--white); border-radius: var(--radius); padding: 1.1rem; box-shadow: var(--shadow); margin-bottom: 0.85rem; border-left: 4px solid var(--green); }

  /* TABS */
  .tabs { display: flex; gap: 0.5rem; margin-bottom: 1.2rem; background: var(--gray-100); border-radius: 30px; padding: 0.25rem; }
  .tab { flex: 1; padding: 0.5rem; text-align: center; font-size: 0.8rem; font-weight: 600; border-radius: 25px; cursor: pointer; border: none; background: transparent; color: var(--gray-500); transition: all 0.18s; font-family: 'Noto Sans', sans-serif; }
  .tab.active { background: var(--white); color: var(--navy); box-shadow: 0 1px 6px rgba(0,0,0,0.1); }

  /* ALERT */
  .alert { padding: 0.75rem 1rem; border-radius: var(--radius-sm); font-size: 0.84rem; margin-bottom: 1rem; }
  .alert-success { background: var(--green-pale); color: var(--green); border-left: 3px solid var(--green); }
  .alert-error { background: #FEE2E2; color: var(--red); border-left: 3px solid var(--red); }
  .alert-info { background: var(--sky-pale); color: var(--sky); border-left: 3px solid var(--sky); }

  /* FOOTER */
  .footer { background: var(--navy); color: #8899BB; text-align: center; padding: 1.5rem 1rem; font-size: 0.78rem; margin-top: 2rem; }

  /* MISC */
  .divider { border: none; border-top: 1px solid var(--gray-200); margin: 1rem 0; }
  .empty { text-align: center; padding: 2.5rem 1rem; color: var(--gray-400); }
  .empty-icon { font-size: 2.5rem; margin-bottom: 0.5rem; }
  .empty p { font-size: 0.88rem; }
  .avatar { width: 48px; height: 48px; border-radius: 50%; background: var(--saffron); display: flex; align-items: center; justify-content: center; font-family: 'Baloo 2', cursive; font-size: 1.2rem; font-weight: 800; color: white; flex-shrink: 0; }
  .avatar-green { background: var(--green); }
  .avatar-lg { width: 64px; height: 64px; font-size: 1.6rem; }
  .row { display: flex; align-items: center; gap: 0.75rem; }
  .flex-1 { flex: 1; }
  .text-right { text-align: right; }
  .text-sm { font-size: 0.82rem; }
  .text-xs { font-size: 0.75rem; }
  .text-gray { color: var(--gray-500); }
  .text-green { color: var(--green); font-weight: 600; }
  .text-saffron { color: var(--saffron); font-weight: 600; }
  .text-navy { color: var(--navy); }
  .font-bold { font-weight: 700; }
  .mt-1 { margin-top: 0.5rem; } .mt-2 { margin-top: 1rem; }
  .mb-1 { margin-bottom: 0.5rem; } .mb-2 { margin-bottom: 1rem; }
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
  th { background: var(--gray-100); color: var(--gray-700); font-weight: 700; padding: 0.6rem 0.75rem; text-align: left; white-space: nowrap; }
  td { padding: 0.6rem 0.75rem; border-bottom: 1px solid var(--gray-100); vertical-align: middle; }
  tr:last-child td { border-bottom: none; }
  .chip-grid { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.4rem; }
  .chip { padding: 0.3rem 0.7rem; border-radius: 20px; font-size: 0.78rem; font-weight: 600; background: var(--gray-100); color: var(--gray-700); cursor: pointer; border: 1.5px solid transparent; transition: all 0.15s; }
  .chip.selected { background: var(--saffron-pale); color: var(--saffron); border-color: var(--saffron); }
  .confirm-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 1rem; }
  .confirm-box { background: white; border-radius: var(--radius); padding: 1.5rem; max-width: 360px; width: 100%; box-shadow: var(--shadow-lg); }
  .confirm-title { font-family: 'Baloo 2', cursive; font-size: 1.1rem; font-weight: 800; color: var(--navy); margin-bottom: 0.5rem; }
  .confirm-actions { display: flex; gap: 0.75rem; margin-top: 1.2rem; }

  @media (max-width: 480px) {
    .form-row { grid-template-columns: 1fr; }
    .how-grid { grid-template-columns: 1fr; }
    .hero h1 { font-size: 1.55rem; }
    .nav-user { display: none; }
  }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const Avatar = ({ name, green, lg }) => {
  const initials = name ? name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() : "?";
  return <div className={`avatar${green ? " avatar-green" : ""}${lg ? " avatar-lg" : ""}`}>{initials}</div>;
};
const Badge = ({ label, type = "gray" }) => <span className={`badge badge-${type}`}>{label}</span>;
const Empty = ({ icon, text }) => <div className="empty"><div className="empty-icon">{icon}</div><p>{text}</p></div>;

function SalaryDisplay({ minSalary, maxSalary, t }) {
  if (minSalary && maxSalary) return <span className="salary-range">₹{Number(minSalary).toLocaleString()} – ₹{Number(maxSalary).toLocaleString()}<span style={{ fontSize: "0.7rem", fontWeight: 400, color: "var(--gray-500)" }}>{t("perMonthSuffix")}</span></span>;
  if (minSalary) return <span className="salary-range">₹{Number(minSalary).toLocaleString()}{t("perMonthSuffix")}</span>;
  return null;
}

function PhoneInput({ label, value, onChange, error, t, ...props }) {
  const handleChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    onChange(val);
  };
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <input className={`form-input${error ? " error" : ""}`} type="tel" inputMode="numeric" maxLength={10} value={value} onChange={handleChange} {...props} />
      {error && <div className="form-error">{t("phoneError")}</div>}
    </div>
  );
}

function Input({ label, hint, error, as, ...props }) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      {as === "textarea" ? <textarea className={`form-input${error ? " error" : ""}`} {...props} /> : <input className={`form-input${error ? " error" : ""}`} {...props} />}
      {hint && <div className="form-hint">{hint}</div>}
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}

function Select({ label, options, placeholder, ...props }) {
  const { t } = useLang();
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <select className="form-input" {...props}>
        <option value="">{placeholder || t("selectPlaceholder")}</option>
        {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
      </select>
    </div>
  );
}

// Confirm Dialog
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <div className="confirm-title">⚠️ Confirm</div>
        <p style={{ fontSize: "0.88rem", color: "var(--gray-700)", lineHeight: 1.5 }}>{message}</p>
        <div className="confirm-actions">
          <button className="btn btn-red btn-sm" style={{ flex: 1, justifyContent: "center" }} onClick={onConfirm}>Delete</button>
          <button className="btn btn-sm" style={{ flex: 1, background: "var(--gray-100)", color: "var(--gray-700)", border: "none", borderRadius: "30px", justifyContent: "center", cursor: "pointer" }} onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function HomePage({ store }) {
  const { t } = useLang();
  const { navigate, data } = store;
  const activeJobs = data.jobs.filter(j => j.active);
  const workers = data.users.filter(u => u.role === "worker");

  return (
    <>
      <div className="hero">
        <div className="hero-badge">{t("heroBadge")}</div>
        <h1>{t("heroTitle1")}<br /><span>{t("heroTitle2")}</span><br />{t("heroTitle3")}</h1>
        <p>{t("heroSubtitle")}</p>
        <div className="hero-btns">
          <button className="btn btn-saffron" onClick={() => navigate("worker-signup")}>{t("heroWorkerBtn")}</button>
          <button className="btn btn-green" onClick={() => navigate("owner-signup")}>{t("heroOwnerBtn")}</button>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat-item"><div className="stat-num">{activeJobs.length}+</div><div className="stat-label">{t("statActiveJobs")}</div></div>
        <div className="stat-item"><div className="stat-num">{workers.length}+</div><div className="stat-label">{t("statWorkers")}</div></div>
        <div className="stat-item"><div className="stat-num">4</div><div className="stat-label">{t("statCities")}</div></div>
        <div className="stat-item"><div className="stat-num">{t("statFree")}</div><div className="stat-label">Always</div></div>
      </div>

      <div className="section">
        <div className="section-title">{t("howTitle")}</div>
        <div className="section-sub">{t("howSub")}</div>
        <div className="how-grid">
          <div className="how-card"><div className="how-icon">📝</div><h4>{t("how1Title")}</h4><p>{t("how1Desc")}</p></div>
          <div className="how-card"><div className="how-icon">🔍</div><h4>{t("how2Title")}</h4><p>{t("how2Desc")}</p></div>
          <div className="how-card green"><div className="how-icon">✅</div><h4>{t("how3Title")}</h4><p>{t("how3Desc")}</p></div>
          <div className="how-card green"><div className="how-icon">📞</div><h4>{t("how4Title")}</h4><p>{t("how4Desc")}</p></div>
        </div>

        <div className="section-title mt-2">{t("recentJobs")}</div>
        <div className="section-sub">{t("recentJobsSub")}</div>
        {activeJobs.slice(0, 3).map(job => (
          <div key={job.id} className="job-card" onClick={() => navigate("job-detail", { jobId: job.id })}>
            <div className="job-card-header">
              <div><div className="job-title">{job.title}</div><div className="job-shop">🏪 {job.shopName} · {job.shopType}</div></div>
              <SalaryDisplay minSalary={job.minSalary} maxSalary={job.maxSalary} t={t} />
            </div>
            <div className="job-meta">
              <Badge label={`📍 ${job.location}`} type="gray" />
              <Badge label={job.experience === 0 ? t("freshersOk") : `${job.experience}${t("yrExp")}`} type="green" />
            </div>
            <div className="job-desc">{job.description}</div>
          </div>
        ))}
        <button className="btn btn-outline-saffron btn-full" onClick={() => navigate("jobs")}>{t("viewAllJobs")}</button>

        <div className="card mt-2" style={{ background: "linear-gradient(135deg, var(--navy), var(--navy-mid))", color: "white" }}>
          <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.4rem" }}>{t("ownerCta")}</div>
          <p style={{ fontSize: "0.84rem", color: "#B8C8E0", marginBottom: "0.9rem" }}>{t("ownerCtaDesc")}</p>
          <button className="btn btn-saffron btn-sm" onClick={() => navigate("owner-signup")}>{t("ownerCtaBtn")}</button>
        </div>
      </div>
    </>
  );
}

function LoginPage({ store }) {
  const { t } = useLang();
  const { login, navigate } = store;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) { setError(t("fillRequired")); return; }
    const user = login(email, password);
    if (!user) { setError("Wrong email or password. Try again."); return; }
    if (user.role === "worker") navigate("worker-dashboard");
    else if (user.role === "owner") navigate("owner-dashboard");
    else navigate("admin");
  };

  return (
    <div className="section">
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.4rem" }}>🔐</div>
        <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: "1.5rem", color: "var(--navy)" }}>{t("welcomeBack")}</h2>
        <p style={{ color: "var(--gray-500)", fontSize: "0.85rem" }}>{t("loginSub")}</p>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="card">
        <Input label={t("loginEmail")} type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
        <Input label={t("loginPassword")} type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-saffron btn-full" onClick={handleLogin}>{t("loginBtn")}</button>
        <div className="alert alert-info mt-1" style={{ fontSize: "0.76rem" }}>
          Demo: <b>raju@example.com</b> / pass (Worker) | <b>priya@example.com</b> / pass (Owner) | <b>admin@hirekart.in</b> / admin123
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.84rem", color: "var(--gray-500)" }}>
        {t("loginNewHere")} <span style={{ color: "var(--saffron)", fontWeight: 700, cursor: "pointer" }} onClick={() => navigate("worker-signup")}>{t("signupAsWorker")}</span> {t("or")} <span style={{ color: "var(--green)", fontWeight: 700, cursor: "pointer" }} onClick={() => navigate("owner-signup")}>{t("signupAsOwner")}</span>
      </div>
    </div>
  );
}

function WorkerSignup({ store }) {
  const { t } = useLang();
  const { registerWorker, navigate } = store;
  const SKILL_OPTIONS = ["Sales", "Cashier", "Stock Management", "Customer Service", "Delivery", "Cleaning", "Computer / Billing", "Medical Knowledge", "Mobile Repair", "Tailoring", "Others"];
  const locations = ["Angul", "Talcher", "Dhenkanal", "Athmalik", "Other"];

  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "", location: "", skills: [], customSkill: "", experience: "", expectedSalary: "", willingToRelocate: false, about: "" });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleSkill = (s) => set("skills", form.skills.includes(s) ? form.skills.filter(x => x !== s) : [...form.skills, s]);

  const validate = () => {
    const e = {};
    if (!form.name) e.name = t("fillRequired");
    if (!validatePhone(form.phone)) e.phone = true;
    if (!form.password) e.password = t("fillRequired");
    if (!form.location) e.location = t("fillRequired");
    return e;
  };

  const handleSubmit = async () => {
  const e = validate();
  if (Object.keys(e).length > 0) { setErrors(e); return; }

  const skills = form.skills.includes("Others") && form.customSkill
    ? [...form.skills.filter(s => s !== "Others"), form.customSkill]
    : form.skills;

  await registerWorker({ ...form, skills });

  navigate("worker-dashboard");
};

  return (
    <>
      <div className="page-header">
        <h2>{t("workerSignupTitle")}</h2>
        <p>{t("workerSignupSub")}</p>
      </div>
      <div className="section">
        <div className="card">
          <div className="card-title">{t("personalDetails")}</div>
          <Input label={t("fullName")} placeholder={t("fullNamePlaceholder")} value={form.name} onChange={e => set("name", e.target.value)} error={errors.name} />
          <div className="form-row">
            <PhoneInput label={t("phone")} placeholder={t("phonePlaceholder")} value={form.phone} onChange={v => set("phone", v)} error={errors.phone} t={t} />
            <Select label={t("yourLocation")} options={locations} value={form.location} onChange={e => set("location", e.target.value)} />
          </div>
          <div className="form-row">
            <Input label={t("emailOptional")} type="email" placeholder={t("emailPlaceholder")} value={form.email} onChange={e => set("email", e.target.value)} />
            <Input label={t("password")} type="password" placeholder={t("passwordPlaceholder")} value={form.password} onChange={e => set("password", e.target.value)} error={errors.password} />
          </div>
          {errors.location && <div className="form-error">{t("fillRequired")}</div>}
        </div>

        <div className="card">
          <div className="card-title">{t("workDetails")}</div>
          <div className="form-group">
            <label className="form-label">{t("yourSkills")}</label>
            <div className="chip-grid">
              {SKILL_OPTIONS.map(s => <div key={s} className={`chip${form.skills.includes(s) ? " selected" : ""}`} onClick={() => toggleSkill(s)}>{s}</div>)}
            </div>
          </div>
          {form.skills.includes("Others") && (
            <Input label={t("otherSkillLabel")} placeholder={t("otherSkillPlaceholder")} value={form.customSkill} onChange={e => set("customSkill", e.target.value)} />
          )}
          <div className="form-row">
            <Input label={t("experience")} type="number" placeholder={t("experiencePlaceholder")} value={form.experience} onChange={e => set("experience", e.target.value)} hint={t("experienceHint")} />
            <Input label={t("expectedSalary")} type="number" placeholder={t("expectedSalaryPlaceholder")} value={form.expectedSalary} onChange={e => set("expectedSalary", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">{t("willingToRelocate")}</label>
            <div style={{ display: "flex", gap: "1rem", marginTop: "0.3rem" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.88rem", cursor: "pointer" }}><input type="radio" name="relocate" checked={form.willingToRelocate === true} onChange={() => set("willingToRelocate", true)} /> {t("yes")}</label>
              <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.88rem", cursor: "pointer" }}><input type="radio" name="relocate" checked={form.willingToRelocate === false} onChange={() => set("willingToRelocate", false)} /> {t("no")}</label>
            </div>
          </div>
          <Input label={t("aboutYourself")} as="textarea" placeholder={t("aboutPlaceholder")} value={form.about} onChange={e => set("about", e.target.value)} />
        </div>

        <button className="btn btn-saffron btn-full" onClick={handleSubmit}>{t("createProfile")}</button>
        <div style={{ textAlign: "center", marginTop: "0.75rem", fontSize: "0.83rem", color: "var(--gray-500)" }}>
          {t("alreadyHaveAccount")} <span style={{ color: "var(--saffron)", fontWeight: 700, cursor: "pointer" }} onClick={() => navigate("login")}>{t("loginHere")}</span>
        </div>
      </div>
    </>
  );
}

function OwnerSignup({ store }) {
  const { t } = useLang();
  const { registerOwner, navigate } = store;
  const shopTypes = ["Electronics", "Clothing / Garments", "Kirana / Grocery", "Mobile / Phone", "Medical / Pharmacy", "Stationery", "Hardware", "Bakery / Sweet Shop", "Footwear", "Cosmetics", "Other"];
  const locations = ["Angul", "Talcher", "Dhenkanal", "Athmalik", "Other"];

  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "", shopName: "", shopType: "", location: "", contact: "", about: "" });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name) e.name = true;
    if (!validatePhone(form.phone)) e.phone = true;
    if (!form.email) e.email = true;
    if (!form.password) e.password = true;
    if (!form.shopName) e.shopName = true;
    if (!form.shopType) e.shopType = true;
    if (!form.location) e.location = true;
    if (form.contact && !validatePhone(form.contact)) e.contact = true;
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    await registerOwner({ ...form, contact: form.contact || form.phone });
    navigate("owner-dashboard");
  };

  return (
    <>
      <div className="page-header page-header-green">
        <h2>{t("ownerSignupTitle")}</h2>
        <p>{t("ownerSignupSub")}</p>
      </div>
      <div className="section">
        <div className="card">
          <div className="card-title">{t("ownerDetails")}</div>
          <Input label={t("yourName")} placeholder={t("yourNamePlaceholder")} value={form.name} onChange={e => set("name", e.target.value)} error={errors.name ? t("fillRequired") : ""} />
          <div className="form-row">
            <PhoneInput label={t("phone")} placeholder={t("phonePlaceholder")} value={form.phone} onChange={v => set("phone", v)} error={errors.phone} t={t} />
            <Input label={t("emailRequired")} type="email" placeholder={t("emailPlaceholder")} value={form.email} onChange={e => set("email", e.target.value)} error={errors.email ? t("fillRequired") : ""} />
          </div>
          <Input label={t("password")} type="password" placeholder={t("passwordPlaceholder")} value={form.password} onChange={e => set("password", e.target.value)} error={errors.password ? t("fillRequired") : ""} />
        </div>

        <div className="card">
          <div className="card-title">{t("shopDetails")}</div>
          <Input label={t("shopName")} placeholder={t("shopNamePlaceholder")} value={form.shopName} onChange={e => set("shopName", e.target.value)} error={errors.shopName ? t("fillRequired") : ""} />
          <div className="form-row">
            <Select label={t("shopType")} options={shopTypes} value={form.shopType} onChange={e => set("shopType", e.target.value)} />
            <Select label={t("city")} options={locations} value={form.location} onChange={e => set("location", e.target.value)} />
          </div>
          <PhoneInput label={t("shopContact")} placeholder={t("shopContactPlaceholder")} value={form.contact} onChange={v => set("contact", v)} error={errors.contact} t={t} hint={t("shopContactHint")} />
          <Input label={t("aboutShop")} as="textarea" placeholder={t("aboutShopPlaceholder")} value={form.about} onChange={e => set("about", e.target.value)} />
        </div>

        <button className="btn btn-green btn-full" onClick={handleSubmit}>{t("registerShop")}</button>
        <div style={{ textAlign: "center", marginTop: "0.75rem", fontSize: "0.83rem", color: "var(--gray-500)" }}>
          {t("alreadyRegistered")} <span style={{ color: "var(--green)", fontWeight: 700, cursor: "pointer" }} onClick={() => navigate("login")}>{t("loginHere")}</span>
        </div>
      </div>
    </>
  );
}

function JobsPage({ store }) {
  const { t } = useLang();
  const { data, navigate, currentUser } = store;
  const [filter, setFilter] = useState({ location: "", shopType: "", search: "" });
  const locations = ["Angul", "Talcher", "Dhenkanal", "Athmalik"];
  const shopTypes = ["Electronics", "Clothing / Garments", "Kirana / Grocery", "Mobile / Phone", "Medical / Pharmacy"];

  const jobs = data.jobs.filter(j => {
    if (!j.active) return false;
    if (filter.location && j.location !== filter.location) return false;
    if (filter.shopType && j.shopType !== filter.shopType) return false;
    if (filter.search && !j.title.toLowerCase().includes(filter.search.toLowerCase()) && !j.shopName.toLowerCase().includes(filter.search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <div className="page-header">
        <h2>{t("browseJobs")}</h2>
        <p>{jobs.length} {t("jobsAvailable")}</p>
      </div>
      <div className="section">
        <div className="card" style={{ padding: "0.9rem" }}>
          <Input placeholder={t("searchPlaceholder")} value={filter.search} onChange={e => setFilter(f => ({ ...f, search: e.target.value }))} />
          <div className="form-row">
            <Select options={locations} value={filter.location} onChange={e => setFilter(f => ({ ...f, location: e.target.value }))} />
            <Select options={shopTypes} value={filter.shopType} onChange={e => setFilter(f => ({ ...f, shopType: e.target.value }))} />
          </div>
          {(filter.location || filter.shopType || filter.search) && (
            <button style={{ background: "var(--gray-100)", color: "var(--gray-500)", border: "none", cursor: "pointer", borderRadius: "20px", padding: "0.4rem 0.9rem", fontSize: "0.8rem", fontWeight: 600 }} onClick={() => setFilter({ location: "", shopType: "", search: "" })}>{t("clearFilters")}</button>
          )}
        </div>
        {jobs.length === 0 ? <Empty icon="🔎" text="No jobs found. Try different filters." /> : jobs.map(job => (
          <div key={job.id} className="job-card" onClick={() => navigate("job-detail", { jobId: job.id })}>
            <div className="job-card-header">
              <div><div className="job-title">{job.title}</div><div className="job-shop">🏪 {job.shopName} · {job.shopType}</div></div>
              <SalaryDisplay minSalary={job.minSalary} maxSalary={job.maxSalary} t={t} />
            </div>
            <div className="job-meta">
              <Badge label={`📍 ${job.location}`} type="gray" />
              <Badge label={job.experience === 0 ? t("freshersOk") : `${job.experience}${t("yrExp")}`} type="green" />
              <Badge label={job.posted_date} type="gray" />
            </div>
            <div className="job-desc">{job.description}</div>
          </div>
        ))}
        {!currentUser && <div className="alert alert-info">🙋 <strong>{t("signupToApply")}</strong> <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => navigate("worker-signup")}>{t("signupToApplyLink")}</span>{t("signupToApplyText")}</div>}
      </div>
    </>
  );
}

function JobDetailPage({ store }) {
  const { t } = useLang();
  const { data, navigate, currentUser, applyJob, getApplicantsForJob } = store;
  const jobId = store.pageParams.jobId;
  const job = data.jobs.find(j => j.id === jobId);
  const [applied, setApplied] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (currentUser?.role === "worker") {
      if (data.applications.find(a => a.jobId === jobId && a.workerId === currentUser.id)) setApplied(true);
    }
  }, [currentUser, data.applications, jobId]);

  if (!job) return <div className="section"><Empty icon="❓" text="Job not found." /></div>;
  const owner = data.users.find(u => u.id === job.ownerId);
  const applicants = getApplicantsForJob(jobId);

const handleApply = async () => {

  if (!currentUser) { 
    navigate("worker-signup"); 
    return; 
  }

  if (currentUser.role !== "worker") { 
    setMsg(t("onlyWorkers")); 
    return; 
  }

  const ok = await applyJob(jobId);

  if (ok) {
    setApplied(true);
    setMsg(t("applySuccess"));
  } else {
    setMsg(t("alreadyAppliedMsg"));
  }
};

  return (
    <>
      <div className="page-header">
        <button onClick={() => navigate("jobs")} style={{ background: "none", border: "none", color: "#B8C8E0", cursor: "pointer", marginBottom: "0.5rem", fontSize: "0.85rem" }}>{t("backToJobs")}</button>
        <h2>{job.title}</h2>
        <p>🏪 {job.shopName} · {job.location}</p>
      </div>
      <div className="section">
        {msg && <div className={`alert ${msg.startsWith("✅") ? "alert-success" : "alert-error"}`}>{msg}</div>}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.8rem" }}>
            <div>
              <div className="card-title" style={{ marginBottom: "0.2rem" }}>{job.title}</div>
              <div className="text-sm text-gray">{t("aboutShopSection")}: {job.shopName} ({job.shopType})</div>
            </div>
            <SalaryDisplay minSalary={job.minSalary} maxSalary={job.maxSalary} t={t} />
          </div>
          <div className="job-meta mb-1">
            <Badge label={`📍 ${job.location}`} type="gray" />
            <Badge label={job.shopType} type="sky" />
            <Badge label={job.experience === 0 ? t("freshersOk") : `${job.experience}+ ${t("yearsExp")}`} type="green" />
          </div>
          <hr className="divider" />
          <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--navy)", marginBottom: "0.4rem" }}>{t("jobDescription")}</div>
          <p style={{ fontSize: "0.88rem", color: "var(--gray-700)", lineHeight: 1.65 }}>{job.description}</p>
          <hr className="divider" />
          <div style={{ fontSize: "0.78rem", color: "var(--gray-400)" }}>{t("postedOn")} {job.posted_date}</div>
        </div>

        {owner && (
          <div className="card">
            <div className="card-title">{t("aboutShopSection")}</div>
            <div className="row">
              <Avatar name={owner.shopName || owner.name} green />
              <div className="flex-1"><div className="font-bold text-navy">{owner.shopName}</div><div className="text-sm text-gray">{owner.shopType} · {owner.location}</div></div>
            </div>
            {owner.about && <p style={{ fontSize: "0.84rem", color: "var(--gray-500)", marginTop: "0.6rem" }}>{owner.about}</p>}
          </div>
        )}

        {currentUser?.role === "owner" && currentUser.id === job.ownerId && (
          <div className="card">
            <div className="card-title">{t("applicantsSection")} ({applicants.length})</div>
            {applicants.length === 0 ? <Empty icon="👥" text={t("noApplicants")} /> : applicants.map(a => (
              <div key={a.id} className="worker-card" style={{ cursor: "pointer" }} onClick={() => navigate("worker-profile", { workerId: a.workerId })}>
                <div className="row">
                  <Avatar name={a.worker?.name} />
                  <div className="flex-1"><div className="font-bold">{a.worker?.name}</div><div className="text-sm text-gray">📍 {a.worker?.location} · {a.appliedDate}</div></div>
                  <Badge label={a.status} type={a.status === "pending" ? "gray" : a.status === "shortlisted" ? "green" : "red"} />
                </div>
              </div>
            ))}
          </div>
        )}

        {currentUser?.role === "worker" && <button className="btn btn-saffron btn-full" onClick={handleApply} disabled={applied}>{applied ? t("alreadyApplied") : t("applyNow")}</button>}
        {!currentUser && <button className="btn btn-saffron btn-full" onClick={() => navigate("worker-signup")}>{t("signupToApplyBtn")}</button>}
      </div>
    </>
  );
}

function WorkerDashboard({ store }) {
  const { t } = useLang();
  const { currentUser, navigate, getAppliedJobs, data } = store;
  const [tab, setTab] = useState("jobs");
  const appliedJobs = getAppliedJobs();
  const allJobs = data.jobs.filter(j => j.active);

  return (
    <>
      <div className="page-header">
        <h2>{t("myDashboard")}</h2>
        <p>{t("welcomeBack2")}, {currentUser?.name}!</p>
      </div>
      <div className="section">
        <div className="dash-stat-grid">
          <div className="dash-stat"><div className="dash-stat-num">{appliedJobs.length}</div><div className="dash-stat-label">{t("jobsApplied")}</div></div>
          <div className="dash-stat"><div className="dash-stat-num">{allJobs.length}</div><div className="dash-stat-label">{t("openJobs")}</div></div>
        </div>
        <div className="tabs">
          <button className={`tab ${tab === "jobs" ? "active" : ""}`} onClick={() => setTab("jobs")}>{t("browseJobsTab")}</button>
          <button className={`tab ${tab === "applied" ? "active" : ""}`} onClick={() => setTab("applied")}>{t("myApplications")}</button>
          <button className={`tab ${tab === "profile" ? "active" : ""}`} onClick={() => setTab("profile")}>{t("myProfile")}</button>
        </div>

        {tab === "jobs" && (
          <>
            <div className="alert alert-info">{t("tipBrowse")}</div>
            {allJobs.length === 0 ? <Empty icon="💼" text={t("noJobsYet")} /> : allJobs.map(job => (
              <div key={job.id} className="job-card" onClick={() => navigate("job-detail", { jobId: job.id })}>
                <div className="job-card-header">
                  <div><div className="job-title">{job.title}</div><div className="job-shop">{job.shopName} · {job.shopType}</div></div>
                  <SalaryDisplay minSalary={job.minSalary} maxSalary={job.maxSalary} t={t} />
                </div>
                <div className="job-meta">
                  <Badge label={`📍 ${job.location}`} type="gray" />
                  <Badge label={job.experience === 0 ? t("freshersOk") : `${job.experience}${t("yrExp")}`} type="green" />
                </div>
              </div>
            ))}
          </>
        )}

        {tab === "applied" && (
          <>
            {appliedJobs.length === 0 ? <Empty icon="📋" text={t("noApplications")} /> : appliedJobs.map(a => (
              <div key={a.id} className="job-card" onClick={() => navigate("job-detail", { jobId: a.jobId })}>
                <div className="job-card-header">
                  <div><div className="job-title">{a.job?.title}</div><div className="job-shop">{a.job?.shopName}</div></div>
                  <Badge label={a.status} type={a.status === "pending" ? "gray" : a.status === "shortlisted" ? "green" : "red"} />
                </div>
                <div className="job-meta"><Badge label={`📍 ${a.job?.location}`} type="gray" /><Badge label={`${t("applied")} ${a.appliedDate}`} type="sky" /></div>
              </div>
            ))}
          </>
        )}

        {tab === "profile" && <WorkerProfileCard user={currentUser} t={t} />}
      </div>
    </>
  );
}

function WorkerProfileCard({ user, t }) {
  return (
    <div className="card">
      <div className="row mb-2">
        <Avatar name={user.name} lg />
        <div className="flex-1">
          <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: "1.2rem", fontWeight: 800, color: "var(--navy)" }}>{user.name}</div>
          <div className="text-sm text-gray">📍 {user.location} · 📞 {user.phone}</div>
        </div>
      </div>
      {user.about && <p style={{ fontSize: "0.85rem", color: "var(--gray-600)", marginBottom: "0.75rem", lineHeight: 1.55 }}>{user.about}</p>}
      <div className="job-meta mb-1">{(user.skills || []).map(s => <Badge key={s} label={s} type="sky" />)}</div>
      <hr className="divider" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.82rem" }}>
        <div><span className="text-gray">Experience:</span> <strong>{user.experience || 0} yrs</strong></div>
        <div><span className="text-gray">Expected:</span> <strong>₹{(user.expectedSalary || 0).toLocaleString()}/mo</strong></div>
        <div><span className="text-gray">Relocate:</span> <strong>{user.willingToRelocate ? "Yes ✅" : "No"}</strong></div>
      </div>
    </div>
  );
}

function WorkerProfilePage({ store }) {
  const { t } = useLang();
  const { data, navigate } = store;
  const worker = data.users.find(u => u.id === store.pageParams.workerId);
  if (!worker) return <div className="section"><Empty icon="❓" text="Profile not found." /></div>;
  return (
    <>
      <div className="page-header page-header-green">
        <button onClick={() => navigate("owner-dashboard")} style={{ background: "none", border: "none", color: "#B8C8E0", cursor: "pointer", marginBottom: "0.5rem", fontSize: "0.85rem" }}>{t("backBtn")}</button>
        <h2>{t("workerProfile")}</h2>
      </div>
      <div className="section">
        <WorkerProfileCard user={worker} t={t} />
        <div className="card">
          <div className="card-title">{t("contactWorker")}</div>
          <p style={{ fontSize: "0.85rem", color: "var(--gray-500)", marginBottom: "0.75rem" }}>{t("contactWorkerDesc").replace("{name}", worker.name)}</p>
          <a href={`tel:${worker.phone}`} className="btn btn-green btn-full" style={{ textDecoration: "none", display: "flex", justifyContent: "center" }}>{t("callWorker")} {worker.phone}</a>
          <button className="btn btn-outline-saffron btn-full mt-1">{t("hirekartConnect")}</button>
        </div>
      </div>
    </>
  );
}

function OwnerDashboard({ store }) {
  const { t } = useLang();
  const { currentUser, navigate, getJobsForOwner, getApplicantsForJob, data } = store;
  const [tab, setTab] = useState("jobs");
  const myJobs = getJobsForOwner();
  const allWorkers = data.users.filter(u => u.role === "worker");
  const totalApplicants = myJobs.reduce((sum, j) => sum + getApplicantsForJob(j.id).length, 0);

  return (
    <>
      <div className="page-header page-header-green">
        <h2>{t("ownerDashboard")}</h2>
        <p>{currentUser?.shopName} · {currentUser?.location}</p>
      </div>
      <div className="section">
        <div className="dash-stat-grid">
          <div className="dash-stat"><div className="dash-stat-num">{myJobs.length}</div><div className="dash-stat-label">{t("myJobs")}</div></div>
          <div className="dash-stat"><div className="dash-stat-num">{totalApplicants}</div><div className="dash-stat-label">{t("applicantsTitle")}</div></div>
        </div>
        <button className="btn btn-saffron btn-full mb-2" onClick={() => navigate("post-job")}>{t("postNewJob")}</button>

        <div className="tabs">
          <button className={`tab ${tab === "jobs" ? "active" : ""}`} onClick={() => setTab("jobs")}>{t("myJobs")}</button>
          <button className={`tab ${tab === "workers" ? "active" : ""}`} onClick={() => setTab("workers")}>{t("browseWorkers")}</button>
        </div>

        {tab === "jobs" && (
          myJobs.length === 0 ? <Empty icon="💼" text={t("noJobsPosted")} /> : myJobs.map(job => {
            const applicants = getApplicantsForJob(job.id);
            return (
              <div key={job.id} className="job-card">
                <div className="job-card-header">
                  <div><div className="job-title">{job.title}</div><div className="job-shop">{job.location}</div></div>
                  <Badge label={`${applicants.length} applied`} type={applicants.length > 0 ? "saffron" : "gray"} />
                </div>
                <div style={{ marginTop: "0.3rem" }}><SalaryDisplay minSalary={job.minSalary} maxSalary={job.maxSalary} t={t} /></div>
                <div className="job-meta mt-1">
                  <button className="btn btn-sm btn-green" onClick={() => navigate("applicants", { jobId: job.id })}>{t("viewApplicants")}</button>
                  <button className="btn btn-sm" style={{ background: "var(--gray-100)", border: "none", cursor: "pointer", borderRadius: "20px", fontSize: "0.82rem", fontWeight: 600 }} onClick={() => navigate("job-detail", { jobId: job.id })}>{t("viewJob")}</button>
                </div>
              </div>
            );
          })
        )}

        {tab === "workers" && (
          <>
            <div className="alert alert-info">{t("tipWorkers")}</div>
            {allWorkers.map(w => (
              <div key={w.id} className="worker-card" style={{ cursor: "pointer" }} onClick={() => navigate("worker-profile", { workerId: w.id })}>
                <div className="row">
                  <Avatar name={w.name} />
                  <div className="flex-1">
                    <div className="font-bold">{w.name}</div>
                    <div className="text-sm text-gray">📍 {w.location} · {w.experience || 0}yr exp</div>
                    <div className="job-meta mt-1">{(w.skills || []).slice(0, 3).map(s => <Badge key={s} label={s} type="sky" />)}</div>
                  </div>
                  <div style={{ textAlign: "right" }}><div className="text-saffron" style={{ fontSize: "0.88rem" }}>₹{(w.expectedSalary || 0).toLocaleString()}</div><div className="text-xs text-gray">/month</div></div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

function PostJobPage({ store }) {
  const { t } = useLang();
  const { postJob, navigate, currentUser } = store;
  const [form, setForm] = useState({ title: "", minSalary: "", maxSalary: "", experience: "", description: "" });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.title) e.title = t("fillRequired");
    if (!form.minSalary || isNaN(form.minSalary)) e.minSalary = t("fillRequired");
    if (!form.maxSalary || isNaN(form.maxSalary)) e.maxSalary = t("fillRequired");
    if (form.minSalary && form.maxSalary && parseInt(form.minSalary) > parseInt(form.maxSalary)) e.salary = t("salaryError");
    if (!form.description) e.description = t("fillRequired");
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    postJob({ ...form, minSalary: parseInt(form.minSalary), maxSalary: parseInt(form.maxSalary), experience: parseInt(form.experience) || 0 });
    setDone(true);
  };

  if (done) return (
    <div className="section" style={{ textAlign: "center", paddingTop: "3rem" }}>
      <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
      <h2 style={{ fontFamily: "'Baloo 2', cursive", color: "var(--navy)", marginBottom: "0.5rem" }}>{t("jobPostedTitle")}</h2>
      <p style={{ color: "var(--gray-500)", marginBottom: "1.5rem" }}>{t("jobPostedDesc")}</p>
      <button className="btn btn-green" onClick={() => navigate("owner-dashboard")}>{t("goToDashboard")}</button>
    </div>
  );

  return (
    <>
      <div className="page-header page-header-green">
        <h2>{t("postJobTitle")}</h2>
        <p>{t("postJobSub")}</p>
      </div>
      <div className="section">
        <div className="card">
          <div className="card-title">{t("jobDetailsSection")}</div>
          <Input label={t("jobTitle")} placeholder={t("jobTitlePlaceholder")} value={form.title} onChange={e => set("title", e.target.value)} error={errors.title} />
          <div className="form-row">
            <Input label={t("minSalary")} type="number" placeholder={t("minSalaryPlaceholder")} value={form.minSalary} onChange={e => set("minSalary", e.target.value)} error={errors.minSalary} />
            <Input label={t("maxSalary")} type="number" placeholder={t("maxSalaryPlaceholder")} value={form.maxSalary} onChange={e => set("maxSalary", e.target.value)} error={errors.maxSalary} />
          </div>
          {errors.salary && <div className="form-error mb-1">{errors.salary}</div>}
          <Input label={t("expRequired")} type="number" placeholder={t("expRequiredPlaceholder")} value={form.experience} onChange={e => set("experience", e.target.value)} hint={t("expRequiredHint")} />
          <Input label={t("jobDescLabel")} as="textarea" placeholder={t("jobDescPlaceholder")} value={form.description} onChange={e => set("description", e.target.value)} error={errors.description} />
        </div>
        <div className="alert alert-info">{t("locationNote")} <strong>{currentUser?.shopName}, {currentUser?.location}</strong></div>
        <button className="btn btn-saffron btn-full" onClick={handleSubmit}>{t("postJobBtn")}</button>
      </div>
    </>
  );
}

function ApplicantsPage({ store }) {
  const { t } = useLang();
  const { navigate, getApplicantsForJob, updateAppStatus, data } = store;
  const jobId = store.pageParams.jobId;
  const job = data.jobs.find(j => j.id === jobId);
  const applicants = getApplicantsForJob(jobId);

  return (
    <>
      <div className="page-header page-header-green">
        <button onClick={() => navigate("owner-dashboard")} style={{ background: "none", border: "none", color: "#B8C8E0", cursor: "pointer", marginBottom: "0.5rem", fontSize: "0.85rem" }}>← Back</button>
        <h2>{t("applicantsTitle")}</h2>
        <p>{job?.title} · {applicants.length} applicant{applicants.length !== 1 ? "s" : ""}</p>
      </div>
      <div className="section">
        {applicants.length === 0 ? <Empty icon="👥" text={t("noApplicantsYet")} /> : applicants.map(a => (
          <div key={a.id} className="card">
            <div className="row mb-1">
              <Avatar name={a.worker?.name} />
              <div className="flex-1">
                <div className="font-bold text-navy" style={{ cursor: "pointer" }} onClick={() => navigate("worker-profile", { workerId: a.workerId })}>{a.worker?.name} →</div>
                <div className="text-sm text-gray">📍 {a.worker?.location} · {t("applied")} {a.appliedDate}</div>
              </div>
              <Badge label={a.status} type={a.status === "pending" ? "gray" : a.status === "shortlisted" ? "green" : "red"} />
            </div>
            <div className="job-meta mb-1">
              {(a.worker?.skills || []).slice(0, 3).map(s => <Badge key={s} label={s} type="sky" />)}
              {a.worker?.experience > 0 && <Badge label={`${a.worker.experience}yr`} type="green" />}
              <Badge label={`₹${(a.worker?.expectedSalary || 0).toLocaleString()}`} type="saffron" />
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <a href={`tel:${a.worker?.phone}`} className="btn btn-green btn-sm" style={{ textDecoration: "none" }}>{t("callBtn")}</a>
              <button className="btn btn-sm btn-sky" onClick={() => updateAppStatus(a.id, "shortlisted")}>{t("shortlist")}</button>
              <button className="btn btn-sm btn-red" onClick={() => updateAppStatus(a.id, "rejected")}>{t("reject")}</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function AdminPanel({ store }) {
  const { t } = useLang();
  const { data, updateAppStatus, navigate, deleteJob } = store;
  const [tab, setTab] = useState("workers");
  const [confirmJobId, setConfirmJobId] = useState(null);
  const [flash, setFlash] = useState("");
  const workers = data.users.filter(u => u.role === "worker");
  const owners = data.users.filter(u => u.role === "owner");

  const handleDeleteConfirm = () => {
    deleteJob(confirmJobId);
    setConfirmJobId(null);
    setFlash(t("jobDeleted"));
    setTimeout(() => setFlash(""), 3000);
  };

  return (
    <>
      {confirmJobId && <ConfirmDialog message={t("confirmDelete")} onConfirm={handleDeleteConfirm} onCancel={() => setConfirmJobId(null)} />}
      <div className="page-header" style={{ background: "linear-gradient(135deg, #1A1A2E, #16213E)" }}>
        <h2>{t("adminTitle")}</h2>
        <p>{t("adminSub")}</p>
      </div>
      <div className="section">
        {flash && <div className="alert alert-success">{flash}</div>}
        <div className="dash-stat-grid">
          <div className="dash-stat"><div className="dash-stat-num">{workers.length}</div><div className="dash-stat-label">{t("workersTab")}</div></div>
          <div className="dash-stat"><div className="dash-stat-num">{owners.length}</div><div className="dash-stat-label">{t("ownersTab")}</div></div>
          <div className="dash-stat"><div className="dash-stat-num">{data.jobs.length}</div><div className="dash-stat-label">{t("jobsTab")}</div></div>
          <div className="dash-stat"><div className="dash-stat-num">{data.applications.length}</div><div className="dash-stat-label">{t("appsTab")}</div></div>
        </div>

        <div className="tabs">
          <button className={`tab ${tab === "workers" ? "active" : ""}`} onClick={() => setTab("workers")}>{t("workersTab")}</button>
          <button className={`tab ${tab === "owners" ? "active" : ""}`} onClick={() => setTab("owners")}>{t("ownersTab")}</button>
          <button className={`tab ${tab === "jobs" ? "active" : ""}`} onClick={() => setTab("jobs")}>{t("jobsTab")}</button>
          <button className={`tab ${tab === "apps" ? "active" : ""}`} onClick={() => setTab("apps")}>{t("appsTab")}</button>
        </div>

        {tab === "workers" && (
          <div className="card">
            <div className="card-title">{t("allWorkers")} ({workers.length})</div>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Name</th><th>Location</th><th>Skills</th><th>Exp</th><th>Salary</th></tr></thead>
                <tbody>{workers.map(w => (
                  <tr key={w.id} style={{ cursor: "pointer" }} onClick={() => navigate("worker-profile", { workerId: w.id })}>
                    <td><strong>{w.name}</strong><div style={{ fontSize: "0.72rem", color: "var(--gray-400)" }}>{w.phone}</div></td>
                    <td>{w.location}</td>
                    <td>{(w.skills || []).slice(0, 2).join(", ")}</td>
                    <td>{w.experience || 0}yr</td>
                    <td>₹{(w.expectedSalary || 0).toLocaleString()}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "owners" && (
          <div className="card">
            <div className="card-title">{t("allOwners")} ({owners.length})</div>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Owner</th><th>Shop</th><th>Type</th><th>City</th><th>Contact</th></tr></thead>
                <tbody>{owners.map(o => (
                  <tr key={o.id}>
                    <td><strong>{o.name}</strong></td>
                    <td>{o.shopName}</td>
                    <td>{o.shopType}</td>
                    <td>{o.location}</td>
                    <td><a href={`tel:${o.contact || o.phone}`} style={{ color: "var(--green)", fontWeight: 600 }}>{o.contact || o.phone}</a></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "jobs" && (
          <div className="card">
            <div className="card-title">{t("allJobs")} ({data.jobs.length})</div>
            {data.jobs.length === 0 ? <Empty icon="💼" text="No jobs posted yet." /> : data.jobs.map(job => {
              const owner = data.users.find(u => u.id === job.ownerId);
              return (
                <div key={job.id} style={{ background: "var(--gray-50)", borderRadius: "var(--radius-sm)", padding: "0.9rem", marginBottom: "0.7rem", border: "1px solid var(--gray-200)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                    <div>
                      <div style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 700, color: "var(--navy)", fontSize: "0.98rem" }}>{job.title}</div>
                      <div className="text-sm text-gray">{job.shopName} · {job.shopType} · 📍 {job.location}</div>
                    </div>
                    <button className="btn btn-sm btn-red" onClick={() => setConfirmJobId(job.id)}>{t("deleteJob")}</button>
                  </div>
                  <div className="job-meta mt-1">
                    <Badge label={`₹${(job.minSalary||0).toLocaleString()} – ₹${(job.maxSalary||0).toLocaleString()}`} type="saffron" />
                    <Badge label={`Posted: ${job.posted_date}`} type="gray" />
                    <Badge label={`Owner: ${owner?.name || "?"}`} type="sky" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "apps" && (
          <div className="card">
            <div className="card-title">{t("allApplications")} ({data.applications.length})</div>
            {data.applications.length === 0 ? <Empty icon="📋" text={t("noAppsYet")} /> : data.applications.map(a => {
              const worker = data.users.find(u => u.id === a.workerId);
              const job = data.jobs.find(j => j.id === a.jobId);
              const owner = data.users.find(u => u.id === job?.ownerId);
              return (
                <div key={a.id} style={{ background: "var(--gray-50)", borderRadius: "var(--radius-sm)", padding: "0.9rem", marginBottom: "0.6rem", border: "1px solid var(--gray-200)" }}>
                  <div style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "0.3rem" }}>{worker?.name} → {job?.title}</div>
                  <div className="text-sm text-gray">Shop: {job?.shopName} ({owner?.name}) · {a.appliedDate}</div>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", alignItems: "center" }}>
                    <Badge label={a.status} type={a.status === "pending" ? "gray" : a.status === "shortlisted" ? "green" : "red"} />
                    <a href={`tel:${worker?.phone}`} style={{ color: "var(--green)", fontSize: "0.8rem", fontWeight: 700 }}>📞 {worker?.phone}</a>
                    <button className="btn btn-sm btn-sky" onClick={() => updateAppStatus(a.id, "shortlisted")} style={{ marginLeft: "auto" }}>{t("connectBtn")}</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ store }) {
  const { lang, setLang, t } = useLang();
  const { currentUser, logout, navigate } = store;
  return (
    <nav className="nav">
      <div className="nav-logo" onClick={() => navigate("home")}>
        {lang === "en" ? <>Hire<span>Kart</span></> : <>ହାୟର<span>କାର୍ଟ</span></>}
      </div>
      <div className="nav-center">
        <div className="lang-toggle">
          <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
          <button className={`lang-btn ${lang === "od" ? "active" : ""}`} onClick={() => setLang("od")}>ଓଡ଼ିଆ</button>
        </div>
      </div>
      <div className="nav-actions">
        {currentUser ? (
          <>
            <span className="nav-user">{t("navHi")}, <strong>{currentUser.name.split(" ")[0]}</strong></span>
            <button className="nav-btn nav-btn-outline" onClick={() => {
              if (currentUser.role === "worker") navigate("worker-dashboard");
              else if (currentUser.role === "owner") navigate("owner-dashboard");
              else navigate("admin");
            }}>{t("navDashboard")}</button>
            <button className="nav-btn nav-btn-outline" onClick={logout}>{t("navLogout")}</button>
          </>
        ) : (
          <>
            <button className="nav-btn nav-btn-outline" onClick={() => navigate("jobs")}>{t("navJobs")}</button>
            <button className="nav-btn nav-btn-outline" onClick={() => navigate("login")}>{t("navLogin")}</button>
            <button className="nav-btn nav-btn-primary" onClick={() => navigate("worker-signup")}>{t("navSignup")}</button>
          </>
        )}
      </div>
    </nav>
  );
}

// ─── Router ───────────────────────────────────────────────────────────────────
function Router({ store }) {
  const { page, currentUser } = store;
  if (page === "home") return <HomePage store={store} />;
  if (page === "login") return <LoginPage store={store} />;
  if (page === "worker-signup") return <WorkerSignup store={store} />;
  if (page === "owner-signup") return <OwnerSignup store={store} />;
  if (page === "jobs") return <JobsPage store={store} />;
  if (page === "job-detail") return <JobDetailPage store={store} />;
  if (page === "worker-dashboard") return currentUser?.role === "worker" ? <WorkerDashboard store={store} /> : <LoginPage store={store} />;
  if (page === "owner-dashboard") return currentUser?.role === "owner" ? <OwnerDashboard store={store} /> : <LoginPage store={store} />;
  if (page === "post-job") return currentUser?.role === "owner" ? <PostJobPage store={store} /> : <LoginPage store={store} />;
  if (page === "applicants") return currentUser?.role === "owner" ? <ApplicantsPage store={store} /> : <LoginPage store={store} />;
  if (page === "worker-profile") return <WorkerProfilePage store={store} />;
  if (page === "admin") return currentUser?.role === "admin" ? <AdminPanel store={store} /> : <LoginPage store={store} />;
  return <HomePage store={store} />;
}

function Footer({ navigate }) {
  const { lang, t } = useLang();
  return (
    <footer className="footer">
      <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: "1.1rem", fontWeight: 800, color: "white", marginBottom: "0.3rem" }}>
        {lang === "en" ? <>Hire<span style={{ color: "var(--saffron)" }}>Kart</span></> : <>ହାୟର<span style={{ color: "var(--saffron)" }}>କାର୍ଟ</span></>}
      </div>
      <div style={{ marginBottom: "0.5rem" }}>Connecting local shops & workers in Odisha 🇮🇳</div>
      <div style={{ display: "flex", justifyContent: "center", gap: "1.2rem", marginBottom: "0.6rem", flexWrap: "wrap" }}>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("jobs")}>{t("navJobs")}</span>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("worker-signup")}>{t("workerSignupTitle")}</span>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("owner-signup")}>{t("ownerSignupTitle")}</span>
      </div>
      <div>Angul · Talcher · Dhenkanal · Athmalik</div>
      <div style={{ marginTop: "0.4rem", fontSize: "0.72rem", color: "#5A6B82" }}>© 2026 HireKart · Free for everyone · Made with ❤️ for Odisha</div>
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function HireKart() {
  const store = useStore();
  return (
    <LangProvider>
      <style>{CSS}</style>
      <div className="app">
        <Nav store={store} />
        <main><Router store={store} /></main>
        <Footer navigate={store.navigate} />
      </div>
    </LangProvider>
  );
}
