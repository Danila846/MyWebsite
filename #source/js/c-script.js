$('.file__input').change(function () {
	if ($(this).val() != '') $(this).closest('.attach').children('.label-file').text('Choose files: ' + $(this)[0].files.length);
	else $(this).prev().text('Attach files');
});