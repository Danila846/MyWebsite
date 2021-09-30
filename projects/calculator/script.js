const darkColor = document.querySelector('.themes .dark');
const lightColor = document.querySelector('.themes .light');
const items = document.querySelectorAll('div .item');
const orangesEls = document.querySelectorAll('.orange');
const type = document.querySelector('.type');

const result = document.querySelector('.result');
const equalButton = document.querySelector('.equal');
const title = document.querySelector('h2');

function darkTheme() {
	document.body.className = 'dark-theme';
	items.forEach(item => {
		item.classList.remove('dark-color');
		item.classList.add('light-color');
		title.style.color = '#fff';
	});
	orangesEls.forEach(orange => {
		orange.style.color = 'hsl(231, 98%, 65%)';
	});
	equalButton.style.backgroundColor = 'hsl(231, 98%, 65%)';
}
function lightTheme() {
	document.body.className = 'light-theme';
	items.forEach(item => {
		item.classList.remove('light-color');
		item.classList.add('dark-color');
		title.style.color = '#000';
	});
	orangesEls.forEach(orange => {
		orange.style.color = 'hsl(31, 98%, 55%)';
	});
	equalButton.style.backgroundColor = 'hsl(31, 98%, 55%)';
}

darkColor.addEventListener('click', darkTheme);
lightColor.addEventListener('click', lightTheme);
//================
let power = '';
//======================================================
function insert(num) {
	if (result.textContent == '0' || result.textContent == 'NaN') {
		result.textContent = '';
		result.textContent = result.textContent + num;
	} else {
		result.textContent = result.textContent + num;
	}
	if (num === '.' && result.textContent.includes('.')) return;
	if (result.textContent.includes('++') || result.textContent.includes('--') || result.textContent.includes('**') || result.textContent.includes('//') ||
		result.textContent.includes('((') || result.textContent.includes('))') || result.textContent.includes('()') || result.textContent.includes(')(') ||
		result.textContent.includes('+)') || result.textContent.includes('-)') || result.textContent.includes('*)') || result.textContent.includes('/)') ||
		result.textContent.includes('(+') || result.textContent.includes('(-') || result.textContent.includes('(*') || result.textContent.includes('(/') ||
		result.textContent.includes('+-') || result.textContent.includes('+*') || result.textContent.includes('+/') || result.textContent.includes('-+') ||
		result.textContent.includes('-*') || result.textContent.includes('-/') || result.textContent.includes('*+') || result.textContent.includes('*-') ||
		result.textContent.includes('1(') || result.textContent.includes('2(') || result.textContent.includes('3(') || result.textContent.includes('4(') ||
		result.textContent.includes('5(') || result.textContent.includes('6(') || result.textContent.includes('7(') || result.textContent.includes('8(') ||
		result.textContent.includes('9(') || result.textContent.includes('0(') ||
		result.textContent.includes('*/') || result.textContent.includes('/+') || result.textContent.includes('/-') || result.textContent.includes('/*')) back();
	if (result.textContent == '*' || result.textContent == '+' || result.textContent == '/') {
		result.textContent = '0';
	}
}
function clean() {
	result.textContent = '0';
	power = '';
}
function back() {
	let exp = result.textContent;
	result.textContent = exp.substring(0, exp.length - 1);
	if (result.textContent == '') {
		result.textContent = "0";
	}
}
function equal() {
	let exp = result.textContent;
	if (result.textContent.includes('^')) {
		let tmp = result.textContent.split('^');
		console.log(tmp);
		let num = eval(power);
		let pow = +tmp[1];
		result.textContent = Math.pow(num, pow);
		power = '';
		return;
	}
	if (exp) {
		result.textContent = eval(exp);
	}
}
function percent() {
	result.textContent = eval(result.textContent) / 100;
}
function constant(name) {
	let i = result.textContent.length - 1;
	let constPi = Math.PI.toFixed(8);
	let constE = Math.E.toFixed(8);
	if (name == 'pi') {
		if (result.textContent[i] == '+') {
			result.textContent += constPi;
		}
		if (result.textContent[i] == '-') {
			back();
			result.textContent -= constPi;
		}
		if (result.textContent[i] == '*') {
			back();
			result.textContent *= constPi;
		}
		if (result.textContent[i] == '/') {
			back();
			result.textContent /= constPi;
		}
	}
	if (name == 'e') {
		if (result.textContent[i] == '+') {
			back();
			result.textContent += constE;
		}
		if (result.textContent[i] == '-') {
			back();
			result.textContent -= constE;
		}
		if (result.textContent[i] == '*') {
			back();
			result.textContent *= constE;
		}
		if (result.textContent[i] == '/') {
			back();
			result.textContent /= constE;
		}
	}
}
function operation(name) {
	let num = eval(result.textContent);
	if (name == 'sqrt') {
		result.textContent = Math.sqrt(num);
	}
	if (name == 'sqr') {
		result.textContent = Math.pow(num, 2);
	}
	if (name == '^-1') {
		result.textContent = Math.pow(num, -1);
	}
	if (name == '^') {
		power = result.textContent;
		result.textContent += "^";
	}
}
function factorial(n) {
	return (n != 1) ? n * factorial(n - 1) : 1;
}
function fact() {
	result.textContent = factorial(+eval(result.textContent));
}
function log(name) {
	if (name == 'lg') {
		result.textContent = Math.log10(eval(result.textContent)).toFixed(8);
	}
	if (name == 'ln') {
		result.textContent = Math.log(eval(result.textContent)).toFixed(8);
	}
}

type.addEventListener('click', function () {
	if (type.textContent == 'deg') {
		this.textContent = 'rad';
	} else if (type.textContent == 'rad') {
		this.textContent = 'deg';
	}
})

//sin, cos, tg, ctg
function sctc(name) {
	let num = eval(result.textContent);
	if (name == 'sin') {
		if (type.textContent == 'deg') {
			result.textContent = parseFloat(Math.sin(num / 180 * Math.PI).toFixed(8).toString());
		} else {
			result.textContent = Math.sin(num).toFixed(8).toString();
		}
	}
	if (name == 'cos') {
		if (type.textContent == 'deg') {
			result.textContent = parseFloat(Math.cos(num / 180 * Math.PI).toFixed(8).toString());
		} else {
			result.textContent = Math.cos(num).toFixed(8).toString();
		}
	}
	if (name == 'tan') {
		if (type.textContent == 'deg') {
			result.textContent = parseFloat(Math.tan(num / 180 * Math.PI).toFixed(8).toString());
		} else {
			result.textContent = Math.tan(num).toFixed(8).toString();
		}
	}
	if (name == 'ctg') {
		if (type.textContent == 'deg') {
			result.textContent = parseFloat(1 / Math.sin(num / 180 * Math.PI).toFixed(8).toString());
		} else {
			result.textContent = 1 / Math.tan(num).toFixed(8).toString();
		}
	}
}
