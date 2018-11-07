'use strict';

let finished = false;
let peopleRows = null; // Initialized onload
let animationSpeed = 1;
let frameCount = 0;
let peoplePerRow = 7; // TODO: Replace with a smaller number when more people

function frame() {
    if (finished) {return;}
    /* ADD ROWS */
    let body = document.body;
    let bodyHeight = Math.max(body.scrollHeight, body.offsetHeight);
    let fullyScrolled = (window.innerHeight + window.scrollY + 50) >= (document.body.offsetHeight);
    if (bodyHeight < (window.innerHeight * 2) || fullyScrolled) {
        peopleRows.appendChild(listOfPeopleImages(peoplePerRow));
    }
    // TODO add infinite scrolling
    /* ANIMATION */
    for (let i = 0; i < peopleRows.children.length; i++) {
        let list = peopleRows.children.item(i);
        let moveRight = i % 2 === 0;
        let offset;
        let imgSize = Math.ceil(window.innerWidth * 0.2); // IF CHANGE THEN CHANGE CSS
        let imgOffset = (frameCount * animationSpeed) % imgSize;
        let isCycleFrame = imgOffset === 0;
        if (moveRight) {
            offset = imgOffset - imgSize;
            if (isCycleFrame) {
                let last = list.lastChild;
                list.removeChild(last);
                list.insertBefore(last, list.firstChild);
            }
        } else {
            offset = (-1 * imgOffset);
            if (isCycleFrame) {
                let first = list.firstChild;
                list.removeChild(first);
                list.appendChild(first);
            }
        }
        list.style.left = `${offset}px`;

    }
    frameCount++;
    window.requestAnimationFrame(frame);
}

function listOfPeopleImages(count) {
    let shuffledPeople = shuffleClone(window.people);

    let list = document.createElement('ul');
    list.className = 'row';
    for (let i = 0; i < count; i++) {
        let item = document.createElement('li');
        item.appendChild(personImg(shuffledPeople[i]));
        list.appendChild(item);
    }
    return list
}

function personImg(person) {
    let img = document.createElement('img');
    img.className = 'person';
    img.src = person.src;

    img.addEventListener('click', () => {
        if (person.birthday) {
            foundTheBirthdayPerson();
        } else {
            wrongErrorMessage();
        }

    })
    return img;
}

function shuffleClone(arr) {
    let out = Array(arr.length);
    arr.forEach((s, i) => {
        out[i] = s
    });

    let currentIndex = out.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = out[currentIndex];
        out[currentIndex] = out[randomIndex];
        out[randomIndex] = temporaryValue;
    }

    return out;
}

function foundTheBirthdayPerson() {
    finished = true;
    while (peopleRows.firstChild) {
        peopleRows.removeChild(peopleRows.firstChild);
    }
    peopleRows.innerHTML =`<div id="VictoryVideo"><iframe width="560" height="315" src="https://www.youtube.com/embed/SvgfF-s3Qh4?start=54&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
}

function wrongErrorMessage() {
    let possibleErrors = [
      'INCORRECT',
      'Thats not the birthday person',
      'Wrongerino',
      'Try again birthday basher',
      'That isn\'t correct at all',
      'Not even close',
      'Are you even trying?',
      'Thats it! Just kidding. That is not it. That isnt the person at all. You are wrong. I am disappointed.',
      'no',
      'uhuh',
      'nada',
      'ha no',
      'Perhaps try again',
      'Your choice is like the Vietnam War. In that it was wrong.',
      'That is as much the birthday individual as you are the pope and the oranges are blue',
      'Now why would you pick them?',
      'Jesum christ, wrong.'
    ];

    alert(possibleErrors[Math.floor(Math.random() * possibleErrors.length)]);
}

function setupSubtitle() {
    let possibleHeaders = [
        'Find that special guy!',
        'Find that birthday person!',
        'Find who needs that birthday cake!',
        'Find who needs to blow out the candles!',
    ];
    let h = document.getElementById('subtitle');
    h.innerText = possibleHeaders[Math.floor(Math.random() * possibleHeaders.length)];
}

window.addEventListener('DOMContentLoaded', function () {
    peopleRows = document.getElementById('PeopleRows');
    setupSubtitle();
    window.requestAnimationFrame(frame);
}, false);