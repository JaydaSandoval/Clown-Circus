# Clown-Circus
A browser-based mini app that is a puzzle game inlcuding the theme of the circus.

## Features 
- Instructional Guidance
- Instructional Popups
- Drag and Drop
- Responsive Screen Changing
- Guessing the Rabbit Placement
- Randomized Key Placements

## How to Play
- Read the instructions per level
- Complete each task
- Once you place the key to the last door you escape
- May reset game repeatedly

## Code Overview
This code contains the important following functions: 

### 1. Play Function with Fade

```javaScript
playBtn.addEventListener("click", () => {
    updateInstruction("Find the bunny in the three hats!"); //INSTRUCTION TAB
    showInstruction();  //SHOW TAB HERE

    fadeOverlay.style.opacity = 1;
    //fADEOVERLAY SET
    setTimeout(() => {
        homepage.classList.remove("visible");
        levelOne.classList.add("visible");
        fadeOverlay.style.opacity = 0;
    }, 600);
    });
```

### 2. level One Function - Randomized Boxes and fade to next Level

```javascript
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
```

### 3. Level Two Function - Random Key Assortment Drag and Drop -- Next Level Fade

```javascript
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
```

### 4. Instructional Functions
```javascript
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
```

### 5. Reset Button Function
```javascript

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
```

## Technologies Used
- JavaScript
- HTML
- CSS

## Implementation
To Implement in this code: 

