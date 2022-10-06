<?php

include("../config/connection.php");

$data = getAccessedPages();
if(count($data)==0) $data=false;

header("Content-Type: application/json");
http_response_code(200);
echo json_encode(["table"=>$data]);