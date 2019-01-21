<?php

require_once("rest.php");
require_once("postgres.php");

class API extends REST
{
    public $data = "";

    public function __construct()
    {
        parent::__construct();                     // Init parent contructor
        $this->db = new db();                      // Initiate Database
    }

    public function processApi()
    {
        $func = "_".$this->_endpoint;
        if((int)method_exists($this, $func) > 0)
            $this->$func();
        else 
            $this->response('Page not found', 404);
    }

    private function _insert()
    {
        if(!empty($this->_request))
        {
            try
            {
                $json_array = json_decode($this->_request, true);
                $tableName = $json_array["tableName"];
                unset($json_array["tableName"]);
                $res = $this->db->insert($tableName, $json_array);      //Zwróci obiekt połączenia z bd, lub FALSE
                if(is_string($res))
                {
                    $result = array('status'=>'Failure', 'msg' => $res);
                    $this->response($this->json($result), 400);
                }
                if ($res)
                {
                   $result = array('status'=>'Success', 'msg' => 'Zapisano!');
                   $this->response($this->json($result), 200);
                }
                else
                {
                    $result = array('status'=>'Failure', 'msg' => 'UWAGA: Błąd zapisu!');
                    $this->response($this->json($result), 400);
                }
            }
            catch (Exception $e)
            {
                $error = array('status' => "Failure", "msg" => "UWAGA: Wyjątek przy próbie zapisu!");
                $this->response($this->json($error), 400);
            }
        }
        else
        {
            $error = array('status' => "Failure", "msg" => "UWAGA: Błąd żądania!");
            $this->response($this->json($error), 400);
        }
    }

    private function _select()
    {
        if(!empty($this->_request))
        {
            try
            {
                $json_array = json_decode($this->_request, true);
                $tableName = $json_array["tableName"];
                $res = $this->db->selectAll($tableName);      //Zwróci obiekt połączenia z bd, lub FALSE
                if ($res)
                {
                    $this->response($this->json($res), 200);
                }
                else
                {
                    $result = array('status'=>'Failure', 'msg' => 'UWAGA: Błąd odczytu!');
                    $this->response($this->json($result), 200);
                }
            }
            catch (Exception $e)
            {
                $error = array('status' => "Failure", "msg" => "UWAGA: Wyjątek przy próbie odczytu!");
                $this->response($this->json($error), 400);
            }
        }
        else
        {
            $error = array('status' => "Failure", "msg" => "UWAGA: Błąd żądania!");
            $this->response($this->json($error), 400);
        }
    }

    private function _delete()
    {
        if(!empty($this->_request))
        {
            try
            {
                $json_array = json_decode($this->_request, true);
                $tableName = $json_array["tableName"];
                unset($json_array["tableName"]);
                $res = $this->db->deleteById($tableName, $json_array);
                if($res)
                {
                    $success = array('status' => "Success", "msg" => "Usunięto!");
                    $this->response($this->json($success), 200);
                }
                else
                {
                    $failed = array('status' => "Failure", "msg" => "UWAGA: Błąd usuwania!");
                    $this->response($this->json($failed), 200);
                }
            }
            catch (Exception $e)
            {
                $error = array('status' => "Failure", "msg" => "UWAGA: Wyjątek przy próbie usunięcia!");
                $this->response($this->json($error), 400);
            }
        }
        else
        {
            $error = array('status' => "Failure", "msg" => "UWAGA: Błąd żądania!");
            $this->response($this->json($error), 400);
        }
    }

    private function _update()
    {
        if(!empty($this->_request))
        {
            try
            {
                $json_array = json_decode($this->_request, true);
                foreach($json_array as $key => $value)
                {
                    $string = $string . " - " . $key . " - " . $value . "<br />";
                }
                $tableName = $json_array["tableName"];
                $id["idName"] = $tableName . "_id";
                $id["idValue"] = $json_array[$id["idName"]];
                unset($json_array["tableName"]);
                unset($json_array[$tableName . "_id"]);
                $res = $this->db->updateById($tableName, $id, $json_array);
                if(is_string($res))
                {
                    $success = array('status' => "Failure", "msg" => $res);
                    $this->response($this->json($success), 400);
                }
                if($res > 0)
                {
                    $success = array('status' => "Success", "msg" => "Poprawiono!");
                    $this->response($this->json($success), 200);
                }
                else
                {
                    $failed = array('status' => "Failure", "msg" => "UWAGA: Błąd nadpisu!");
                    $this->response($this->json($failed), 200);
                }
            }
            catch (Exception $e)
            {
                $error = array('status' => "Failure", "msg" => "UWAGA: Wyjątek przy próbie nadpisu!");
                $this->response($this->json($error), 400);
            }
        }
        else
        {
            $error = array('status' => "Failure", "msg" => "UWAGA: Błąd żądania!");
            $this->response($this->json($error), 400);
        }
    }

    private function _function()
    {
        if(!empty($this->_request))
        {
            try
            {
                $json_array = json_decode($this->_request, true);
                $functionName = $json_array["functionName"];
                $function = $json_array["function"];
                unset($json_array["function"]);
                unset($json_array["functionName"]);
                $res = $this->db->useFunction($functionName, $function, $json_array);      //Zwróci obiekt połączenia z bd, lub FALSE
                if ($res)
                {
                    $this->response($this->json($res), 200);
                }
                else
                {
                    $result = array('status' => 'Failure', 'msg' => 'UWAGA: Błąd funkcji!');
                    $this->response($this->json($result), 200);
                }
            }
            catch (Exception $e)
            {
                $error = array('status' => "Failure", "msg" => "UWAGA: Wyjątek przy próbie wywołania funkcji!");
                $this->response($this->json($error), 400);
            }
        }
        else
        {
            $error = array('status' => "Failure", "msg" => "UWAGA: Błąd żądania!");
            $this->response($this->json($error), 400);
        }
    }

    private function json($data)
    {
        if(is_array($data))
            return json_encode($data);
    }
}

$api = new API;
$api->processApi();

?>