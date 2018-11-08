/***********************
 Отправка формы в php BEGIN
 ***********************/
$(function () {
	$(".ajax-form").on("submit", function (event) {
		var form = $(this);
		var send = true;
		event.preventDefault();

		$(this).find("[data-req='true']").each(function () {
			if ($(this).val() === "") {
				$(this).addClass('error');
				send = false;
			}
			if ($(this).is('select')) {
				if ($(this).val() === null) {
					$(this).addClass('error');
					send = false;
				}
			}
			if ($(this).is('input[type="checkbox"]')) {
				if ($(this).prop('checked') !== true) {
					$(this).addClass('error');
					send = false;
				}
			}
			if ($(this).is('input[type="tel"]')) {
				console.log($(this).cleanVal().length);
				if ($(this).cleanVal().length < 10) {
					$(this).addClass('error');
					send = false;
				}
			}
		});

		$(this).find("[data-req='true']").on('focus', function () {
			$(this).removeClass('error');
		});

		// empty file inputs fix for mac
		var fileInputs = $('input[type="file"]:not([disabled])', form);
		fileInputs.each(function (_, input) {
			if (input.files.length > 0) return;
			$(input).prop('disabled', true)
		});

		var form_data = new FormData(this);

		fileInputs.prop('disabled', false);

		$("[data-label]").each(function () {
			var input_name = $(this).attr('name');
			var input_label__name = input_name + '_label';
			var input_label__value = $(this).data('label').toString();
			form_data.append(input_label__name, input_label__value)
		});

		if (send === true) {
			$.ajax({
				type: "POST",
				async: true,
				url: "/send.php",
				cache: false,
				contentType: false,
				processData: false,
				data: form_data,
				success: (function (result) {
					console.log(result);
					$.fancybox.close();
					if (result.indexOf("Mail FAIL") !== -1) {
						$.fancybox.open({src: '#modal-error'});
					} else {
						$.fancybox.open({src: '#modal-thanks'});
						setTimeout(function () {
							$.fancybox.close();
						}, 4500);
						form[0].reset();
					}
				})
			});
		}
	});
});
/***********************
 Отправка формы в php END
 ***********************/


/***********************
 Input mask BEGIN
 ***********************/
$(function () {
	$("input[type='tel']").mask("+7 (000) 000-00-00");
});
/***********************
 Input mask END
 ***********************/


/***********************
 fancybox BEGIN
 ***********************/
$.fancybox.defaults.backFocus = false;
$.fancybox.defaults.lang = 'ru';
$.fancybox.defaults.i18n =
	{
		'ru': {
			CLOSE: 'Закрыть',
			NEXT: 'Дальше',
			PREV: 'Назад',
			ERROR: 'Не удается загрузить. <br/> Попробуйте позднее.',
			PLAY_START: 'Начать слайдшоу',
			PLAY_STOP: 'Остановить слайдшоу',
			FULL_SCREEN: 'На весь экран',
			THUMBS: 'Превью'
		}
	};

function init_fancy() {
	$('.fancy').fancybox({
		buttons: ['close']
	});
	$('.fancy-modal').fancybox({
		selector: '',
		touch: false
	});
	$('.fancy-map').fancybox({
		toolbar: false,
		smallBtn: true,
		defaultType: "iframe"
	});
}

function init_fancy__video() {
	$('.fancy-video').fancybox({
		toolbar: false,
		smallBtn: true,
		youtube: {
			controls: 1,
			showinfo: 0,
			autoplay: 1
		}
	});
}

$(function () {
	init_fancy();
	init_fancy__video();
});
/***********************
 fancybox END
 ***********************/


/***********************
 Прокрутка к секциям BEGIN
 ***********************/
$(function () {
	$('.scrollto').on('click', function () {
		var elementClick = $(this).attr("href");
		var destination = $(elementClick).offset().top;
		$('html,body').stop().animate({scrollTop: destination}, 1000);
		return false;
	});
});
/***********************
 Прокрутка к секциям END
 ***********************/


/***********************
 Waypoints BEGIN
 ***********************/
$(function () {
	$('.anim').waypoint(function () {
		$(this.element).toggleClass('animated');
	}, {
		offset: '85%'
	});
});
/***********************
 Waypoints END
 ***********************/


/***********************
About Slider BEGIN
***********************/
$(document).ready(function() {
	var aboutSliderOptions = {
		contain: true,
		groupCells: 3,
		arrowShape: 'M42.5,26L19,49.5c-0.3,0.3-0.3,0.7,0,0.9l23.5,23.5c0.3,0.3,0.7,0.3,1,0l3-3L28,52.4h50.6 c1.5,0,2.6-1.1,2.6-2.6l0,0c0-1.4-1.2-2.6-2.6-2.6H28.3l18.2-18.1l-3-3.1C43.2,25.8,42.8,25.8,42.5,26L42.5,26z'
	};

	if ( matchMedia('screen and (max-width: 768px)').matches ) {
		aboutSliderOptions.groupCells = false;
	}

	$('.about__slider').flickity(aboutSliderOptions);
	Waypoint.refreshAll();
});
/***********************
About Slider END
***********************/

/***********************
Calendar BEGIN
***********************/
$(document).ready(function() {
	var calendarSliderOptions = {
		contain: true,
		groupCells: 3,
		pageDots: false,
		arrowShape: 'M42.5,26L19,49.5c-0.3,0.3-0.3,0.7,0,0.9l23.5,23.5c0.3,0.3,0.7,0.3,1,0l3-3L28,52.4h50.6 c1.5,0,2.6-1.1,2.6-2.6l0,0c0-1.4-1.2-2.6-2.6-2.6H28.3l18.2-18.1l-3-3.1C43.2,25.8,42.8,25.8,42.5,26L42.5,26z'
	};

	if ( matchMedia('screen and (max-width: 768px)').matches ) {
		calendarSliderOptions.groupCells = 2;
	}
	if ( matchMedia('screen and (max-width: 680px)').matches ) {
		calendarSliderOptions.groupCells = false;
	}

	$('.calendar__list').flickity(calendarSliderOptions);
	Waypoint.refreshAll();
});
/***********************
Calendar END
***********************/