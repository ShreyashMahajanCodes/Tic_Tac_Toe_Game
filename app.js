let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let mgsContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let playerTurn = document.querySelector("#turn");
let count = 0;

let turnO = true;
playerTurn.innerText = 'O\'s Turn';

const showPlayerTurn = () => {
    if(turnO){
        playerTurn.innerText = 'O\'s Turn';
    }else{
        playerTurn.innerText = 'X\'s Turn';
    }
}


const winPatterns = [
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]

boxes.forEach((box) => {
    box.addEventListener("click", () => { 
        count+=1;             
        if(turnO){
            box.innerText = 'O';
            // box.classList.add("playerOcolor");
            box.style.color = "green";
            turnO = false;
        }
        else {
            box.innerText = 'X';
            // box.classList.add("playerXcolor");
            box.style.color = "red";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
        showPlayerTurn();
        
    });
});



const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    mgsContainer.classList.add("hide");
    showPlayerTurn();
}

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = '';
        box.classList.remove("playerOcolor");
        box.classList.remove("playerXcolor");
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    mgsContainer.classList.remove('hide');
    disableBoxes();
}


const checkWinner = () => {
    for(let pattern of winPatterns){        
            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;
        
            if(pos1Val != '' && pos2Val != '' && pos3Val != ''){
                if(pos1Val == pos2Val && pos2Val == pos3Val){
                    console.log("Winner ", pos1Val , " !!!");
                    showWinner(pos1Val);
                    break;
                }else if(count == 9){
                    msg.innerText = 'It\'s a draw!';
                    mgsContainer.classList.remove('hide');
                }
            }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);