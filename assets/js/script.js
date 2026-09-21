'use strict';

const select = (selector, parent = document) => parent.querySelector(selector);
const selectAll = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const on = (element, event, handler) => element && element.addEventListener(event, handler);

window.addEventListener('load', () => {
  const preloader = select('[data-preaload]');
  if (preloader) preloader.classList.add('loaded');
  document.body.classList.add('loaded');
});

const navbar = select('[data-navbar]');
const overlay = select('[data-overlay]');
const navTogglers = selectAll('[data-nav-toggler]');

const toggleNavbar = () => {
  navbar?.classList.toggle('active');
  overlay?.classList.toggle('active');
  document.body.classList.toggle('nav-active');
};

navTogglers.forEach((toggler) => on(toggler, 'click', toggleNavbar));
selectAll('.navbar-link').forEach((link) => on(link, 'click', () => {
  if (navbar?.classList.contains('active')) toggleNavbar();
}));

const header = select('[data-header]');
const backTopButton = select('[data-back-top-btn]');
let lastScrollPosition = 0;

const updateHeader = () => {
  const scrollPosition = window.scrollY;
  header?.classList.toggle('active', scrollPosition > 40);
  backTopButton?.classList.toggle('active', scrollPosition > 500);
  if (scrollPosition > 100 && scrollPosition > lastScrollPosition) header?.classList.add('hide');
  else header?.classList.remove('hide');
  lastScrollPosition = scrollPosition;
};

on(window, 'scroll', updateHeader);

const slides = selectAll('.hero-slide');
const nextButton = select('[data-next-btn]');
const previousButton = select('[data-prev-btn]');
let currentSlide = 0;
let slideTimer;

const showSlide = (index) => {
  slides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === index));
  currentSlide = index;
};

const nextSlide = () => showSlide((currentSlide + 1) % slides.length);
const previousSlide = () => showSlide((currentSlide - 1 + slides.length) % slides.length);
const restartSlider = () => {
  window.clearInterval(slideTimer);
  slideTimer = window.setInterval(nextSlide, 6000);
};

if (slides.length > 1) {
  on(nextButton, 'click', () => { nextSlide(); restartSlider(); });
  on(previousButton, 'click', () => { previousSlide(); restartSlider(); });
  restartSlider();
}

const year = select('[data-year]');
if (year) year.textContent = String(new Date().getFullYear());

