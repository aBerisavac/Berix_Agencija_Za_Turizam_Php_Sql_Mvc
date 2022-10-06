<?php

include("../config/connection.php");

$destinations = getDestinations();

header("Content-Type: appication/json");
echo json_encode(["destinations"=>$destinations]);