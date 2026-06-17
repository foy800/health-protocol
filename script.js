// Quiz Configuration
const quizData = Object.freeze({
    questions: [
        {
            question: "What is your primary goal?",
            options: [
                { text: "Better Sleep", value: "sleep" },
                { text: "More Energy", value: "energy" },
                { text: "Reduce Stress", value: "stress" },
                { text: "Weight Loss", value: "weight_loss" },
                { text: "Build Muscle", value: "muscle" },
                { text: "Healthy Aging", value: "healthy_aging" }
            ],
            storageKey: "goal"
        },
        {
            question: "How old are you?",
            options: [
                { text: "18-29", value: "18-29" },
                { text: "30-39", value: "30-39" },
                { text: "40-49", value: "40-49" },
                { text: "50-59", value: "50-59" },
                { text: "60+", value: "60+" }
            ],
            storageKey: "age"
        },
        {
            question: "What's your gender?",
            options: [
                { text: "Male", value: "male" },
                { text: "Female", value: "female" }
            ],
            storageKey: "gender"
        },
        {
            question: "How active are you?",
            options: [
                { text: "Rarely Exercise", value: "rarely" },
                { text: "1-2 Times Per Week", value: "1-2" },
                { text: "3-5 Times Per Week", value: "3-5" },
                { text: "6+ Times Per Week", value: "6+" }
            ],
            storageKey: "activity"
        },
        {
            question: "What best describes your biggest challenge?",
            options: [
                { text: "Low Energy", value: "low_energy" },
                { text: "Poor Sleep", value: "poor_sleep" },
                { text: "High Stress", value: "high_stress" },
                { text: "Recovery Issues", value: "recovery" },
                { text: "Weight Management", value: "weight_management" },
                { text: "General Wellness", value: "general_wellness" }
            ],
            storageKey: "challenge"
        }
    ]
});

// Product recommendations live in products.js.
// IMPORTANT: do not redeclare `recommendations` here; doing so will throw
// "Identifier 'recommendations' has already been declared" and break all button handlers.

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const heroSection = document.getElementById('hero');
    const howItWorksSection = document.getElementById('how-it-works');
    const quizSection = document.getElementById('quiz');
    const loadingSection = document.getElementById('loading');
    const resultsSection = document.getElementById('results');

    const startAssessmentBtn = document.getElementById('start-assessment');
    const navCtaBtn = document.getElementById('nav-cta');
    const logoHome = document.getElementById('logo-home');
    const quizBackBtn = document.getElementById('quiz-back');
    const restartAssessmentBtn = document.getElementById('restart-assessment');

    const quizContainer = document.getElementById('quiz-container');
    const progressBar = document.getElementById('progress');
    const progressText = document.getElementById('progress-text');
    const loadingProgressBar = document.getElementById('loading-progress');
    const loadingTitle = document.getElementById('loading-title');
    const loadingSubtitle = document.getElementById('loading-subtitle');

    const profileSummaryItems = document.getElementById('profile-summary-items');
    const foundationSection = document.getElementById('foundation-section');
    const foundationGrid = document.getElementById('foundation-grid');
    const mainRecommendationsGrid = document.getElementById('main-recommendations-grid');
    const wellnessGrid = document.getElementById('wellness-grid');

    // Modal elements
    const verifyModal = document.getElementById('verify-modal');
    const checkProtocolBtn = document.getElementById('check-protocol-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalTimerText = document.getElementById('modal-timer-text');

    const QUESTION_TRANSITION_MS = 200; // 150–250ms per requirements

    // Quiz State
    let currentQuestionIndex = 0;
    const userAnswers = {};
    let isTransitioning = false;

    // Event Listeners
    if (startAssessmentBtn) startAssessmentBtn.addEventListener('click', startQuiz);
    if (navCtaBtn) navCtaBtn.addEventListener('click', startQuiz);
    if (logoHome) logoHome.addEventListener('click', resetToHome);
    if (quizBackBtn) quizBackBtn.addEventListener('click', handleGoBack);
    if (restartAssessmentBtn) restartAssessmentBtn.addEventListener('click', startQuiz);

    // Modal Event Listeners
    if (checkProtocolBtn) {
        checkProtocolBtn.addEventListener('click', showResultsImmediately);
    }
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeVerifyModal);
    }

