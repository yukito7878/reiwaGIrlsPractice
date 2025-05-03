window.addEventListener('DOMContentLoaded', () => {
	const mask = document.getElementById('pageEntryMask');
	if (mask) {
		mask.addEventListener('animationend', () => {
			mask.remove(); // アニメーション後にDOMから削除して軽くする
		});
	}
});


const exitMask = document.getElementById('pageExitMask');

document.querySelectorAll('a[href]:not([href^="#"]):not([target])').forEach(link => {
	link.addEventListener('click', function(e) {
		e.preventDefault();
		const url = this.href;

		exitMask.classList.add('active');

		setTimeout(() => {
			window.location.href = url;
		}, 600); // CSSと同じ0.6秒後に遷移
	});
});