const menuCategories = [
  {
    name: 'Biryani',
    items: [
      ['Veg Dum Biryani', '₹119 / ₹199', 'veg'], ['Paneer Biryani', '₹149 / ₹279', 'veg'],
      ['Mushroom Biryani', '₹149 / ₹279', 'veg'], ['AR Special Mushroom Biryani', '₹199 / ₹299', 'veg'],
      ['AR Special Paneer Biryani', '₹199 / ₹299', 'veg'], ['Egg Biryani', '₹119 / ₹199', 'egg'],
      ['Chicken Dum Biryani', '₹129 / ₹249', 'nonveg'], ['Chicken Fry Biryani', '₹139 / ₹259', 'nonveg'],
      ['Chicken 65 Biryani', '₹149 / ₹279', 'nonveg'], ['Chicken Lollypop Biryani', '₹149 / ₹279', 'nonveg'],
      ['Fish Biryani', '₹169 / ₹299', 'nonveg'], ['Prawns Biryani', '₹169 / ₹299', 'nonveg'],
      ['Mutton Biryani', '₹179 / ₹329', 'nonveg'], ['Special Chicken Biryani', '₹199 / ₹349', 'nonveg'],
      ['Chicken Mughlai Biryani', '₹199 / ₹349', 'nonveg'], ['Gongura Chicken Biryani', '₹199 / ₹349', 'nonveg'],
      ['Gongura Mutton Biryani', '₹219 / ₹349', 'nonveg'], ['Gongura Prawns Biryani', '₹219 / ₹349', 'nonveg'],
      ['Special Kundun Biryani', '₹299', 'nonveg'], ['Special Mixed Biryani', '₹329', 'nonveg'],
      ['Extra Chicken', '₹69', 'nonveg'], ['Extra Biryani Rice', '₹69', 'veg']
    ]
  },
  {
    name: 'Soups',
    items: [
      ['Tomato Soup', '₹99 / ₹169', 'veg'], ['Veg Manchow Soup', '₹99 / ₹169', 'veg'],
      ['Veg Hot and Sour Soup', '₹99 / ₹169', 'veg'], ['Veg Lemon Coriander Soup', '₹99 / ₹159', 'veg'],
      ['Veg Corn Soup', '₹99 / ₹160', 'veg'], ['Chicken Hot and Sour Soup', '₹129 / ₹219', 'nonveg'],
      ['Chicken Manchow Soup', '₹129 / ₹218', 'nonveg'], ['Chicken Corn Soup', '₹129 / ₹219', 'nonveg'],
      ['Chicken Lemon Coriander Soup', '₹129 / ₹219', 'nonveg'], ['Long Form Soup', '₹149 / ₹249', 'nonveg']
    ]
  },
  {
    name: 'Veg Starters',
    items: [
      ['Veg Manchuria', '₹149', 'veg'], ['Chilli Veg Manchuria', '₹149', 'veg'], ['Veg 65 Manchuria', '₹160', 'veg'],
      ['Gobi Manchuria', '₹169', 'veg'], ['Chilli Gobi Manchuria', '₹189', 'veg'], ['Gobi 65 Manchuria', '₹189', 'veg'],
      ['Baby Corn Manchuria', '₹189', 'veg'], ['Chilli Baby Corn', '₹189', 'veg'], ['Baby Corn 65', '₹189', 'veg'],
      ['Mushroom Manchuria', '₹199', 'veg'], ['Chilli Mushroom', '₹199', 'veg'], ['Mushroom 65', '₹229', 'veg'],
      ['Crispy Corn', '₹229', 'veg'], ['American Corn', '₹229', 'veg'], ['Paneer Manchuria', '₹229', 'veg'],
      ['Chilli Paneer', '₹229', 'veg'], ['Paneer 65', '₹229', 'veg'], ['Paneer Majestic', '₹229', 'veg'],
      ['French Fries', '₹99', 'veg']
    ]
  },
  {
    name: 'Non-Veg Starters',
    items: [
      ['Chicken Manchuria', '₹229', 'nonveg'], ['Chicken 65', '₹229', 'nonveg'], ['Chilli Chicken', '₹229', 'nonveg'],
      ['Ginger Chicken', '₹229', 'nonveg'], ['Pepper Chicken', '₹229', 'nonveg'], ['Crispy Chicken', '₹229', 'nonveg'],
      ['Chicken Fry', '₹229', 'nonveg'], ['Chicken Pakoda', '₹229', 'nonveg'], ['Chicken Roast', '₹249', 'nonveg'],
      ['Chicken Majestic', '₹249', 'nonveg'], ['Chicken Lollipop', '₹249', 'nonveg'], ['Chicken Drumstick', '₹249', 'nonveg'],
      ['Chicken 555', '₹249', 'nonveg'], ['Dragon Chicken', '₹249', 'nonveg'], ['Garlic Chicken', '₹249', 'nonveg'],
      ['Lemon Chicken', '₹249', 'nonveg'], ['Chilli Egg', '₹159', 'egg'], ['Egg 65', '₹159', 'egg'],
      ['Egg Manchuria', '₹159', 'egg'], ['Egg Schezwan', '₹169', 'egg'], ['Egg Burji', '₹99', 'egg'],
      ['Egg Omelette', '₹59', 'egg'], ['Boiled Egg', '₹15', 'egg']
    ]
  },
  {
    name: 'Mutton Starters',
    items: [['Chilli Mutton', '₹319', 'nonveg'], ['Mutton 65', '₹319', 'nonveg'], ['Mutton Roast', '₹319', 'nonveg'], ['Pepper Mutton', '₹319', 'nonveg']]
  },
  {
    name: 'Seafood',
    items: [
      ['Apollo Fish', '₹330', 'nonveg'], ['Chilli Fish', '₹330', 'nonveg'], ['Ginger Fish', '₹310', 'nonveg'],
      ['Fish Fry', '₹330', 'nonveg'], ['Schezwan Fish', '₹330', 'nonveg'], ['Loose Prawns', '₹350', 'nonveg'],
      ['Chilli Prawns', '₹350', 'nonveg'], ['Ginger Prawns', '₹350', 'nonveg'], ['Pepper Prawns', '₹350', 'nonveg']
    ]
  },
  {
    name: 'Tandoors',
    items: [
      ['Paneer Tikka / Garlic Tikka', '₹270', 'veg'], ['Tandoori Chicken (Small)', '₹300', 'nonveg'],
      ['Tandoori Chicken (Large)', '₹270', 'nonveg'], ['Tangdi Kebab (4 Pieces)', '₹350', 'nonveg'],
      ['Chicken Tikka', '₹270', 'nonveg'], ['Chicken Haryali Kebab', '₹270', 'nonveg'],
      ['Chicken Reshmi Kebab', '₹270', 'nonveg'], ['Chicken Garlic Kebab', '₹270', 'nonveg']
    ]
  },
  {
    name: 'Special Biryani',
    items: ['AR Special Biryani', 'Chicken Rambo Biryani', 'Gongura Chicken Biryani', 'Gongura Mutton Biryani',
      'Gongura Prawns Biryani', 'Gongura Paneer Biryani', 'Veg Manchuria Biryani', 'Avakaya Veg Biryani',
      'Green Chilli Veg Pulao', 'Avakaya Chicken Biryani', 'Fry Piece Chicken Biryani']
      .map((name) => [name, 'Price to be confirmed', name.toLowerCase().includes('veg') || name.toLowerCase().includes('pulao') ? 'veg' : 'nonveg'])
  },
  {
    name: 'Family Packs',
    items: ['Veg Family Pack', 'Paneer Family Pack', 'Chicken Family Pack', 'Mutton Family Pack', 'Special Chicken Family Pack',
      'Fish Family Pack', 'Prawns Family Pack', 'Gongura Chicken Family Pack', 'Gongura Mutton Family Pack', 'Gongura Prawns Family Pack']
      .map((name) => [name, 'Price to be confirmed', name.toLowerCase().includes('veg') || name.toLowerCase().includes('paneer') ? 'veg' : 'nonveg'])
  },
  {
    name: 'Rice',
    items: [
      ['Veg Fried Rice', '₹129', 'veg'], ['Gobi Fried Rice', '₹149', 'veg'], ['Manchurian Rice', '₹149', 'veg'],
      ['Jeera Rice', '₹160', 'veg'], ['Tomato Rice', '₹179', 'veg'], ['Mushroom Fried Rice', '₹179', 'veg'],
      ['Paneer Fried Rice', '₹179', 'veg'], ['Mixed Veg Fried Rice', '₹179', 'veg'], ['Veg Manchurian Fried Rice', '₹179', 'veg'],
      ['Veg Schezwan Fried Rice', '₹199', 'veg'], ['AR Special Sambar Rice', '₹199', 'veg'], ['Special Ghee Rice', '₹199', 'veg'],
      ['AR Special Veg Fried Rice', '₹199', 'veg'], ['Curd Rice', 'Price to be confirmed', 'veg'], ['Egg Fried Rice', '₹139', 'egg'],
      ['Double Egg Fried Rice', '₹149', 'egg'], ['Egg Schezwan Fried Rice', '₹159', 'egg'], ['Double Egg Schezwan Fried Rice', '₹169', 'egg'],
      ['Chicken Fried Rice', '₹179', 'nonveg'], ['Chicken Schezwan Fried Rice', '₹189', 'nonveg'], ['Double Egg Chicken Fried Rice', '₹189', 'nonveg'],
      ['Double Egg Chicken Schezwan Fried Rice', '₹199', 'nonveg'], ['Triple Chicken Fried Rice', '₹199', 'nonveg'],
      ['Prawn Fried Rice', '₹199', 'nonveg'], ['AR Special Chicken Fried Rice', '₹229', 'nonveg'],
      ['AR Special Mixed Fried Rice (Non-Veg)', '₹249', 'nonveg'], ['AR Special Sambar Rice with Chicken', 'Price to be confirmed', 'nonveg']
    ]
  },
  {
    name: 'Noodles',
    notice: 'Item names and prices were not clearly readable in the supplied source menu.',
    items: [['Noodles selection', 'Please confirm with restaurant', '']]
  },
  {
    name: 'Main Course',
    notice: 'Vegetarian main-course item names and prices were not clearly readable in the supplied source menu.',
    items: [
      ['Egg Omelette', 'Price to be confirmed', 'egg'], ['Egg Curry', 'Price to be confirmed', 'egg'], ['Egg Masala', 'Price to be confirmed', 'egg'],
      ['Egg Burji', 'Price to be confirmed', 'egg'], ['Egg 65', 'Price to be confirmed', 'egg'], ['Egg Manchuria', 'Price to be confirmed', 'egg'],
      ['Egg Chilli', 'Price to be confirmed', 'egg'], ['AR Special Chicken Curry (Boneless/Bone)', 'Price to be confirmed', 'nonveg'],
      ['Telangana Chicken', 'Price to be confirmed', 'nonveg'], ['Andhra Chicken', 'Price to be confirmed', 'nonveg'],
      ['Chicken Curry', 'Price to be confirmed', 'nonveg'], ['Butter Chicken', 'Price to be confirmed', 'nonveg'],
      ['Kadai Chicken', 'Price to be confirmed', 'nonveg'], ['Ginger Chicken', 'Price to be confirmed', 'nonveg'],
      ['Chicken Chatpat', 'Price to be confirmed', 'nonveg'], ['Methi Chicken', 'Price to be confirmed', 'nonveg'],
      ['Punjabi Chasola', 'Price to be confirmed', 'nonveg'], ['Chicken Masala', 'Price to be confirmed', 'nonveg'],
      ['Chicken Tikka Masala', 'Price to be confirmed', 'nonveg'], ['Chilli Chicken', 'Price to be confirmed', 'nonveg'],
      ['Chicken Manchuria', 'Price to be confirmed', 'nonveg'], ['Mutton Curry', 'Price to be confirmed', 'nonveg'],
      ['Spicy Mutton Curry', 'Price to be confirmed', 'nonveg'], ['Mutton Rogan Josh', 'Price to be confirmed', 'nonveg'],
      ['Kadai Mutton', 'Price to be confirmed', 'nonveg'], ['Mutton Masala', 'Price to be confirmed', 'nonveg']
    ]
  },
  {
    name: 'Indian Breads',
    items: [['Butter Roti', '₹20', 'veg'], ['Plain Naan', '₹20', 'veg'], ['Butter Naan', '₹30', 'veg'], ['Garlic Naan', '₹40', 'veg']]
  }
];

