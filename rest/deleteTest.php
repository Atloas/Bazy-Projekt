<?php

require("postgres.php");
$db = new db;
$args= array(
    "sprzedaze_id" => "1"
);
$response = $db->deleteById("sprzedaze", $args);
echo $response;

?>