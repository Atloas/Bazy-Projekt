<?php
/*// Connecting, selecting database
$dbconn = pg_connect("host=localhost dbname=u6zbrozek user=u6zbrozek password=6zbrozek") or die('Could not connect: ' . pg_last_error());

// Performing SQL query
$query = 'SELECT * FROM miasta';
$result = pg_query($query) or die('Query failed: ' . pg_last_error());

// Printing results in HTML
echo "<table>\n";
while ($line = pg_fetch_array($result, null, PGSQL_ASSOC))
{
    echo "\t<tr>\n";
    foreach ($line as $col_value)
    {
        echo "\t\t<td>$col_value</td>\n";
    }
    echo "\t</tr>\n";
}
echo "</table>\n";

// Free resultset
pg_free_result($result);

// Closing connection
pg_close($dbconn);
*/
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
        $ret = pg_insert($this->dbconn, $tableName, $data);
        return pg_fetch_all($ret);
    }

    function select($tableName, $where)
    {
        $ret = pg_query($this->dbconn, "SELECT * FROM klienci;");
        return $ret;
    }

    function __destruct()
    {
        pg_close($this->dbconn);
    }
}
?>