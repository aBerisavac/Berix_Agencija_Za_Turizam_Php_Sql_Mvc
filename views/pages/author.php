<?php

$description = "Author information";
$title = "Author";
$headerText = "About Author";

include("../fixed/head.php");
include("../fixed/header.php");
//content
?>

<main class="holder" id="main-author">
        <div>
            <img src="../../assets/images/profile.jpg" alt="author" />
            <p>My name is Aleksa Berisavac. I am currently attending the ICT Academy in Belgrade, orientation internet technologies. I am aspiring to be an accomplished web developer, and am working towards that goal. If you are wondering about my works, you can find them in the <a href="http://beri-portfolio-js-jquery.synergize.co/?i=2#about">Projects</a> section of my portfolio. </p>
        </div>
    </main>

<?php
//endContent
include("../fixed/scripts.php");
include("../fixed/footer.php");

if(isset($_SESSION["user"])&&!empty($_SESSION["user"])) $userEmail=$_SESSION["user"]->email; else $userEmail="anonymous";
writeAccessedPage("author.php", $userEmail);

?>