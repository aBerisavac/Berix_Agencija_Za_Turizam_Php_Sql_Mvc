<?php

define("ABSOLUTE_PATH", $_SERVER["DOCUMENT_ROOT"]."/Berix - Agency Praktikum PHP");

define("ENV_FAJL", ABSOLUTE_PATH."/config/.env");
define("LOG_FAJL", ABSOLUTE_PATH."/data/log.txt");

define("SERVER", env("SERVER"));
define("DATABASE", env("DBNAME"));
define("USERNAME", env("USERNAME"));
define("PASSWORD", env("PASSWORD"));

function env($name){
    $data = file(ENV_FAJL);
    foreach($data as $row){
        $values = explode("=", $row);
        if($name==$values[0]) return (trim($values[1]));
    }
}