// Start Quiz
function startQuiz() {
    // Hide other sections
    heroSection.classList.add('hidden');
    howItWorksSection.classList.add('hidden');
    loadingSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
    
    // Show quiz section
    quizSection.classList.remove('hidden');
    
    // Reset state
    currentQuestionIndex = 0;
    
    // Render first question
    renderQuestion();
}

// Reset to Home Page
function resetToHome() {
    quizSection.classList.add('hidden');
    loadingSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
    
    heroSection.classList.remove('hidden');
    howItWorksSection.classList.remove('hidden');
    
    // Clear state
    currentQuestionIndex = 0;
}

// Render Current Question
function renderQuestion() {
    isTransitioning = false;
    const currentQuestion = quizData.questions[currentQuestionIndex];
    const totalQuestions = quizData.questions.length;
    
    // Update Back Button Visibility
    if (currentQuestionIndex === 0) {
        quizBackBtn.classList.add('hidden');
    } else {
        quizBackBtn.classList.remove('hidden');
    }
    
    // Update Progress Bar & Text
    const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    progressBar.style.width = `${progressPercent}%`;
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
    
    quizContainer.innerHTML = `
        <div class="quiz-question enter-from">
            <h2>${currentQuestion.question}</h2>
            <div class="quiz-options">
                ${currentQuestion.options.map(option => {
                    return `
                        <div class="quiz-option" data-value="${option.value}">
                            ${option.text}
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    // Animate question in (Typeform-like)
    const questionEl = quizContainer.querySelector('.quiz-question');
    requestAnimationFrame(() => {
        if (questionEl) questionEl.classList.remove('enter-from');
    });

    // Add Option Click Listeners
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', () => handleOptionSelect(option));
    });
}

// Handle Option Selection
function handleOptionSelect(selectedOptionElement) {
    if (isTransitioning) return;
    isTransitioning = true;

    const currentQuestion = quizData.questions[currentQuestionIndex];
    const selectedValue = selectedOptionElement.dataset.value;
    
    // Save answer in state and localStorage
    userAnswers[currentQuestion.storageKey] = selectedValue;
    localStorage.setItem(currentQuestion.storageKey, selectedValue);

    // Transition out current question, then render next
    const currentQuestionEl = quizContainer.querySelector('.quiz-question');
    if (currentQuestionEl) currentQuestionEl.classList.add('exit-to');

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.questions.length) {
            renderQuestion();
        } else {
            runLoadingScreen();
        }
    }, QUESTION_TRANSITION_MS);
}

// Handle Go Back
function handleGoBack() {
    if (currentQuestionIndex > 0) {
        if (isTransitioning) return;
        isTransitioning = true;
        const currentQuestionEl = quizContainer.querySelector('.quiz-question');
        if (currentQuestionEl) currentQuestionEl.classList.add('exit-to');

        setTimeout(() => {
            currentQuestionIndex--;
            renderQuestion();
        }, QUESTION_TRANSITION_MS);
    }
}

// Run Loading Screen
function runLoadingScreen() {
    quizSection.classList.add('hidden');
    loadingSection.classList.remove('hidden');
    
    let progress = 0;
    loadingProgressBar.style.width = '0%';
    
    const loadingMessages = [
        { title: "Analyzing your answers...", subtitle: "Our recommendation engine is processing your wellness profile." },
        { title: "Matching with science-backed ingredients...", subtitle: "Finding the optimal compounds for your specific goals." },
        { title: "Formulating your personalized daily routine...", subtitle: "Creating a custom supplement stack tailored to your lifestyle." },
        { title: "Finalizing your custom recommendations...", subtitle: "Preparing your personalized wellness protocol." }
    ];
    
    // Update messages dynamically
    const messageInterval = setInterval(() => {
        const messageIndex = Math.min(Math.floor(progress / 25), loadingMessages.length - 1);
        loadingTitle.textContent = loadingMessages[messageIndex].title;
        loadingSubtitle.textContent = loadingMessages[messageIndex].subtitle;
    }, 100);

    // Animate progress bar
    const progressInterval = setInterval(() => {
        progress += 2;
        loadingProgressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            clearInterval(messageInterval);
            setTimeout(showResults, 300);
        }
    }, 60); // 60ms * 50 steps = 3000ms (3 seconds total)
}

