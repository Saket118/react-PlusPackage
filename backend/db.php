<?php
$con = mysqli_connect('localhost', 'root', '', 'reactprojectback');
    if (!$con) {
        die("Couldn't connect to MySQL: " . mysqli_connect_error());
    }
    
    mysqli_set_charset($con, "utf8");
    
    return $con;
    ?>