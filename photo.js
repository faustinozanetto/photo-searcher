const searchButton = document.getElementsByClassName('search-button')[0];
const searchInput = document.getElementsByClassName('search-input')[0];
const section = document.getElementsByClassName('photo-grid')[0];

/* Unsplash auth tokens and end point */
const accessKey = 'fedo17XgwoQszotR4A5rdu3qpQU--zxbffupy2h1FMA';
const endPoint = 'https://api.unsplash.com/search/photos';

/* Card types */
const cardTypes = ['card-wide', 'card-tall'];

/* Max amount of photos */
let photosAmount = 10;

/* Fetching images from api */
async function fetchImages(query) {
  let foundData = undefined;
  await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      foundData = data;
    });
  return foundData;
}

/* Function for getting random int in range */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Populating section with cards */
function populateCards(images) {
  for (let i = 0; i < photosAmount; i++) {
    // Creating a new div element
    let newDiv = document.createElement('div');
    // Wed add the "card" class
    newDiv.classList.add('card');
    // We choose a random class name from the array and we add it
    newDiv.classList.add(cardTypes[getRandomInt(0, 2)]);
    // We check if there is a valid images index and select the image
    if (images.results[i]) {
      newDiv.style.backgroundImage = `url(${images.results[i].links.download})`;
    }
    // Adding image click functionality
    newDiv.addEventListener('click', function () {
      window.open(images.results[i].links.html, '_blank');
    });
    section.appendChild(newDiv);
  }
  console.log('Populated cards!');
}

/* Function to remove current photos */
function clearCards() {
  let cards = Array.prototype.slice.call(section.children);
  for (let i = 0; i <= cards.length; i++) {
    if (cards[i]) {
      section.removeChild(cards[i]);
    }
  }
}


const populateWithData = async function () {
  if (searchInput.value) {
    const data = await fetchImages(searchInput.value);
    clearCards();
    setTimeout(function () {
      populateCards(data);
    }, 50);
  } else {
    alert('Please enter a valid input!');
  }
};

// Binding the populateWithData function to button click event.
searchButton.addEventListener('click', populateWithData);
