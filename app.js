
const navContainer = document.getElementById('alphabet-nav');
const ul = document.createElement('ul');
const wordEl = document.querySelector('.output-word');
const startButtonEl = document.getElementById('start-game');
const winGameEl = document.getElementById("win-game");
const imagesEl = document.getElementById("myImage");

const images = ["images/hangman0.png", "images/hangman1.png", "images/hangman2.png", "images/hangman3.png", "images/hangman4.png", "images/hangman5.png", "images/hangman6.png"];

const gameWords = ['pluto', 'saturn', 'uranus', 'neptune', 'mercury', 'venus', 'earth', 'mars', 'jupiter'];
let currentWord = '';
let guessedLetters = [];
let lives = 6;
let gameActive = false;

// Generate A-Z alphabet navigation links
for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#letter-${letter}`;
    a.textContent = letter;
    a.id = `letter-${letter.toLowerCase()}`; 
    a.onclick = (e) => {
        e.preventDefault();
        if (gameActive) {
            handleGuess(letter.toLowerCase());
        }
    };
    li.appendChild(a);
    ul.appendChild(li);
}
navContainer.appendChild(ul);

// Update the DOM display of the word
const updateWordDisplay = () => {
    
    if (!wordEl) return;
    
    // Create an array of characters: letter if guessed, underscore if not
    const displayArray = currentWord.split('').map(letter => {
        return guessedLetters.includes(letter) ? letter : '_';
    });
    
    wordEl.innerText = displayArray.join(' ');
    
    // Check Win Condition
    if (!displayArray.includes('_')) {
        gameActive = false;
        setTimeout(() => alert(`🎉 You Win! The word was: ${currentWord.toUpperCase()}`), 10);

    }
    startButtonEl.removeEventListener('click', playGame);
    startButtonEl.addEventListener('click', playGame);

};

// Start or Reset the game
const playGame = () => {
    
    const randomIndex = Math.floor(Math.random() * gameWords.length);
    currentWord = gameWords[randomIndex];
    guessedLetters = [];
    lives = 6;
    gameActive = true;

    const imagesEl = document.getElementById("myImage");
    const selectedImageSrc = images[0];
    imagesEl.src = selectedImageSrc;
    
    // Reset alphabet link visuals/styles (re-enable them)
    const links = navContainer.querySelectorAll('a');
    links.forEach(link => {
        link.style.pointerEvents = 'auto';
        link.style.opacity = '1';
        link.style.textDecoration = 'none';
    });

    updateWordDisplay();
    console.log(`Game started! Lives: ${lives}. (Cheater hint: ${currentWord})`);
};

// Process the player's guess
const handleGuess = (letter) => {
    // Prevent double guessing if already in the array
    if (guessedLetters.includes(letter)) return;
    
    guessedLetters.push(letter);

    if (!guessedLetters.includes(letter)) {
        imagesEl.innerText = hangman(1).png;
    }

    // Disable the clicked link visually and functionally
    const letterLink = document.getElementById(`letter-${letter}`);
    if (letterLink) {
        letterLink.style.pointerEvents = 'none';
        letterLink.style.opacity = '0.4';
    }

    // Check Loss Condition
    if (!currentWord.includes(letter)) {
        lives--;
        
        const images = ["images/hangman6.png", "images/hangman5.png", "images/hangman4.png", "images/hangman3.png", "images/hangman2.png", "images/hangman1.png", "images/hangman0.png"];
        const imagesEl = document.getElementById("myImage");
        for (let i = 0; i < images.length; i++) {
            const selectedImageSrc = images[`${lives}`];
            imagesEl.src = selectedImageSrc;
        }
            
        console.log(`Wrong guess! Lives remaining: ${lives}`);

        if (lives === 0) {

            const selectedImageSrc = images[`${lives}`];
            imagesEl.src = selectedImageSrc;

            gameActive = false;
            setTimeout(() => alert(`💥 Game Over! The word was: ${currentWord.toUpperCase()}`), 10);
        }
    }

    updateWordDisplay();
};

if (startButtonEl) {
    startButtonEl.addEventListener('click', playGame);
}