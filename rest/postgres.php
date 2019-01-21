<?php

class db
{
    private $user = "u6zbrozek";
    private $password = "6zbrozek";
    private $dbname = "u6zbrozek";
    private $host = "pascal.fis.agh.edu.pl";
    private $numberNameArray = array(
        1 => "model_id",
        2 => "marka_id",
        3 => "paliwo_id",
        4 => "samochod_id",
        5 => "klient_id",
        6 => "salon_id",
        7 => "pracownik_id",
        8 => "moc",
        9 => "masa",
        10 => "cena",
        11 => "rocznik",
        12 => "placa",
        13 => "spalanie"
    );

    function __construct()
    {
        $this->dbconn = pg_connect("host={$this->host} dbname={$this->dbname} user={$this->user} password={$this->password}");
        pg_last_notice($this->dbconn, PGSQL_NOTICE_CLEAR);
    }

    function useFunction($functionName, $function, $array)
    {
        $functionName = pg_escape_string($this->dbconn, $functionName);
        $argString = "";
        if($function == "true")
            $argString = $this->formatArgString($array);
        $string = "SELECT * FROM {$functionName}{$argString};";
        $ret = pg_query($this->dbconn, $string);
        return pg_fetch_all($ret);
    }

    function insert($tableName, $data)
    {
        $insertString = $this->formatInsertString($data);
        $tableName = pg_escape_string($this->dbconn, $tableName);
        $string = "INSERT INTO {$tableName} {$insertString};";
        $ret = pg_query($this->dbconn, $string);
        $notice = pg_last_notice($this->dbconn);
        if($notice)
            return $notice;
        return $ret;
    }

    function selectAll($tableName)
    {
        $tableName = pg_escape_string($this->dbconn, $tableName);
        $string = "SELECT * FROM {$tableName};";
        $ret = pg_query($this->dbconn, $string);
        return pg_fetch_all($ret);
    }

    function updateById($tableName, $id, $data)
    {
        $updateString = $this->formatUpdateString($data);
        $tableName = pg_escape_string($this->dbconn, $tableName);
        $idName = pg_escape_string($this->dbconn, $id["idName"]);
        $idValue = pg_escape_string($this->dbconn, $id["idValue"]);
        $string = "UPDATE {$tableName} SET {$updateString} WHERE {$idName} = {$idValue};";
        $ret = pg_query($this->dbconn, $string);
        $notice = pg_last_notice($this->dbconn);
        if($notice)
            return $notice;
        return $ret;
    }

    function deleteById($tableName, $id)
    {
        $tableName = pg_escape_string($this->dbconn, $tableName);
        $idName = pg_escape_string($this->dbconn, $id["idName"]);
        $idValue = pg_escape_string($this->dbconn, $id["idValue"]);
        $string = "DELETE FROM {$tableName} WHERE {$idName} = {$idValue};";
        $ret = pg_query($this->dbconn, $string);
        
        return $ret;
    }

    function formatArgString($args)
    {
        $string = "(";
        $counter = 0;

        foreach($args as $key => $value)
        {
            if($counter != 0)
            {
                $string = $string . ",";
            }
            if(in_array($key, $this->numberNameArray))
                $string = $string . " " . pg_escape_string($this->dbconn, $value);
            else
                $string = $string . " " . pg_escape_literal($this->dbconn, $value);
            $counter += 1;
        }

        $string = $string . ")";
        return $string;
    }

    function formatInsertString($data)
    {
        $strKeys = "(";
        $strValues = "(";
        
        $counter = 0;
        foreach($data as $key => $value)
        {
            if($counter != 0)
            {
                $strKeys = $strKeys . ",";
                $strValues = $strValues . ",";
            }
            if(in_array($key, $this->numberNameArray))
                $strValues = $strValues . " " . pg_escape_string($this->dbconn, $value);
            else
                $strValues = $strValues . " " . pg_escape_literal($this->dbconn, $value);
            $strKeys = $strKeys . " " . pg_escape_string($this->dbconn, $key);
            $counter += 1;
        }

        $strKeys = $strKeys . ") VALUES ";
        $strValues = $strValues . ")";
        return $strKeys . $strValues;
    }

    function formatUpdateString($data)
    {
        $strKeys = "(";
        $strValues = "(";
        
        $counter = 0;
        foreach($data as $key => $value)
        {
            if($counter != 0)
            {
                $strKeys = $strKeys . ",";
                $strValues = $strValues . ",";
            }
            if(in_array($key, $this->numberNameArray))
                $strValues = $strValues . " " . pg_escape_string($this->dbconn, $value);
            else
                $strValues = $strValues . " " . pg_escape_literal($this->dbconn, $value);
            $strKeys = $strKeys . " " . pg_escape_string($this->dbconn, $key);
            $counter += 1;
        }

        $strKeys = $strKeys . ") = ";
        $strValues = $strValues . ")";
        return $strKeys . $strValues;
    }

    function __destruct()
    {
        pg_close($this->dbconn);
    }
}

?>