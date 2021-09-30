const form = document.getElementById('form');
const input = document.getElementById('input');
const todoList = document.getElementById('todo-list');

const listEls = JSON.parse(localStorage.getItem("todos"));

if (listEls) {
	listEls.forEach(listEl => {
		addTodo(listEl);
	});
}

form.addEventListener('submit', (e) => {
	e.preventDefault();

	addTodo();
});

function addTodo(listEl) {
	let todoText = input.value;

	if (listEl) {
		todoText = listEl.text;
	}

	if (todoText) {
		const todoEl = document.createElement('li');
		if (listEl && listEl.done) {
			todoEl.classList.add('done');
		}
		todoEl.innerHTML = todoText;

		todoEl.addEventListener('click', () => {
			todoEl.classList.toggle('done');

			updateLS();
		});

		todoEl.addEventListener('contextmenu', (e) => {
			e.preventDefault();

			todoEl.remove();

			updateLS();
		})

		todoList.appendChild(todoEl);

		input.value = '';

		updateLS();
	}
}

function updateLS() {
	const todoEls = document.querySelectorAll('.todo-list li');

	const todos = []

	todoEls.forEach(todoEl => {
		todos.push({
			text: todoEl.innerText,
			done: todoEl.classList.contains('done')
		});
	});

	localStorage.setItem('todos', JSON.stringify(todos));
}
