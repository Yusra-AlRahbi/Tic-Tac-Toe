let closeBtn = document.querySelector(".close-btn");
let yesBtn =document.querySelector(".yesBtn");
let noBtn =document.querySelector(".noBtn");
let alertStartModel = document.getElementById("start");
let alertWinnertModel = document.getElementById("winner-model");
let alertRestarttModel = document.getElementById("restart-model");
let background = document.querySelector(".background");
let Xbtn = document.querySelector("#Xbtn");
let Obtn = document.querySelector("#Obtn");
let gridItems = document.getElementsByClassName("square");
let statusAlert = document.querySelector(".status");
let userTurn = "";
let compTurn ="";
let gameFinished = false;
let userWin = 0;
let compWin = 0;

let boardArray=[
    "0","1","2",
    "3","4","5",
    "6","7","8"
];

play_action = ()=>{
    for(const item of gridItems){
        item.addEventListener("click",()=>{
          if (gameFinished)
          {
              return;
          }
    
          let index =item.getAttribute("value");
          if(boardArray[index]== "X" || boardArray[index]=="O")
          {
              return;
          }   

          userPlay(index);
   
          console.log(boardArray);
       
         });
     }
};
//If User Click X Button 
Xbtn.addEventListener("click",()=>{
  userTurn="X";
  compTurn="O";
  alertStartModel.style.display="none";
  background.style.display="none";
  document.getElementById("instruction").textContent =`${userTurn} Turn `;
 play_action();
});
// If User Click O Button 
Obtn.addEventListener("click",()=>{
      userTurn="O";
      compTurn="X";
      alertStartModel.style.display="none";
      background.style.display="none";
      document.getElementById("instruction").textContent =`${userTurn} Turn `;
      play_action();
  });
 
   const checkBord = ()=>{
      let flag = true;
      boardArray.forEach(element =>{
         if(element != userTurn && element != compTurn){
              flag = false;
          }
      });
      gameFinished = flag;
    }; 

    const gameLoop =()=>{
        checkBord();
        evaluateBord();

    }
    userPlay = (index)=> {
        if (!gameFinished && boardArray[index] !=userTurn || boardArray[index]!=compTurn){
            
           
            //Filling the value logically
           boardArray[index]=userTurn;
           //Filling the value visually
           let squareContent = document.querySelector(`.square[value= "${index}" ]`);
           squareContent.innerHTML=userTurn;
           squareContent.style.color="rgb(140, 10, 10)";
           
           gameLoop();
          setTimeout(compPlay , 500);
          document.getElementById("instruction").textContent =`${compTurn} Turn `;
        }
    }

    compPlay = () =>{ 
        if(!gameFinished){ 
            
            do{
                Index = Math.floor(Math.random() * 9);
            } while(boardArray[Index]==userTurn || boardArray[Index]==compTurn);
            
          
            //Filling the value logically
            boardArray[Index]=compTurn; 
             //Filling the value visually
            let squareContent = document.querySelector(`.square[value= "${Index}" ]`);
            squareContent.innerHTML =compTurn;
            squareContent.style.color="#020127";
           
            gameLoop();
            document.getElementById("instruction").textContent =`${userTurn} Turn `;
        }
    };
    const checkLine = (a,b,c)=>{
        return(boardArray[a]== boardArray[b] && boardArray[b]== boardArray[c] && (boardArray[a]==userTurn || boardArray[a]== compTurn));
    };
    const checkMatch = ()=>{
        for(i=0; i<9; i+=3){
            if(checkLine(i,i+1,i+2)){
                document.querySelector(`.square[value= "${i}" ]`).classList.add("win");
                document.querySelector(`.square[value= "${i+1}" ]`).classList.add("win");
                document.querySelector(`.square[value= "${i+2}" ]`).classList.add("win");
                return boardArray[i];
            }
        }
        for(i=0; i<3; i++){
            if(checkLine(i,i+3,i+6)){
                document.querySelector(`.square[value= "${i}" ]`).classList.add("win");
                document.querySelector(`.square[value= "${i+3}" ]`).classList.add("win");
                document.querySelector(`.square[value= "${i+6}" ]`).classList.add("win");
                return boardArray[i];
            }
        }
            if(checkLine(0,4,8)){
                document.querySelector(`.square[value= "${0}" ]`).classList.add("win");
                document.querySelector(`.square[value= "${4}" ]`).classList.add("win");
                document.querySelector(`.square[value= "${8}" ]`).classList.add("win");
                return boardArray[0];
            }
            if(checkLine(2,4,6)){
                document.querySelector(`.square[value= "${2}" ]`).classList.add("win");
                document.querySelector(`.square[value= "${4}" ]`).classList.add("win");
                document.querySelector(`.square[value= "${6}" ]`).classList.add("win");
                return boardArray[2];
            }  
            return "";

    };

    const  evaluateBord = ()=>{
        let result = checkMatch();
        let winner ="";
    
        if(result == userTurn) {
            //To count the times winner for the user
            winner == userTurn;
            userWin = userWin+1;
            document.querySelector(".numUserWin").innerHTML = userWin ;
            gameFinished = true;
            background.style.display="block";
            alertWinnertModel.style.display="block";
            statusAlert.innerHTML="You Win!";
            setTimeout(close_btn,1200);
           return userWin;
            
        } else if (result == compTurn) {
            //To count the times winner for the computer
            winner == compTurn;
            compWin = compWin+1;
            document.querySelector(".numCompWin").innerHTML = compWin ;
            gameFinished = true;
            background.style.display="block";
            alertWinnertModel.style.display="block";
            statusAlert.innerHTML="Computer Win!";
            setTimeout(close_btn,1200);
            
            return compWin;
        }else{
            var IsDraw = true;
            for (square of boardArray)
            {
                if (square != userTurn && square !=compTurn)
                {
                    IsDraw = false;
                }
            }
            if (IsDraw)
            {
                gameFinished = true;
                background.style.display="block";
                alertWinnertModel.style.display="block";
                statusAlert.innerHTML="Draw!";
                setTimeout(close_btn,1200);
            }
        }


  };

  //Reset Button
  document.getElementById("reset-btn").addEventListener("click",()=>{
     reset();
   });
