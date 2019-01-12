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

    //Na razie tylko to
    private function _save()
    {
        if($this->get_request_method() != "POST")
            $this->response('', 406);

        if(!empty($this->_request))
        {
            try
            {
                $json_array = json_decode($this->_request, true);
                $tableName = $json_array["tableName"];
                unset($json_array["tableName"]);
                $res = $this->db->insert($tableName, $json_array);      //Zwróci obiekt połączenia z bd, lub FALSE
                if ($res)
                {
                   $result = array('return'=>'ok');
                   $this->response($this->json($result), 200);
                }
                else
                {
                    $result = array('return'=>'not added');
                    $this->response($this->json($result), 200);
                }
            }
            catch (Exception $e)
            {
                $this->response('', 400);
            }
        }
        else
        {
            $error = array('status' => "Failed", "msg" => "Invalid send data");
            $this->response($this->json($error), 400);
        }
    }

    private function _list()
    {
        if(!empty($this->_request))
        {
            try
            {
                $json_array = json_decode($this->_request, true);
                $tableName = $json_array["tableName"];
                unset($json_array["tableName"]);
                $res = $this->db->select($tableName, $json_array);      //Zwróci obiekt połączenia z bd, lub FALSE
                if ($res)
                   $this->response($this->json($res), 200);
                else
                {
                    $test = array();
                    $test["test"] = "test";
                    $result = array('return'=>'error');
                    $this->response($this->json($test), 200);//$this->json($result), 200);
                }
            }
            catch (Exception $e)
            {
                $this->response('', 400);
            }
        }
        else
        {
            $error = array('status' => "Failed", "msg" => "Invalid read data");
            $this->response($this->json($error), 400);
        }
    }

    private function _delete0()
    {
        $this->_delete(0);
    }

    private function _delete1()
    {
        $this->_delete(1);
    }

    private function _delete($flag)
    {
        if($this->get_request_method() != "DELETE")
            $this->response('', 406);
        $id = $this->_args[0];
        if(!empty($id))
        {
            $res = $this->db->delete($id, $flag);
            if($res)
            {
                $success = array('status' => "Success", "msg" => "Successfully one record deleted. Record - " . $id);
                $this->response($this->json($success), 200);
            }
            else
            {
                $failed = array('status' => "Failed", "msg" => "No records deleted" );
                $this->response($this->json($failed), 200);
            }
        }
        else
        {
            $failed = array('status' => "No content", "msg" => "No records deleted" );
            $this->response($this->json($failed), 204);    // If no records "No Content" status
        }
    }

    private function _update0()
    {
        $this->_update(0);
    }

    private function _update1()
    {
        $this->_update(1);
    }

    private function _update($flag)
    {
        if($this->get_request_method() != "PUT")
            $this->response('', 406);
        $id = $this->_args[0];
        $json_array = json_decode($this->_request, true);
        if(!empty($id))
        {
            $res = $this->db->update($id, $json_array, $flag);
            if($res > 0)
            {
                $success = array('status' => "Success", "msg" => "Successfully one record updated.");
                $this->response($this->json($success), 200);
            }
            else
            {
                $failed = array('status' => "Failed", "msg" => "No records updated.");
                $this->response($this->json($failed), 200);
            }
        }
        else
            $this->response('', 204); // If no records "No Content" status
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