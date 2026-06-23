const translations = {
  th: {
    'hero-title': 'ยินดีต้อนรับสู่เว็บไซต์ของเรา',
    'hero-desc':  'เริ่มต้นสร้างเว็บสวยๆ ด้วย HTML และ CSS',
    'hero-btn':   'เริ่มต้นเลย',
    'nav-home':   'หน้าแรก',
    'nav-about':  'เกี่ยวกับ',
    'nav-contact':'ติดต่อ',
  },
  en: {
    'hero-title': 'Welcome to Our Website',
    'hero-desc':  'Start building beautiful websites with HTML and CSS',
    'hero-btn':   'Get Started',
    'nav-home':   'Home',
    'nav-about':  'About',
    'nav-contact':'Contact',
  },
    fr: {
    'hero-title': 'Welcome to Our Website',
    'hero-desc':  'Start building beautiful websites with HTML and CSS',
    'hero-btn':   'Get Started',
    'nav-home':   'Home',
    'nav-about':  'About',
    'nav-contact':'Contact',
  }
};

function setLang(lang) {
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  
  const t = translations[lang];
  if (!t) return;
    
  const safeTranslate = (id, text) => {
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = text;
    }
  };

  safeTranslate('description', t.description);
  safeTranslate('member', t.member);
  safeTranslate('member-title', t.member);
  safeTranslate('merchant', t.merchant);
  safeTranslate('merch-des', t.merchdes);
  safeTranslate('titlelink', t.titlelink);
  safeTranslate('foot', t.foot);
  safeTranslate('merchInfo1', t.merchInfo1);
  safeTranslate('merchInfo2', t.merchInfo2);
  safeTranslate('visitmerch', t.visitmerch);

  const langBtn = document.querySelector('.lang-btn');
  if (langBtn) {
    const labels = { fr: '🇫🇷 FR', th: '🇹🇭 TH', en: '🇬🇧 EN' };
    langBtn.innerHTML = `🌐 ${labels[lang] || lang.toUpperCase()} ▾`;
  }
  const langMenu = document.getElementById('lang-menu');
  if (langMenu) {
    langMenu.style.display = 'none';
  }
}
function toggleLangMenu(btn) {
  const menu = document.getElementById('lang-menu');
  if (!menu) return;
  
  const isOpen = menu.style.display === 'flex';
  menu.style.display = isOpen ? 'none' : 'flex';
}
window.addEventListener('click', function(e) {
  const switcher = document.querySelector('.lang-switcher');
  const menu = document.getElementById('lang-menu');
  if (switcher && menu && !switcher.contains(e.target)) {
    menu.style.display = 'none';
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'fr';
  setLang(savedLang);
});
window.setLang = setLang;
window.toggleLangMenu = toggleLangMenu;


// ============ Carousel ============
const track = document.querySelector('.carousel-track');
const carouselItems = document.querySelectorAll('.carousel-item');

if (track && carouselItems.length > 0) {

  const firstClone = carouselItems[0].cloneNode(true);
  const lastClone = carouselItems[carouselItems.length - 1].cloneNode(true);
  track.appendChild(firstClone);
  track.insertBefore(lastClone, carouselItems[0]);

  let position = 1;
  track.style.transform = `translateX(-${position * 100}%)`;

  function next() {
    position++;
    track.style.transition = 'transform 0.3s ease';
    track.style.transform = `translateX(-${position * 100}%)`;
    if (position === carouselItems.length + 1) {
      setTimeout(() => {
        track.style.transition = 'none';
        position = 1;
        track.style.transform = `translateX(-${position * 100}%)`;
      }, 300);
    }
  }

  function prev() {
    position--;
    track.style.transition = 'transform 0.3s ease';
    track.style.transform = `translateX(-${position * 100}%)`;
    if (position === 0) {
      setTimeout(() => {
        track.style.transition = 'none';
        position = carouselItems.length;
        track.style.transform = `translateX(-${position * 100}%)`;
      }, 300);
    }
  }

  window.next = next;
  window.prev = prev;

  setInterval(next, 3000);
}

// ============ Slider  ============
const yearSlider = document.getElementById('yearSlider');
const monthSlider = document.getElementById('monthSlider');
const yearValue = document.getElementById('yearValue');
const monthValue = document.getElementById('monthValue');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

if (yearSlider && monthSlider) {

  yearSlider.addEventListener('input', function() {
    if (yearValue) yearValue.textContent = this.value;
  });

  monthSlider.addEventListener('input', function() {
    if (monthValue) monthValue.textContent = months[parseInt(this.value)];
  });

  function loadData() {
    const year = yearSlider.value;
    const month = months[parseInt(monthSlider.value)];
    const key = `${month}-${year}`; 
    
    const resultEl = document.getElementById('result');
    if (resultEl) {
          fetch(`story2020/${key}.html`)
            .then(response => {
                if (!response.ok) throw new Error('ยังไม่มีการบันทึกข้อมูลในช่วงเวลานี้');
                return response.text();
            })
            .then(htmlContent => {
                resultEl.innerHTML = htmlContent;
                void resultEl.offsetWidth;
                resultEl.className = 'result-platform';
            })
            .catch(err => {
                resultEl.innerHTML = `<h2>${month} ${year}</h2><p style="color: #888;">${err.message}</p>`;
                
                resultEl.className = '';
                void resultEl.offsetWidth;
                resultEl.className = 'result-platform';
            });
    }
  }

  window.loadData = loadData;
}