import * as errorHandling from './errorHandling.js';

checkEntry() // Run Script

// Errorhandling
function checkEntry() {
    try {
        let checkValidUrl = errorHandling.isValidUrl('url here')

        checkValidUrl.status == true ? fetchContent(checkValidUrl.url) : handleError(checkValidUrl);
    }
    catch (err) {
        console.log(err.name + ': ' + err.message)
    }
}

// Handle errors if they occur
function handleError(message) {
    console.log(message.errorMessage)
}

function fetchContent(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
}