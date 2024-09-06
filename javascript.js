const buttons=document.querySelectorAll('[data-carousel-button]')

const carousel=
buttons.forEach(button => {
  button.addEventListener('click',()=>{
    function getOffset(){
      return button.dataset.carouselButton==='next'?1:-1

    }
    function selectSlides(){
      return button.closest('[data-carousel]').querySelector('[data-slides]')
    }
   
    const slidesIcon=button.closest('[data-carousel]').querySelector('[data-slides-icon]')
    let activeSlide=selectSlides().querySelector('[data-active]')
    let activeIcon=slidesIcon.querySelector('[data-active]')
    let newIndex=[...selectSlides().children].indexOf(activeSlide)+getOffset()
    let newIndexIcon=[...slidesIcon.children].indexOf(activeIcon)+getOffset()
    if(newIndex<0)newIndex=selectSlides().children.length -1
    if(newIndexIcon<0)newIndexIcon=slidesIcon.children.length -1
    if(newIndex>=selectSlides().children.length)newIndex=0
    if(newIndexIcon>=slidesIcon.children.length)newIndexIcon=0
    selectSlides().children[newIndex].dataset.active=true 
    slidesIcon.children[newIndexIcon].dataset.active=true 
    delete activeSlide.dataset.active
    delete activeIcon.dataset.active
  })
});
