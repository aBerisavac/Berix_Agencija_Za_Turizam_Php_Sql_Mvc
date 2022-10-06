$(document).ready(function(){

    $(".carousel").carousel({
        'pause': false
    });

    //Navigation Menu Functionalities
    //region
        function getUrlPath(){
            let urlPath =  window.location.pathname.split("/");
            urlPath = urlPath[urlPath.length - 1];
            return urlPath;
        }

        $("#scroll-to-top").click(()=>window.scrollTo(0,0));
        $(document).scroll(function(){
            if($("header")[0].offsetTop>300){
                $("#scroll-to-top").css('display', 'flex');
            } else{
                $("#scroll-to-top").css('display', 'none');
            }
        });

        function setActiveNavMenuItem(currentNavMenuItem){

            let arrayOfNavMenuItems = $("nav a");
            let i=0;

            for (navMenuItem of arrayOfNavMenuItems){

                let navMenuItemPath = navMenuItem.href.split("/");
                navMenuItemPath = navMenuItemPath[navMenuItemPath.length - 1];

                if(currentNavMenuItem==navMenuItemPath){
                    arrayOfNavMenuItems[i].classList.add('active-nav-item');
                    break;
                }

                i++;
            }
        }

        setActiveNavMenuItem(getUrlPath());
    //endregion
    //End Navigation Menu Functionalities

    //Responsive
    //region
        function showNavMenuItemsViaButtonClick(){
            $("nav ul").toggleClass("show");
        }
        $("#btnMenu").click(()=>showNavMenuItemsViaButtonClick());
    //endregion
    //End Responsive

    //Popup functionalities
    //region
        function showPopUp(id) {

            let screenWidth = $(window).width();
            let screenHeight = $(window).height();

            $("#" + id).css({
                'width': screenWidth + 'px',
                'height': screenHeight + 'px',
                'display': 'flex'
            });
            $("#" + id).children().addClass('visible');
            $("#" + id).children().removeClass('invisible');
        }
        function dropPopUp() {
            $(".popup-whole-screen").css("display", "none");
            $(".popup-whole-screen").children().removeClass('visible');
            $(".popup-whole-screen").children().addClass('invisible');
        }

        $(window).resize(function () {
            screenWidth = $(window).width();
            screenHeight = $(window).height();

            if ($("#login-form").css('display') == "flex") {
                dropPopUp();
                showPopUp("login-form");
            }

            if ($("#register-form").css('display') == "flex") {
                dropPopUp();
                showPopUp("register-form");
            }

            if ($("#contact-form").css('display') == "flex") {
                dropPopUp();
                showPopUp("contact-form");
            }

            if ($("#insert-item-form").css('display') == "flex") {
                dropPopUp();
                showPopUp("insert-item-form");
            }

        });

        $(document).keyup(function(e){

            if(e.keyCode === 27)
                dropPopUp();
                
            if(e.keyCode=== 13){
                $(".popup-whole-screen .visible input[type='button']")[0].click()
            }

        });
        
        //Show popups
        function addPopupButtonListeners(){
            $("nav ul li:contains('Login')").click(function(){
                showPopUp('login-form');
            })
            $("nav ul li:contains('Contact')").click(function(){
                showPopUp('contact-form');
            })
    
            $("#login-form .register").click(function(){
                dropPopUp();
                showPopUp('register-form');
            })
            $("#login-form .return").click(()=>dropPopUp());
            $("#insert-form .return").click(()=>dropPopUp());
            $("#contact-form .return").click(()=>dropPopUp());
            $("#register-form .return").click(function(){
                dropPopUp();
                showPopUp('login-form');
            });
        }

        addPopupButtonListeners();
        //initial presentation
        $("#register-password").attr('type', 'password');
        $("#login-password").attr('type', 'password');
        $("#contact-message").attr('type', 'textarea');

        if($("#register-span").text().trim()!="") showPopUp("register-form");
        if($("#login-span").text().trim()!="") showPopUp("login-form");
        if($("#contact-span").text().trim()!="") showPopUp("contact-form");
    //endregion
    //End Popup Functionalities

    //Register Functionalities
    //region
        //Checking Fields

            //Regular Expressions

                let reFirstName = /^[a-z ,.'-]{2,30}$/;
                let reLastName = /^[a-z ,.'-]{2,30}$/;
                let rePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%#*?&]{8,}$/;
                let rePhoneNumber = /(^\+[\d]{10,13})|(^\+[\d]{3,5}(\s\d{2,4}){1,4})/;
                let reEmail = /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
                let reMessage = /^[\w .,!?:;]{2,200}$/
            //End Regular Expressions

            //If input is correct remove span text.
            $("#register-form .form-input-element input").blur(function(){
                checkAllRegistrationFields()
            });

            //Self explanatory
            function checkAllRegistrationFields() {
                let firstName = $("#register-first-name").val().toLowerCase();
                let lastName = $("#register-last-name").val().toLowerCase();
                let password = $("#register-password").val();
                let phoneNumber = $("#register-phone-number").val();
                let email = $("#register-email").val().toLowerCase();
                let alltrue=0

                alltrue+=  checkRegularExpression(reFirstName, firstName, "Name must be between 2 and 30 characters long.", 'register-first-name-span');
                alltrue+=  checkRegularExpression(reLastName, lastName, "Last name must be between 2 and 30 characters long.", 'register-last-name-span');
                alltrue+=  checkRegularExpression(rePassword, password, "Must be at least 8 characters long, with at least 1 number, 1 upper, 1 lower letter and 1 special character.", 'register-password-span');
                alltrue+=  checkRegularExpression(rePhoneNumber, phoneNumber, "Number must be in +<country code> format.", 'register-phone-number-span');
                alltrue+=  checkRegularExpression(reEmail, email, "Email format is not valid.", 'register-email-span');

                return alltrue==5;
            }

            function checkRegularExpression(regEx, ex, errMessage, spanId){
                if(!regEx.test(ex)&&ex!="") {
                    $("#"+spanId).text(errMessage);
                    $("#"+spanId).css('padding', '5px');
                    return 0;
                } else if(ex==""){
                    $("#"+spanId).text("");
                    $("#"+spanId).css('padding', '0px');
                    return 0;
                }
                else {
                    $("#"+spanId).text("");
                    $("#"+spanId).css('padding', '0px');
                    return 1;
                };
            }

            function checkOptionalRegularExpression(regEx, ex, errMessage, spanId){
                if(!regEx.test(ex)&&ex!="") {
                    $("#"+spanId).text(errMessage);
                    $("#"+spanId).css('padding', '5px');
                    return 0;
                } else if(ex==""){
                    $("#"+spanId).text("");
                    $("#"+spanId).css('padding', '0px');
                    return 1;
                }
                else {
                    $("#"+spanId).text("");
                    $("#"+spanId).css('padding', '0px');
                    return 1;
                };
            }

        //End Checking Fields

        //Submit form
        $("#register-form .register").click(function(){
            if(checkAllRegistrationFields()){
                let email = $("#register-email").val().toLowerCase();
                let firstName = $("#register-first-name").val().toLowerCase();
                let lastName = $("#register-last-name").val().toLowerCase();
                let phoneNumber = $("#register-phone-number").val();
                let password = $("#register-password").val();
                let data = {
                    "email": email, 
                    "password": password,
                    "firstName": firstName,
                    "lastName": lastName,
                    "phoneNumber": phoneNumber
                };

                $.ajax({
                    "url": "../../models/register.php",
                    "method": "post",
                    "data" : data,
                    success: function(response){
                        $("#register-span").text("Please wait...");
                        $("#register-span").css('padding', '5px');
                        sessionStorage.setItem("registerIsSuccessfull", "true");
                        setTimeout(()=>{
                            location.reload();
                        }, 1000);
                    },
                    error: function(xhr){
                        if(xhr.status==422){
                            writeErrors(JSON.parse(xhr.responseText).errors, "register-span");
                        } else {
                            $("#register-span").text("Unexpected error. Contact support.");
                            $("#register-span").css('padding', '5px');
                        }
                    }
                });
            } else{
                $("#register-span").text("All information must be entered correctly!");
                $("#register-span").css('padding', '5px');
            }
        })

        if(sessionStorage.getItem("registerIsSuccessfull")=="true"){
            sessionStorage.removeItem("registerIsSuccessfull");
            showPopUp("login-form");
            $("#login-span").text("You have successfully registered.");
            $("#login-span").css('padding', '5px');
        }

    //endregion
    //End Register Functionalities

    //Write error messages in span
    function writeErrors(errors, spanId){
        let text = "";
        for (error of errors){
            text+=error + "</br>";
        };
        $(`#${spanId}`).html(text);
        $(`#${spanId}`).css('padding', '5px');
    }

    //Login Functionalities
    //region
    //If input is correct remove span text.
    $("#login-form-field .form-input-element input").blur(function(){
        checkAllLoginFields()
    });
    function checkAllLoginFields(){
        let email = $("#login-email").val().toLowerCase();
        let password = $("#login-password").val();
        let alltrue=0

        alltrue+=  checkRegularExpression(rePassword, password, "Must be at least 8 characters long, with at least 1 number, 1 upper, 1 lower letter and 1 special character.", 'login-password-span');
        alltrue+=  checkRegularExpression(reEmail, email, "Email format is not valid.", 'login-email-span');

        return alltrue==2;
    }

    //Submit form

    $("#login-form #login").click(function(){

        if(checkAllLoginFields()){
            let email = $("#login-email").val().toLowerCase();
            let password = $("#login-password").val();
            let data = {"email": email, "password": password};

            $.ajax({
                "url": "../../models/login.php",
                "method": "post",
                "data" : data,
                success: function(response){
                    localStorage.setItem("isLoggedIn", "true");
                    $("#login-span").text("Please wait...");
                    $("#login-span").css('padding', '5px');
                    setTimeout(()=>location.reload(), 1000);
                },
                error: function(xhr){
                    if(xhr.status==422){
                        writeErrors(JSON.parse(xhr.responseText).errors, "login-span");
                    } else {
                        $("#login-span").text("Unexpected error. Contact support.");
                        $("#login-span").css('padding', '5px');
                    }
                }
            });
        } else{
            $("#login-span").text("All information must be entered correctly!");
            $("#login-span").css('padding', '5px');
        }
        
    })
    //endregion
    //End Login Functionalities

    //Logout Functionalities
    //region

    $("ul a li:contains('Logout')").click(()=>{
        localStorage.setItem("isLoggedIn", "false");
        $.ajax({
            "url": "../../models/logout.php",
            "method": "get",
            success: function(response){
                location.reload();
            },
            error: function(xhr){
            }
        })
    })

    //endregion
    //End Logout Funcionalities


    //Contact Popup
    //region
    //If input is correct remove span text.
        $("#contact-form .form-input-element input").blur(function(){
            checkAllContactFields();
        });

        //Self explanatory
        function checkAllContactFields() {
            let message = $("#contact-message").val();
            let email = $("#contact-email").val();
            let alltrue=0

            alltrue+=  checkRegularExpression(reMessage, message, "Message is either too long or you used characters which are not allowed.", 'contact-message-span');
            alltrue+=  checkOptionalRegularExpression(reEmail, email, "Email format is not valid.", 'contact-email-span');

            return alltrue==2;
        }

        //Submit

        $("#contact-form #contact").click(function(){
            if(checkAllContactFields()){
                
                let message = $("#contact-message").val().trim();
                let email = $("#contact-email").val().trim();
                let data = {
                    message,
                    email
                };

                $.ajax({
                    "url": "../../models/contact.php",
                    "method": "get",
                    data,
                    success: function(response){
                        $("#contact-message").val("");
                        $("#contact-email").val("");
                        $("#contact-span").text("Successfuly sent your message. Send another one?");
                        $("#contact-span").css('padding', '5px');
                    },
                    error: function(xhr){
                        if(xhr.status==422){
                            writeErrors(JSON.parse(xhr.responseText).errors, "contact-span");
                        } else {
                            $("#contact-span").text("Unexpected error. Contact support.");
                            $("#contact-span").css('padding', '5px');
                        }
                    }
                });
            } else{
                $("#contact-span").text("All information must be entered correctly!");
                $("#contact-span").css('padding', '5px');
            }
        })
    //endregion
    //End Contact Popup

    //Show Specific Destination
    //region

    function addShowSpecificDestinationListener(){
        $("#main-index .carousel").click(function(){
            let id = $(this).attr('data-id');
            $.ajax({
                'url': '../../models/getSpecificDestination.php',
                'method': 'get',
                "data": {id},
                success: function(response){
                    writeSpecificDestination(response.destination);
                    $("#go-to-reservations").click(()=>{
                        if(localStorage.getItem("isLoggedIn")!="true") showPopUp("login-form");
                    })
                },
                error: function(xhr){
                }
            });
        });
    }

    function writeSpecificDestination(destination){
            $("#header-text h2").html("Welcome to Berix");
            let i=0;
            let html;
            //Make a reservation button
            if(localStorage.getItem("isLoggedIn")=="true"){
                html=`<a href="makeAReservation.php"><div id="go-to-reservations">
                <i class="fa fa-plane" aria-hidden="true">&nbsp;&nbsp;Make a reservation</i>
                </div></a>`;
            } else{
                html=`<a href="#"><div id="go-to-reservations">
                <i class="fa fa-plane" aria-hidden="true">&nbsp;&nbsp;Login to make a reservation</i>
                </div></a>`;
            }

            //Return to index button
            html+=`<a href="index.php"><div id="return-to-index">
            <i class="fa-solid fa-arrow-left-long">&nbsp;&nbsp;Return</i>
            </div></a><div id="specific-destination-holder" >`;
            //ispis naslova
            html+=`<h3> ${destination.name} </h3>`

        //ispis karousela
        html+=`
            <div class="carousel slide" data-bs-ride="carousel" data-id="${destination.id}">
                <div class="carousel-inner">
                `;

            for(let image of destination.information_images){
                html+=`
                    <div class="carousel-item ${i==0?'active':''}">
                        <img src="../../assets/images/Destinations/` + destination.name+`/`+image.src+`.jpg" class="d-block w-100" alt="${image.alt}">
                    </div>
                    `;
                i++;
            }
            i=0;
        //gotov ispis carousela

        //ispis informacija o destinaciji
            let allDestinationInformation = destination.information.description;
            allDestinationInformation=allDestinationInformation.split('\n');
            html+=`</div></div><div id="destination-information-holder"><hr/>`;
            for(let destinationInformation of allDestinationInformation){
                html+=`<p>${destinationInformation}</p><hr/>`;
            }

            html+=`</div>`;

            //gotov ispis informacija o destinaciji

        //ispis aktivnosti
        html+=`<div id="destination-activities-holder" class="holder"><h4>Activities:</h4><hr/>`;

        for(let activity of destination.activities){
            html+=`<div class="activity-holder"><h5>${activity.name}</h5>`;
            //ispis karousela
            html+=`
            <div class="carousel slide" data-bs-ride="carousel" data-id="${destination.id}">
                <div class="carousel-inner">
                `;

            for(let image of  activity.images){
                html+=`
                    <div class="carousel-item ${i==0?'active':''}">
                        <img src="../../assets/images/Activities/` + activity.name+`/`+image.src+`.jpg" class="d-block w-100" alt="${image.alt}">
                    </div>
                    `;
                i++;
            }
            i=0;
            html+=`</div>`;
            html+=`</div>`;
            //gotov ispis karousela

            //ispis informacija o aktivnosti
            html+=`<div class="activity-information"><p>${activity.description}</p>`;

            html+=`<hr/></div>`;
            //gotov ispis informacija o aktivnosti
            html+=`</div>`;
        }
        //gotov ispis aktivnosti

        html+=`</div>`;
            $("#main-index").html(html);

        $(".carousel").carousel({
            'pause': false
        });

        window.scrollTo(0,0);
    }

    addShowSpecificDestinationListener();
        //endregion
    //End Show Specific Destination


    //Admin Panel
    //region

    //SELECT SVIH TABELA
    //region
    function writeTableData(table){
        let text = `<table><thead><tr>`;
        if (table != false) {

            columns = Object.keys(table[0]);
            for ( let column of columns) {
                text += `<th>` + column + `</th>`;
            }

            text += `
            <th>EDIT</th>
            <th>DELETE</th></tr></thead><tbody>
        `;

            for (let row of table) {
                text += "<tr>"

                for (let column of columns) {
                    text += `<td>` + row[column] + `</td>`;
                }

                //ako treba da se za odredjenu tabelu zabrani update
                //text += localStorage.getItem("tableChosenForManipulating") == "User" ? "<td>FORBIDDEN</td>" : `<td><input type="button" data-action="update" data-id="${row.id}" value="EDIT"/></td>`;
                text += localStorage.getItem("tableChosenForManipulating") != "" ? "<td>FORBIDDEN</td>" : `<td><input type="button" data-action="update" data-id="${row.id}" value="EDIT"/></td>`;

                text += `
            <td><input type="button" data-action="delete" data-id="${row.id}" value="DELETE"/></td>
            `;

                text += `</tr>`
            }

            text += `</tbody></table>`;
        } else {
            text = "There are no items left in this table";
        }

        $("#table-information-wrapper").html(text);
        $("#table-information-wrapper").css("display", "inherit");
        addDeleteListener();
    }

    function writeTable(table){
        localStorage.setItem("tableChosenForManipulating", table);

        //ispis za pretragu ako tabela postoji
        if(table=="default") {
            $("#admin-search").css('display', 'none');
            $("#table-information-wrapper").html(`Select a table`);
            return;
        } else{
            $("#admin-search").css('display', 'block');
        }

        $.ajax({
            'url': '../../models/getTable.php',
            'method' : 'get',
            'data':{table},
            success: function(response){
                writeTableData(response.table);
                writeSearchSelect(response.table);
            },
            error: function(xhr){
            }
        });
    }


    $("#select-table-to-show #table-select").change(function(){
       writeTable($(this).val());
    });

    //endregion
    //END SELECT SVIH TABELA

    //PRETRAGA PO KOLONI TABELE
    //region

    function writeSearchSelect(table){
        let text=`<option value="default">Select column to search:</option>`;
        if(localStorage.getItem("tableChosenForManipulating") != "default"){
            let columns = Object.keys(table[0])
            for ( let column of columns) {
                text += `<option value="` + column + `">` + column + `</option>`;
            }
        }

        $("#select-search").html(text);
    }

    function addSearchTermEvent(){
        $("#search-button").click(function(){
           searchTerm($("#select-search")[0].value, $("#search-term").val());
        });
        $("#search-reset").click(function(){
            writeTable($("#select-table-to-show #table-select").val())
        });
    }

    function resetSearch(){
        $("#select-search")[0].value = "default";
        $("#search-term").val("");
    }
    function searchTerm(column, term){
        if (term.trim()==""||column=="default"){
            $("#invalid-search-term").html("Invalid search term!");
            setTimeout(()=>$("#invalid-search-term").html(""),2000);
            return;
        }

        let table = localStorage.getItem("tableChosenForManipulating");
        $.ajax({
            'url': "../../models/searchAdminTable.php",
            'method': "get",
            "data":{
                table,
                column,
                term
            },
            success: function(response){
                writeTableData(response.table);
                resetSearch();

            },
            error: function(xhr){

            }
        })
    }
    addSearchTermEvent();
    //endregion
    //END PRETRAGA PO KOLONI TABELE

    //DELETE IZ TABELE
    //region

    function addDeleteListener(){
        $("input[data-action='delete']").click(function(){
            deleteItem($(this).attr("data-id"));
        })
    }

    function deleteItem(id){
        
        let table = $("#select-table-to-show #table-select").val();
        if(localStorage.getItem("tableChosenForManipulating")=="showReservations"){
            table = "reservations";
        };

        $.ajax({
            'url': '../../models/deleteRow.php',
            'method' : 'post',
            data : {
                table,
                id
            },
            success: function(response){
                if(localStorage.getItem("tableChosenForManipulating")=="showReservations"){
                    writeTable("showReservations");
                } else{
                    writeTable($("#select-table-to-show #table-select").val());
                }
                if(response.isSuccessfull==false){
                    writeErrorMessage("An error has occured when trying to delete the item. Probably because of referential integrity. Try to delete the item where the selected row primary key is being referenced first, then try again.");;
                }

            },
            error: function(xhr){
                writeErrorMessage("An error has occured when trying to delete the item. Probably because of referential integrity. Try to delete the item where the selected row primary key is being referenced first, then try again.");
            }
        })
    }

    $("#error-message").css('display', 'none');
    $("#error-message").click(()=>$("#error-message").css('display', 'none'));
    
    function writeErrorMessage(message){
        $("#error-message").html(message);
        $("#error-message").css('display', 'block');
    }

    addDeleteListener()

    //endregion
    //END DELETE IZ TABELE


    //INSERT PODATAKA
    //region Ispis Insert Popup-a

    $("#table-select-to-insert").change(()=>{
        let tableChosenForInsertion = $("#table-select-to-insert").val();
        localStorage.setItem("tableChosenForInsertion", tableChosenForInsertion);
        if(tableChosenForInsertion!="default"){
            switch(tableChosenForInsertion){
                case "activities":
                    $.ajax({
                        "url":"../../models/getDestinations.php",
                        "method":"get",
                        success: function(response){
                            if(response.destinations==undefined){
                                writeErrorMessage("There is not enough data about some destinations. Please fulfill all necessary data before inserting. Especially if you have added new destinations.");
                            } else{
                                insertActivity(response.destinations);
                                showPopUp("insert-item-form");
                            }
                        },
                        error: function(xhr){

                        }
                    });
                    break;
                case "travel_prices":
                    $.ajax({
                        "url":"../../models/getDestinationsIdName.php",
                        "method":"get",
                        success: function(response){
                            if(response.destinations==undefined){
                                writeErrorMessage("There is not enough data about some destinations. Please fulfill all necessary data before inserting. Especially if you have added new destinations.");
                            } else{
                                insertTravelPrice(response.destinations);
                                showPopUp("insert-item-form");
                            }
                        },
                        error: function(xhr){

                        }
                    });
                    break;
                case "destinations":
                    insertDestination();
                    showPopUp("insert-item-form");
                    break;
                case "destination_information_images":
                    $.ajax({
                        "url":"../../models/getDestinations.php",
                        "method":"get",
                        success: function(response){
                            if(response.destinations==undefined){
                                writeErrorMessage("There is not enough data about some destinations. Please fulfill all necessary data before inserting. Especially if you have added new destinations.");
                            } else{
                                insertDestinationImages(response.destinations);
                                showPopUp("insert-item-form");
                            }
                        },
                        error: function(xhr){

                        }
                    });
                    break;
                case "hotels":
                    $.ajax({
                        "url":"../../models/getDestinations.php",
                        "method":"get",
                        success: function(response){
                            if(response.destinations==undefined){
                                writeErrorMessage("There is not enough data about some destinations. Please fulfill all necessary data before inserting. Especially if you have added new destinations.");
                            } else{
                                insertHotel(response.destinations);
                                showPopUp("insert-item-form");
                            }
                        },
                        error: function(xhr){

                        }
                    });
                    break;
                case "travel_dates":
                    $.ajax({
                        "url":"../../models/getDestinationsIdName.php",
                        "method":"get",
                        success: function(response){
                            if(response.destinations==undefined){
                                writeErrorMessage("There is not enough data about some destinations. Please fulfill all necessary data before inserting. Especially if you have added new destinations.");
                            } else{
                                insertTravelDate(response.destinations);
                                showPopUp("insert-item-form");
                            }
                        },
                        error: function(xhr){

                        }
                    });
                    break;
                case "activity_images":
                    $.ajax({
                        "url":"../../models/getActivities.php",
                        "method":"get",
                        success: function(response){
                            insertActivityImages(response.activities);
                            showPopUp("insert-item-form");
                        },
                        error: function(xhr){

                        }
                    });
                    break;
            }
            $("#table-select-to-insert").val("default");
        }
    });

    function insertTextInput(inputId, inputLabelText, inputPlaceholderText, inputSpanId, inputSpanText, counter){
        let html="";
        for(let i=0; i<counter;i++){
            html+=`
            <div class="form-input-element">
            <label for="${inputId[i]}">${inputLabelText[i]}</label>
            <input type="text" placeholder="${inputPlaceholderText[i]}" id="${inputId[i]}" name="${inputId[i]}"/>
            <span id="${inputSpanId[i]}">${inputSpanText[i]}</span>
            </div>
            `;
        }

        return html;
    }

    function insertSelectinput(selectId, spanId, defaultText, optionValue, optionText, counter){
        let html="";
        html+=`
        <div class="form-input-element">
            <select id="${selectId}" name="${selectId}">
            <option value="default"> ${defaultText} </option>
        `;
        for(let i=0; i<counter;i++){
             html+=`
             <option value="${optionValue[i]}"> ${optionText[i]} </option>
             `;
        }
        html+=`
        </select>
        <span id="${spanId}"></span>
        </div>
        `;
        return html;
    }

    function insertPopupButtons(html, id){
        html+=`
        <hr/>
        <div class="button-group">
            <input type="button" id="insert-${id}" name="${id}"value="Insert"/>
            <input type="button" class="return" value="Return"/>
            <span id="insert-span">

            </span>
        </div>
    `;

    return html;
    }

    //endregion Ispis Insert Popup-a
    //region Insert Hotela

    function checkAllInsertHotelFields(){
        let rePricePerNight = /^[1-9][0-9]*(\.[0-9]([1-9]?))?$/;
        let reHotelName = /^([a-zA-Z ]){2,50}$/;
        let reStars = /^[1-5]$/;

        let hotelName = $("#hotel-name").val();
        let pricePerNight = $("#hotel-price-per-night").val();
        let stars = $("#hotel-stars").val();
        let alltrue=0

        alltrue+=  checkRegularExpression(reHotelName, hotelName, "Hotel name must be between 2 and 50 characters long with only letters.", 'hotel-name-span');
        alltrue+=  checkRegularExpression(rePricePerNight, pricePerNight, "You can only use formats: XY[.Z[V]]", 'hotel-price-per-night-span');
        alltrue+=  checkRegularExpression(reStars, stars, "Number of stars must be between 1 and 5.", 'hotel-stars-span');

        return alltrue==3;
    }

    function sendInsertHotelRequest(){
        if(checkAllInsertHotelFields()){
            let hotelName = $("#hotel-name").val();
            let pricePerNight = $("#hotel-price-per-night").val();
            let stars = $("#hotel-stars").val();
            let destinationId = $("#destination-select").val();
            let data = {
                "hotelName": hotelName, 
                "pricePerNight": pricePerNight,
                "destinationId": destinationId,
                "stars": stars
            };

            $.ajax({
                "url": "../../models/insertHotel.php",
                "method": "post",
                "data" : data,
                success: function(response){
                    $("#insert-span").text("Successfully inserted hotel. Insert another one?");
                    $("#insert-span").css('padding', '5px');
                    if($("#select-table-to-show #table-select").val()=="hotels" || $("#select-table-to-show #table-select").val()=="destination_hotels"){
                        writeTable($("#select-table-to-show #table-select").val())
                    }
                },
                error: function(xhr){
                    if(xhr.status==422){
                        writeErrors(JSON.parse(xhr.responseText).errors, "insert-span");
                    } else {
                        $("#insert-span").text("Unexpected error. Contact support.");
                        $("#insert-span").css('padding', '5px');
                    }
                }
            });
        } else{
            $("#insert-span").text("All information must be entered correctly!");
            $("#insert-span").css('padding', '5px');
        }
    }

    function insertHotel(destinations){
        let inputId = ['hotel-name', 'hotel-price-per-night', "hotel-stars"];
        let inputLabelText = ['Enter hotel name: *', 'Enter price per night (€) : *', 'Enter the number of stars: *'];
        let inputPlaceholderText = ['', 'Example: 19.39', ''];
        let inputSpanId = ['hotel-name-span', 'hotel-price-per-night-span', 'hotel-stars-span'];
        let inputSpanText = ['', '', ''];

        let html = insertTextInput(inputId, inputLabelText, inputPlaceholderText, inputSpanId, inputSpanText, inputId.length);

        let optionValue = [];
        let optionText = [];
        for(let destination of destinations){
            optionValue.push(destination.id);
            optionText.push(destination.name);
        }

        html+= insertSelectinput("destination-select", "destination-select-span", "Select location (optional): ",optionValue, optionText, optionText.length);

        html = insertPopupButtons(html, "hotel");
        
        $("#insert-form").html(html);
        addPopupButtonListeners();

        $("#insert-form .form-input-element input").blur(function(){
            checkAllInsertHotelFields();
        });

        $("#insert-hotel").click(()=>{
            sendInsertHotelRequest();
        })
    }

    //endregion Insert Hotela
    //region Insert Aktivnosti

    function checkAllInsertActivityFields(){
        let reActivityName = /^([a-zA-Z ]){2,50}$/;
        let reActivityDescription = /^(.){10,}$/;

        let activityName = $("#activity-name").val();
        let activityDescription = $("#activity-description").val();
        let alltrue=0

        alltrue+=  checkRegularExpression(reActivityName, activityName, "Activity name must be between 2 and 50 characters long with only letters.", 'activity-name-span');
        alltrue+=  checkRegularExpression(reActivityDescription, activityDescription, "Description can't be empty, or shorter then 10 characters.", 'activity-description-span');

        return alltrue==2;
    }

    function sendInsertActivityRequest(){
        if(checkAllInsertActivityFields()){
            let activityName = $("#activity-name").val();
            let activityDescription = $("#activity-description").val();
            let destinationId = $("#destination-select").val();
            let data = {
                "activityName": activityName, 
                "activityDescription": activityDescription,
                "destinationId": destinationId
            };

            $.ajax({
                "url": "../../models/insertActivity.php",
                "method": "post",
                "data" : data,
                success: function(response){
                    $("#insert-span").text("Successfully inserted activity. Insert another one?");
                    $("#insert-span").css('padding', '5px');
                    if($("#select-table-to-show #table-select").val()=="activities" || $("#select-table-to-show #table-select").val()=="destination_activities"){
                        writeTable($("#select-table-to-show #table-select").val())
                    }
                },
                error: function(xhr){
                    if(xhr.status==422){
                        writeErrors(JSON.parse(xhr.responseText).errors, "insert-span");
                    } else {
                        $("#insert-span").text("Unexpected error. Contact support.");
                        $("#insert-span").css('padding', '5px');
                    }
                }
            });
        } else{
            $("#insert-span").text("All information must be entered correctly!");
            $("#insert-span").css('padding', '5px');
        }
    }

    function insertActivity(destinations){
        let inputId = ['activity-name', 'activity-description'];
        let inputLabelText = ['Enter activity name: *', 'Enter activity description: *'];
        let inputPlaceholderText = ['', ''];
        let inputSpanId = ['activity-name-span', 'activity-description-span'];
        let inputSpanText = ['', ''];

        let html = insertTextInput(inputId, inputLabelText, inputPlaceholderText, inputSpanId, inputSpanText, inputId.length);

        let optionValue = [];
        let optionText = [];
        for(let destination of destinations){
            optionValue.push(destination.id);
            optionText.push(destination.name);
        }

        html+= insertSelectinput("destination-select", "destination-select-span", "Select location (optional): ",optionValue, optionText, optionText.length);

        html = insertPopupButtons(html, "activity");
        
        $("#insert-form").html(html);
        addPopupButtonListeners();
        

        $("#insert-form .form-input-element input").blur(function(){
            checkAllInsertActivityFields();
        });

        $("#insert-activity").click(()=>{
            sendInsertActivityRequest();
        });
    }
    
    //endregion Insert Aktivnosti
    //region Insert Slika Za Aktivnosti

    function checkAllInsertActivityImageFields(){
        let reActivityImageSrc = /^([a-zA-Z1-9_.]){3,50}$/;
        let reActivityImageAlt = /^([a-zA-Z1-9 ]){2,50}$/;

        let activityImageSrc = $("#activity-image-src").val().toLowerCase();
        let activityImageAlt = $("#activity-image-alt").val();
        let activityId = $("#activity-select").val();
        let alltrue=0

        if($("#activity-image")[0].files.length==1){
            alltrue+= 1;

            $("#activity-image-span").html(" ");
            $("#activity-image-span").css("padding", "0px");
        } else{
            writeErrors(["You must upload a picture."], "activity-image-span");
        }
        if(activityId!="default") {
            alltrue+= 1;

            $("#activity-select-span").html(" ");
            $("#activity-select-span").css("padding", "0px");
        } else{
            writeErrors(["You must chose an activity!"], "activity-select-span");
        }
        alltrue+=  checkRegularExpression(reActivityImageSrc, activityImageSrc, "Only letters, underscores, dots and numbers allowed. Length is 3-50.", 'activity-image-src-span');
        alltrue+=  checkRegularExpression(reActivityImageAlt, activityImageAlt, "Only letters and numbers allowed, with spaces. Length is 2-50.", 'activity-image-alt-span');

        return alltrue==4;
    }

    function sendInsertActivityimageRequest(){
        if(checkAllInsertActivityImageFields()){
            $("#insert-form").attr("action", "../../models/uploadActivityPicture.php");
            $("#insert-form").submit();
            
        } else{
            $("#insert-span").text("All information must be entered correctly!");
            $("#insert-span").css('padding', '5px');
        }
    }

    function insertActivityImages(activities){
        let inputId = ['activity-image-src', 'activity-image-alt'];
        let inputLabelText = ['Enter image src: *', 'Enter image alt: *'];
        let inputPlaceholderText = ['Just the name of picture, no .jpg .', 'Name of the activity, capital letter.'];
        let inputSpanId = ['activity-image-src-span', 'activity-image-alt-span'];
        let inputSpanText = ['', ''];

        let html = insertTextInput(inputId, inputLabelText, inputPlaceholderText, inputSpanId, inputSpanText, inputId.length);
        
        html+=`
            <div class="form-input-element">
            <label for="activity-image">Upload your image here: *</label>
            <input type="file"  id="activity-image" name="activity-image"/>
            <span id="activity-image-span"></span>
            </div>
        `;

        let optionValue = [];
        let optionText = [];

        for(let activity of activities){
            optionValue.push(activity.id);
            optionText.push(activity.name);
        }

        html+= insertSelectinput("activity-select", "activity-select-span", "Select the activity: *", optionValue, optionText, optionText.length);

        html=insertPopupButtons(html, "activity-image");
        
        $("#insert-form").html(html);
        addPopupButtonListeners();

        $("#insert-form .form-input-element input").blur(function(){
            checkAllInsertActivityImageFields();
        });

        $("#insert-form .form-input-element #activity-select").change(function(){
            checkAllInsertActivityImageFields();
        });

        $("#insert-activity-image").click(()=>{
            sendInsertActivityimageRequest();
        });

        
    }
    
    //endregion Insert Slika Za Aktivnosti
    //region Insert Datuma Putovanja

    function checkAllInsertTravelDateFields(){
        let reTravelDate = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;

        let travelDateBeginning = $("#travel-beginning").val();
        let travelDateEnding = $("#travel-ending").val();

        let alltrue=0

        alltrue+=  checkRegularExpression(reTravelDate, travelDateBeginning, "Choose correct date. ", 'travel-beginning-span');
        alltrue+=  checkRegularExpression(reTravelDate, travelDateEnding, "Choose correct date. ", 'travel-ending-span');


        return alltrue==2;
    }

    function sendInsertTravelDateRequest(){
        if(checkAllInsertTravelDateFields()){
            // if(true){
            let travelDateBeginning = $("#travel-beginning").val();
            let travelDateEnding = $("#travel-ending").val();
            let destinationId = $("#destination-select").val();
            let data = {
                "travelDateBeginning": travelDateBeginning, 
                "travelDateEnding": travelDateEnding, 
                "destinationId": destinationId
            };

            $.ajax({
                "url": "../../models/insertTravelDate.php",
                "method": "post",
                "data" : data,
                success: function(response){
                    $("#insert-span").text("Successfully inserted travel date.");
                    $("#insert-span").css('padding', '5px');
                    if($("#select-table-to-show #table-select").val()=="travel_dates" || $("#select-table-to-show #table-select").val()=="destination_travel_dates"){
                        writeTable($("#select-table-to-show #table-select").val())
                    }
                },
                error: function(xhr){
                    if(xhr.status==422){
                        writeErrors(JSON.parse(xhr.responseText).errors, "insert-span");
                    } else {
                        $("#insert-span").html("Unexpected error. Contact support. </br></br>"+xhr.responseText);
                        $("#insert-span").css('padding', '5px');
                    }
                }
            });
        } else{
            $("#insert-span").text("All information must be entered correctly!");
            $("#insert-span").css('padding', '5px');
        }
    }

    function insertTravelDate(destinations){
        let inputId = ['travel-beginning', 'travel-ending'];
        let inputLabelText = ['Enter beginning date of travel: *', 'Enter ending date of travel: *'];
        let inputPlaceholderText = ['Example: 2022-10-13', 'Example: 2022-10-19'];
        let inputSpanId = ['travel-beginning-span', 'travel-ending-span'];
        let inputSpanText = ['', ''];

        let html = insertTextInput(inputId, inputLabelText, inputPlaceholderText, inputSpanId, inputSpanText, inputId.length);
        
        let optionValue = [];
        let optionText = [];
        for(let destination of destinations){
            optionValue.push(destination.id);
            optionText.push(destination.name);
        }

        html+= insertSelectinput("destination-select", "destination-select-span", "Select the destination: ",optionValue, optionText, optionText.length);

        html = insertPopupButtons(html, "travel-date");
        
        $("#insert-form").html(html, "travel-date");
        addPopupButtonListeners();

        $("#insert-form .form-input-element input").blur(function(){
            checkAllInsertTravelDateFields();
        });

        $("#insert-travel-date").click(()=>{
            sendInsertTravelDateRequest();
        })
    }
    
    //endregion Insert Datuma Putovanja
    //region Insert Cene Prevoza

    function checkAllInsertTravelPriceFields(){
        let reTravelPrice = /^[1-9][0-9]*(\.[0-9]([1-9]?))?$/;

        let travelPrice = $("#travel-price").val();
        let destinationId = $("#destination-select").val();

        let alltrue=0

        alltrue+=  checkRegularExpression(reTravelPrice, travelPrice, "You can only use formats: XY[.Z[V]]", 'travel-price-span');
        if(destinationId!="default") {
            alltrue+=1;
            $("#destination-select-span").html("");
            $("#destination-select-span").css("padding", "0px");
        } else{
            writeErrors(["Some destination must be selected."], "destination-select-span");
        }

        return alltrue==2;
    }

    function sendInsertTravelPriceRequest(){
        if(checkAllInsertTravelPriceFields()){
            let travelPrice = $("#travel-price").val();
            let destinationId = $("#destination-select").val();
            let data = {
                "travelPrice": travelPrice, 
                "destinationId": destinationId
            };

            $.ajax({
                "url": "../../models/insertTravelPrice.php",
                "method": "post",
                "data" : data,
                success: function(response){
                    $("#insert-span").text("Successfully inserted Travel Price. Insert another one?");
                    $("#insert-span").css('padding', '5px');
                    if($("#select-table-to-show #table-select").val()=="travel_prices" || $("#select-table-to-show #table-select").val()=="travel_prices"){
                        writeTable($("#select-table-to-show #table-select").val())
                    }
                },
                error: function(xhr){
                    if(xhr.status==422){
                        writeErrors(JSON.parse(xhr.responseText).errors, "insert-span");
                    } else {
                        $("#insert-span").html("Unexpected error. Contact support. </br></br>"+xhr.responseText);
                        $("#insert-span").css('padding', '5px');
                    }
                }
            });
        } else{
            $("#insert-span").text("All information must be entered correctly!");
            $("#insert-span").css('padding', '5px');
        }
    }

    function insertTravelPrice(destinations){
        let inputId = ['travel-price'];
        let inputLabelText = ['Enter travel price (€): *'];
        let inputPlaceholderText = [''];
        let inputSpanId = ['travel-price-span'];
        let inputSpanText = [''];

        let html = insertTextInput(inputId, inputLabelText, inputPlaceholderText, inputSpanId, inputSpanText, inputId.length);

        let optionValue = [];
        let optionText = [];
        for(let destination of destinations){
            optionValue.push(destination.id);
            optionText.push(destination.name);
        }

        html+= insertSelectinput("destination-select", "destination-select-span", "Select the destination: ",optionValue, optionText, optionText.length);

        html= insertPopupButtons(html, "travel-price");


        $("#insert-form").html(html);
        addPopupButtonListeners();

        $("#insert-form .form-input-element input").blur(function(){
            checkAllInsertTravelPriceFields();
        });

        $("#insert-form .form-input-element select").change(function(){
            checkAllInsertTravelPriceFields();
        });

        $("#insert-travel-price").click(()=>{
            sendInsertTravelPriceRequest();
        })
    }
    
    //endregion Insert Cene Prevoza
    //region Insert Destinacije

    function checkAllInsertDestinationFields(){
        let reDestinationName = /^([a-zA-Z ]){2,50}$/;
        let reDestinationDescription = /^(.){10,}$/;

        let destinationName = $("#destination-name").val().toLowerCase();
        let destinationDescription = $("#destination-description").val();
        let alltrue=0

        alltrue+=  checkRegularExpression(reDestinationName, destinationName, "Destination name must be between 2 and 50 characters long with only letters.", 'destination-name-span');
        alltrue+=  checkRegularExpression(reDestinationDescription, destinationDescription, "Destination description must be at least 10 characters long.", 'destination-description-span');

        return alltrue==2;
    }

    function sendInsertDestinationRequest(){
        if(checkAllInsertDestinationFields()){
            let destinationName = $("#destination-name").val().toLowerCase();
            let destinationDescription = $("#destination-description").val();
            let data = {
                "destinationName": destinationName, 
                "destinationDescription": destinationDescription
            };

            $.ajax({
                "url": "../../models/insertDestination.php",
                "method": "post",
                "data" : data,
                success: function(response){
                    $("#insert-span").text("Successfully inserted Destination. Insert another one?");
                    $("#insert-span").css('padding', '5px');
                    if($("#select-table-to-show #table-select").val()=="destinations" || $("#select-table-to-show #table-select").val()=="destination_informations"){
                        writeTable($("#select-table-to-show #table-select").val())
                    }
                },
                error: function(xhr){
                    if(xhr.status==422){
                        writeErrors(JSON.parse(xhr.responseText).errors, "insert-span");
                    } else {
                        $("#insert-span").text("Unexpected error. Contact support.");
                        $("#insert-span").css('padding', '5px');
                    }
                }
            });
        } else{
            $("#insert-span").text("All information must be entered correctly!");
            $("#insert-span").css('padding', '5px');
        }
    }

    function insertDestination(){
        let inputId = ['destination-name'];
        let inputLabelText = ['Enter destination name: *'];
        let inputPlaceholderText = [''];
        let inputSpanId = ['destination-name-span'];
        let inputSpanText = [''];

        let html = insertTextInput(inputId, inputLabelText, inputPlaceholderText, inputSpanId, inputSpanText, inputId.length);

        html += `
            <div class="form-input-element">
            <label for="destination-description">Enter the destination description: *</label>
            <input type="textarea"  id="destination-description" name="destination-description"/>
            <span id="destination-description-span"></span>
            </div>
        `;

        html= insertPopupButtons(html, "destination");


        $("#insert-form").html(html);
        addPopupButtonListeners();

        $("#insert-form .form-input-element input").blur(function(){
            checkAllInsertDestinationFields();
        });

        $("#insert-destination").click(()=>{
            sendInsertDestinationRequest();
        })
    }

    //endregion Insert Destinacije
    //region Insert Slika Destinacije

    function checkAllInsertDestinationImageFields(){
        let reDestinationImageSrc = /^([a-zA-Z1-9_.]){3,50}$/;
        let reDestinationImageAlt = /^([a-zA-Z1-9 ]){2,50}$/;

        let destinationImageSrc = $("#destination-image-src").val().toLowerCase();
        let destinationImageAlt = $("#destination-image-alt").val();
        let destinationId = $("#destination-select").val();
        let alltrue=0

        if($("#destination-image")[0].files.length==1){
            alltrue+= 1;

            $("#destination-image-span").html(" ");
            $("#destination-image-span").css("padding", "0px");
        } else{
            writeErrors(["You must upload a picture."], "destination-image-span");
        }
        if(destinationId!="default") {
            alltrue+= 1;

            $("#destination-select-span").html(" ");
            $("#destination-select-span").css("padding", "0px");
        } else{
            writeErrors(["You must chose an activity!"], "activity-select-span");
        }
        alltrue+=  checkRegularExpression(reDestinationImageSrc, destinationImageSrc, "Only letters, underscores, dots and numbers allowed. Length is 3-50.", 'destination-image-src-span');
        alltrue+=  checkRegularExpression(reDestinationImageAlt, destinationImageAlt, "Only letters and numbers allowed, with spaces. Length is 2-50.", 'destination-image-alt-span');

        return alltrue==4;
    }

    function sendInsertDestinationimageRequest(){
        if(checkAllInsertDestinationImageFields()){
            $("#insert-form").attr("action", "../../models/uploadDestinationPicture.php");
            $("#insert-form").submit();
            
        } else{
            $("#insert-span").text("All information must be entered correctly!");
            $("#insert-span").css('padding', '5px');
        }
    }

    function insertDestinationImages(infos){
        let inputId = ['destination-image-src', 'destination-image-alt'];
        let inputLabelText = ['Enter image src: *', 'Enter image alt: *'];
        let inputPlaceholderText = ['Just the name of picture, no .jpg .', 'Name of the destination, capital letter.'];
        let inputSpanId = ['destination-image-src-span', 'destination-image-alt-span'];
        let inputSpanText = ['', ''];

        let html = insertTextInput(inputId, inputLabelText, inputPlaceholderText, inputSpanId, inputSpanText, inputId.length);
        
        html+=`
            <div class="form-input-element">
            <label for="image">Upload your image here: *</label>
            <input type="file"  id="destination-image" name="destination-image"/>
            <span id="destination-image-span"></span>
            </div>
        `;

        let optionValue = [];
        let optionText = [];

        for(let info of infos){
            optionValue.push(info.id);
            optionText.push(info.name);
        }

        html+= insertSelectinput("destination-select", "destination-select-span", "Select the destination information: ", optionValue, optionText, optionText.length);


        html=insertPopupButtons(html, "destination-image");
        
        $("#insert-form").html(html);
        addPopupButtonListeners();

        $("#insert-form .form-input-element input").blur(function(){
            checkAllInsertDestinationImageFields();
        });

        $("#insert-form .form-input-element #destination-select").change(function(){
            checkAllInsertDestinationImageFields();
        });

        $("#insert-destination-image").click(()=>{
            sendInsertDestinationimageRequest();
        });
    };

    //endregion Insert Slika Destinacije
    //END INSERT PODATAKA

    //endregion
    //End Admin Panel

    //Make A Reservation
    //region


    function addReservationSelectDestinationListener(){
        $("#select-reservation-destination").change(()=>{
            let destinationId=$("#select-reservation-destination").val();
            if(destinationId!="default"){
                $.ajax({
                    "url":"../../models/getDestinations.php",
                    "method":"get",
                    success: function(response){
                        $("#reservation-destination-carousel").remove();
                        writeReservationDestinationInput(destinationId, response.destinations);
                    },
                    error: function(xhr){
        
                    }
                });
            } else{
                $("#reservation-destination-carousel").remove();
                $("#reservation-inputs-holder .reservation-input-holder")[1].remove();
                $("#reservation-inputs-holder .reservation-input-holder")[1].remove();
                $("#reservation-inputs-holder hr")[0].remove();
                $("#reservation-inputs-holder hr")[0].remove();
                $("#submit-reservation-holder").html("");
            }
        })
    }

    function addReservationSelectHotelDateListener(){
        $.ajax({
            "url":"../../models/getDestinations.php",
            "method":"get",
            success: function(response){
                $("#select-reservation-travel-date").change(()=>{
                    getSubmitReservationRequestButton(response.destinations);
                })
        
                $("#select-reservation-hotel").change(()=>{
                    getSubmitReservationRequestButton(response.destinations);
                })
            },
            error: function(xhr){

            }
        });
        
    }

    function addReservationSubmitRequestListener(){
        $("#reservation-submit-request").click(()=>{
            sendReservationRequest();
        })
    }
    addReservationSelectDestinationListener();

    function sendReservationRequest(){
        let destinationId = $("#select-reservation-destination").val();
        let hotelId = $("#select-reservation-hotel").val();
        let travelDateId = $("#select-reservation-travel-date").val();
        let travelPrice = localStorage.getItem("travelPrice");
        let data={
            destinationId,
            hotelId,
            travelPrice,
            travelDateId
        }

        $.ajax({
            "url":"../../models/insertReservation.php",
            "method":"post",
            data,
            success: function(response){
                $("#reservation-submit-request-span").html("You have successfully made a reservation.")
            },
            error: function(xhr){
                if(xhr.status==403){
                    writeErrors(JSON.parse(xhr.responseText).errors, "reservation-submit-request-span");
                } else if(xhr.status==422){
                    writeErrors(JSON.parse(xhr.responseText).errors, "reservation-submit-request-span");
                } else{
                    $("#reservation-submit-request-span").html("An unexpected error has occured, please contact support.<br/>"+xhr.responseText);
                }
            }
        });

    }
    function getReservationSelectDestinationInputHtml(destinations, id){
        let html=`
            <div class="reservation-input-holder">
                <label for="select-reservation-destination">Select your destination: </label>

                <select id="select-reservation-destination" name="select-reservation-destination">
                    <option value="default">Select destination: </option>
                    `; 
                    
                    for(destination of destinations){
                        html+=`<option value="${destination.id}" ${destination.id==id?"selected":""}>${destination.name}</option>`;
                    }
                    html+=`
                </select>
            </div>
        `;

        return html;
    }

    function getReservationSelectHotel(destinations, destinationId){
        let destination;
        for (let dest of destinations){
            if(dest.id==destinationId) {
                destination=dest;
            }
        }

        let html=`
            <div class="reservation-input-holder">
                <label for="select-reservation-hotel">Select your hotel: </label>

                <select id="select-reservation-hotel" name="select-reservation-hotel">
                    <option value="default">Select hotel: </option>
                    `; 
                    
                    for(hotel of destination.hotels){
                        html+=`<option value="${hotel.id}"}>${hotel.name} ${hotel.stars}* - ${hotel.price_per_night}€</option>`;
                    }
                    html+=`
                </select>
            </div>
        `;

        return html;
    }

    function getReservationSelectTravelDate(destinations, destinationId){
        let destination;
        for (let dest of destinations){
            if(dest.id==destinationId) {
                destination=dest;
            }
        }

        let html=`
            <div class="reservation-input-holder">
                <label for="select-reservation-travel-date">Select your travel date: </label>

                <select id="select-reservation-travel-date" name="select-reservation-travel-date">
                    <option value="default">Select travel date: </option>
                    `; 
                    
                    for(date of destination.travel_dates){
                        html+=`<option value="${date.id}"}>${date.travel_beginning} until ${date.travel_ending}</option>`;
                    }
                    html+=`
                </select>
            </div>
        `;

        return html;
    }

    function getSubmitReservationRequestButton(destinations){
        let travelDateId =$("#select-reservation-travel-date").val();
        let hotelId = $("#select-reservation-hotel").val();
        let destinationId = $("#select-reservation-destination").val();
        let hotel;
        let travelDate;

        if(travelDateId!="default" && hotelId!="default"){
            let destination;
            for (let dest of destinations){
                if(dest.id==destinationId) {
                    destination=dest;
                }
            }
            
            for (let selectedHotel of destination.hotels){
                if(hotelId==selectedHotel.id){
                    hotel = selectedHotel;
                }
            }

            for (let selectedDate of destination.travel_dates){
                if(travelDateId==selectedDate.id){
                    travelDate = selectedDate;
                }
            }

            let travelDays = (Date.parse(travelDate.travel_ending)-Date.parse(travelDate.travel_beginning))/(1000*60*60*24);
            let travelPrice = travelDays*hotel.price_per_night+destination.travel_price.price;
            localStorage.setItem("travelPrice", travelPrice);

            let html = `
            <label for="reservation-submit-request">Your total price is: <span id="trip-price">${travelPrice}€</span></label>
            <input type="button" id="reservation-submit-request" value="Make a reservation now"/>
            <span id="reservation-submit-request-span"></span>
            `;

            $("#submit-reservation-holder").html(html);
            addReservationSubmitRequestListener();
        } else{
            let html=`
            <label>You must select both a hotel and a travel date before making a reservation. </label>
            `;

            $("#submit-reservation-holder").html(html);
        }

    }

    function getReservationSelectDestinationCarousel(destinations, destinationId){
        let destination; 
        let i=0;       
        for (let dest of destinations){
            if(dest.id==destinationId) {
                destination=dest;
            }
        }

        let html=`
            <div id="reservation-destination-carousel">
            <div class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
        `;

        for(let image of destination.information_images){
            html+=`
                <div class="carousel-item ${i++==0?'active':''}">
                <img src="../../assets/images/Destinations/${destination.name}/${image.src}.jpg" class="d-block w-100" alt="${image.alt}">
                </div>
            `;
        }

        html+=`
            </div>
            </div>
            </div>
        `;

        return html;
    }

    function writeReservationDestinationInput(destinationId, destinations){

        let html=getReservationSelectDestinationInputHtml(destinations, destinationId);
        html+="<hr/>";
        html+=getReservationSelectHotel(destinations, destinationId);
        html+="<hr/>";
        html+=getReservationSelectTravelDate(destinations, destinationId);
        $("#reservation-inputs-holder").html(html);

        html=getReservationSelectDestinationCarousel(destinations, destinationId);
        $("#reservation-select-region-holder").html($("#reservation-select-region-holder").html()+html);

        addReservationSelectDestinationListener();

        $("#reservation-destination-carousel .carousel").carousel({
            interval: 3000
        });

        addReservationSelectHotelDateListener();

        html=`
        <label>You must select both a hotel and a travel date before making a reservation. </label>
        `;
        
        $("#submit-reservation-holder").html(html);

    }

    //endregion
    //END Make A Reservation

    //Show Reservations
    
    if(getUrlPath()=="showReservations.php"){
        writeTable("showReservations");
    }
    

    //END Show Reservations

    //SHOW STATISTICS

    if(getUrlPath()=="admin.php"){

        $.ajax({
            "url":"../../models/showPagesActivity.php",
            "method":"get",
            success: function(response){
                let table=response.table;

                //WRITE TABLE
                let text = `<table><thead><tr>`;
                if (table != false) {

                    columns = Object.keys(table[0]);
                    for ( let column of columns) {
                        text += `<th>` + column + `</th>`;
                    }

                    for (let row of table) {
                        text += "<tr>"

                        for (let column of columns) {
                            text += `<td>` + row[column] + `</td>`;
                        }

                        text += `</tr>`
                    }

                    text += `</tbody></table>`;

                    $("#statistics").html(text);
                } else {
                    text = "There are no items to show.";
                    $("#statistics").html(text)
                }
            },
            error: function(xhr){

            }
        })
        
    }

    //END SHOW STATISTICS
});
