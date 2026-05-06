// Educational questions about shoe marketing and business
const SHOE_QUESTIONS = {
  'common_converse': {
    question: "What year did Converse first start making basketball shoes?",
    options: ["1917", "1932", "1945", "1960"],
    correct: 0,
    explanation: "Converse started making basketball shoes in 1917, making them one of the oldest athletic shoe companies!"
  },
  'common_vans': {
    question: "What marketing strategy helped Vans become popular with skaters?",
    options: ["Celebrity endorsements", "TV commercials", "Sponsoring local skate shops", "Magazine ads"],
    correct: 2,
    explanation: "Vans built their brand by supporting grassroots skateboard culture and local skate shops, creating authentic community connections."
  },
  'common_adidas': {
    question: "What does the Adidas three-stripe logo represent in branding?",
    options: ["Speed lines", "Mountain peaks", "Three founders", "Performance levels"],
    correct: 1,
    explanation: "The three stripes represent mountain peaks, symbolizing challenges to overcome and goals to achieve."
  },
  'rare_airmax': {
    question: "Why was Nike's 'Just Do It' slogan so successful in marketing?",
    options: ["It was short", "It inspired action", "It was easy to translate", "All of the above"],
    correct: 3,
    explanation: "The slogan worked because it was memorable, motivational, universal, and translated well globally - key elements of effective marketing."
  },
  'rare_jordans': {
    question: "What business model did Air Jordans pioneer in sports marketing?",
    options: ["Celebrity licensing", "Athlete equity partnerships", "Limited edition releases", "Social media campaigns"],
    correct: 1,
    explanation: "Air Jordans pioneered giving athletes equity in their signature products, creating long-term business partnerships rather than just endorsement deals."
  },
  'epic_travis': {
    question: "What pricing strategy do limited edition collaborations like Travis Scott shoes use?",
    options: ["Cost-plus pricing", "Scarcity pricing", "Bundle pricing", "Loss leader pricing"],
    correct: 1,
    explanation: "Scarcity pricing creates high demand through limited availability, allowing brands to charge premium prices and build hype."
  },
  'legendary_moonwalk': {
    question: "How did Michael Jackson's moonwalk create marketing value for his shoes?",
    options: ["Product placement", "Viral marketing before the internet", "Brand association", "Influencer marketing"],
    correct: 2,
    explanation: "The moonwalk created strong brand association, linking the shoes with an iconic performance and Michael's legendary status."
  }
};

// Question UI manager with 15-second timer
class QuestionManager {
  constructor() {
    this.currentQuestion = null;
    this.timer = null;
    this.timeLeft = 15;
    this.onAnswerCallback = null;
    this.createQuestionUI();
  }

  createQuestionUI() {
    // Add question overlay HTML if it doesn't exist
    if (!document.getElementById('question-overlay')) {
      const questionHTML = `
        <div id="question-overlay" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 300;
             display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; font-family: 'Courier New', monospace;">
          <div id="question-container" style="max-width: 600px; padding: 40px; text-align: center; border: 2px solid #fff; background: rgba(0,0,0,0.8);">
            <div id="question-timer" style="font-size: 18px; color: #ff6b6b; margin-bottom: 20px;">Time: 15s</div>
            <h2 id="question-text" style="margin-bottom: 30px; font-size: 22px; line-height: 1.4;"></h2>
            <div id="question-options" style="display: grid; gap: 15px;">
            </div>
            <div id="question-explanation" style="margin-top: 20px; font-size: 14px; color: #aaa; display: none;"></div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', questionHTML);
    }
  }

  showQuestion(shoeId, onAnswer) {
    const questionData = SHOE_QUESTIONS[shoeId];
    if (!questionData) {
      onAnswer(true); // No question available, allow collection
      return;
    }

    this.currentQuestion = questionData;
    this.onAnswerCallback = onAnswer;
    this.timeLeft = 15;

    // Setup UI
    document.getElementById('question-text').textContent = questionData.question;
    document.getElementById('question-explanation').style.display = 'none';

    const optionsContainer = document.getElementById('question-options');
    optionsContainer.innerHTML = '';

    questionData.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
      button.style.cssText = `
        padding: 12px 20px; background: rgba(255,255,255,0.1); border: 1px solid #fff;
        color: white; cursor: pointer; font-size: 16px; transition: background 0.2s;
      `;
      button.onmouseover = () => button.style.background = 'rgba(255,255,255,0.2)';
      button.onmouseout = () => button.style.background = 'rgba(255,255,255,0.1)';
      button.onclick = () => this.answerQuestion(index);
      optionsContainer.appendChild(button);
    });

    // Show overlay and start timer
    document.getElementById('question-overlay').style.display = 'flex';
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.timeLeft--;
      document.getElementById('question-timer').textContent = `Time: ${this.timeLeft}s`;

      if (this.timeLeft <= 0) {
        this.timeUp();
      }
    }, 1000);
  }

  answerQuestion(selectedIndex) {
    clearInterval(this.timer);
    const correct = selectedIndex === this.currentQuestion.correct;

    // Show explanation
    const explanationDiv = document.getElementById('question-explanation');
    explanationDiv.textContent = this.currentQuestion.explanation;
    explanationDiv.style.display = 'block';
    explanationDiv.style.color = correct ? '#4CAF50' : '#ff6b6b';

    // Hide overlay after showing result
    setTimeout(() => {
      document.getElementById('question-overlay').style.display = 'none';
      if (this.onAnswerCallback) {
        this.onAnswerCallback(correct);
      }
    }, 3000);
  }

  timeUp() {
    clearInterval(this.timer);

    // Show correct answer and explanation
    const explanationDiv = document.getElementById('question-explanation');
    explanationDiv.textContent = `Time's up! Correct answer: ${this.currentQuestion.options[this.currentQuestion.correct]}. ${this.currentQuestion.explanation}`;
    explanationDiv.style.display = 'block';
    explanationDiv.style.color = '#ff6b6b';

    // Hide overlay and fail collection
    setTimeout(() => {
      document.getElementById('question-overlay').style.display = 'none';
      if (this.onAnswerCallback) {
        this.onAnswerCallback(false);
      }
    }, 3000);
  }
}