<?php

require("postgres.php");
$db = new db;
$tab = array();
$tab["imie"] = "t";
$tab["nazwisko"] = "e";
$tab["miasto"] = "s";
$tab["ulica"] = "t";
$response = $db->insert("klienci", $tab);
echo $response;

?>