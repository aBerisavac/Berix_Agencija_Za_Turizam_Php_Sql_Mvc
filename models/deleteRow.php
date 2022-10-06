<?php

include("../config/connection.php");

$table = $_POST["table"];

if($table=="showReservations"){
    $table="reservations";
}
$id = $_POST["id"];
$bool = deleteRow($table, $id);

if($bool){
    header("Content-Type: application/json");
    http_response_code(200);
    echo json_encode(["isSuccessfull"=>true]);
} else {
    header("Content-Type: application/json");
    http_response_code(422);
    echo json_encode(["isSuccessfull"=>false]);
}