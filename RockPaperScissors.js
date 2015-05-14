var choices = ["Rock", "Paper", "Scissors"];
var winMap = {Rock: "Scissors", Paper: "Rock", Scissors: "Paper"}; 
var loseMap = {Rock: "Paper", Paper: "Scissors", Scissors: "Rock"}; 
document.getElementById("playGame").addEventListener("click",RockPaperScissors,false);


function RockPaperScissors(){

    //variables
    var outcome = Math.random(); 
    var computerMove,
    userMove,
        result;  //for saving in mySQL 
        var userChoice = getUserChoice();

    // if nothing is selected then prompt asks user to choose 
    // else assigns userChoice to move to variable.
    if(userChoice < 0){
    	alert("Please choose a Rock, Paper or Scissors");
    	return ;
    }
    userMove = choices[userChoice];

    // user win probability 40%, computer win probability 30%, tie probability 30%
    // prints results to html page.
    if(outcome < 0.4){
    	computerMove = winMap[userMove];
    	result = "User Wins";
    } else if(outcome < 0.7){
    	computerMove = loseMap[userMove];
    	result = "Computer Wins";
    } else{  
    	computerMove = choices[userChoice];
    	result = "Tie";
    }
    document.getElementById("result").innerHTML+= "<p>"+ result +"</p>";
    document.getElementById("result").innerHTML+= "<p>"+"User : " + userMove + ", Computer : " + computerMove + "</p>"; 
};

function getUserChoice(){
	var userChoice = -1;
	for (var i=0;i<3; i++){
		if(document.getElementsByName("operation")[i].checked){
			var userChoice = document.getElementsByName("operation")[i].value;
			return userChoice;
		}
	}
	return userChoice;
}

//connecting to mySQL database through log.PHP 
function log(userMove, computerMove, result){
	var dataString = "userMove=" + encodeURIComponent (userMove) + "&computerMove=" + encodeURIComponent (computerMove) + "&result=" + encodeURIComponent(result);
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "log.php", true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.addEventListener("load", function (event) {
		alert(event.target.responseText);
		var jsonData = JSON.parse(event.target.responseText); 
		if (jsonData.success) {
			alert("logged");
		} else {
			alert("Failed" + jsonData.message);
		}
	}, false);
	xmlHttp.send(dataString);
}