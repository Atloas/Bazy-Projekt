<?php

require("postgres.php");
$db = new db;
$args= array(
    "imie" => "test",
    "nazwisko" => "test",
    "miasto" => "test",
    "ulica" => "test"
);
$response = $db->useFunction("insertKlienci", $args);
echo $response;

?>