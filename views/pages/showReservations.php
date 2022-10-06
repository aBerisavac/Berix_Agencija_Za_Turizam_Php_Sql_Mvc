<?php

$description = "Show made reservations.";
$title = "Reservations";
$headerText = "See your reservations";

include("../fixed/head.php");

if(!isset($_SESSION["user"])||empty($_SESSION["user"])||$_SESSION["user"]->role_id!=1){
    $url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    $url = explode("/", $url);
    $url[count($url)-1]="index.php";
    $url = implode("/", $url);
    header("Location: ".$url);
}

include("../fixed/header.php");
//content
?>

<main class="holder" id="main-show-reservations">
<a href="makeAReservation.php"><div id="go-to-reservations">
<i class="fa fa-plane" aria-hidden="true">&nbsp;&nbsp;Make a reservation</i>
</div></a>
<div id="table-information-wrapper"></div>
<div id="error-message"></div>
</main>

<?php
//endContent
include("../fixed/scripts.php");
include("../fixed/footer.php");

if(isset($_SESSION["user"])&&!empty($_SESSION["user"])) $userEmail=$_SESSION["user"]->email; else $userEmail="anonymous";
writeAccessedPage("showReservations.php", $userEmail);

?>