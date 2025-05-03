document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('.fireworks');
  const ctx = canvas.getContext('2d');
  let animations = [];
  const colors = ['#FF324A', '#31FFA6', '#206EFF', '#FFFF99'];

  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle(x, y) {
    return {
      x, y,
      radius: anime.random(6, 12),
      color: colors[anime.random(0, colors.length - 1)],
      dx: anime.random(-10, 10),
      dy: anime.random(-10, 10),
      alpha: 1,
      draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
  }

  function boom(x, y) {
    const particles = Array.from({ length: 30 }, () => createParticle(x, y));
    const anim = anime({
      targets: particles,
      x: p => p.x + anime.random(-100, 100),
      y: p => p.y + anime.random(-100, 100),
      radius: 0,
      alpha: 0,
      easing: 'easeOutExpo',
      duration: 1500,
      update: () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => p.draw());
      },
      complete: () => {
        animations = animations.filter(a => a !== anim);
      }
    });
    animations.push(anim);
  }

  setCanvasSize();
  window.addEventListener('resize', setCanvasSize);

  document.body.classList.add('ready');

  // アニメーション開始
  const text = document.getElementById('text-outline');
  const length = text.getComputedTextLength();
  text.setAttribute('stroke-dasharray', length);
  text.setAttribute('stroke-dashoffset', length);

  anime({
    targets: text,
    strokeDashoffset: [length, 0],
    duration: 3000,
    easing: 'easeOutQuad',
    complete: () => {
      const bbox = text.getBoundingClientRect();
      boom(bbox.left + bbox.width / 2, bbox.top + bbox.height / 2);
    }
  });
});


anime({
  targets: text,
  strokeDashoffset: [length, 0],
  duration: 3000,
  easing: 'easeOutQuad',
  complete: () => {
    const bbox = text.getBoundingClientRect();
    boom(bbox.left + bbox.width / 2, bbox.top + bbox.height / 2);

    // 🌟 1秒後にロゴ消して、コンテンツ表示
    setTimeout(() => {
      document.querySelector('.logo').classList.add('fade-out-up');
      setTimeout(() => {
        document.querySelector('.logo').style.display = 'none';
        document.querySelector('.main-content').style.display = 'block';
      }, 800); // ← フェードアップの時間と同じにする
    }, 1000);
  }
});
