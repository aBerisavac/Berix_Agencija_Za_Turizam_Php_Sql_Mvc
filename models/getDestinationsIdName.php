<?php

include("../config/connection.php");

$destinations = getDestinationsIdName();

header("Content-Type: appication/json");
echo json_encode(["destinations"=>$destinations]);