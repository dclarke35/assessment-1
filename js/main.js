
// Please refer to the "Required Tasks in the assignments PDF"

// html for the add cheep create function
/*
  <div class="col">
    <div class="card shadow-sm">
      <img class="bd-placeholder-img card-img-top" src="ALBUM IMAGE SELECTION HERE"/>
      <div class="card-body">
        <h5 class="card-title">ALBUM DESCRIPTION HERE</h5>
        <p class="card-text">ALBUM TITLE HERE</p>
      </div>
    </div>
  </div>
*/

const albumCreatorForm = document.querySelector('#album-form')
const albumTitle = document.querySelector('#album-title')
const albumDescription = document.querySelector('#album-description')
const albumArt = document.querySelector('#album-art')
const titleFeedback = document.querySelector('#title-feedback')
const descriptionFeedback = document.querySelector('#description-feedback')
const artFeedback = document.querySelector('#art-feedback')
const albumList = document.querySelector('#all-albums-list')

let errorCount = 0

addEventListener('load', (e)=>{
  albumTitle.focus()
})

albumCreatorForm.addEventListener('submit', (e) =>{
  e.preventDefault()
    
  if(isEmpty(albumTitle)){
    errorHandler(titleFeedback)
  }

  if(isMaxLength(albumTitle, 60)){
    errorHandler(titleFeedback)
  }

  if(isEmpty(albumDescription)){
    errorHandler(descriptionFeedback)
  }

  if(isMaxLength(albumDescription, 255)){
    errorHandler(descriptionFeedback)
  }

  if(isArtSelectionDefault(albumArt)){
    errorHandler(artFeedback)
  }

  console.log(errorCount)
  if(isValid(albumTitle, albumDescription, albumArt) === true){
    addAlbum(albumTitle,albumDescription, albumArt)
    albumTitle.focus()
    errorCount = 0
    albumTitle.value = ""
    albumDescription.value = ""
    albumArt.selectedIndex = '0'
  }
  
})

albumTitle.addEventListener('focus', (e)=>{
  titleFeedback.style.display='none'
})

albumDescription.addEventListener('focus', (e)=>{
  descriptionFeedback.style.display='none'
})

albumArt.addEventListener('focus', (e)=>{
  artFeedback.style.display='none'
})

function isEmpty (elem){
  const value = elem.value.trim()
  if(value === ""){
    errorCount +=1
    return true
  }
}

function isMaxLength (elem, max){
  const value = elem.value.trim()
    if(value.length > max){
      errorCount +=1
      return true
    }
}

function isArtSelectionDefault (elem){
  if(elem.selectedIndex === 0){
    errorCount +=1
    return true
  }
}

function isValid (albumTitle, albumDescription, albumArt){
  let validitiy = true
  if(isEmpty(albumTitle)){
    validitiy = false
  }

  if(isMaxLength(albumTitle, 60)){
    validitiy = false
  }

  if(isEmpty(albumDescription)){
    validitiy = false
  }

  if(isMaxLength(albumDescription, 255)){
    validitiy = false
  }

  if(isArtSelectionDefault(albumArt)){
    validitiy = false
  }

  return validitiy
}

function errorHandler (elem){
  elem.style.display='block'
}

function addAlbum (title, description, art){
  albumList.innerHTML =`
    <div class="col">
      <div class="card shadow-sm">
        <img class="bd-placeholder-img card-img-top" src="img/${albumArt.value}"/>
        <div class="card-body">
          <h5 class="card-title">${albumDescription.value.trim()}</h5>
          <p class="card-text">${albumTitle.value.trim()}</p>
        </div>
      </div>
    </div>
  ` + albumList.innerHTML
}