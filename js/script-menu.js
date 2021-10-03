const burger = document.querySelector('.header__burger');
const menuBurger = document.querySelector('.header__list');
const header = document.querySelector('.header');

const liEls = document.querySelectorAll('.header__list li');

burger.addEventListener('click', () => {
	burger.classList.toggle('active__burger');
	menuBurger.classList.toggle('active__burger');
	header.classList.toggle('active__burger');
	document.body.classList.toggle('lock');
	liEls.forEach(liEl => {
		liEl.classList.toggle('fade')
	})
})


