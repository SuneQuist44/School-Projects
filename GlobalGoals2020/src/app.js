"use strict"

import * as errorHandling from './errorHandling.js';

checkEntry() // Run Script

// Errorhandling
function checkEntry() {
    try {
        let checkValidUrl = errorHandling.isValidUrl('https://api.mediehuset.net/sdg/goals')

        checkValidUrl.status == true ? handleFetchContentFromList(checkValidUrl.url) : handleError(checkValidUrl);
    }
    catch (err) {
        console.log(err.name + ': ' + err.message)
    }
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
    if (container) {
        container.onmousedown = function (e) {
            e.preventDefault();
            pos2 = e.clientX;
            // Close mouse
            document.onmouseup = () => {
                document.onmouseup = null;
                document.onmousemove = null;
            }

            // Movement of mouse
            document.onmousemove = (e) => {
                e.preventDefault();
                pos1 = pos2 - e.clientX;
                pos2 = e.clientX;
                if (container.offsetLeft - pos1 < (-(items[0].getBoundingClientRect().width) * 12) - (items[lastGoal].getBoundingClientRect().width) - 32) {
                    container.style.left = (-(items[0].getBoundingClientRect().width) * 12) - (items[lastGoal].getBoundingClientRect().width) - 32 + "px";
                }

                if (container.offsetLeft - pos1 > 0) {
                    container.style.left = (0) + "px";
                }

                container.style.left = (container.offsetLeft - pos1) + "px";
            }
        }
    }


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


// Reuseables
function displayItems() {
    const items = document.querySelectorAll('.items')

    // Goals
    currentGoal > items.length - 5 ? currentGoal = 0 : null
    currentGoal < 0 ? currentGoal = items.length - 5 : null

    // Last Goals
    lastGoal > items.length ? lastGoal = 5 : null
    lastGoal < 5 ? lastGoal = items.length : null

    // Display items
    for (let item of items) { item.style.display = 'none' }
    for (let i = currentGoal; i <= lastGoal - 1; i++) { items[i].style.display = 'block' }
}