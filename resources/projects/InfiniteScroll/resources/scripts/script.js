const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unslpash API
const apiKey = 'Wv16XYzq0EPVp8L3_j_FVMu-fM3A2J3NZzTT1i51el0';
const count = 30;
const unsplashBaseUrl = 'https://api.unsplash.com/photos';


// Check if all images were loaded
function imageLoaded() {
    imagesLoaded += 1;

    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}


// Create ELements for Links & Photos, and add them to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach(photo => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        // Create <img> for photo
        const image = document.createElement('img');
        image.setAttribute('src', photo.urls.regular);
        const uniqueAttribute = photo.alt_description === null ? photo.description : 'none';
        image.setAttribute('alt', uniqueAttribute);
        image.setAttribute('title', uniqueAttribute);

        // Event Listener which checks when each image is finished loading
        image.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(image);
        imageContainer.appendChild(item);
    });
    console.log(photosArray);
}


// Get photos from Unsplash API
const getPhotos = async () => {
    const randomEndpoint = '/random/';
    const requestParams = `?client_id=${apiKey}&count=${count}`;
    const urlToFetch = `${unsplashBaseUrl}${randomEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch);
        photosArray = await response.json();

        displayPhotos();
    } catch (error) {
        console.log(error);
    }
};


// Check to see if scrolling is near the bottom of the page, then Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});


// On load
getPhotos();