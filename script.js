export function initializeSiteEffects() {
document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menuButton.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    nav.classList.toggle('open', !open);
    document.body.classList.toggle('menu-open', !open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      document.body.classList.remove('menu-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
      menuButton.focus();
    }
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const isLowPowerDevice = () => window.matchMedia('(max-width: 640px), (pointer: coarse)').matches
  || (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4);

const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
}, { threshold: 0.12 }) : null;
document.querySelectorAll('.reveal').forEach(el => observer ? observer.observe(el) : el.classList.add('visible'));

const ledCanvas = document.querySelector('.hero-led-canvas');
if (ledCanvas && typeof ledCanvas.getContext === 'function') {
  const context = ledCanvas.getContext('2d');
  const heroVisual = ledCanvas.closest('.hero-visual');
  if (context && heroVisual) {
    let width = 0;
    let height = 0;
    let elapsed = 0;
    let lastTimestamp = 0;
    let frame = 0;
    let visible = true;

    const rotate = (point, time) => {
      const [x0, y0, z0] = point;
      const y = y0 * Math.cos(time) - z0 * Math.sin(time);
      const z1 = y0 * Math.sin(time) + z0 * Math.cos(time);
      const x = x0 * Math.cos(time * 0.72) + z1 * Math.sin(time * 0.72);
      const z = -x0 * Math.sin(time * 0.72) + z1 * Math.cos(time * 0.72);
      const perspective = 3.8 / (3.8 + z);
      return [
        width / 2 + x * width * 0.24 * perspective,
        height / 2 + y * height * 0.24 * perspective
      ];
    };

    const resizeCanvas = () => {
      const bounds = heroVisual.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, isLowPowerDevice() ? 1 : 1.25);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      ledCanvas.width = Math.round(width * pixelRatio);
      ledCanvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      drawScene();
    };

    const drawScene = () => {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      const time = elapsed * 0.00022;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.23;
      const ambient = context.createRadialGradient(centerX, centerY, 2, centerX, centerY, radius * 2.4);
      ambient.addColorStop(0, 'rgba(15,252,190,0.07)');
      ambient.addColorStop(0.55, 'rgba(16,110,190,0.06)');
      ambient.addColorStop(1, 'rgba(16,110,190,0)');
      context.fillStyle = ambient;
      context.fillRect(0, 0, width, height);

      const cube = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
      ].map(point => rotate(point, time));
      const edges = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
      context.save();
      context.globalAlpha = 0.42;
      context.lineWidth = 1;
      context.strokeStyle = 'rgba(150,194,219,0.42)';
      edges.forEach(([start, end]) => {
        context.beginPath();
        context.moveTo(cube[start][0], cube[start][1]);
        context.lineTo(cube[end][0], cube[end][1]);
        context.stroke();
      });
      context.restore();

      const steps = isLowPowerDevice() ? 72 : 112;
      ['16,110,190', '15,252,190'].forEach((color, ribbon) => {
        const phase = time * (ribbon ? -1 : 1) + ribbon * 2.1;
        context.beginPath();
        for (let step = 0; step <= steps; step += 1) {
          const angle = step / steps * Math.PI * 2;
          const wave = Math.sin(angle * 2 + phase) * radius * 0.14;
          const point = [
            Math.cos(angle + phase) * (radius * 1.08 + wave),
            Math.sin(angle * 2 + phase * 0.65) * radius * 0.46,
            Math.sin(angle + phase) * radius * 0.76
          ];
          const projected = rotate(point.map(value => value / radius), time * 0.42);
          if (step === 0) context.moveTo(projected[0], projected[1]);
          else context.lineTo(projected[0], projected[1]);
        }
        context.closePath();
        context.save();
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = `rgba(${color},0.18)`;
        context.lineWidth = 7;
        context.shadowBlur = 18;
        context.shadowColor = `rgba(${color},0.55)`;
        context.stroke();
        context.strokeStyle = `rgba(${color},0.82)`;
        context.lineWidth = 1.8;
        context.shadowBlur = 9;
        context.stroke();
        context.strokeStyle = 'rgba(229,250,255,0.55)';
        context.lineWidth = 0.55;
        context.shadowBlur = 4;
        context.stroke();
        context.restore();
      });
    };

    const animate = timestamp => {
      if (!visible) {
        frame = 0;
        return;
      }
      if (lastTimestamp && timestamp - lastTimestamp < 33) {
        frame = window.requestAnimationFrame(animate);
        return;
      }
      elapsed += lastTimestamp ? Math.min(timestamp - lastTimestamp, 40) : 0;
      lastTimestamp = timestamp;
      drawScene();
      frame = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!frame && visible) frame = window.requestAnimationFrame(animate);
    };

    const updateVisibility = entries => {
      visible = entries[0].isIntersecting;
      if (!visible && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      } else {
        startAnimation();
      }
    };

    if ('ResizeObserver' in window) {
      new ResizeObserver(resizeCanvas).observe(heroVisual);
    } else {
      window.addEventListener('resize', resizeCanvas, { passive: true });
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(updateVisibility, { threshold: 0.05 }).observe(heroVisual);
    }
    resizeCanvas();
    startAnimation();
  }
}

