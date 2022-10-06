<?php

function exitWithError($status, $errors){
    http_response_code($status);
    echo json_encode(["errors"=>$errors]);
    die();
}

function getNavMenuItems(){
    $query = "SELECT * FROM nav_menu_items";
    $navMenuItems = executeQuery($query);
    return $navMenuItems;
}

function getFooterLinks(){
    $query = "SELECT * FROM footer_links";
    $footerLinks = executeQuery($query);
    return $footerLinks; 
}

function userExists($email){
    global $conn;
    $query = "SELECT * FROM users WHERE email = :email";
    $prepare = $conn->prepare($query);
    $prepare->bindParam(":email", $email);
    $prepare->execute();
    return $prepare->fetch();
}

function insertUser($email, $password, $firstName, $lastName, $phoneNumber){
    global $conn;
    $query = "INSERT INTO users(first_name, last_name, email, password, phone_number, role_id) VALUES (:firstName, :lastName, :email, :password, :phoneNumber, 2);";
    $prepare = $conn->prepare($query);
    $prepare->bindParam(":email", $email);
    $prepare->bindParam(":lastName", $lastName);
    $prepare->bindParam(":firstName", $firstName);
    $prepare->bindParam(":phoneNumber", $phoneNumber);
    $prepare->bindParam(":password", md5($password));
    return $prepare->execute();
}

function insertContactMessage($email, $message){
    global $conn;
    $query = "INSERT INTO contact_messages(email, message) VALUES (:email, :message);";
    $prepare = $conn->prepare($query);
    $prepare->bindParam(":email", $email);
    $prepare->bindParam(":message", $message);
    return $prepare->execute();
}

function getDestinations(){
    global $conn;
    $query = "SELECT * FROM destinations";
    $destinations = executeQuery($query);

    foreach($destinations as $destination){
        $destination->hotels=getDestinationHotels($destination->id);
    
        $destination->travel_dates=getDestinationTravelDates($destination->id);
    
        $destination->activities=getDestinationActivities($destination->id);
        foreach($destination->activities as $activity){
            $activity->images = getDestinationActivityImages($activity->id);
        }
    
        $destination->travel_price = getDestinationTravelPrice($destination->id);
    
        $destination->information = getDestinationInformation($destination->id);
        $destination->information_images = getDestinationInformationImages($destination->information->id);
    
        $travelDays = [];
        $hotelPrices = [];
        foreach($destination->travel_dates as $travelDate){
            array_push($travelDays, (strtotime($travelDate->travel_ending)-strtotime($travelDate->travel_beginning))/(60 * 60 * 24));
        }
        $travelDays=min($travelDays);
        foreach ($destination->hotels as $hotel){
            array_push($hotelPrices, $hotel->price_per_night);
        }
        $hotelPrices=min($hotelPrices);
        $cheapestTripPrice=$hotelPrices*$travelDays+$destination->travel_price->price;
        $destination->cheapest_trip_price=$cheapestTripPrice;
    
    }

    return $destinations;
}

function getDestinationHotels($destinationId){
    $query = "SELECT h.id, h.name, h.price_per_night, h.stars FROM destination_hotels d INNER JOIN hotels h ON d.hotel_id = h.id WHERE d.destination_id = ".$destinationId.";";
    $hotels = executeQuery($query);
    return $hotels;
}

function getDestinationTravelDates($destinationId){
    $query = "SELECT d.id, d.travel_beginning, d.travel_ending FROM travel_dates d INNER JOIN destination_travel_dates t ON d.id = t.travel_date_id WHERE t.destination_id = ".$destinationId.";";
    $travelDates = executeQuery($query);
    return $travelDates;
}

function getDestinationActivities($destinationId){
    $query = "SELECT a.id, a.name, a.description FROM activities a INNER JOIN destination_activities d ON d.activity_id = a.id WHERE d.destination_id = ".$destinationId.";";
    $activities = executeQuery($query);
    return $activities;
}

function getDestinationActivityImages($activityId){
    $query = "SELECT i.id, i.src, i.alt FROM activities a INNER JOIN activity_images i ON i.activity_id = a.id WHERE a.id = ".$activityId.";";
    $images = executeQuery($query);
    return $images;
}