// Show Results Screen - now shows email capture first
function showResults() {
    loadingSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
    const emailCaptureSection = document.getElementById('email-capture');
    
    if (emailCaptureSection) {
        emailCaptureSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Fallback if section not found
        resultsSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const goal = userAnswers['goal'] || localStorage.getItem('goal') || 'sleep';
        const age = userAnswers['age'] || localStorage.getItem('age') || '30-39';
        const gender = userAnswers['gender'] || localStorage.getItem('gender') || 'female';
        const activity = userAnswers['activity'] || localStorage.getItem('activity') || '3-5';
        const challenge = userAnswers['challenge'] || localStorage.getItem('challenge') || 'general_wellness';
        
        renderProfileSummary({ goal, age, gender, activity, challenge });
        generateRecommendations({ goal, age, gender });
    }
}

/**
 * Shows the verify email modal after successful subscription
 * with 10-second auto-redirect to results
 */
window.showRecommendationsAfterSubscribe = function() {
    const emailCaptureSection = document.getElementById('email-capture');
    if (emailCaptureSection) emailCaptureSection.classList.add('hidden');
    
    if (verifyModal) {
        verifyModal.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        startModalTimer();
    } else {
        // Fallback if modal not found
        showResultsImmediately();
    }
};

/**
 * Starts the 10-second countdown timer for auto-redirect
 */
let modalTimerInterval = null;
let modalTimeLeft = 10;

function startModalTimer() {
    // Clear any existing timer
    if (modalTimerInterval) {
        clearInterval(modalTimerInterval);
    }
    
    modalTimeLeft = 10;
    updateModalTimerDisplay();
    
    modalTimerInterval = setInterval(() => {
        modalTimeLeft--;
        updateModalTimerDisplay();
        
        if (modalTimeLeft <= 0) {
            clearInterval(modalTimerInterval);
            modalTimerInterval = null;
            showResultsImmediately();
        }
    }, 1000);
}

function updateModalTimerDisplay() {
    if (modalTimerText) {
        modalTimerText.innerHTML = `Auto-redirecting in <strong>${modalTimeLeft}</strong> seconds...`;
    }
}

/**
 * Immediately shows the results (called by button click or auto-redirect)
 */
function showResultsImmediately() {
    // Clear timer if running
    if (modalTimerInterval) {
        clearInterval(modalTimerInterval);
        modalTimerInterval = null;
    }
    
    // Hide modal
    if (verifyModal) {
        verifyModal.classList.add('hidden');
    }
    
    const resultsSection = document.getElementById('results');
    if (resultsSection) {
        resultsSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Retrieve answers
        const goal = userAnswers['goal'] || localStorage.getItem('goal') || 'sleep';
        const age = userAnswers['age'] || localStorage.getItem('age') || '30-39';
        const gender = userAnswers['gender'] || localStorage.getItem('gender') || 'female';
        const activity = userAnswers['activity'] || localStorage.getItem('activity') || '3-5';
        const challenge = userAnswers['challenge'] || localStorage.getItem('challenge') || 'general_wellness';
        
        // Render Profile Summary
        renderProfileSummary({ goal, age, gender, activity, challenge });
        
        // Generate Recommendations
        generateRecommendations({ goal, age, gender });
    }
}

/**
 * Closes the modal without showing results (user chose "I'll check later")
 */
function closeVerifyModal() {
    if (modalTimerInterval) {
        clearInterval(modalTimerInterval);
        modalTimerInterval = null;
    }
    
    if (verifyModal) {
        verifyModal.classList.add('hidden');
    }
    
    // Still show the results page even if they close the modal
    showResultsImmediately();
}

// Render Profile Summary Sidebar
function renderProfileSummary(profile) {
    // Helper to get user-friendly text
    const getFriendlyText = (key, value) => {
        const question = quizData.questions.find(q => q.storageKey === key);
        if (question) {
            const option = question.options.find(opt => opt.value === value);
            return option ? option.text : value;
        }
        return value;
    };
    
    profileSummaryItems.innerHTML = `
        <div class="profile-item">
            <span class="profile-label">Primary Goal</span>
            <span class="profile-value">${getFriendlyText('goal', profile.goal)}</span>
        </div>
        <div class="profile-item">
            <span class="profile-label">Age Group</span>
            <span class="profile-value">${getFriendlyText('age', profile.age)}</span>
        </div>
        <div class="profile-item">
            <span class="profile-label">Gender</span>
            <span class="profile-value">${getFriendlyText('gender', profile.gender)}</span>
        </div>
        <div class="profile-item">
            <span class="profile-label">Activity Level</span>
            <span class="profile-value">${getFriendlyText('activity', profile.activity)}</span>
        </div>
        <div class="profile-item">
            <span class="profile-label">Biggest Challenge</span>
            <span class="profile-value">${getFriendlyText('challenge', profile.challenge)}</span>
        </div>
    `;
}

