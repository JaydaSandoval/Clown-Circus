    //DOM Methods
    const playBtn = document.getElementById("playBtn");
    const instructionsBtn = document.getElementById("instructionsBtn");
    const closePopup = document.getElementById("closePopup");

    const popup = document.getElementById("instructionsPopup");
    const fadeOverlay = document.getElementById("fadeOverlay");

    const homepage = document.getElementById("homepage");
    const levelOne = document.getElementById("levelOne");
    const levelThree = document.getElementById("levelThree");
    const levelFour = document.getElementById("levelFour");
    const levelFive = document.getElementById("levelFive");

    // Hide tab on homepage load
    hideInstruction();

    // Show instructions popup
    instructionsBtn.addEventListener("click", () => {
    popup.classList.remove("hidden");
    });

    // Close popup
    closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
    });

    // Play button fade to black → show level one
    playBtn.addEventListener("click", () => {
    updateInstruction("Find the bunny in the three hats!");
    showInstruction();  //SHOW TAB HERE

    fadeOverlay.style.opacity = 1;

    setTimeout(() => {
        homepage.classList.remove("visible");
        levelOne.classList.add("visible");
        fadeOverlay.style.opacity = 0;
    }, 600);
    });

    // Level One 
    const boxes = document.querySelectorAll(".box");
    const wrongPopup = document.getElementById("wrongPopup");
    const wrongCloseBtn = document.getElementById("wrongCloseBtn");

    let correctBox = Math.floor(Math.random() * 3);

    boxes.forEach(box => {
    box.addEventListener("click", () => {
        const clicked = parseInt(box.dataset.id);

        if (clicked === correctBox) {
        fadeOverlay.style.opacity = 1;

        setTimeout(() => {
            updateInstruction("Find the Key and put it in your pocket!");
            showInstruction();   // ← SHOW TAB HERE

            levelOne.classList.remove("visible");
            levelThree.classList.add("visible");
            fadeOverlay.style.opacity = 0;

            document.getElementById("boxesContainer").style.display = "none";

            setupLevelThree();
        }, 600);

        } else {
        wrongPopup.classList.remove("hidden");
        }
    });
    });

    wrongCloseBtn.addEventListener("click", () => {
    wrongPopup.classList.add("hidden");
    });

    //LEVEL THREE
    function setupLevelThree() {
    const keyBoxes = document.querySelectorAll('.keyBox');
    const dropZone = document.getElementById('drop-zone');
    let draggedKey = null;

    const randomIndex = Math.floor(Math.random() * keyBoxes.length);

    keyBoxes.forEach((box, index) => {
        box.innerHTML = "";

        if (index === randomIndex) {
        const key = document.createElement('img');
        key.src = 'key.webp';
        key.classList.add('key');
        key.setAttribute('draggable', 'true');

        key.addEventListener('dragstart', (e) => {
            draggedKey = key;
            e.dataTransfer.setData('text/plain', 'key');
            key.style.opacity = '0.5';
        });

        key.addEventListener('dragend', () => {
            key.style.opacity = '1';
        });

        box.appendChild(key);
        }
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');

        if (draggedKey) {
        dropZone.innerHTML = "";
        dropZone.appendChild(draggedKey);


        draggedKey.style.width = "80px";
        draggedKey.style.opacity = "1";

        draggedKey = null;

        setTimeout(() => {
            fadeOverlay.style.opacity = 1;

            setTimeout(() => {
            levelThree.classList.remove("visible");
            levelFour.classList.add("visible");

            showInstruction();   // ← SHOW TAB HERE

            setupLevelFour();

            fadeOverlay.style.opacity = 0;
            }, 600);
        }, 400);
        }
    });
    }

    // -------- LEVEL FOUR --------
    function setupLevelFour() {
    updateInstruction("Unlock the door with the key!");
    showInstruction();   // ← TAB VISIBLE DURING LEVEL 4

    const key = document.getElementById("level4Key");
    const dropZone = document.getElementById("bigDropZone");
    let dragged = null;

    key.addEventListener("dragstart", (e) => {
        dragged = key;
        e.dataTransfer.setData("text/plain", "key");
        key.style.opacity = "0.5";
    });

    key.addEventListener("dragend", () => {
        key.style.opacity = "1";
    });

    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("drag-over");
    });

    dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("drag-over");

        if (dragged) {
        dropZone.innerHTML = "";
        dropZone.appendChild(dragged);

        dragged.style.width = "100px";
        dragged.style.opacity = "1";
        dragged = null;

        setTimeout(() => {
        levelFour.classList.remove("visible");
        levelFive.classList.add("visible");  // ← SHOW LEVEL 5
        hideInstruction();
        fadeOverlay.style.opacity = 0;
    }, 600);

        }
    });
    }

    function updateInstruction(text) {
    const tab = document.getElementById("instructionTab");
    tab.textContent = text;
    }

    function showInstruction() {
    document.getElementById("instructionTab").style.display = "block";
    }

    function hideInstruction() {
    document.getElementById("instructionTab").style.display = "none";
    }

    const resetBtn = document.getElementById("resetBtn");

    resetBtn.addEventListener("click", () => {
    fadeOverlay.style.opacity = 1; // fade to black

    setTimeout(() => {
        // Hide all levels
        levelOne.classList.remove("visible");
        levelThree.classList.remove("visible");
        levelFour.classList.remove("visible");
        levelFive.classList.remove("visible");

        // Show homepage
        homepage.classList.add("visible");

        // Reset instructions
        hideInstruction();

        // Reset Level One randomness
        correctBox = Math.floor(Math.random() * 3);

        // Reset Level Three
        document.getElementById("boxesContainer").style.display = "flex";
        document.getElementById("drop-zone").innerHTML = "";
        document.querySelectorAll(".keyBox").forEach(box => box.innerHTML = "");

        // Reset Level Four key (simple safe reset)
        const level4Key = document.getElementById("level4Key");
        const level4Area = document.getElementById("sideKeyBox"); // your original container
        if (level4Area && level4Key) {
        level4Area.appendChild(level4Key);
        level4Key.style.width = "90px";
        }

        // Fade back in
        setTimeout(() => {
        fadeOverlay.style.opacity = 0;
        }, 200);

    }, 600);
    });