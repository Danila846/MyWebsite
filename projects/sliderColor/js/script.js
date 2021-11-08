$(".btn-bg").click(function (event) {
	$(".color").removeClass("text-color").addClass("background-color");
	$('.btn-text').removeClass('active');
	$(this).addClass('active');
});
$(".btn-text").click(function (event) {
	$(".color").removeClass("background-color").addClass("text-color");
	$('.btn-bg').removeClass('active');
	$(this).addClass('active');
});

var gradientColor = 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)';
$(".slider").css("background", gradientColor).slider({
	value: 0,
	min: 0,
	max: 360,
	slide: function (e, ui) {
		var colorValue = ui.value.toString(10);
		if (colorValue.length < 2) colorValue = "0" + colorValue;

		var chosenColor = `hsl(${colorValue}, 100%, 50%);`;

		$(".background-color").css("backgroundColor", chosenColor);
		$(".text-color").css("color", chosenColor);
	}
});
