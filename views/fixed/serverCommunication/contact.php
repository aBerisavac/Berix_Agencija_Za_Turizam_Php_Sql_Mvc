<div class="popup-whole-screen" id="contact-form">
    <div class="popup-wrapper">
        <h3>Message</h3>
        <hr/>
        <?php
        $inputId = ['contact-email', 'contact-message'];
        $inputLabelText = ['Enter your email: (optional)', 'Enter your message: *'];
        $inputPlaceholderText = ['', 'Maximum 200 letters.'];
        $inputSpanId = ['contact-email-span', 'contact-message-span'];
        $inputSpanText = ['', ''];
        $i=count($inputId);
        ?>
        <form action="" method="get" id="contact-form" name="contact-form">
            <?php include("../partials/formInputElement.php") ?>

            <hr/>
            <div class="button-group">
                <input type="button" id="contact" value="Send message"/>
                <input type="button" class="return" value="Return"/>
                <span id="contact-span">
                </span>
            </div>
        </form>
    </div>
</div>
