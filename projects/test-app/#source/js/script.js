let cat_1 = document.getElementById('category1');

function changeCategory1() {
	cat_1.innerHTML = 'Каталог'
}
function changeCategory2() {
	cat_1.innerHTML = 'Здоровье'
}
function changeCategory3() {
	cat_1.innerHTML = 'Красота'
}
function changeCategory4() {
	cat_1.innerHTML = 'Развлечения'
}
function changeCategory5() {
	cat_1.innerHTML = 'Авто'
}
//==================================================
let tron = document.querySelector('.header__search');
document.addEventListener("scroll", () => {
	if (window.scrollY > 29) {
		tron.classList.add('search');
	} else {
		tron.classList.remove('search');
	}
})
//==================================================
let adder = document.querySelectorAll(".menu__category");
let itemHeight = document.querySelectorAll('.menu__item');
let adderOne = document.querySelector(".sidebar__burger");
let adderBur = document.querySelector(".sidebar__burger-bc");
let adderWrap = document.querySelector(".wrapper");
let cardsActive = document.querySelector('.content__cards');
let addSidebar = document.querySelector('.sidebar');
let addMenu = document.querySelector('.menu');
let addLogo = document.querySelector('.logo__title');

function classAdder() {
	var i = 0;
	for (i = 0; i < adder.length; ++i) {
		adder[i].classList.toggle('active');
	}
	for (i = 0; i < itemHeight.length; ++i) {
		itemHeight[i].classList.toggle('height');
	}
	{ adderOne.classList.toggle('active'); }
	{ adderWrap.classList.toggle('active'); }
	{ adderBur.classList.toggle('active'); }
	{ cardsActive.classList.toggle('active'); }
	{ addSidebar.classList.toggle('active'); }
	{ addMenu.classList.toggle('active'); }
	{ addLogo.classList.toggle('active'); }
}
//===================================================
let menuItem = '.menu__item';
let adderSecond = document.querySelectorAll(menuItem);

adderSecond.forEach(menuItem => {
	menuItem.addEventListener('click', function () {
		adderSecond.forEach(div => div.classList.remove('active'));
		this.classList.add('active');
	})
})
//===================================================
let card = '.card';
let adderCard = document.querySelectorAll(card);

adderCard.forEach(card => {
	card.addEventListener('click', function () {
		adderCard.forEach(div => div.classList.remove('active'));
		this.classList.add('active');
	})
})
//======================================================
