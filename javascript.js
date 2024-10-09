const buttons=document.querySelectorAll('[data-carousel-button]')

const iconContainer=document.querySelectorAll('[data-drop-down-icon-container]')

const carouselChangeSlide=buttons.forEach(button => {
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
let count=0
const showDropAnswer=iconContainer.forEach(iconContainer => {
 iconContainer.addEventListener('click',()=>{
  let activeSlide=iconContainer.closest('[data-drop-down-container]').closest('[data-active]')
  let dropDownContainer=activeSlide.querySelector('[data-drop-down-container ]')
  let slides=activeSlide.closest('[data-slides]')
  let icon=iconContainer.querySelector('[data-drop-down-icon]')
  let dropDown=dropDownContainer.querySelector('[data-drop-down]')
  let answer=dropDown.querySelector('[data-answer]')
  
  count++
  let offSet=slides.querySelector('li').dataset.active='true'?1:-1
  console.log(offSet)
  let newIndex=[...slides.children].indexOf(activeSlide)+offSet
  console.log(newIndex)


  
  
  

   slides.children[newIndex].dataset.active='true'
   delete activeSlide.dataset.active

   

  if(activeSlide.dataset.active=true){
    
  answer.style.zIndex='1'
  answer.style.opacity='1'
  answer.style.transition='200ms opacity'
  answer.style.position='static'
  icon.style.color='red'
  icon.classList.replace('fa-caret-right','fa-caret-down')
  



  

  }
  else if(!activeSlide.dataset.active){
    answer.style.zIndex='-999'
    answer.style.opacity='0'
    answer.style.transition='200ms opacity'
    answer.style.position='absolute'
    icon.style.color='white'
    icon.classList.replace('fa-caret-down','fa-caret-right')
    

  } 
  
  
  
  
  
 })
});