const whyCanvas = document.querySelector('.why-led-canvas');
if (whyCanvas && typeof whyCanvas.getContext === 'function') {
  const context = whyCanvas.getContext('2d');
  if (context) {
    const section = whyCanvas.closest('.why-section');
    let width = 0;
    let height = 0;
    let elapsed = 0;
    let lastTimestamp = 0;
    let frame = 0;
    let visible = true;

    const drawTrails = () => {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      const time = elapsed * 0.00012;
      const colors = ['16,110,190', '15,252,190', '150,194,219'];
      const trailWidth = Math.min(width * 0.92, height * 2.15, 1100);
      const trailHeight = Math.min(height * 0.55, trailWidth * 0.72, 420);

      const lowPower = isLowPowerDevice();
      const ribbonCount = lowPower ? 2 : colors.length;
      const steps = lowPower ? 96 : 160;
      colors.slice(0, ribbonCount).forEach((color, ribbon) => {
        const phase = time * (ribbon === 1 ? -0.75 : 0.55) + ribbon * 1.65;
        const points = [];
        for (let step = 0; step <= steps; step += 1) {
          const angle = step / steps * Math.PI * 2;
          const x = Math.cos(angle + phase) * 0.44;
          const y = Math.sin(angle * 2 + phase * 0.72) * 0.34;
          const z = Math.sin(angle + phase) * 0.8;
          const perspective = 2.8 / (2.8 + z);
          points.push([
            width * 0.5 + x * trailWidth * perspective,
            height * 0.5 + y * trailHeight * perspective
          ]);
        }

        context.beginPath();
        points.forEach(([x, y], index) => {
          if (index === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        });
        context.closePath();
        context.save();
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = `rgba(${color},0.08)`;
        context.lineWidth = 8;
        context.shadowColor = `rgba(${color},0.18)`;
        context.shadowBlur = 20;
        context.stroke();
        context.strokeStyle = `rgba(${color},0.22)`;
        context.lineWidth = 1.5;
        context.shadowBlur = 10;
        context.stroke();
        context.strokeStyle = 'rgba(255,255,255,0.42)';
        context.lineWidth = 0.55;
        context.shadowBlur = 5;
        context.stroke();
        context.restore();

        const particleAngle = time * (ribbon === 1 ? -0.75 : 0.55) + ribbon * 1.65;
        const particleX = width * 0.5 + Math.cos(particleAngle) * trailWidth * 0.22;
        const particleY = height * 0.5 + Math.sin(particleAngle * 2) * trailHeight * 0.28;
        context.beginPath();
        context.arc(particleX, particleY, 1.7, 0, Math.PI * 2);
        context.fillStyle = `rgba(${color},0.6)`;
        context.shadowColor = `rgba(${color},0.4)`;
        context.shadowBlur = 9;
        context.fill();
        context.shadowBlur = 0;
      });
    };

    const resizeCanvas = () => {
      const bounds = section.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, isLowPowerDevice() ? 1 : 1.25);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      whyCanvas.width = Math.round(width * pixelRatio);
      whyCanvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      drawTrails();
    };

    const animate = timestamp => {
      if (!visible) {
        frame = 0;
        drawTrails();
        return;
      }
      if (lastTimestamp && timestamp - lastTimestamp < 33) {
        frame = window.requestAnimationFrame(animate);
        return;
      }
      elapsed += lastTimestamp ? Math.min(timestamp - lastTimestamp, 40) : 0;
      lastTimestamp = timestamp;
      drawTrails();
      frame = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!frame && visible) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const whyObserver = 'IntersectionObserver' in window
      ? new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        if (!visible && frame) {
          window.cancelAnimationFrame(frame);
          frame = 0;
        } else {
          startAnimation();
        }
      }, { threshold: 0.02 })
      : null;

    if ('ResizeObserver' in window) {
      new ResizeObserver(resizeCanvas).observe(section);
    } else {
      window.addEventListener('resize', resizeCanvas, { passive: true });
    }
    if (whyObserver) whyObserver.observe(section);
    resizeCanvas();
    startAnimation();
  }
}

