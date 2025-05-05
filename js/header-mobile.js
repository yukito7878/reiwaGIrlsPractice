const menuButton = document.getElementById('mobileMenuButton');
const menuOverlay = document.getElementById('mobileMenuOverlay');

menuButton.addEventListener('click', () => {
	menuOverlay.classList.toggle('show');
});

// メニュー内リンクを押したら自動で閉じる
document.querySelectorAll('.mobile-menu-nav a').forEach(link => {
	link.addEventListener('click', () => {
		menuOverlay.classList.remove('show');
	});
});