// Generate Recommendations Grid - Data-Driven Approach
function generateRecommendations(profile) {
    const normalizeRecommendationCardHeights = () => {
        const cards = Array.from(document.querySelectorAll('.recommendation-card'));
        if (!cards.length) return;

        // Reset first so we measure natural heights
        cards.forEach(c => { c.style.height = 'auto'; });

        const max = Math.max(...cards.map(c => c.getBoundingClientRect().height));
        cards.forEach(c => { c.style.height = `${Math.ceil(max)}px`; });
    };

    const uniqueByTitle = (items) => {
        const seen = new Set();
        return items.filter(p => {
            const key = (p?.title || '').trim().toLowerCase();
            if (!key || seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    };

    const getDailyWellnessProduct = () => {
        const fromWellness = (recommendations.wellness || []).find(p => p.title === 'Probiotic Blend');
        return fromWellness || (recommendations.wellness || [])[0];
    };

    const getFoundationProduct = () => {
        if (profile.gender !== 'female') return null;
        const isOver50 = profile.age === '50-59' || profile.age === '60+';
        const list = isOver50 ? recommendations.women50 : recommendations.women18;
        return (list && list[0]) ? list[0] : null;
    };

    const buildMainRecommendations = () => {
        const goalList = Array.isArray(recommendations[profile.goal]) ? recommendations[profile.goal] : [];
        const base = uniqueByTitle(goalList);

        // Fallback: fill from wellness until total = 3
        // Avoid duplicating the daily wellness product if possible.
        const daily = getDailyWellnessProduct();
        const wellnessPool = uniqueByTitle((recommendations.wellness || []).filter(p => p?.title !== daily?.title));

        const out = [];
        for (const p of base) {
            if (out.length >= 3) break;
            out.push(p);
        }
        for (const p of wellnessPool) {
            if (out.length >= 3) break;
            out.push(p);
        }
        // If still not enough (misconfigured data), allow daily wellness as filler.
        if (out.length < 3 && daily) out.push(daily);

        return out.slice(0, 3);
    };

    const renderCard = (product, { badgeText } = {}) => {
        const benefits = Array.isArray(product.benefits) ? product.benefits.slice(0, 3) : [];
        const safeBenefits = benefits.length === 3 ? benefits : [
            ...(benefits || []),
            ...Array(Math.max(0, 3 - benefits.length)).fill('')
        ].slice(0, 3);

        return `
            <article class="recommendation-card">
                ${badgeText ? `<div class="rec-badge">${badgeText}</div>` : ''}

                <div class="product-image-wrap">
                    <img class="product-image" src="${product.image}" alt="${product.title}">
                </div>

                <div class="recommendation-content">
                    <h4 class="product-name">${product.title}</h4>
                    <p class="product-desc">${product.description}</p>

                    <ul class="recommendation-benefits">
                        ${safeBenefits.map(b => `<li>${b}</li>`).join('')}
                    </ul>
                </div>

                <div class="recommendation-actions">
                    <button class="product-cta" type="button" onclick="window.open('${product.url}', '_blank')">View Recommendation</button>
                </div>
            </article>
        `;
    };

    // 1) Optional foundation (female)
    const foundation = getFoundationProduct();
    if (foundation && foundationSection && foundationGrid) {
        foundationSection.classList.remove('hidden');
        foundationGrid.innerHTML = renderCard(foundation, { badgeText: 'FOUNDATION SUPPORT' });
    } else if (foundationSection) {
        foundationSection.classList.add('hidden');
    }

    // 2) Main recommendations (always 3)
    const main = buildMainRecommendations();
    const mainBadges = ['BEST MATCH', 'POPULAR CHOICE', 'FOUNDATION SUPPORT'];
    if (mainRecommendationsGrid) {
        mainRecommendationsGrid.innerHTML = main.map((p, idx) => renderCard(p, { badgeText: mainBadges[idx] })).join('');
    }

    // 3) Daily wellness (always probiotic blend)
    const dailyWellness = getDailyWellnessProduct();
    if (wellnessGrid && dailyWellness) {
        wellnessGrid.innerHTML = renderCard(dailyWellness);
    }

    // Make all cards the same height (across main + single-card sections)
    // Run after DOM updates so layout values are correct.
    requestAnimationFrame(normalizeRecommendationCardHeights);
}

}); // End of DOMContentLoaded event listener
