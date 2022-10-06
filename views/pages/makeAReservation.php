<?php

$description = "Getting a reservation.";
$title = "Reservation";
$headerText = "Make a reservation";

include("../fixed/head.php");
include("../fixed/header.php");
//content
?>

<main class="holder" id="main-make-a-reservation">
        <div id="reservation-holder" class="holder">
        
        <?php include("../partials/destination.php"); ?>

            <div class="reservation-region-holder">
                <h4>Ready to make a trip? Select your destination, hotel, and time when you want to travel below</h4>
            </div>
        
            <div class="reservation-region-holder">
                <div id="reservation-select-region-holder">
                    <div class="reservation-select-holder">
                        <div id="reservation-inputs-holder">
                            <div class="reservation-input-holder">
                                <label for="select-reservation-destination">Select your destination: </label>

                                <select id="select-reservation-destination" name="select-reservation-destination">
                                    <option value="default">Select destination: </option>
                                    <?php foreach($destinations as $destination): ?>
                                    <option value="<?= $destination->id ?>"><?=  $destination->name ?></option>
                                    <?php endforeach ?>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="reservation-select-holder">
                    <div class="reservation-destination-holder">

                    </div>
                </div>
            </div>
            
            <div class="reservation-region-holder">
                <div id="submit-reservation-holder">

                </div>
            </div>
        </div>
    </main>

<?php
//endContent
include("../fixed/scripts.php");
include("../fixed/footer.php");

if(isset($_SESSION["user"])&&!empty($_SESSION["user"])) $userEmail=$_SESSION["user"]->email; else $userEmail="anonymous";
writeAccessedPage("makeAReservation.php", $userEmail);

?>