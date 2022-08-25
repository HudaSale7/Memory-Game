let boxes = document.querySelectorAll(".box");
let wrong = document.querySelector(".wrong");
let endGame = 0;

function rotate() {
    boxes.forEach(e => {
        e.style.transform = "rotateY(0deg)";
    });
}

setTimeout(rotate, 2000);

function unClick() {
    boxes.forEach(e => {
        e.style.pointerEvents= "none";
    });
}

function click() {
    boxes.forEach(e => {
        e.style.pointerEvents= "auto";
    });
}

function swapIndex(indexOne, indexTwo) {
    let temp = boxes[indexOne].innerHTML;
    boxes[indexOne].innerHTML = boxes[indexTwo].innerHTML;
    boxes[indexTwo].innerHTML = temp;
}

for (let i = 0; i < 20; i++) {
    swapIndex(Math.floor(Math.random() * boxes.length), Math.floor(Math.random() * boxes.length));
}

function checkSimilarity(index) {
    if (boxes[index[0]].innerHTML !== boxes[index[1]].innerHTML) {

        boxes[index[0]].style.transform = "rotateY(0deg)";
        boxes[index[1]].style.transform = "rotateY(0deg)";
        wrong.innerHTML++;
    } else {
        endGame++;
        if (endGame === 10) {
            console.log("done");
        }
    }
    boxes[index[1]].removeAttribute("state");
    boxes[index[0]].removeAttribute("state");
}

boxes.forEach(element => {
    element.addEventListener("click", (e) => {
        
        let count = 0;
        let arrayOfIndex = [];
        e.currentTarget.style.transform = "rotateY(180deg)";
        e.currentTarget.setAttribute("state", "click");

        boxes.forEach((element, index) => {
            if (element.getAttribute("state") == "click") {
                count++;
                arrayOfIndex.push(index);
            }
        })
        if (count === 2) {
            unClick();
            setTimeout(checkSimilarity, 1000, arrayOfIndex);
            setTimeout(click, 800);
        }
    }
    )
});