function getDestinationTravelPrice($destinationId){
    $query = "SELECT t.id, t.price FROM travel_prices t INNER JOIN destinations d ON t.destination_id = d.id WHERE d.id = ".$destinationId.";";
    $travelPrice = executeQueryOneRow($query);
    return $travelPrice;
}

function getDestinationInformation($destinationId){
    $query = "SELECT i.id, i.description FROM destination_informations i INNER JOIN destinations d ON d.destination_information_id = i.id WHERE d.id = ".$destinationId.";";
    $info = executeQueryOneRow($query);
    return $info;
}


function getDestinationInformationAll(){
    $query = "SELECT id FROM destination_informations;";
    $info = executeQuery($query);
    return $info;
}

function getDestinationInformationImages($infoId){
    $query = "SELECT images.id, images.src, images.alt FROM destination_informations i INNER JOIN destination_information_images images ON i.id = images.destination_informations_id WHERE i.id = ".$infoId.";";
    $images = executeQuery($query);
    return $images;
}

function getTable($table){
    $query = "SELECT * FROM ".$table." ORDER BY id";
    return executeQuery($query);
}

function getReservations($userId){
    $query = "SELECT r.id, d.name AS 'Destination:', h.name AS 'Hotel:', t.travel_beginning AS 'Travel start:', t.travel_ending AS 'Travel end:', r.price AS 'Total Price:'
    FROM reservations r 
        INNER JOIN destinations d ON r.destination_id=d.id
        INNER JOIN travel_dates t ON r.travel_dates_id=t.id
        INNER JOIN hotels h ON r.hotel_id=h.id
        WHERE r.user_id=".$userId.";";
    return executeQuery($query);
}

function getTableWithSearch($table, $column, $term){
    global $conn;
    $query = 'SELECT * FROM '.$table.' WHERE '.$column.' LIKE "%'.$term.'%"';
    $table = executeQuery($query);
    return $table;
}

function deleteRow($table, $id){
    global $conn;
    $query = "DELETE FROM ".$table." WHERE id=:id;";
    $prepare = $conn->prepare($query);
    $prepare->bindParam(":id", $id);
    try{
        return $prepare->execute();
    }
    catch(PDOException $ex){
        return false;
    }
}

function getActivities(){
    $query = "SELECT id, name FROM activities";
    return executeQuery($query);
}

function insertHotel($hotelName, $pricePerNight, $stars){
    global $conn;
    $query = "INSERT INTO hotels(name, price_per_night, stars) VALUES (:hotelName, :pricePerNight, :stars);";
    $prepare = $conn->prepare($query);
    $prepare->bindParam(":hotelName", $hotelName);
    $prepare->bindParam(":pricePerNight", $pricePerNight);
    $prepare->bindParam(":stars", $stars);
    return $prepare->execute();
}

function connectHotelDestination($destinationId){
    //Select last inserted hotel
    $query = "SELECT * FROM hotels ORDER BY id DESC LIMIT 1";
    $hotel= executeQueryOneRow($query);
    $hotelId = $hotel->id;

    //Connect hotel to destinaton
    global $conn;
    $query = "INSERT INTO destination_hotels(destination_id, hotel_id) VALUES(:destinationId, :hotelId)";
    $prepare = $conn->prepare($query);
    $prepare->bindParam(":destinationId", $destinationId);
    $prepare->bindParam(":hotelId", $hotelId);
    return $prepare->execute();
}

function connectActivityDestination($destinationId){
    //Select last inserted activity
    $query = "SELECT * FROM activities ORDER BY id DESC LIMIT 1";
    $activity= executeQueryOneRow($query);
    $activityId = $activity->id;

    //Connect hotel to destinaton
    global $conn;
    $query = "INSERT INTO destination_activities(destination_id, activity_id) VALUES(:destinationId, :activityId)";
    $prepare = $conn->prepare($query);
    $prepare->bindParam(":destinationId", $destinationId);
    $prepare->bindParam(":activityId", $activityId);
    return $prepare->execute();
}

