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
});
