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

### 2. 
