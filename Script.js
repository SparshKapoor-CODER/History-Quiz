const quizData = [
    {
        question: "Who was the first European to become the President of the Indian National Congress ?",
        a: "Alfred Web",
        b: "Sir William Wedderburn",
        c: "George Yule",
        d: "Annie Besent",
        correct: "c",
    },
    {
        question: "Who was the first Education Minister of Independent India ?",
        a: "Rahimulla M Sayani",
        b: "Nawab Syed Muhammad Bahadur",
        c: "Abul Kalam Ghulam Muhiyuddin",
        d: "Badruddin Tyabji",
        correct: "c",
    },
    {
        question: "Who drew the border of India and Pakistan?",
        a: "Sir Cyril Radcliffe",
        b: "Lord Mountbetten",
        c: "Edward Cadogan",
        d: "Edwin Lutyens",
        correct: "a",
    },
    {
        question: "What was the title of Choudhary Rehmat Ali's 1933 article in which he coined the word PAKSTAN ?",
        a: "Towards a Separate Homeland",
        b: "Now or Never - Are we to live or perish forever",
        c: "Our Demand for a Federated Nation",
        d: "none of the above",
        correct: "b",
    },
];

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')

let currentQuiz = 0
let score = 0

loadQuiz()

function loadQuiz() {
    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer

    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })

    return answer
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    
    if(answer) {
        if(answer === quizData[currentQuiz].correct) {
            score++
        }

        currentQuiz++

        if(currentQuiz < quizData.length) {
            loadQuiz()
        } else {
            quiz.innerHTML = `
                <h2>You answered ${score}/${quizData.length} questions correctly</h2>

                <button onclick="location.reload()">Reload</button>
            `
        }
    }
})
