(function(){
// Functions
function buildQuiz() {
  // variable to store the HTML output
  const output = [];

  // for each question...
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {

      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {

        // ...add an HTML radio button
        answers.push(
          `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
        );
      }

      // console.log(answers)
      // add this question and its answers to the output
      output.push(
        `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
      );
    }
  );

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');
}

function analyseAnswer(userAnswer) {
  
  let questionNumber = currentSlide + 1
  userAnswerList[`question ${questionNumber}`] = userAnswer
  
  if (questionNumber == 2 && userAnswer != "a" && userAnswer != "b") {
    showNextSlide()
  }
  if (questionNumber == 4 && userAnswerList[0] == "b") {
    showNextSlide()
  }
  if (questionNumber == 8 && userAnswerList[1] == "c") {
    showNextSlide()
  }
  console.log(userAnswerList)
  questionNumber == myQuestions.length? executeRedirection() : showNextSlide()
}
  
function executeRedirection() {
  if (userAnswerList["question 2"] == "c") {
    window.location.href = "https://www.explicitdevelopers.com/bfb"
  };
  if (userAnswerList["question 2"] == "a" && userAnswerList["question 3"]== "a") {
    window.location.href = "https://www.explicitdevelopers.com/hybrid"
    console.log('done')
  };
  if (userAnswerList["question 2"] == "b" && userAnswerList["question 3"]== "a") {
    window.location.href = "https://www.explicitdevelopers.com/hybrid"
  };
  if (userAnswerList["question 2"] == "a" && userAnswerList["question 3"]== "b") {
    window.location.href = "https://www.explicitdevelopers.com/bfe"
  };
  if (userAnswerList["question 2"] == "b" && userAnswerList["question 3"]== "b") {
    window.location.href = "https://www.explicitdevelopers.com/bft"
  }
  
}

function showSlide(n) {

  slides[currentSlide].classList.remove('active-slide');
  slides[n].classList.add('active-slide');
  currentSlide = n;

  let progress = Math.floor(((currentSlide + 1) / myQuestions.length) * 100)
  progressBar.style.width = `${progress}%`;
  progressBar.innerHTML = `${progress}%`
}
  
function checkForCheckedInput(currentSlide){
    let answers = currentSlide.children[1]
    let labels = answers.children;
    for (label of labels) {
      if (label.firstElementChild.checked) {
        analyseAnswer(label.firstElementChild.value)
      }
    }
}
  

function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}

// Variables
const quiz = document.getElementById('quiz-container');
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const progressBar = document.getElementById('progress-bar');
const myQuestions = [
  {
    question: "Which of these best describes you?",
    answers: {
      a: "I have an existing business",
      b: "I am starting a new business",
    },
    correctAnswer: "c"
  },
  {
    question: "Which of these best describes your business?",
    answers: {
      a: "We run a service based business.(coaching/consulting/agency/freelancer)",
      b: "We run a product based business (physical products, digital products or membership programmes)",
      c: "We run a non-profit"
    },
    correctAnswer: "c"
  },
  {
    question: "Which is correct about your business?",
    answers: {
      a: "We give to charity with our business (e.g giving part of your product/services to homeless children or give a percentage of revenue to orphanage homes).",
      b: "We don't currently give to charity from our business."
    },
    correctAnswer: "c"
  },
  {
    question: "Which of these social media platforms do you PREDOMINANTLY use in your business",
    answers: {
      a: "Facebook",
      b: "Instagram",
      c: "Twitter",
      d: "LinkedIn"
    },
    correctAnswer: "d"
  },
  {
    question: "How much MONTHLY revenue do you currently make in your business?",
    answers: {
      a: "< 250k",
      b: "250k - 1M",
      c: "1M - 5M",
      d: "5M - 10M",
      e: "> 10M"
    },
    correctAnswer: "d"
  },
  {
    question: "Which of these best describes you?",
    answers: {
      a: "We have a strong, well-defined brand.",
      b: "We don't have a well defined brand yet.",
      c: "I don't know what that is.",
    },
    correctAnswer: "d"
  },
  {
    question: "If you were to choose 1, what would you say is the BEST use of a website for your type of business?",
    answers: {
      a: "As a content marketing tool.",
      b: "To position your business as an industry leader",
      c: "To build credibility and trust",
      d: "To get sales"
    },
    correctAnswer: "d"
  },
  {
    question: "Which of these best describes you?",
    answers: {
      a: "My company has a website.",
      b: "My company doesn't have a website.",
    },
    correctAnswer: "d"
  },
  {
    question: "Which of these best describes you?",
    answers: {
      a: "I relatively charge higher than most people in my industry",
      b: "I charge around the same price as most people in my industry",
      c: "I relatively charge lower than most people in my industry"
    },
    correctAnswer: "d"
  }
];

// Kick things off
buildQuiz();

// Pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
const userAnswerList = {};
// Show the first slide
  showSlide(currentSlide);
 

// Event listeners
// submitButton.addEventListener('click', showResults);
// previousButton.addEventListener("click", showPreviousSlide);
// nextButton.addEventListener("click", showNextSlide);
  quiz.addEventListener("click", () => {
    checkForCheckedInput(slides[currentSlide]);
  });
}) ();


