<?php

require("postgres.php");
$db = new db;
$tab = array();
$tab["samochody_id"] = "1";
$tab["klienci_id"] = "1";
$tab["pracownicy_id"] = "1";
$tab["salony_id"] = "1";
$tab["data"] = "2019-01-01";
$id = array(
    "sprzedaze_id" => "3"
);
$response = $db->updateById("sprzedaze", $id, $tab);
echo $response;

?>