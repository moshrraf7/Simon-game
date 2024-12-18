document.addEventListener("DOMContentLoaded", () => {
    const pads = document.querySelectorAll(".pad");
    const startButton = document.getElementById("start");
    let sequence = [];
    let playerSequence = [];
    let level = 0;

    // Function to start the game
    function startGame() {
        sequence = [];
        playerSequence = [];
        level = 0;
        nextLevel();
    }

    // Function to progress to the next level
    function nextLevel() {
        level++;
        playerSequence = [];
        const nextPad = pads[Math.floor(Math.random() * pads.length)];
        sequence.push(nextPad);
        playSequence();
    }

    // Function to play the sequence to the player
    function playSequence() {
        let delay = 0;
        sequence.forEach((pad, index) => {
            setTimeout(() => {
                activatePad(pad);
            }, delay);
            delay += 600;
        });
    }

    // Function to handle pad activation
    function activatePad(pad) {
        pad.classList.add("active");
        setTimeout(() => {
            pad.classList.remove("active");
        }, 400);
    }

    // Function to handle player's pad click
    function padClicked(pad) {
        playerSequence.push(pad);
        activatePad(pad);
        checkPlayerMove();
    }

    // Function to check player's move
    function checkPlayerMove() {
        const lastIndex = playerSequence.length - 1;
        if (playerSequence[lastIndex] !== sequence[lastIndex]) {
            alert("Game Over! You reached level " + level);
            startButton.style.display = "block";
            return;
        }
        if (playerSequence.length === sequence.length) {
            setTimeout(() => {
                nextLevel();
            }, 1000);
        }
    }

    // Event listeners
    pads.forEach(pad => {
        pad.addEventListener("click", () => {
            if (sequence.length > 0) {
                padClicked(pad);
            }
        });
    });

    startButton.addEventListener("click", () => {
        startButton.style.display = "none";
        startGame();
    });
});
