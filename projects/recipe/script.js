const container = document.getElementById('container');
const mealsEl = document.getElementById('meals');
const favoriteMeals = document.getElementById('fav__meals');
const searchTerm = document.getElementById('search__term');
const searchBtn = document.getElementById('search__btn');

const openInfo = document.getElementById('meal-info-container');
const basicInfoEl = document.getElementById('meal-info__basic');
const closeInfoBtn = document.getElementById('close-info');

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
	const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
	const respData = await resp.json();
	const randomMeal = respData.meals[0];

	addMeal(randomMeal, true);
}

async function getMealById(id) {
	const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
	const respData = await resp.json();
	const meal = respData.meals[0];

	return meal;
}

async function getMealsBySearch(term) {
	const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term);

	const respData = await resp.json();
	const meals = respData.meals;

	return meals;
}

function addMeal(mealData, random = false) {
	const meal = document.createElement('div');
	meal.classList.add('meal');

	meal.innerHTML = `
		<div class="meal__header">
			${random ? `<span class="random">Random Recipe</span>` : ''}
			<img
				src="${mealData.strMealThumb}"
				alt="${mealData.strMeal}">
		</div>
		<div class="meal__body">
			<h4>${mealData.strMeal}</h4>
			<button class="meal__btn">
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
					</path>
				</svg>
			</button>
		</div>
	`;
	const likeBtn = meal.querySelector('.meal__body .meal__btn');

	likeBtn.addEventListener('click', () => {
		if (likeBtn.classList.contains('active')) {
			removeMealLS(mealData.idMeal);
			likeBtn.classList.remove('active');
		} else {
			addMealLS(mealData.idMeal);
			likeBtn.classList.add('active');
		}

		fetchFavMeals();
	});
	meal.addEventListener('click', (e) => {
		const image = meal.querySelector('.meal__header img');
		const fourTitle = meal.querySelector('h4');
		if (e.target == image || e.target == fourTitle) {
			showMealInfo(mealData);
		}
	});

	mealsEl.appendChild(meal);
}

function addMealLS(mealId) {
	const mealIds = getMealsLS();

	localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}
function removeMealLS(mealId) {
	const mealIds = getMealsLS();

	localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id !== mealId)));
}
function getMealsLS() {
	const mealIds = JSON.parse(localStorage.getItem('mealIds'));

	return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
	favoriteMeals.innerHTML = '';

	const mealIds = getMealsLS();

	for (let i = 0; i < mealIds.length; i++) {
		const mealId = mealIds[i];
		let meal = await getMealById(mealId);

		addMealFav(meal);
	}
}
// const meals = [];
// meals.push(meal);

function addMealFav(mealData) {
	const favMeal = document.createElement('li');

	favMeal.innerHTML = `
			<img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
			<span>${mealData.strMeal}</span>
			<button class="close__btn clear">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</button>
	`;
	const closeBtn = favMeal.querySelector('.clear');

	closeBtn.addEventListener('click', () => {
		removeMealLS(mealData.idMeal);
		fetchFavMeals();
	});

	favMeal.addEventListener('click', (e) => {
		const image = favMeal.querySelector('img');
		const fourTitle = favMeal.querySelector('span');
		if (e.target == image || e.target == fourTitle) {
			showMealInfo(mealData);
		}
	});

	favoriteMeals.appendChild(favMeal);
}

function showMealInfo(mealData) {
	basicInfoEl.innerHTML = '';

	const mealEl = document.createElement('div');

	const ingredients = [];
	for (let i = 1; i < 20; i++) {
		if (mealData['strIngredient' + i]) {
			ingredients.push(`${mealData['strIngredient' + i]} - ${mealData['strMeasure' + i]}`);
		} else {
			break;
		}
	}

	mealEl.innerHTML = `
		<h1>${mealData.strMeal}</h1>
		<img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
		<p>${mealData.strInstructions}</p>
		<h3>Ingredients:</h3>
		<ul class="ingredients">
			${ingredients.map((ing) => `
			<li>${ing}</li>
			`).join('')}
		</ul>
	`;

	basicInfoEl.appendChild(mealEl);

	openInfo.classList.remove('hidden');
	document.body.classList.add('scroll');

}

searchBtn.addEventListener('click', async () => {
	mealsEl.innerHTML = '';

	const search = searchTerm.value;

	const meals = await getMealsBySearch(search);

	if (meals) {
		meals.forEach(meal => {
			addMeal(meal);
		})
	} else {
		mealsEl.innerHTML = `
			<div class="nothing">Nothing was found</div>
		`
	}
});
closeInfoBtn.addEventListener('click', () => {
	openInfo.classList.add('hidden');
	document.body.classList.remove('scroll');
})
