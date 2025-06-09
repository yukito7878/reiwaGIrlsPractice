$(function() {
	const transitionBg = $('.page-transition-bg');
	const bgContents = $('.page-transition-bg .bg-content');
	const isFromTransition = sessionStorage.getItem('fromTransition') === 'true';

	if (isFromTransition) {
		sessionStorage.setItem('fromTransition', 'false');
		transitionBg.addClass('animate-open');

		setTimeout(() => {
			transitionBg.removeClass('animate-open').hide();
			bgContents.css('transform', 'translateY(0)');
		}, 1600);
	} else {
		// 🔧 リロードなどで誤って表示されっぱなしになったら強制非表示にする
		transitionBg.hide();
	}

	$('a.transition-link').on('click', function(e) {
		const url = $(this).attr('href');
		if (url && url.indexOf('#') !== 0 && !$(this).attr('target')) {
			e.preventDefault();
			sessionStorage.setItem('fromTransition', 'true');
			transitionBg.show().addClass('animate-out');

			setTimeout(() => {
				window.location.href = url;
			}, 1000);
		}
	});
});
