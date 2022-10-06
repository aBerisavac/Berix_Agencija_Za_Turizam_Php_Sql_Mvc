<?php

include("../config/connection.php");

$activities = getActivities();

header("Content-Type: application/json");
echo json_encode(["activities"=>$activities]);