<?php

require("postgres.php");
$db = new db;
$response = $db->selectAll("klienci");
foreach($response as $query)
{
    foreach($query as $field)
    {
        echo $field;
    }
}

?>