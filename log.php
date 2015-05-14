<?php
require 'database.php';
header("Content-Type: application/json");

//variables from game. userMove, computerMove and result are all string variables. 
$userMove = (string)$_POST["userMove"];
$computerMove = (string)($_POST["computerMove"]);
$result = (string)$_POST["result"];
$stmt = $mysqli->prepare("insert into RPS(userMove, computerMove, result) values (?,?,?)");


if(!$stmt){
	echo json_encode(array(
		"success" => false,
		"message" => "wrong"
		));
	exit;
}else{
	$stmt->bind_param('sss', $userMove, $computerMove, $result);
	$stmt->execute();
	// session_start();
	echo json_encode(array(
		"success" => true
		));
	$stmt->close();
	exit;
}
exit;

?>