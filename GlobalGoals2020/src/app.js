"use strict"

import * as errorHandling from './errorHandling.js';

checkEntry() // Run Script


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Error Handling ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ //

// Errorhandling
function checkEntry() {
    try {
        let checkValidUrl = errorHandling.isValidUrl('https://api.mediehuset.net/sdg/goals')

        checkValidUrl.status == true ? handleFetchContentFromList(checkValidUrl.url) : handleError(checkValidUrl);
    }
    catch (err) { handleError('Something unexpected went wrong') }
}

// Handle errors if they occur
function handleError(message) { console.log('Error:', (message.errorMessage || message)) }




// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Controller ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ //

// Fetching controls
function handleFetchContentFromList(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => handleDistribution(data.items))
}

function handleDistribution(...data) {
    for (let el of data[0]) {
        const { id, title, image } = el // Destructuring Data
        scrollView(id, image, title)
    }

    handleControlls(data[0])
}

function handleControlls(data) {
    const container = document.getElementById('scroll-roller')
    const items = document.querySelectorAll('.items')

    // Mouse Move Controller
    try {
        displayItems(container, items);
        onClickOfItem(container, items, data);
    } catch (err) { handleError('Controllers are currently not working') }

}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Controller Components ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ //

// Controller statements (Too long to be writting in the function it self, better as single reusable components)
let direction = 0, xCoord = 0 // Positions
function displayItems(container, items) {
    if (container) {
        // When mouse is clicked, and held down
        container.onmousedown = function (e) {
            e.preventDefault();

            // Position
            xCoord = e.clientX;

            // Movement of mouse
            document.onmousemove = (e) => {
                e.preventDefault();

                // Positions
                direction = xCoord - e.clientX;
                xCoord = e.clientX;
                let calcValues = -(items[0].getBoundingClientRect().width * 12) - (16 * 17);

                // Hitting borders
                if (container.offsetLeft < calcValues) container.style.left = calcValues + "px";
                if (container.offsetLeft - direction > 0) container.style.left = (0) + "px";

                // Direction
                if (direction < 0) for (let el of items) el.style.transform = 'rotateZ(-2deg)'
                else for (let el of items) el.style.transform = 'rotateZ(2deg)'

                // Default
                container.style.left = (container.offsetLeft - direction) + "px";
            }

            // When you don't hold in the mouse anymore
            document.onmouseup = () => {
                document.onmouseup = null;
                document.onmousemove = null;

                // Default settings
                for (let el of items) el.style.transform = 'rotateZ(0deg)'
            }
        }
    }
}

// onClick of card (items)
function onClickOfItem(container, items, data) {
    let target;

    container.addEventListener('click', (e) => {
        if (e.target == e.target.parentElement.querySelector('img')) target = e.target.parentElement.parentElement;
        if (e.target == e.target.parentElement.querySelector('span')) target = e.target.parentElement;

        let itemObj = {
            id: target.dataset.id,
            title: data[target.dataset.id].title,
            desc: data[target.dataset.id].byline,
            image: items[target.dataset.id].querySelector('img').src,
            url: data[Number(target.dataset.id)].request.url
        }

        localStorage.setItem('details', JSON.stringify({ id: itemObj.id, url: itemObj.url }));

        const { title, desc, image } = itemObj;
        imageView(title, desc, image);
    })
}




// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ View ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ //

function scrollView(id, image, title) {
    let container = document.getElementById('scroll-roller');

    container.innerHTML += `
        <li class="items" data-id="${id - 1}">
            <div class="image-container"><img src="${image}" alt="image" /></div>
            <span class="items-title">${title.slice(0, 14) + '...'}</span>
        </li>`;
}

(function () {
    const imageHeader = document.getElementById('image-header__container');

    imageHeader.innerHTML = `<h2>Select a Goal</h2>`
}())

function imageView(title, desc, image) {
    const imageHeader = document.getElementById('image-header__container');
    imageHeader.innerHTML = "";

    imageHeader.innerHTML = `
        <div class="imageHeader-image"><img src="${image}" alt="main image" /></div>
        <article class="desc">
            <span class="title">${title}</span>
            <p>${desc}</p>
        </article>
    `
}