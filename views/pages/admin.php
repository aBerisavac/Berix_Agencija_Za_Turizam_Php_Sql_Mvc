<?php

$description = "Admin Panel";
$title = "Admin - Panel";
$headerText = "Admin Panel";

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

<main class="holder" id="main-admin-panel">
    <div id="error-message"></div>
    <div id="tables-wrapper">

        <div id="select-table-to-show">
            <select id="table-select">
                <option value="default">Select a table to show:</option>
                <?php
                $tables = [
                    ["Contact Messages", "contact_messages"],
                    ["Footer Links", "footer_links"],
                    ["Navigation Links", "nav_menu_items"],
                    ["Reservations", "reservations"],
                    ["Users", "users"],
                    ["User Roles", "user_roles"],
                    ["Hotels", "hotels"],
                    ["Destinations", "destinations"],
                    ["Destination - Information", "destination_informations"],
                    ["Destination - Images", "destination_information_images"],
                    ["Destination - Hotels", "destination_hotels"],
                    ["Destination - Travel Dates", "destination_travel_dates"],
                    ["Destination - Activities", "destination_activities"],
                    ["Activities", "activities"],
                    ["Activity - Images", "activity_images"],
                    ["Travel Dates", "travel_dates"],
                    ["Bus Price", "travel_prices"]
                ];

                foreach($tables as $table):
                ?>
                <option value="<?= $table[1]?>"><?= ucfirst($table[0])?></option>
                <?php endforeach ?>
            </select>
            <div id="admin-search">
                <select id="select-search">

                </select>
                <input id="search-term" name="search-term" type="text" placeholder="Search term"/>
                <input id="search-button" name="search-button" type="button" value="Search"/>
                <input id="search-reset" name="search-reset" type="button" value="Reset Table"/>
                <span id="invalid-search-term">

                </span>
            </div>
        </div>

        <div id="table-information-wrapper">
        </div>

        <div id="select-item-to-insert">
            <select id="table-select-to-insert">
                <option value="default">Select a table to add an item into:</option>
                <?php
                $tables = [
                    ["Destinations", "destinations"],
                    ["Destination Images", "destination_information_images"],
                    ["Activities", "activities"],
                    ["Activity Images", "activity_images"],
                    ["Hotels", "hotels"],
                    ["Travel Dates", "travel_dates"],
                    ["Travel Price", "travel_prices"]
                ];

                foreach($tables as $table):
                ?>
                <option value="<?= $table[1]?>"><?= ucfirst($table[0])?></option>
                <?php endforeach ?>
            </select>
        </div>
        
        <div id="users-logged-in">
                <p> The number of unique users logged in in the last 24h is: 
                    <?php
                    echo getUniqueLoggedInUsers();
                    ?>
                </p>
        </div>

        <div id="statistics">
                
        </div>
    </div>
</main>

<?php
//endContent
include("../fixed/scripts.php");
include("../fixed/footer.php");

if(isset($_SESSION["user"])&&!empty($_SESSION["user"])) $userEmail=$_SESSION["user"]->email; else $userEmail="anonymous";
writeAccessedPage("admin.php", $userEmail);

?>