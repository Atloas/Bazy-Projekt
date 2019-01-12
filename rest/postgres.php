<?php

class db
{
    private $user = "u6zbrozek";
    private $password = "6zbrozek";
    private $dbname = "u6zbrozek";
    private $host = "pascal.fis.agh.edu.pl";

    function __construct()
    {
        $this->dbconn = pg_connect("host={$this->host} dbname={$this->dbname} user={$this->user} password={$this->password}");
    }

    function insert($tableName, $data)
    {
        $insertString = $this->formatInsertString($data);
        $string = "SELECT * FROM insert" . $tableName . "(" . $insertString.");";
        $ret = pg_query($this->dbconn, $string);
        return $ret;
    }

    function select($tableName)
    {
        $string = $this->formatSelectString($tableName);
        $ret = pg_query($this->dbconn, "SELECT * FROM " . $string .";");
        return pg_fetch_all($ret);
    }

    function formatSelectString($tableName)
    {
        return pg_escape_string($this->dbconn, $tableName);
    }

    function formatInsertString($data)
    {
        $str = "";
        $counter = 0;
        foreach($data as $key => $value)
        {
            if($counter != 0)
                $str = $str . ",";
            $str = $str . " " . pg_escape_literal($this->dbconn, $value);
            $counter += 1;
        }
        return $str;
    }

    function __destruct()
    {
        pg_close($this->dbconn);
    }
}

?>