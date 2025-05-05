const elements = {
  header: document.querySelector('[data-header]'),
  menuBarIcons: document.querySelectorAll('[data-menu-bar]'),
  desktopNav: document.querySelector('[data-desk-menu]'),
  mobileNav: document.querySelector('[data-mobile-menu]'),
  heroContainer: document.querySelector('[data-hero-container]'),
  main: document.querySelector('[data-main]'),
  footer: document.querySelector('[data-footer]'),
};
function openMobileMenu() {
  elements.desktopNav.style.display = 'none';
  elements.heroContainer.style.display = 'none';
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
elements.menuBarIcons.forEach((icon) => {
  icon.addEventListener('click', openMobileMenu);
});



const closeButtons = document.querySelectorAll('[data-close-button]');
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    elements.desktopNav.style.display = 'flex';
    elements.heroContainer.style.display = 'flex';
    elements.mobileNav.style.display = 'none';
    elements.header.style.cssText = 'position: sticky';
    elements.main.style.display = 'block';
    elements.footer.style.display = 'block';
  });
});


const carouselButtons = document.querySelectorAll('[data-carousel-button]');
carouselButtons.forEach(button => {
  button.addEventListener('click', () => {
    const offset = button.dataset.carouselButton === 'next' ? 1 : -1;

    const carousel = button.closest('[data-carousel]');
    const slides = carousel.querySelector('[data-slides]');
    const icons = carousel.querySelector('[data-slides-icon]');
    
    const activeSlide = slides.querySelector('[data-active]');
    const activeIcon = icons.querySelector('[data-white]');
    
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    let newIconIndex = [...icons.children].indexOf(activeIcon) + offset;

    // Loop around
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIconIndex < 0) newIconIndex = icons.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;
    if (newIconIndex >= icons.children.length) newIconIndex = 0;

    // Set new active
    delete activeSlide.dataset.active;
    delete activeIcon.dataset.white;
    slides.children[newIndex].dataset.active = true;
    icons.children[newIconIndex].dataset.white = true;
  });
});



const faqsIconContainers = document.querySelectorAll('[data-drop-down-icon-container]');
faqsIconContainers.forEach(iconContainer => {
  iconContainer.addEventListener('click', () => {
    const dropDownContainer = iconContainer.closest('[data-drop-down-container]');
    const slider = dropDownContainer.closest('[data-slider]');
    const slides = slider.closest('[data-slides]');
    
    const icon = iconContainer.querySelector('[data-drop-down-icon]');
    const dropDown = dropDownContainer.querySelector('[data-drop-down]');
    const answer = dropDown.querySelector('[data-answer]');
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
  });
});



