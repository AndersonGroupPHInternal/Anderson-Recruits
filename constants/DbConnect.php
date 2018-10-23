<?php

// This class is for constructing connection from database.
class DbConnect{
	private $con;

	function __construct(){

	}

	function connect(){
		include_once dirname(__FILE__).'/Constants.php';

		$this->con = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

		mysqli_set_charset($this->con, 'utf8');

		if (mysqli_connect_error()) {
			echo "Failed to connect with database " . mysqli_connect_errno();
		}

		return $this->con;
	}

}