const quizData = [
	{
		question: 'Inside which HTML element do we put the JavaScript?',
		a: '<scripting>',
		b: '<js>',
		c: '<script>',
		d: '<javascript>',
		correct: 'c'
	}, {
		question: 'What is the most used programming language in 2021?',
		a: 'Python',
		b: 'Java',
		c: 'C++',
		d: 'JavaScript',
		correct: 'd'
	}, {
		question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
		a: '<script src="xxx.js">',
		b: '<script href="xxx.js">',
		c: '<script name="xxx.js">',
		d: '<script>xxx.js</script>',
		correct: 'a'
	}, {
		question: 'What does HTML stand for?',
		a: 'Hypertext Markup Language',
		b: 'Cascading Style Sheet',
		c: 'Jason Object Notation',
		d: 'Application Programming Interface',
		correct: 'a'
	}, {
		question: 'What year was JavaScript launched?',
		a: '1996',
		b: '1995',
		c: '1994',
		d: 'None of the above',
		correct: 'b'
	}
];

const quiz = document.getElementById('quiz');
const answersEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const button = document.getElementById('btn');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
	deselectAnswers();

	const currentQuizData = quizData[currentQuiz];

	questionEl.innerText = currentQuizData.question;
	a_text.innerText = currentQuizData.a;
	b_text.innerText = currentQuizData.b;
	c_text.innerText = currentQuizData.c;
	d_text.innerText = currentQuizData.d;
}

function getSelected() {

	let answer = undefined;

	answersEls.forEach((answerEl) => {
		if (answerEl.checked) {
			answer = answerEl.id;
		}
	});

	return answer;

}

function deselectAnswers() {
	answersEls.forEach((answerEl) => {
		answerEl.checked = false;
	});
}

button.addEventListener('click', () => {
	const answer = getSelected();
	if (answer) {
		if (answer === quizData.correct) {
			score++;
		}
		currentQuiz++;
		if (currentQuiz < quizData.length) {
			loadQuiz();
		} else {
			quiz.innerHTML = `
			<h2>You answered correctly at ${score}/${quizData.length} questions.</h2>
			<button class="btn" onClick="location.reload()">Reload</button>
			`;
		}
	}

})
