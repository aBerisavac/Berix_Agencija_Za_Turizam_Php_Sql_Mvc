<?php

include("../config/connection.php");

$destinations = getDestinations();

$idToSearch = $_GET["id"];

foreach($destinations as $destination){
    if ($destination->id == $idToSearch) {
        header("Content-Type: application/json");
        echo json_encode(["destination"=>$destination]);
        }
}

