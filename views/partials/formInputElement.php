<?php 
for( $counter=0; $counter<$i ;$counter++):?>

<div class="form-input-element">
    <label for="<?= $inputId[$counter] ?>"><?= $inputLabelText[$counter] ?></label>
    <input type="text" placeholder="<?= $inputPlaceholderText[$counter] ?>" id="<?= $inputId[$counter] ?>" name="<?= $inputId[$counter] ?>"/>
    <span id="<?= $inputSpanId[$counter] ?>"><?= $inputSpanText[$counter] ?></span>
</div>

<?php endfor; ?>
