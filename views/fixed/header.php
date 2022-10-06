<?php

include("../fixed/registration/login.php");
include("../fixed/registration/register.php");
include("../fixed/serverCommunication/contact.php");
include("../fixed/serverCommunication/insertItem.php");

?>

<div id="scroll-to-top">
    <i class="fa-solid fa-arrow-up"></i>
</div>
<header class="holder">
    <a href="index.php">
        <div id="header-logo">
            <img src="../../assets/images/navLogo.png" alt="Berix Logo"/>
        </div>
    </a>
    <?php include("../fixed/navigation.php"); ?>
    <div id="header-text">
        <h2> <?php 
        echo ("$headerText"); 
        if(isset($_SESSION["user"]->first_name)&&!empty($_SESSION["user"]) && explode("/", $_SERVER['REQUEST_URI'])[count(explode("/", $_SERVER['REQUEST_URI']))-1]=="index.php" ) 
        {
            $userName= ucfirst($_SESSION["user"]->first_name); 
            echo (", $userName");
        }
            ?>  </h2>
    </div>
</header>

