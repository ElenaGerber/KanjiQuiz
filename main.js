let randomNumber = 1;
let guessing = true;
let kanjis = null;
let currentKanjiKey =  null;
let currentKanjiValue = null;

function getNewKanji(){
    const kanjiKeys = Object.keys(kanjis)
    const numberOfKanjis = kanjiKeys.length
    randomNumber = Math.floor(Math.random() * (numberOfKanjis-1));
    currentKanjiKey =  kanjiKeys[randomNumber]
    currentKanjiValue = kanjis[currentKanjiKey];
}

function updatePage() {
        if (guessing) {
            result.innerText = ""
        getNewKanji();
        bigSymbol.style.color = "black";
        bigSymbol.innerText = JSON.parse(`["\\u${currentKanjiValue}"]`)[0];
    } else {
        if (answer.value.toLowerCase() === currentKanjiKey) {
            bigSymbol.style.color = "green";
            answer.value = "";
            guessing = true;
            setTimeout(updatePage, 500);
        } else {
            bigSymbol.style.color = "red";
            result.innerText = "Right answer: " + currentKanjiKey;
            guessing = true;
            setTimeout(updatePage, 1500);
        }
    }
}

function handleSubmit(){
    event.preventDefault()
    guessing = false;
    updatePage();
}

document.getElementById("answerForm").onsubmit = handleSubmit;

document.addEventListener("DOMContentLoaded", function() {
    let bigSymbol = document.getElementById("bigSymbol");
    let result = document.getElementById("result");
    let answer = document.getElementById('answer');

    fetch('kanjis.json')
        .then(response => response.json())
        .then(data => {
            kanjis = data;
            updatePage();
        })
        .catch(error => console.error('Error fetching kanjis.json:', error));
});