const tiltCards = document.querySelectorAll('.solution-card');
const updateTiltAvailability = () => {
  const enabled = window.innerWidth > 980;
  tiltCards.forEach(card => {
    card.classList.toggle('tilt-card', enabled);
    if (!enabled) {
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
    }
  });
};
tiltCards.forEach(card => {
  card.addEventListener('pointermove', event => {
    if (!card.classList.contains('tilt-card')) return;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.setProperty('--tilt-x', `${-y * 3.5}deg`);
    card.style.setProperty('--tilt-y', `${x * 3.5}deg`);
  });
  card.addEventListener('pointerleave', () => {
    card.style.removeProperty('--tilt-x');
    card.style.removeProperty('--tilt-y');
  });
});
window.addEventListener('resize', updateTiltAvailability, { passive: true });
updateTiltAvailability();

const inquiryType = document.querySelector('#inquiry-type');
document.querySelectorAll('[data-inquiry]').forEach(link => {
  link.addEventListener('click', () => {
    if (inquiryType) inquiryType.value = link.dataset.inquiry;
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 980 && nav) {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    if (menuButton) { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open menu'); }
  }
});


// Form integration: set WOLION_FORM_ENDPOINT in form-config.js. Until configured,
// submissions are blocked and users receive an explicit setup message.
const forms = document.querySelectorAll('[data-integrated-form]');
forms.forEach(form => {
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const status = form.querySelector('[data-form-status]');
    const submit = form.querySelector('[type="submit"]');
    if (submit && submit.disabled) return;

    const endpoint = window.WOLION_FORM_ENDPOINT || '';
    if (!endpoint) {
      if (status) {
        status.className = 'form-status error';
        status.textContent = 'This form is ready, but submission is not configured yet. Please configure WOLION_FORM_ENDPOINT before production use.';
      }
      return;
    }

    if (submit) { submit.disabled = true; submit.textContent = 'Sending…'; }
    if (status) { status.className = 'form-status'; status.textContent = 'Submitting securely…'; }

    try {
      const payload = new FormData(form);
      const response = await fetch(endpoint, { method: 'POST', body: payload, headers: { 'Accept': 'application/json' } });
      if (!response.ok) throw new Error('Submission was not accepted');
      form.reset();
      if (status) { status.className = 'form-status success'; status.textContent = 'Thank you. Your submission was received successfully.'; }
    } catch (error) {
      if (status) { status.className = 'form-status error'; status.textContent = 'We could not submit your information. Please try again or contact the site administrator.'; }
    } finally {
      if (submit) { submit.disabled = false; submit.textContent = submit.dataset.label || 'Submit'; }
    }
  });
});
}