function insertActivity($activityName, $activityDescription){
    global $conn;
    $query = "INSERT INTO activities(name, description) VALUES (:activityName, :activityDescription);";
    $prepare = $conn->prepare($query);
    $prepare->bindParam(":activityName", $activityName);
    $prepare->bindParam(":activityDescription", $activityDescription);
    return $prepare->execute();
}

function uploadActivityImage($src, $alt, $activityId){
    global $conn;
    $query = "INSERT INTO activity_images(src, alt, activity_id) VALUES (:src, :alt, :activity_id);";
    $prepare = $conn->prepare($query);
    $prepare->bindParam(":src", $src);
    $prepare->bindParam(":alt", $alt);
    $prepare->bindParam(":activity_id", $activityId);
    return $prepare->execute();
}

function uploadDestinationImage($src, $alt, $destinationId){
    //Get Destination Information
    $destinationInformationId = getDestinationInformation($destinationId);
    $destinationInformationId = $destinationInformationId->id;
    
    global $conn;
    $query = "INSERT INTO destination_information_images(src, alt, destination_informations_id) VALUES (:src, :alt, :destinationInformationId);";
    $prepare = $conn->prepare($query);
    $prepare->bindParam(":src", $src);
    $prepare->bindParam(":alt", $alt);
    $prepare->bindParam(":destinationInformationId", $destinationInformationId);
    return $prepare->execute();
}

function insertDestination($destinationName, $destinationDescription){
    //Insert destination description
    global $conn;
    $query="INSERT INTO destination_informations(description) VALUES (:destinationDescription)";
    $prepare = $conn->prepare($query);
    $prepare->bindParam(":destinationDescription", $destinationDescription);
    $prepare->execute();

    //Get the inserted destination id
    $query="SELECT * FROM destination_informations ORDER BY id DESC LIMIT 1";
    $destinationInformation = executeQueryOneRow($query);
    $destinationInformationId = $destinationInformation->id;

    //Insert destination
    $query="INSERT INTO destinations(name, destination_information_id) VALUES (:destinationName, :destinationInformationId);";
    $prepare = $conn->prepare($query);
    $destinationName = ucfirst($destinationName);
    $prepare->bindParam(":destinationName", $destinationName);
    $prepare->bindParam(":destinationInformationId", $destinationInformationId);
    return $prepare->execute();
}

function checkIfDestinationAlreadyHasAssociatedPrice($destinationId){
    global $conn;
    $query = "SELECT * FROM travel_prices WHERE destination_id = :destinationId";
    $prepare = $conn->prepare($query);
    $prepare->bindParam(":destinationId", $destinationId);
    $prepare->execute();
    $travel_price = $prepare->fetch();
    
    return $travel_price;
}

function getDestinationsIdName(){
    $query="SELECT id, name FROM destinations";
    return executeQuery($query);
}

function insertTravelPrice($travelPrice, $destinationId){
    global $conn;
    $query = "INSERT INTO travel_prices(price, destination_id) VALUES (:travelPrice, :destinationId);";
    $prepare = $conn->prepare($query);
    $prepare->bindParam(":travelPrice", $travelPrice);
    $prepare->bindParam(":destinationId", $destinationId);
    return $prepare->execute();
}

function insertTravelDate($travelDateBeginning, $travelDateEnding, $destinationId){
    //Insert travel date
    global $conn;
    $query="INSERT INTO travel_dates(travel_beginning, travel_ending) VALUES (:travelDateBeginning, :travelDateEnding);";
    $prepare=$conn->prepare($query);
    $prepare->bindParam(":travelDateBeginning", $travelDateBeginning);
    $prepare->bindParam(":travelDateEnding", $travelDateEnding);
    $isSuccessfull = $prepare->execute();

    //If destination is sent connect date to destination
    if($destinationId!="default" && $isSuccessfull){

        //Get the id of previously inserted date
        $query = "SELECT * FROM travel_dates ORDER BY id DESC LIMIT 1";
        $travelDate = executeQueryOneRow($query);
        $travelDateId = $travelDate->id;

        //Connect date to destination
        $query = "INSERT INTO destination_travel_dates(travel_date_id, destination_id) VALUES (:travelDateId, :destinationId);";
        $prepare=$conn->prepare($query);
        $prepare->bindParam(":travelDateId", $travelDateId);
        $prepare->bindParam(":destinationId", $destinationId);
        return $prepare->execute();
    }

    return true;
}

