<?php

include("../config/connection.php");

$info = getDestinationInformationAll();

header("Content-Type: appication/json");
echo json_encode(["info"=>$info]);