const start = document.querySelector('.btn__reset');
overlay = document.getElementById('overlay');
phrases = [
                  'LAGAAN',
                  'DRISHYAM',
                  'AIRLIFT',
                  'ISHQIYA',
                  'ROCKSTAR'
                ];
lives = 5;
triesList = document.getElementsByClassName('tries');
const ul = document.getElementById("phrase").firstElementChild;
const mainHead = document.getElementById("title");
const lostTxt = document.createTextNode("You lost. Try again?")
const winTxt = document.createTextNode("You Win! Play again?")



function randomPhrase() {
  return phrases[Math.floor(Math.random() * phrases.length)];
};


function addPhraseToDisplay() {
  let phrase = randomPhrase();
  for(let i = 0; i < phrase.length; i++) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(phrase[i]));
    if (phrase[i] !== " "){
      li.setAttribute("class", "letter");
    };
    ul.appendChild(li);
  };
};


function checkLetter(guess){
  let correctLetter = null;
  let liList = document.getElementsByClassName('letter');
 
  for(let i = 0; i < liList.length; i++){
    if(liList[i].innerHTML.toUpperCase() === guess.toUpperCase()) {
      let correct = liList[i].innerHTML;
      liList[i].setAttribute("class", "letter show");
      correctLetter = liList[i].innerHTML;
    };
  };
 
  if (correctLetter != null) {
    return correctLetter;
  };
 
  return null;
 
};


function checkWin(){
  
  if (lives == 0) {
    overlay.setAttribute('class','lose');
    overlay.style.display = 'flex';
    mainHead.firstChild.nodeValue = "You Lose. Try again?";
    reset();
    return;
  };
  
  let liList = document.getElementsByClassName('letter');
  for(let i = 0; i < liList.length; i++) {
    if(liList[i].classList.contains('show') === false) {
      return;
    };
  };
  
  overlay.setAttribute('class','win');
  mainHead.firstChild.nodeValue = "You Won!! Play again?";
  reset();
  overlay.style.display = 'flex';
};


function reset() {

  lives = 5
  while(ul.firstChild){
      ul.removeChild(ul.firstChild);
  };
  
  let buttons = document.querySelectorAll("BUTTON");
  for(let i = 0; i < buttons.length; i++) {
    buttons[i].removeAttribute('disabled');
    buttons[i].setAttribute('class', ' ');
  };
  
  for(let i = 0; i < triesList.length; i++) {
    triesList[i].firstChild.src = 'heart1.png';
  };
};


start.addEventListener('click', (e) => {
  overlay.style.display = 'none';
  addPhraseToDisplay();
});


document.addEventListener('click', (e) => {
  if(e.target.tagName == 'BUTTON') {
    e.target.setAttribute('class', 'chosen');
    e.target.setAttribute('disabled', 'true');
  let guess = e.target.innerHTML;
  let letterfound = checkLetter(guess);
 
  if (letterfound == null) {
    lives -= 1;
    triesList[lives].firstChild.src = 'heart2.png';
  };
  checkWin();
  };
});