<div class="popup-whole-screen" id="register-form">
    <div class="popup-wrapper">
        <h3>Register</h3>
        <hr/>
        <?php
        $inputId = ['register-email', 'register-first-name', 'register-last-name', 'register-phone-number', 'register-password'];
        $inputLabelText = ['Email: *', 'First name: *', 'Last name: *', 'Phone number: *',  'Password: *'];
        $inputPlaceholderText = ['', 'Must be between 2-30 letters', 'Must be between 2-30 letters', 'Please use +<country code> format' ,  ''];
        $inputSpanId = ['register-email-span', 'register-first-name-span', 'register-last-name-span', 'register-phone-number-span',  'register-password-span'];
        $inputSpanText = ['', '', '', '',  ''];
        $i=count($inputId);
        ?>
        <form action="" method="Post" id="registration-form" name="registration-form" >
            <?php include("../partials/formInputElement.php") ?>

            <hr/>
            <div class="button-group">
                <input type="button" class="register" id="register" value="Register"/>
                <span id="register-span">
                <input type="button" class="return" value="Return"/>

                </span>

            </div>

        </form>
    </div>
</div>
