const dishes = [
  { title: '炭烤谷饲牛排', price: 168, description: '炭火慢烤 / 迷迭香 / 当季时蔬', category: 'fire', tag: '山野招牌', image: 'photo-1546833999-b9f581a1996d', alt: '搭配时蔬的炭烤牛排' },
  { title: '香草烤春鸡', price: 98, description: '鲜嫩鸡肉 / 花园香草 / 柠檬', category: 'fire', tag: '人气之选', image: 'photo-1532550907401-a500c9a57435', alt: '香草与柠檬调味的烤鸡' },
  { title: '田园时蔬沙拉', price: 58, description: '当季鲜蔬 / 坚果 / 自制油醋汁', category: 'garden', tag: '当季鲜蔬', image: 'photo-1512621776951-a57141f2eefd', alt: '多彩的新鲜蔬菜沙拉' },
  { title: '莓果奶油蛋糕', price: 48, description: '时令莓果 / 轻盈奶油 / 松软蛋糕', category: 'sweet', tag: '留一点甜', image: 'photo-1464305795204-6f5bbfc7fb81', alt: '点缀莓果的奶油蛋糕' }
];
const dishGrid = document.querySelector('#dish-grid');
function renderDishes(category) {
  dishGrid.replaceChildren(...dishes.filter(dish => category === 'all' || dish.category === category).map(dish => {
    const card = document.createElement('article');
    card.className = 'dish';
    card.innerHTML = `<div class="dish-photo"><img src="https://images.unsplash.com/${dish.image}?auto=format&fit=crop&w=700&q=80" alt="${dish.alt}" loading="lazy"><span class="dish-tag">${dish.tag}</span></div><div class="dish-title"><h3>${dish.title}</h3><span class="dish-price">¥ ${dish.price}</span></div><p class="dish-description">${dish.description}</p>`;
    return card;
  }));
}
const tabs = [...document.querySelectorAll('.tab')];
function activateTab(tab) {
  tabs.forEach(item => { item.classList.toggle('selected', item === tab); item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
  renderDishes(tab.dataset.category);
}
tabs.forEach((tab, index) => {
  tab.tabIndex = index === 0 ? 0 : -1;
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', event => {
    let nextIndex;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    if (nextIndex !== undefined) { event.preventDefault(); activateTab(tabs[nextIndex]); tabs[nextIndex].focus(); }
  });
});
renderDishes('all');
const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');
navToggle.addEventListener('click', () => {
  mobileNav.hidden = !mobileNav.hidden;
  navToggle.setAttribute('aria-expanded', String(!mobileNav.hidden));
  navToggle.setAttribute('aria-label', mobileNav.hidden ? '打开导航' : '关闭导航');
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { mobileNav.hidden = true; navToggle.setAttribute('aria-expanded', 'false'); navToggle.setAttribute('aria-label', '打开导航'); }));
const bookingDialog = document.querySelector('#booking-dialog');
const bookingForm = document.querySelector('#booking-form');
const bookingResult = document.querySelector('#booking-result');
const dateInput = bookingForm.elements.date;
function localDate() { const today = new Date(); return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`; }
document.querySelectorAll('[data-book]').forEach(button => button.addEventListener('click', () => {
  dateInput.min = localDate();
  dateInput.value = localDate();
  bookingForm.hidden = false;
  bookingResult.hidden = true;
  bookingDialog.showModal();
  document.body.classList.add('modal-open');
}));
document.querySelector('.dialog-close').addEventListener('click', () => bookingDialog.close());
bookingDialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
bookingDialog.addEventListener('click', event => { if (event.target === bookingDialog) { const bounds = bookingDialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) bookingDialog.close(); } });
bookingForm.addEventListener('submit', event => {
  event.preventDefault();
  const details = new FormData(bookingForm);
  const guest = details.get('guest').trim();
  if (!guest) { bookingForm.elements.guest.setCustomValidity('请输入您的称呼'); bookingForm.elements.guest.reportValidity(); return; }
  bookingForm.hidden = true;
  bookingResult.textContent = `${guest}，这是您的预订信息：\n${details.get('date')} ${details.get('time')} · ${details.get('guests')}\n\n此为演示，预订未发送，尚未确认席位。`;
  bookingResult.hidden = false;
});
bookingForm.elements.guest.addEventListener('input', () => bookingForm.elements.guest.setCustomValidity(''));
document.querySelector('#year').textContent = new Date().getFullYear();
