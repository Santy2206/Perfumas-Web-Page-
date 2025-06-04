const selectors = {
  header: '[data-header]',
  menuBar: '[data-menu-bar]',
  desktopNav: '[data-desk-menu]',
  mobileNav: '[data-mobile-menu]',
  hero: '[data-hero-container]',
  main: '[data-main]',
  footer: '[data-footer]',
  closeButton: '[data-close-button]',
  carouselButton: '[data-carousel-button]',
  slides: '[data-slides]',
  slidesIcon: '[data-slides-icon]',
  dropDownIconContainer: '[data-drop-down-icon-container]',
  dropDownIcon: '[data-drop-down-icon]',
  dropDown: '[data-drop-down]',
  answer: '[data-answer]',
};

const elements = {
  header: document.querySelector(selectors.header),
  menuBarIcons: document.querySelectorAll(selectors.menuBar),
  desktopNav: document.querySelector(selectors.desktopNav),
  mobileNav: document.querySelector(selectors.mobileNav),
  hero: document.querySelector(selectors.hero),
  main: document.querySelector(selectors.main),
  footer: document.querySelector(selectors.footer),
};

function showMobileMenu() {
  elements.desktopNav.style.display = 'none';
  elements.hero.style.display = 'none';
  elements.mobileNav.style.display = 'flex';
  elements.header.style.cssText = `
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    padding: 0;
    z-index: 999;
  `;
  elements.main.style.display = 'none';
  elements.footer.style.display = 'none';
}

function showDesktopMenu() {
  elements.desktopNav.style.display = 'flex';
  elements.hero.style.display = 'flex';
  elements.mobileNav.style.display = 'none';
  elements.header.style.cssText = 'position: sticky';
  elements.main.style.display = 'block';
  elements.footer.style.display = 'block';
}

elements.menuBarIcons.forEach(icon => {
  icon.addEventListener('click', showMobileMenu);
});

document.querySelectorAll(selectors.closeButton).forEach(button => {
  button.addEventListener('click', showDesktopMenu);
});

function handleCarousel(button) {
  const offset = button.dataset.carouselButton === 'next' ? 1 : -1;
  const carousel = button.closest('[data-carousel]');
  const slides = carousel.querySelector(selectors.slides);
  const icons = carousel.querySelector(selectors.slidesIcon);

  const activeSlide = slides.querySelector('[data-active]');
  const activeIcon = icons.querySelector('[data-white]');

  const slidesArray = Array.from(slides.children);
  const iconsArray = Array.from(icons.children);

  let newIndex = slidesArray.indexOf(activeSlide) + offset;
  let newIconIndex = iconsArray.indexOf(activeIcon) + offset;

  if (newIndex < 0) newIndex = slidesArray.length - 1;
  if (newIndex >= slidesArray.length) newIndex = 0;
  if (newIconIndex < 0) newIconIndex = iconsArray.length - 1;
  if (newIconIndex >= iconsArray.length) newIconIndex = 0;

  delete activeSlide.dataset.active;
  delete activeIcon.dataset.white;
  slidesArray[newIndex].dataset.active = true;
  iconsArray[newIconIndex].dataset.white = true;
}

document.querySelectorAll(selectors.carouselButton).forEach(button => {
  button.addEventListener('click', () => handleCarousel(button));
});

function toggleFaq(iconContainer) {
  const dropDownContainer = iconContainer.closest('[data-drop-down-container]');
  const slider = dropDownContainer.closest('[data-slider]');
  const icon = iconContainer.querySelector(selectors.dropDownIcon);
  const dropDown = dropDownContainer.querySelector(selectors.dropDown);
  const answer = dropDown.querySelector(selectors.answer);
  const counter = Number(slider.dataset.slider || 0);

  slider.dataset.slider = counter + 1;
  slider.dataset.active = 'true';

  const isOpen = counter % 2 === 0;

  answer.style.zIndex = isOpen ? '1' : '-999';
  answer.style.opacity = isOpen ? '1' : '0';
  answer.style.transition = '200ms opacity';
  answer.style.position = isOpen ? 'static' : 'absolute';

  icon.style.color = isOpen ? 'red' : 'white';
  icon.classList.replace(
    isOpen ? 'fa-caret-right' : 'fa-caret-down',
    isOpen ? 'fa-caret-down' : 'fa-caret-right'
  );
}

document.querySelectorAll(selectors.dropDownIconContainer).forEach(iconContainer => {
  iconContainer.addEventListener('click', () => toggleFaq(iconContainer));
});



