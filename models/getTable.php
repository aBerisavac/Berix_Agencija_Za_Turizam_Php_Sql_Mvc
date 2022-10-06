<?php

session_start();

include("../config/connection.php");

$tableName = $_GET["table"];

if($tableName=="showReservations"){
    $table=getReservations($_SESSION["user"]->id);

} else{
    $table=getTable($tableName);
}
header("Content-Type: application/json");
echo json_encode(["table"=>$table]);