const reset = ()=> {
    //resetiong the visual part
    for(const item of gridItems)
    {
        let value =item.getAttribute("value");
        let squareContent = document.querySelector(`.square[value ="${value}"]`);
        squareContent.innerHTML="";
        squareContent.classList.remove("win");
        boardArray=[
            "0","1","2",
            "3","4","5",
            "6","7","8"
        ];
       
    }
   
    gameFinished = false;
    document.getElementById("instruction").innerHTML =`${userTurn} Turn `;
};

//Event Listener when click YES button
yesBtn.addEventListener("click",()=>{
    restart();
    alertRestarttModel.style.display="none";
    alertStartModel.style.display="flex";

})
//Event Listener when click NO button
noBtn.addEventListener("click",()=>{
    background.style.display="none";
    alertRestarttModel.style.display="none";

})
// Restart Button
document.getElementById("restart-btn").addEventListener("click",()=>{
    background.style.display="block";
    alertRestarttModel.style.display="flex";
});

const restart = ()=> {
    //resetiong the visual part
    for(const item of gridItems)
    {
        let value =item.getAttribute("value");
        let squareContent = document.querySelector(`.square[value ="${value}"]`);
        squareContent.innerHTML="";
        squareContent.classList.remove("win");
        boardArray=[
            "0","1","2",
            "3","4","5",
            "6","7","8"
        ];
       
    }
    gameFinished = false;
    document.getElementById("instruction").innerHTML =`${userTurn} Turn `;
    userWin = 0;
    compWin = 0;
    document.querySelector(".numUserWin").innerHTML = userWin ;
    document.querySelector(".numCompWin").innerHTML = compWin ;
};

// Function for close alert
const close_btn = ()=>{
    alertWinnertModel.style.display ="none";
    background.style.display="none";
};
// Close the alert if press close
closeBtn.addEventListener("click",()=>{
    close_btn();
});
