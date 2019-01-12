<?php

require("postgres.php");
$db = new db;
$response = $db->select("klienci");
foreach($response as $query)
{
    foreach($query as $field)
    {
        echo $field;
    }
}

?>