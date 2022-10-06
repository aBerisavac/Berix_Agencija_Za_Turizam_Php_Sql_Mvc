<?php

include("../config/connection.php");

$table = $_GET["table"];
$column = $_GET["column"];
$term = $_GET["term"];

$newTable = getTableWithSearch($table, $column, $term);

header("Content-Type: application/json");
echo json_encode(["table"=>$newTable]);