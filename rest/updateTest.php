<?php

require("postgres.php");
$db = new db;
$tab = array(
    "nazwa" => "gasoline"
);
$id = array(
    "idName" => "paliwo_id",
    "idValue" => "1"
);

$response = $db->updateById("paliwo", $id, $tab);
echo $response;

?>