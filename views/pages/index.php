<?php
$requestedPath = explode("/",$_SERVER['PHP_SELF'])[count(explode("/",$_SERVER['PHP_SELF']))-1];
if(isset($_GET["page"]) && !empty($_GET["page"])) $requestedPath=$_GET["page"];
if($requestedPath=="index.php"||$requestedPath=="index.html"||$requestedPath==""){
} else{
    $requestedPath = explode("=", $requestedPath)[count(explode("=", $requestedPath))-1];
    echo $requestedPath;
    switch($requestedPath){
        default:
            header("Location: index.php");
            die();
        case "author.php":
            header("Location: author.php");
            die();
        case "admin.php":
            header("Location: admin.php");
            die();
        case "showReservations.php":
            header("Location: showReservations.php");
            die();
    };
}


$description = "Welcome page for Berix Agency";
$title = "Home - Page";
$headerText = "Welcome To Berix";

include("../fixed/head.php");
include("../fixed/header.php");
//content
?>

<main class="holder" id="main-index">
        <div id="destinations-holder" class="holder">

        <?php include("../partials/destination.php"); 

            foreach($destinations as $destination):
            $i=0;

            ?>
                <div class="destination-holder">
                    <div class="carousel slide" data-bs-ride="carousel" data-id="<?=$destination->id?>">
                        <div class="carousel-inner">
                            <?php foreach($destination->information_images as $image): ?>

                            <div class="carousel-item <?= $i++==0?'active':''?>">
                                <img src="../../assets/images/Destinations/<?=$destination->name?>/<?=$image->src?>.jpg" class="d-block w-100" alt="<?=$image->alt?>">
                            </div>
                            
                            <?php endforeach; ?>
                        </div>
                    </div>
                    <div class="destination-information">
                        <h3><?=$destination->name?></h3>
                        <p> Starting from <?=$destination->cheapest_trip_price?> euros</p>
                    </div>
                </div>

                <?php endforeach ?>
        </div>
    </main>

<?php
//endContent
include("../fixed/scripts.php");
include("../fixed/footer.php");

if(isset($_SESSION["user"])&&!empty($_SESSION["user"])) $userEmail=$_SESSION["user"]->email; else $userEmail="anonymous";
writeAccessedPage("index.php", $userEmail);

?>