const menuList = select('[data-menu-list]');
const menuFilters = select('[data-menu-filters]');
const menuSearch = select('#menu-search');
const menuEmpty = select('[data-menu-empty]');
const indicatorLabels = { veg: 'Veg', nonveg: 'Non-veg', egg: 'Egg' };
let activeMenuCategory = 'All';
let openMenuCategory = null;

const renderMenu = () => {
  if (!menuList) return;
  const query = menuSearch?.value.trim().toLowerCase() || '';
  const categories = activeMenuCategory === 'All'
    ? menuCategories
    : menuCategories.filter((category) => category.name === activeMenuCategory);
  const visibleCategories = categories.map((category) => ({
    index: menuCategories.indexOf(category),
    ...category,
    items: category.items.filter(([name, price, type]) => !query
      || `${name} ${price} ${category.name}`.toLowerCase().includes(query) || type.includes(query))
  })).filter((category) => category.items.length);

  menuList.innerHTML = visibleCategories.map((category) => {
    const categoryId = `menu-category-${category.index}`;
    const panelId = `${categoryId}-panel`;
    const isOpen = openMenuCategory === category.index;
    return `
    <section class="menu-category${isOpen ? ' is-open' : ''}" data-menu-section="${category.index}">
      <button class="menu-category-toggle" type="button" aria-expanded="${isOpen}" aria-controls="${panelId}" id="${categoryId}">
        <span><small>${String(category.index + 1).padStart(2, '0')}</small>${category.name}</span>
        <ion-icon name="chevron-down-outline" aria-hidden="true"></ion-icon>
      </button>
      <div class="menu-category-panel" id="${panelId}" role="region" aria-labelledby="${categoryId}" aria-hidden="${!isOpen}">
        <div class="menu-category-panel-inner">
      ${category.notice ? `<p class="category-notice">${category.notice}</p>` : ''}
      <div class="menu-items">${category.items.map(([name, price, type]) => `
        <article class="menu-item">
          <div class="menu-item-name"><span class="food-dot ${type}" aria-label="${indicatorLabels[type] || 'Item type not specified'}"></span><h3>${name}</h3>${type ? `<span class="food-label ${type}">${indicatorLabels[type]}</span>` : ''}</div>
          <span class="menu-item-rule"></span><strong class="${price.includes('confirm') || price.includes('Please') ? 'price-confirm' : ''}">${price}</strong>
        </article>`).join('')}</div>
        </div>
      </div>
    </section>`;
  }).join('');
  menuEmpty.hidden = visibleCategories.length > 0;
};

on(menuList, 'click', (event) => {
  const toggle = event.target.closest('.menu-category-toggle');
  if (!toggle) return;
  const section = toggle.closest('.menu-category');
  const categoryIndex = Number(section.dataset.menuSection);
  openMenuCategory = openMenuCategory === categoryIndex ? null : categoryIndex;
  renderMenu();
});

if (menuFilters) {
  menuFilters.innerHTML = ['All', ...menuCategories.map(({ name }) => name)].map((name) =>
    `<button type="button" class="${name === 'All' ? 'active' : ''}" data-menu-category="${name}">${name}</button>`).join('');
  selectAll('[data-menu-category]').forEach((button) => on(button, 'click', () => {
    activeMenuCategory = button.dataset.menuCategory;
    openMenuCategory = null;
    selectAll('[data-menu-category]').forEach((item) => item.classList.toggle('active', item === button));
    renderMenu();
  }));
}
on(menuSearch, 'input', renderMenu);
renderMenu();
