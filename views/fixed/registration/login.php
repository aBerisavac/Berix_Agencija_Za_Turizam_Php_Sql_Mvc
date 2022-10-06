<div class="popup-whole-screen" id="login-form">
    <div class="popup-wrapper">
        <h3>Login</h3>
        <hr/>
        <?php
        $inputId = ['login-email', 'login-password'];
        $inputLabelText = ['Enter your email: *', 'Enter your password: *'];
        $inputPlaceholderText = ['', ''];
        $inputSpanId = ['login-email-span', 'login-password-span'];
        $inputSpanText = ['', ''];
        $i=count($inputId);
        ?>
        <form action="" method="Post" id="login-form-field" name="login-form-field">
            <?php include("../partials/formInputElement.php") ?>

            <hr/>
            <div class="button-group">
                <input type="button" id="login" value="Login"/>
                <input type="button" class="register" value="Sign Up"/>
                <input type="button" class="return" value="Return"/>
                <span id="login-span">

                </span>
            </div>
        </form>
    </div>
</div>
