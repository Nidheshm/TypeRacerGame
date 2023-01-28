const RANDOM_TEXT_API_URL = 'http://api.quotable.io/random' //Random Text Generator
const textDisplayElement = document.getElementById('textDisplay')
const textInputElement = document.getElementById('textInput')
const stopwatchElement = document.getElementById('stopwatch')
var time, words, score
var Scores = [0]
var best_Score = Scores[0]

textInputElement.addEventListener('input', () => {
  const arrayText = textDisplayElement.querySelectorAll('span')
  const arrayValue = textInputElement.value.split('')

  let correct = true
  arrayText.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
    }
  })

  if (correct) {
    words = arrayText.length / 5
    NewText()
    for (var i = 0; i < Scores.length; i++) {
      if (best_Score < Scores[i] ) {
          best_Score = Scores[i];
      }
  }
  }
})

function getRandomText() {
  return fetch(RANDOM_TEXT_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function NewText() {
  const text = await getRandomText()
  time = stopwatch.innerText / 60
  score = Math.floor(words / time)
  if (isNaN(score) === false) {
    Scores.push(score)
  }
  document.getElementById("bestScore").innerHTML = best_Score
  textDisplayElement.innerHTML = ' '
  text.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    textDisplayElement.appendChild(characterSpan)
  })
  textInputElement.value = null
  startStopwatch()
}

let startTime
function startStopwatch() {
  stopwatchElement.innerText = 0
  startTime = new Date()
  setInterval(() => {
    stopwatch.innerText = getStopwatchTime()
  }, 1000)
}

function getStopwatchTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

NewText()