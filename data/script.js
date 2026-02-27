/* ============================================================
   LEILANY'S PORTFOLIO — Main JavaScript
   ============================================================ */

/* ── Navbar: scroll effect + mobile toggle ── */
const navbar    = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu   = document.querySelector('.nav-menu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger?.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
  });
});

/* ── Active nav link based on current page ── */
(function setActive() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
})();

/* ── Scroll-triggered animations ── */
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.animate').forEach(el => animObserver.observe(el));

/* ── Skill bar animations ── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.skill-fill');
      if (fill) fill.style.width = fill.dataset.width;
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.skill-bar').forEach(bar => skillObserver.observe(bar));

/* ── Counter animation ── */
function runCounter(el) {
  const target   = +el.dataset.count;
  const suffix   = el.dataset.suffix || '';
  const duration = 1800;
  const step     = target / (duration / 16);
  let current    = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + suffix;
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-count]').forEach(el => counterObserver.observe(el));

/* ── Menu tabs ── */
document.querySelectorAll('.menu-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.menu-category').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.category)?.classList.add('active');
  });
});

/* ── Newsletter form ── */
document.getElementById('newsletter-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  if (email) {
    e.target.style.display = 'none';
    document.getElementById('newsletter-success').style.display = 'block';
  }
});

/* ── Contact form ── */
document.getElementById('contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;
  e.target.querySelectorAll('[required]').forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#8B4500';
      valid = false;
    } else {
      input.style.borderColor = '';
    }
  });
  if (valid) {
    e.target.style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
  }
});

/* ── Event RSVP buttons ── */
document.querySelectorAll('.rsvp-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.textContent = '✓ Reserved!';
    btn.disabled = true;
    btn.style.opacity = '0.7';
  });
});

/* ── Smooth scroll for in-page anchors ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Navbar transparent on hero pages ── */
if (document.querySelector('.hero')) {
  navbar.style.background = 'transparent';
}
