"use strict"

import * as errorHandling from './errorHandling.js';

checkEntry() // Run Script

// Errorhandling
function checkEntry() {
    try {
        let checkValidUrl = errorHandling.isValidUrl('https://api.mediehuset.net/sdg/goals')

        checkValidUrl.status == true ? handleFetchContentFromList(checkValidUrl.url) : handleError(checkValidUrl);
    }
    catch (err) { handleError(err.message) }
}

// Handle errors if they occur
function handleError(message) {
    console.log('Error:', message.errorMessage)
}


// Fetching controls
function handleFetchContentFromList(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => handleDistribution(data))
}


// Sorting
let currentGoal = 0; // Current Goal
let lastGoal = 5; // Last displayed Goal
function handleDistribution(...data) {
    const { id, title, desc, icon, image, reqUrl } = data[0].items[currentGoal]

    createView(data[0].items)
    handleControlls(data[0].items)
}


let pos1 = 0, pos2 = 0
// Controls
function handleControlls(data) {
    const container = document.getElementById('scroll-roller')
    const items = document.querySelectorAll('.items')

    // Mouse Move Controller
    try {
        displayItems(container, items);
    } catch (err) { handleError(err.message) }

}

// Views
function createView(data) {
    let container = document.getElementById('scroll-roller');
    for (let item of data) {
        container.innerHTML += `
        <li class="items">
            <div class="image-container"><img src="${item.image}" alt="image" /></div>
        </li>`;
    }
}


// Controller statements (Too long to be writting in the function it self, better as single reusable components)
function displayItems(container, items) {
    if (container) {
        // When mouse is clicked, and held down
        container.onmousedown = function (e) {
            e.preventDefault();

            // Position
            pos2 = e.clientX;
            container.style.cursor = 'grabbing'

            // Movement of mouse
            document.onmousemove = (e) => {
                e.preventDefault();

                // Positions
                pos1 = pos2 - e.clientX;
                pos2 = e.clientX;
                let calcValues = -(items[currentGoal].getBoundingClientRect().width * 12) - (16 * 17);

                // Hitting borders
                if (container.offsetLeft < calcValues) container.style.left = calcValues + "px";
                if (container.offsetLeft - pos1 > 0) container.style.left = (0) + "px";

                // Direction
                if (pos1 < 0) for (let el of items) el.style.transform = 'rotateZ(-2deg)'
                else for (let el of items) el.style.transform = 'rotateZ(2deg)'

                // Default
                container.style.left = (container.offsetLeft - pos1) + "px";
            }

            // When you don't hold in the mouse anymore
            document.onmouseup = () => {
                document.onmouseup = null;
                document.onmousemove = null;

                // Default settings
                for (let el of items) el.style.transform = 'rotateZ(0deg)'
                container.style.cursor = 'default'
            }
        }
    }
}