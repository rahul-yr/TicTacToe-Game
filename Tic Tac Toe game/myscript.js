$(document).ready(function(){  
// $(".tiles").on();
  $("td").on("click",enterValue); 
  $("#reset").on("click",reset);
}); 
var count=0;
  var huPlayer="X";
var iter=0;
 var aiPlayer="O";
 //   Entering value function   
function enterValue(element){
 if($(this).text()==""){
   player="X";
   count++;
   $(this).text(player);
   var id=parseInt(element.target.id);
   board[id]="X"; 
 
   // winner checking ---exists or not
   if(winner(board,huPlayer)){
     setTimeout(function(){
       alert("You won the match");
         $("#Gameover").css("visibility","visible");
     $(".tiles").off();  // used to remove the events added
    //  reset();
     },250);
   }
   else if(count>8){
     setTimeout(function(){
            alert("It's a Tie Match");
    $("#Gameover").css("visibility","visible");
     $(".tiles").off();  // used to remove the events added
    //  reset();
     },250);
   } 
   else{
     count++; 
      player="O";  
 
  console.log(board);
   var index=minimax(board,aiPlayer).index;
     var selector = "#" + index;
     console.log(index+"______________________");
     board[index]=aiPlayer;
     $(selector).text(player);
     if(winner(board,aiPlayer)){
       setTimeout(function(){
       alert("You lose the match");
                 $("#Gameover").css("visibility","visible");

     $(".tiles").off();  // used to remove the events added
    //  reset();
     },250);
       return;
     }
     else if (count === 0) {
        setTimeout(function() {
          alert("It's a draw match");
            $("#Gameover").css("visibility","visible");
            $(".tiles").off(); 
        //  reset();
        }, 250);
        return;
      }
     
   }
  console.log(element.target.id);
   console.log(board); 
  
 }     
}  

//  Reset Function
function reset(){
  $(".tiles").text("");
   $("td").on("click",enterValue); 
  $("#reset").on("click",reset);
    $("#Gameover").css("visibility","hidden");
 
   //$(".tiles").on("click");
  board=[0,1,2,3,4,5,6,7,8];
  count=0;
   huPlayer="X";
 iter=0;
  aiPlayer="O";
  console.log("Resetting");
}

// Winner function
 var board=[0,1,2,3,4,5,6,7,8];
function winner(board,player){
  if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
  ) {   
    return true;
  } else {
    return false;
  }

}
 
// Computer function 
function minimax(reboard, player) {
 // iter++;
  var array = avail(reboard);
//  $("#data").append(" <p> [ "+array+"  ] </p> ");
  if (winner(reboard, huPlayer)) {
    return {
      score: -10
    };
  } else if (winner(reboard, aiPlayer)) {
    return {
      score: 10
    };
  } else if (array.length === 0) {
    return {
      score: 0
    };
  }

  var moves = [];
  for (var i = 0; i < array.length; i++) {
    var move = {};
    move.index = reboard[array[i]];
    reboard[array[i]] = player;
  // $("#data").append("  ( "+reboard+"  )  ");  
 //$("#data").append(" {"+move.index+"}{"+move.score+"}");
    if (player == aiPlayer) {
      var g = minimax(reboard, huPlayer);
      move.score = g.score;
     //   $("#data").append(" {"+move.index+"}{"+move.score+"}");
    } else {
      var g = minimax(reboard, aiPlayer);
      move.score = g.score;
     //  $("#data").append(" {"+move.index+"}{"+move.score+"}");
    }
  //   $("#data").append("  [ "+array+"  ]  ");
//$("#data").append("  [reboard before modification "+reboard+"  ]  ");
    reboard[array[i]] = move.index;
//     $("#data").append("reboard after modification  [ "+reboard+"  ]  ");
    moves.push(move);
 //    $("#data").append("moves array values  ++ ");
//    $("#data").append("<h5>"+Object.entries(moves[i])+" </h5>");
  }
 
  var bestMove;
     //    $("#data").append("<p>all moves=="+moves.length+" </p>");

  if (player === aiPlayer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
     //   $("#data").append("<p>all scores of ai=="+Object.entries(moves[i])+" </p>");
      if (moves[i].score > bestScore) {
       //   $("#data").append("<p>best scores ai=="+Object.entries(moves[i])+" </p>");
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      //  $("#data").append("<p>all scores of human=="+Object.entries(moves[i])+" </p>");
      if (moves[i].score < bestScore) {
       //  $("#data").append("<p>best scores human=="+Object.entries(moves[i])+" </p>");
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}

// Getting vacancy positions that are not filled either by X or O
function avail(reboard){
  return reboard.filter(s=> s!="X" && s!="O");
}