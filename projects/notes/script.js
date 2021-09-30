const addBtn = document.getElementById('add__btn');

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
	notes.forEach(note => {
		newNote(note);
	})
}

addBtn.addEventListener('click', () => {
	newNote();
})

function newNote(text = '') {
	const note = document.createElement('div');
	note.classList.add('note');

	note.innerHTML = `
	<div class="notes">
	<div class="tools">
		<button class="edit-btn tool-btn ">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
				<path fill-rule="evenodd"
					d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
					clip-rule="evenodd" />
			</svg>
		</button>
		<button class="delete-btn tool-btn">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
				stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
			</svg>
		</button>
	</div>
	<div class="main">
	</div>
	<textarea class="hidden"></textarea>
</div>
	`;

	const editBtn = note.querySelector('.edit-btn');
	const deleteBtn = note.querySelector('.delete-btn');

	const main = note.querySelector('.main');
	const textArea = note.querySelector('textarea');

	textArea.value = text;
	//Why must it be here?
	main.innerHTML = marked(text);

	editBtn.addEventListener('click', () => {
		main.classList.toggle('hidden');
		textArea.classList.toggle('hidden');
		editBtn.classList.toggle('active-btn');
	});

	deleteBtn.addEventListener('click', () => {
		note.remove();

		updateLS();
	});

	textArea.addEventListener('input', (e) => {
		const { value } = e.target;

		main.innerHTML = marked(value);

		updateLS();
	});

	document.body.appendChild(note);
}

function updateLS() {
	const notesText = document.querySelectorAll('textarea');

	const notes = [];

	notesText.forEach(note => {
		notes.push(note.value);
	});

	localStorage.setItem('notes', JSON.stringify(notes));
}



