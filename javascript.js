const buttons=document.querySelectorAll('[data-carousel-button]')

const proofChangeSlideCarousel=buttons.forEach(button => {
  button.addEventListener('click',()=>{
    function getOffset(){
      return button.dataset.carouselButton==='next'?1:-1

    }
    function selectSlides(){
      return button.closest('[data-carousel]').querySelector('[data-slides]')
    }
    function selectIconsContainer(){
      return button.closest('[data-carousel]').querySelector('[data-slides-icon]')
    }
    //select active slides 
    let activeSlide=selectSlides().querySelector('[data-active]')
    let whiteIcon=selectIconsContainer().querySelector('[data-white]')
    //Create new index
    let newIndex=[...selectSlides().children].indexOf(activeSlide)+getOffset()
    let newIndexIcon=[...selectIconsContainer().children].indexOf(whiteIcon)+getOffset()

    //Loop back if pass the amount of slides 
    if(newIndex<0)newIndex=selectSlides().children.length -1
    if(newIndexIcon<0)newIndexIcon=selectIconsContainer().children.length -1
    if(newIndex>=selectSlides().children.length)newIndex=0
    if(newIndexIcon>=selectIconsContainer().children.length)newIndexIcon=0 
    selectSlides().children[newIndex].dataset.active=true 
    selectIconsContainer().children[newIndexIcon].dataset.white=true 
    //pass and delete the active datatype to each slide in the array 
    delete activeSlide.dataset.active
    delete whiteIcon.dataset.white
  })
})
const iconContainer=document.querySelectorAll('[data-drop-down-icon-container]')

const faqsDropAnswer=iconContainer.forEach(iconContainer => {
 iconContainer.addEventListener('click',()=>{
 
  let dropDownContainer=iconContainer.closest('[data-drop-down-container ]')
  let slider=dropDownContainer.closest('[data-slider]')
  let counter=slider.dataset.slider
  
  let slides=slider.closest('[data-slides]')
  let activeSlide=slides.querySelector('[data-active]')
  
  let icon=iconContainer.querySelector('[data-drop-down-icon]')
  let dropDown=dropDownContainer.querySelector('[data-drop-down]')
  let answer=dropDown.querySelector('[data-answer]')
  slider.dataset.active='true'
  slider.dataset.slider++
    
    if(counter%2==0){
    answer.style.zIndex='1'
    answer.style.opacity='1'
    answer.style.transition='200ms opacity'
    answer.style.position='static'
    icon.style.color='red'
    icon.classList.replace('fa-caret-right','fa-caret-down')


   
    } 
  
   else if(counter%2!=0){
    answer.style.zIndex='-999'
    answer.style.opacity='0'
    answer.style.transition='200ms opacity'
    answer.style.position='absolute'
    icon.style.color='white'
    icon.classList.replace('fa-caret-down','fa-caret-right')
   } 
 })
});
const menuBarButton=document.querySelectorAll('[data-menu-bar]')

let desktopMenu=document.querySelector('[data-desk-menu]')
let mobileMenu=document.querySelector('[data-mobile-menu]')
let heroContainer=document.querySelector('[data-hero-container]')
const header=document.querySelector('[data-header] ')
const main=document.querySelector('[data-main]')
const footer=document.querySelector('[data-footer]')
const headerOpenMobileMenu=menuBarButton.forEach(barButton=>{
  barButton.addEventListener('click',()=>{
    desktopMenu.style.display='none'
    heroContainer.style.display='none'
    mobileMenu.style.display='flex'
    header.style.cssText='position:fixed; top: 0; left: 0;right: 0;bottom: 0;padding: 0rem; z-index: 999;';
    main.style.display='none'
    footer.style.display='none'



    
    
    
  })
  
})
const closeButton=document.querySelectorAll('[data-close-button]')

const headerCloseMobileMenu=closeButton.forEach(closeButton=>{
  closeButton.addEventListener('click',()=>{
    desktopMenu.style.display='flex'
    heroContainer.style.display='flex'
    mobileMenu.style.display='none'
    header.style.cssText='position:sticky'
    main.style.display='block'
    footer.style.display='block'
  })
})


