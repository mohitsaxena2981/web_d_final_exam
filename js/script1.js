


const startButton = document.getElementById("start");
const moves = document.getElementById("moves-count");

const stopButton = document.getElementById("stop");

let cards;
let interval;
let firstAnimalCard = false;
let secondAnimalCard = false;

const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");

//Items array
const items = [
  { animalName: "bee", animalImage: "../images/bee.png" },
  { animalName: "crocodile", animalImage: "../images/crocodile.png" },
  { animalName: "macaw", animalImage: "../images/macaw.png" },
  { animalName: "gorilla", animalImage: "../images/gorilla.png" },
  { animalName: "tiger", animalImage: "../images/tiger.png" },
  { animalName: "monkey", animalImage: "../images/monkey.png" },
  { animalName: "chameleon", animalImage: "../images/chameleon.png" },
  { animalName: "piranha", animalImage: "../images/piranha.png" },
  { animalName: "anaconda", animalImage: "../images/anaconda.png" },
  { animalName: "sloth", animalImage: "../images/sloth.png" },
  { animalName: "cockatoo", animalImage: "../images/cockatoo.png" },
  { animalName: "toucan", animalImage: "../images/toucan.png" },
];
let mohitansfinal=false;

//Initial moves and win count
let WrongMovesCounter = 6,
  winCount = 0;

//Start game
startButton.addEventListener("click", () => {
  WrongMovesCounter = 6;
  //controls amd buttons visibility
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  //initial moves
  moves.innerHTML = `<h2><span>Try's Remaining:</span> ${WrongMovesCounter}</h2>`;
  initializer();
});

//For calculating moves
const WrongMovesCounterer = () => {
  if(mohitansfinal==false)
  {
    WrongMovesCounter -= 1;
  }
  
  if(WrongMovesCounter==-1)
  {
    alert("Game Over");
    stopGame();
  }
  else{
    moves.innerHTML = `<h2><span>Try's Remaining:</span> ${WrongMovesCounter}</h2>`;
  }
  
};

//Pick random objects from the items array
const generateRandom = (sizeMohit = 4) => {
  //temporary array
  let tempArray = [...items];
  //initializes cardSelectedValues array
  let cardSelectedValues = [];
  //sizeMohit should be double (4*4 matrix)/2 since pairs of objects would exist
  sizeMohit = (sizeMohit * sizeMohit) / 2;
  //Random object selection
  for (let i = 0; i < sizeMohit; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardSelectedValues.push(tempArray[randomIndex]);
    //once selected remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }
  return cardSelectedValues;
};

const matrixGenerator = (cardSelectedValues, sizeMohit = 4) => {
  gameContainer.innerHTML = "";
  cardSelectedValues = [...cardSelectedValues, ...cardSelectedValues];
  //simple shuffle
  cardSelectedValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < (sizeMohit * sizeMohit)-4; i++) {

    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardSelectedValues[i].animalName}">
        <div class="cardBefore"></div>
        <div class="cardAfter">
        <img src="${cardSelectedValues[i].animalImage}" class="animalImage"/></div>
     </div>
     `;
  }
  //Grid
  gameContainer.style.gridTemplateColumns = `repeat(${sizeMohit},auto)`;
  
  //Cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched")) {
        //flip the cliked card
        card.classList.add("flipped");
        //if it is the firstAnimalCard (!firstAnimalCard since firstAnimalCard is initially false)
        if (!firstAnimalCard) {
          //so current card will become firstAnimalCard
          firstAnimalCard = card;
          //current cards value becomes firstAnimalCardValue
          firstAnimalCardValue = card.getAttribute("data-card-value");
        } else {
          //increment moves since user selected second card
          WrongMovesCounterer();
          //secondAnimalCard and value
          secondAnimalCard = card;
          let secondAnimalCardValue = card.getAttribute("data-card-value");
          if (firstAnimalCardValue == secondAnimalCardValue) {
            //if both cards match add matched class so these cards would beignored next time
            firstAnimalCard.classList.add("matched");
            secondAnimalCard.classList.add("matched");
            mohitansfinal=true;
            //set firstAnimalCard to false since next card would be first now
            firstAnimalCard = false;
            //winCount increment as user found a correct match
            winCount += 1;
            //check if winCount ==half of cardSelectedValues
            if (winCount == Math.floor(cardSelectedValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${WrongMovesCounter}</h4>`;
              stopGame();
            }
          } else {
            //if the cards dont match
            //flip the cards back to normal
            mohitansfinal=false;
            let [tempFirst, tempSecond] = [firstAnimalCard, secondAnimalCard];
            firstAnimalCard = false;
            secondAnimalCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

//Stop game
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);

//Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardSelectedValues = generateRandom();
  console.log(cardSelectedValues);
  matrixGenerator(cardSelectedValues);
};




