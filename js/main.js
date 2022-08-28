//////////////////////////////// Start //////////////////////////////////////////

//overlay variables
let overLayStart = `    <div class="overlay-start">
<div class="content">
    <div class="input">
        <input type="text" autofocus placeholder="Enter your name">
    </div>
    <div class="btn">Start</div>
</div>
</div>`;

let overLayEnd = `    <div class="overlay-end">
<div class="content">
    <h3 class="winner-loser">YOU LOST THE GAME ^^</h3>
    <div class="option">
        <div class="btn">Again</div>
        <div class="cancel">Cancel</div>
    </div>
</div>
</div>`;

document.body.innerHTML = overLayEnd + document.body.innerHTML;
document.body.innerHTML = overLayStart + document.body.innerHTML;

//global variable
let userInput = document.querySelector(".input input");
let startBtn = document.querySelectorAll(".btn");
let layer = document.querySelector(".overlay-start");
let boxes = document.querySelectorAll(".box");
let userName = document.querySelector(".user-name");
let wrong = document.querySelector(".wrong");
let endLayer = document.querySelector(".overlay-end");
let endGame = 0;
let winOrLose = document.querySelector(".winner-loser");
let cancel = document.querySelector(".cancel");
let audio = new Audio(
  "audio/zapsplat_multimedia_game_tone_bright_plucked_positive_tone_001_88490.mp3"
);


// add event to bottom start and play again
startBtn.forEach((e) => {
  e.addEventListener("click", (e) => {
    if (userInput.value) {
      userName.innerHTML = userInput.value;
    }

      
    //in case he want to play again the wrong tries back to zero
    wrong.innerHTML = "0";
    wrong.style.color = "black";

    
      
    //hide the start and end layer
    layer.style.display = "none";
      endLayer.style.display = "none";
      

    //make the element arranged in random every time he finish
    for (let i = 0; i < 20; i++) {
      swapIndex(
        Math.floor(Math.random() * boxes.length),
        Math.floor(Math.random() * boxes.length)
      );
      }
      

    //rotate to the back for a little bit
    rotate();
      

    //back to play
    setTimeout(rotateBack, 2000);

      
    //adding click event on every card
    boxes.forEach((element) => {
        element.addEventListener("click", (e) => {
          
        //to count the number of clicked card
        let count = 0;
            
        //array to carry the index of clicked card
        let arrayOfIndex = [];

        //on click flip the card and add attribute to it
        e.currentTarget.style.transform = "rotateY(180deg)";
        e.currentTarget.setAttribute("state", "click");
            

        //check how many card has an attribute state
        boxes.forEach((element, index) => {
          if (element.getAttribute("state") == "click") {
            count++;
            arrayOfIndex.push(index);
          }
        });

        
        if (count === 2) {
          //prevent click event on any element
          unClick();
          //go and check if it similar
          setTimeout(checkSimilarity, 500, arrayOfIndex);
          //turn click event again
          setTimeout(click, 800);
        }
      });
    });
  });
});




//swap function
function swapIndex(indexOne, indexTwo) {
  let temp = boxes[indexOne].innerHTML;
  boxes[indexOne].innerHTML = boxes[indexTwo].innerHTML;
  boxes[indexTwo].innerHTML = temp;
}



//rotate to back img
function rotate() {
  boxes.forEach((e) => {
    e.style.transform = "rotateY(180deg)";
  });
}



//rotate to front img
function rotateBack() {
  boxes.forEach((e) => {
    e.style.transform = "rotateY(0deg)";
  });
}




//when he click on two card make the rest of them unclickable
function unClick() {
  boxes.forEach((e) => {
    e.style.pointerEvents = "none";
  });
}




//return to clickable state again after finishing the check
function click() {
  boxes.forEach((e) => {
    if (!e.classList.contains("clicked")) {
      e.style.pointerEvents = "auto";
    }
  });
}




// if he choose right or wrong
function checkSimilarity(index) {
  //check on them by its index
    if (boxes[index[0]].innerHTML !== boxes[index[1]].innerHTML) {
      
    //on case choosing wrong
    setTimeout(function () {
      boxes[index[0]].style.transform = "rotateY(0deg)";
      boxes[index[1]].style.transform = "rotateY(0deg)";
      wrong.innerHTML++;

      //if the wrong tries over ten he lost but still playing
      if (wrong.innerHTML > 10) {
        wrong.style.color = "red";
      }
    }, 500);
  }
  
  else {
    boxes[index[1]].classList.add("clicked");
    boxes[index[0]].classList.add("clicked");

    //if he choose correct
    audio.play();
    endGame++;
        
        if (endGame === 10) {
        
      //when he finish the game
      endLayer.style.display = "flex";
      if (wrong.innerHTML > 10) {
        winOrLose.innerHTML = "YOU LOST THE GAME ^^";
      } else {
        winOrLose.innerHTML = "YOU WON THE GAME ^^";
      }
    }
  }

  //remove the attribute anyway to continue
  boxes[index[1]].removeAttribute("state");
  boxes[index[0]].removeAttribute("state");
}



//when he finish the game ask if he want to cancel the game
cancel.onclick = function () {
  endLayer.style.display = "none";
};



//////////////////////////////// End //////////////////////////////////////////