function insertReservation($destinationId, $hotelId, $userId, $travelDateId, $travelPrice){
    global $conn;

    $query = "INSERT INTO reservations (destination_id, hotel_id, travel_dates_id, user_id, price) VALUES (:destinationId, :hotelId, :travelDateId, :userId, :travelPrice)";
    $prepare = $conn->prepare($query);
    $prepare->bindParam(":destinationId", $destinationId);
    $prepare->bindParam(":hotelId", $hotelId);
    $prepare->bindParam(":travelDateId", $travelDateId);
    $prepare->bindParam(":userId", $userId);
    $prepare->bindParam(":travelPrice", $travelPrice);

    try{
        return $prepare->execute();
    }
    catch(PDOException $ex){
        return false;
    }
}

function writeUnsuccessfullLoginAttempt($userId, $hostAddress){

    $file =fopen("../data/logUnsuccessfullLogin.txt", "a");
    $stringToWrite = $userId."\t".$hostAddress."\t".time()."\n";
    fwrite($file, $stringToWrite);
    fclose($file);
}

function writeSuccessfullLoginAttempt($userId, $hostAddress){

    $file =fopen("../data/logSuccessfullLogin.txt", "a");
    $stringToWrite = $userId."\t".$hostAddress."\t".time()."\n";
    fwrite($file, $stringToWrite);
    fclose($file);
}

function getUniqueLoggedInUsers(){
    $file =file("../../data/logSuccessfullLogin.txt");
    $users = [];
    $numberOfUsers = 0;
    $currentTime = time();

    foreach($file as $row){
        $newRow = explode("\t", $row);

        if(($currentTime - (int)$newRow[2])<(24*60*60)){
            if(!in_array($newRow[0], $users)){
                array_push($users, $newRow[0]);
                $numberOfUsers++;
            }
        }
    }

    return $numberOfUsers;

}

function checkIfTooManyLoginTries($userId, $timeSpan, $numberOfTimesToLockAccount){
    $file =file("../data/logUnsuccessfullLogin.txt");
    $encounters = 0;
    $currentTime = time();

    foreach($file as $row){
        $newRow = explode("\t", $row);

        if(($currentTime-$newRow[2])<$timeSpan){
            if($newRow[0]==$userId){
                $encounters++;
            }
        }
    }

    if($encounters>($numberOfTimesToLockAccount-1)){
        return true;
    }
    return false;
}

function updateLockedStatus($userId){
    $query="UPDATE users SET locked=true WHERE id=".$userId.";";
    executeQuery($query);
}

function writeAccessedPage($page, $userEmail){
    $file = fopen("../../data/logAccessedPages.txt", "a");
    $stringToWrite = $page."\t".$userEmail."\t".time()."\n";
    fwrite($file, $stringToWrite);
    fclose($file);
}

function getAccessedPages(){
    $file = file("../data/logAccessedPages.txt");
    $pages = [];
    $occurences = [];
    $percentages = [];
    $data = [];

    //get unique page names
    foreach($file as $row){
        $pageTitle = explode("\t", $row)[0];
        if(!in_array($pageTitle, $pages)) array_push($pages, $pageTitle);
    }

    //initialise occurences so they can be incremented
    $numberOfPages = count($pages);
    for($i=0;$i<$numberOfPages;$i++){
        $occurences[$i]=0;
    }

    //increment occurences
    for($i=0;$i<$numberOfPages;$i++){
        foreach($file as $row){
            $pageTitle = explode("\t", $row)[0];
            if($pages[$i]==$pageTitle){
                $occurences[$i]++;
            }
        }
    }

    //get percentages
    $total = 0;
    for($i=0;$i<$numberOfPages;$i++){
        $total+=$occurences[$i];
    }

    for($i=0;$i<$numberOfPages;$i++){
        $percentages[$i]=round($occurences[$i]/$total*100, 0);
    }

    for($i=0;$i<$numberOfPages;$i++){
        array_push($data, [ "Pages"=>$pages[$i], "Times Visited"=>$occurences[$i], "Times Visited In %"=>$percentages[$i] ]);
    }

    return $data;
}