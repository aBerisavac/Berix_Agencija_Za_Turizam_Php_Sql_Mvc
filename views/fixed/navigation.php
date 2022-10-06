<nav>
    <button id="btnMenu"><i class="fa fa-bars"></i> Menu</button>
    <ul>

        <?php

            $navMenuItems = getNavMenuItems();

            foreach($navMenuItems as $navMenuItem):

            if(isset($_SESSION["user"]->first_name)&&!empty($_SESSION["user"])&&$navMenuItem->link_name=='Login') continue;
            if(!isset($_SESSION["user"]->first_name)&&empty($_SESSION["user"])&&$navMenuItem->link_name=='Reservations') continue;
            if(!isset($_SESSION["user"]->first_name)&&empty($_SESSION["user"])&&$navMenuItem->link_name=='Logout') continue;
            if($navMenuItem->link_name=='Admin') continue; 

        ?>

            <a href="<?= $navMenuItem->href ?>">
                <li>
                <?= $navMenuItem->link_name ?>
                </li>
            </a>

            <?php endforeach ?>

            <?php

            $navMenuItems = getNavMenuItems();

            foreach($navMenuItems as $navMenuItem):

            if($navMenuItem->link_name!='Admin') continue; 
            if($navMenuItem->link_name=='Admin'&&!isset($_SESSION["user"]->first_name)&&empty($_SESSION["user"])||($_SESSION["user"]->role_id!=1)) continue; 

        ?>

            <a href="<?= $navMenuItem->href ?>">
                <li>
                <?= $navMenuItem->link_name ?>
                </li>
            </a>

            <?php endforeach ?>

    </ul>

</nav>

