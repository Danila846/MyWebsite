const toggleFirstEls = document.querySelectorAll('.toggle-mobile-first');
const toggleSecondEls = document.querySelectorAll('.toggle-mobile-second');
const link = document.querySelectorAll('a');

document.addEventListener('click', () => {
	if (window.innerWidth <= 864) {
		toggleFirstEls.forEach(toggleFirstEl => {
			toggleFirstEl.classList.toggle('hide-mobile');
		});
		toggleSecondEls.forEach(toggleSecondEl => {
			toggleSecondEl.classList.toggle('hide-mobile');
		})
	}
});