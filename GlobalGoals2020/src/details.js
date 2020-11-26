"use strict"

import * as errorHandling from './errorHandling.js';

let currentGoal = 0

checkEntry()

function checkEntry() {
    try {
        let data = JSON.parse(localStorage.getItem('details'));
        currentGoal = data.url.slice(data.url.length - 1)
        errorHandling.isValidUrl(data.url) ? extractData(data.url) : handleError('Url is not valid');
    } catch (err) { handleError(err.message) }
}

function handleError(message) { console.log('Error:', message) }

function extractData(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => { handleDistribution(data.item) })
}

let amountOfTargets = 0;
function handleDistribution(data) {
    amountOfTargets = 0;
    let { byline, color, description, icon, id, image, num_targets, title } = data; // I listed them all, if they are needed later on
    let targets = data.targets.map(target => ({ id: amountOfTargets++, desc: target.description })); // Get array of targets
    id = id < 10 ? '0' + id : id; // Add 0 to id if below 10

    handleInfoView(id, title, description, image);
    handleTargetsView(targets);
}

// View
function handleInfoView(id, title, description, image) {
    const infoContainer = document.getElementById('details__info');

    infoContainer.innerHTML = `
        <header class="info__header">
            <h2 class="header__title">${title}</h2>
            <div class="header__controls">
                <span id="prev">\<</span>
                <span id="next">\></span>
            </div>
            <span class="header__count">${id}</span>
        </header>
        <footer class="info__footer">
            <article class="footer__article">
                <p id="footer__desc">${description.slice(0, 250) + '...'}</p>
                <button id="footer__read-more" type="submit">Læs mere</button>
            </article>
            <div class="footer__image-container"><img src="${image}" alt="Hero image" /></div>
        </footer>
    `

    controls(description);
}

function handleTargetsView(targets) {
    const targetsContainer = document.getElementById('details__targets');

    targetsContainer.innerHTML = ""

    let title = document.createElement('h2');
    title.innerHTML = 'Targets';
    targetsContainer.appendChild(title);

    let targetsContained = document.createElement('ul');
    targetsContained.setAttribute('class', 'targets__container');
    targetsContainer.appendChild(targetsContained);

    targets.forEach(item => {
        targetsContained.innerHTML += `
            <li class="targets__item">
                <span class="item__count">${item.id}</span>
                <p>${item.desc}</p>
            </li>
        `
    });
}

// Controls
function controls(desc) {
    let url = JSON.parse(localStorage.getItem('details')).url;
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const readMore = document.getElementById('footer__read-more');
    const footerDesc = document.getElementById('footer__desc');

    try {
        // Clicked on prevous button
        prev.addEventListener('click', (e) => {
            e.preventDefault();

            currentGoal = Number(currentGoal) - 1; // Set back currentGoal
            if (currentGoal < 1) currentGoal = 17;

            // Set the fetch to the goal
            errorHandling.isValidUrl(url.slice(0, url.length - 1) + currentGoal) ? extractData(url.slice(0, url.length - 1) + currentGoal) : handleError('Url is not valid')
        })

        // Clicked on next button
        next.addEventListener('click', (e) => {
            e.preventDefault();

            currentGoal = Number(currentGoal) + 1; // Set back currentGoal
            if (currentGoal > 17) currentGoal = 1;

            // Set the fetch to the goal
            errorHandling.isValidUrl(url.slice(0, url.length - 1) + currentGoal) ? extractData(url.slice(0, url.length - 1) + currentGoal) : handleError('Url is not valid')
        })

        // Click Read button
        readMore.addEventListener('click', () => {
            footerDesc.classList.toggle('reading');
            footerDesc.classList.contains('reading') ? footerDesc.innerHTML = desc : footerDesc.innerHTML = desc.slice(0, 250) + '...';
            footerDesc.classList.contains('reading') ? readMore.innerHTML = 'Læs mindre' : readMore.innerHTML = 'Læs mere';
        })
    }
    catch (err) { handleError('Controls does not currently work') }
}