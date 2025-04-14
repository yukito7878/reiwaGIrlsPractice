// ==================== 初期アニメーション処理 ==================== //
// ロゴ〜トップビューの演出は必要に応じて有効化
// window.addEventListener("load", () => {
//   const loader = document.getElementById("loader");
//   const intro = document.querySelector(".hero-intro");
//   const hero = document.querySelector(".hero");

//   setTimeout(() => {
//     loader.classList.add("fade-out");
//     setTimeout(() => {
//       loader.style.display = "none";
//       intro.style.display = "flex";
//       intro.classList.add("fade-in");
//       setTimeout(() => {
//         intro.classList.remove("fade-in");
//         intro.classList.add("fade-out");
//         setTimeout(() => {
//           intro.style.display = "none";
//           hero.style.display = "flex";
//           hero.classList.add("fade-in");
//         }, 1000);
//       }, 2500);
//     }, 1000);
//   }, 2500);
// });


// ==================== ヘッダースナップ処理 ==================== //
const header = document.getElementById('header');
let isSnapping = false;
let isShrinking = false;

window.addEventListener('scroll', () => {
	const scrollY = window.scrollY;

	if (scrollY > 100 && !isShrinking && !isSnapping && scrollY < 150) {
		isShrinking = true;
		isSnapping = true;
		header.classList.remove('init');
		header.classList.add('moving');

		setTimeout(() => {
			window.scrollTo(0, 200);
			header.classList.remove('moving');
			header.classList.add('shrink');
			lockUserInteraction(2000);
			setTimeout(() => isSnapping = false, 600);
		}, 300);
	}

	if (scrollY <= 50 && isShrinking) {
		header.classList.remove('shrink', 'moving');
		header.classList.add('init');
		isShrinking = false;
	}
});

function lockUserInteraction(duration = 2000) {
	const locker = document.getElementById('scroll-locker');
	if (!locker) return;
	locker.style.display = 'block';
	setTimeout(() => locker.style.display = 'none', duration);
}


// ==================== スクロールインジケーター制御 ==================== //
const scrollIndicator = document.querySelector('.scroll-indicator');
window.addEventListener('scroll', () => {
	scrollIndicator.style.display = window.scrollY > 50 ? 'none' : 'block';
});


// ==================== 文字アニメーション ==================== //
window.addEventListener("DOMContentLoaded", () => {
	const targets = document.querySelectorAll('.animate-text');

	targets.forEach(target => {
		const text = target.innerHTML;
		const parts = text.split(/(<br\s*\/?>)/g);
		const splitText = parts.map(part => part.match(/<br\s*\/?>/)
			? part
			: part.split('').map((char, i) => `<span class="char" style="animation-delay:${i * 0.04}s">${char}</span>`).join('')
		).join('');
		target.innerHTML = splitText;
		target.classList.add('before-animate');
	});

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('animate');
				observer.unobserve(entry.target);
			}
		});
	}, { rootMargin: '-15% 0% -15% 0%', threshold: 0 });

	targets.forEach(el => observer.observe(el));
});


// ==================== 回転アニメーション ==================== //
const introSection = document.querySelector('.intro-section');

// ❗ 複数対応に変更：複数の要素を取得する
const rightEls = document.querySelectorAll('.scroll-rotate-right'); // ← 修正①
const leftEls = document.querySelectorAll('.scroll-rotate-left');   // ← 修正②

const fadeInElements = document.querySelectorAll('.fade-in-delay');

let inView = false;
let startScrollY = 0;
let currentScrollY = 0;
let targetScrollY = 0;
let animationFrameId = null;

// IntersectionObserver設定
const introObserver = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			inView = true;
			startScrollY = window.scrollY;
			entry.target.classList.add('show');
			introObserver.unobserve(entry.target);
		} else {
			inView = false;
		}
	});
}, { threshold: 0.3 });

introObserver.observe(introSection);
fadeInElements.forEach(el => introObserver.observe(el));

function animateRotation() {
	currentScrollY += (targetScrollY - currentScrollY) * 0.1;
	const deltaY = currentScrollY - startScrollY;
	const maxDeg = 20;
	const rotateRight = Math.min(deltaY * 0.015, maxDeg);
	const rotateLeft = -Math.min(deltaY * 0.015, maxDeg);

	// ❗ 複数要素に対してループでtransformを適用（forEach使用）
	rightEls.forEach(el => { // ← 修正③
		el.style.transform = `rotate(${rotateRight}deg)`;
	});

	leftEls.forEach(el => { // ← 修正④
		el.style.transform = `rotate(${rotateLeft}deg)`;
	});

	animationFrameId = requestAnimationFrame(animateRotation);
}

window.addEventListener('scroll', () => {
	if (!inView) return;
	targetScrollY = window.scrollY;
	if (!animationFrameId) animateRotation();
});

// ==================== 背景ギャラリーのパララックス風アニメ ==================== //
const galleryItems = document.querySelectorAll('.floating-gallery li');
const whiteGalleryItems = document.querySelectorAll('.floating-white-gallery li');
const bgWrapper = document.getElementById('floatingBackground');
const gallerySection = document.querySelector('.gallery');

let scrollY = 0;
let targetY = 0;
let baseOffset = 0;
let hasEntered = false;

function animateGallery() {
	scrollY += (targetY - scrollY) * 0.1;
	const delta = scrollY - baseOffset;

	galleryItems.forEach(item => {
		const offset = -delta * 0.15;
		item.style.transform = `translateY(${offset}px)`;
		const rect = item.getBoundingClientRect();
		item.style.opacity = rect.top < window.innerHeight && rect.bottom > 0 ? 1 : 0;
	});

	whiteGalleryItems.forEach((item, index) => {
		const offset = -delta * (0.025 + index * 0.01);
		item.style.transform = `translateY(${offset}px)`;
		item.style.opacity = offset < -window.innerHeight ? 0 : 1;
	});

	requestAnimationFrame(animateGallery);
}

function onScrollGallery() {
	targetY = window.scrollY;
	const rect = gallerySection.getBoundingClientRect();
	const inView = rect.top < window.innerHeight && rect.bottom > 0;
	bgWrapper.classList.toggle('visible', inView);

	if (inView && !hasEntered) {
		baseOffset = window.scrollY;
		hasEntered = true;
	}
}

window.addEventListener('scroll', onScrollGallery);
animateGallery();