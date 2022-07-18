import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, child, get } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyA4lFE7adTNCIXaFsaDI2PjWKXMud3Uykk",
    authDomain: "pokemon-petition.firebaseapp.com",
    projectId: "pokemon-petition",
    storageBucket: "pokemon-petition.appspot.com",
    messagingSenderId: "805440501228",
    appId: "1:805440501228:web:8a92c3b7b97e12e47d7cc9",
    measurementId: "G-WK25NZGHSJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

fetch('http://localhost:8080/vote', {
        method: 'GET',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        mode: "cors"
    }).then(data => data.json()).then(res => {
        const select = document.getElementById('country');
        let countries = [];

        for (let index in res) {
            countries.push(res[index].name.common);
        }

        const sortedCountries = countries.sort();

        for (let index in sortedCountries) {
            select.options[select.options.length] = new Option(sortedCountries[index], sortedCountries[index]);
        }
    });

function vote() {
    const name = document.getElementById('name').value;
    const country = document.getElementById('country').value;

    if (name === "" || name === undefined || name === null) {
        alert('Make sure to write your name!');
    } else {
        writeVoteData(name, country);
    }
};

function writeVoteData(name, country) {
    fetch('http://localhost:8080/vote', {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            country: country
        }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        mode: "cors"
    });
};

function voteFeedback(name) {
    alert(`Thanks for voting, ${name}!`);
    document.location.reload();
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function loadVoteCounter() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `votes/`)).then((snapshot) => {
        if (snapshot.exists()) {
            const dataKeys = Object.keys(snapshot.val());

            const voteCounter = document.getElementById('vote-counter');
            animateValue(voteCounter, 0, dataKeys.length, 1000);
            // voteCounter.innerHTML = dataKeys.length.toString();

        } else {
            console.log('No data available');
        }
    }).catch((error) => {
        console.error(error);
    });
}

loadVoteCounter();
window.vote = vote;