<?php
session_start();

include("../config/connection.php");

$errors = [];

if(!isset($_SESSION["user"])&&(empty($_SESSION["user"]))){
    array_push($errors, "You are not logged in.");
    exitWithError(403, $errors);
}

session_destroy();