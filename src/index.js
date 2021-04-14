let addToy = false;
// let toyNameString = document.querySelector("input.name")
// let toyImageString = document.querySelector("input.image")
let createToyButton = document.querySelector("input.submit.image") // the actual button for making cards
let toyForm = document.querySelector("form.add-toy-form")
let toyCollection = document.querySelector("#toy-collection")


// document.addEventListener("DOMContentLoaded", () => {

// })
const addBtn = document.querySelector("#new-toy-btn")
const toyFormContainer = document.querySelector(".container")
addBtn.addEventListener("click", () => { 

  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block"
  } else {
    toyFormContainer.style.display = "none"
  }

})


 

  fetch('http://localhost:3000/toys')
  .then (resp => resp.json())
  .then (resp => {
    resp.forEach(function(rez) {
      //console.log(toyObject)
        toyEditor(rez)
  })
  })


  // let getfunction = {
  //   Method: " GET",
  //   Headers: {
  //     "Content-type": "application/json"
  //   },
  //   Body: JSON.stringify()
  //   }

    // // post
    // fetch('http://localhost:3000/toys', getfunction)
    // .then (resp => resp.json())
    // .then (resp => {
    // })


  function toyEditor(toyObject) {
    let cardDiv = document.createElement('div')
    cardDiv.className = "card"
    let toyImage = document.createElement('img')
    let card = document.createElement('h2')
    let toyText = document.createElement('p')
    let toyButton = document.createElement('button')
  //h2
    card.innerText = toyObject.name
  //image
    toyImage.src = toyObject.image
    toyImage.className = "toy-avatar"
  //likes in p
    let toyLikes = toyObject.likes
    toyText.innerText = `${toyLikes} Likes`
    // button
    toyButton.className = "like-btn"
    toyButton.dataset.id = toyObject.id
    toyButton.innerText = "Like <3"
  //appending
  //console.log(card,toyImage, toyText, toyButton)
  cardDiv.append(card,toyImage, toyText, toyButton)
  toyCollection.append(cardDiv)
// Add likes to the cards


  toyButton.addEventListener('click', function(e) {
    console.log(toyObject.id)
    let likeObjects = toyObject.likes
    fetch(`http://localhost:3000/toys/${toyObject.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
          likes: likeObjects + 1 //pessimistic
      })
    })
    .then (resp => resp.json())
    .then (resp => {
      //console.log(resp.likes)
      toyText.innerText = `${resp.likes} Likes` // DOM
      toyObject.likes = resp.likes // OBject in memeory
    })
  })
  }

  /// Creating new card using POST
  toyForm.addEventListener('submit', (e) => {
    e.preventDefault()
//console.log(toyNameString, toyImageString)
   toyNameString = e.target.name.value 
   toyImageString = e.target.image.value 
 
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
         name:  toyNameString, 
        images: toyImageString,
          likes: 0
      })
    })
    .then (resp => resp.json())
    .then (resp => {
      resp.name = e.target.name.value 
      resp.image = e.target.image.value
      resp.likes = 0;
      toyEditor(resp)
    })
  })