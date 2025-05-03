const siteHeader = document.getElementById('siteHeader');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
	const currentScroll = window.scrollY;

	if (currentScroll > lastScrollY && currentScroll > 100) {
		siteHeader.classList.add('hide');
	} else {
		siteHeader.classList.remove('hide');
	}

	lastScrollY = currentScroll;
});