<?php

// This class stores all the functions for CRUD (Create, Read, Update, Delete) operations of the database for the Quick Apply service of the HR Online System.
class Operations
{
//START OF CLASS//

	// Call $con variable for connecting or manipulating the SQL Database
	private $con;

	function __construct(){

	// Constructor for connection
	require_once dirname(__FILE__).'/DbConnect.php';

	$db = new DbConnect();

	$this->con = $db->connect();

	}

	function getAllApplicantSource(){
		$stmt = "SELECT source_name FROM tbl_sourceapplication WHERE flag = 0";
		$result = $this->con->query($stmt);
		$temp = array();
		if($result->num_rows>0){
			while($row = mysqli_fetch_assoc($result)){
				// $temp[] = $row;
				$source = $row['source_name'];
				$temp[] = $this->getAllApplicantBySource($source);
			}
		}

		header('Content-type: application/json');
		return $temp;
	}

	function getAllApplicantBySource($source){
		$stmt = "SELECT SUM(CASE WHEN tbl_application.APPLICATION_SOURCE ='$source' THEN 1 ELSE 0 END) AS '$source' FROM tbl_application";
		$result = $this->con->query($stmt);
		// header('Content-type: application/json');
		return mysqli_fetch_assoc($result);
	}

	function getAllApplicantStatus(){
		$stmt = "SELECT 
		SUM(CASE WHEN tbl_application.status ='Pending' THEN 1 ELSE 0 END) AS 'Pending',
		SUM(CASE WHEN tbl_application.status ='No Show' THEN 1 ELSE 0 END) AS 'No Show',
		SUM(CASE WHEN tbl_application.status LIKE '%Interview%' THEN 1 ELSE 0 END) AS 'Interview',
		SUM(CASE WHEN tbl_application.status ='Rejected' THEN 1 ELSE 0 END) AS 'Fail/Reject'
		FROM tbl_application";

		$result = $this->con->query($stmt);
		$temp = array();
		if($result->num_rows>0){
			while($row = mysqli_fetch_assoc($result)){
				$temp[] = $row;
			}
		}

		header('Content-type: application/json');
		return $temp;
	}

	function getAllApplicantLocation(){
		$stmt = "SELECT 
		SUM(CASE WHEN CURRENT_MUNICIPALITY = 'Pasig' THEN 1 ELSE 0 END) AS 'Pasig',
		SUM(CASE WHEN CURRENT_MUNICIPALITY = 'Makati' THEN 1 ELSE 0 END) AS 'Makati',
		SUM(CASE WHEN CURRENT_MUNICIPALITY = 'Marikina' THEN 1 ELSE 0 END) AS 'Marikina',
		SUM(CASE WHEN CURRENT_MUNICIPALITY = 'Mandaluyong' THEN 1 ELSE 0 END) AS 'Mandaluyong',
		SUM(CASE WHEN CURRENT_MUNICIPALITY = 'Quezon City' THEN 1 ELSE 0 END) AS 'Quezon',
		SUM(CASE WHEN CURRENT_MUNICIPALITY = 'Caloocan' THEN 1 ELSE 0 END) AS 'Caloocan',
		SUM(CASE WHEN CURRENT_MUNICIPALITY = 'Pasay' THEN 1 ELSE 0 END) AS 'Pasay',
		SUM(CASE WHEN CURRENT_MUNICIPALITY = 'Parañaque' THEN 1 ELSE 0 END) AS 'Parañaque',
		SUM(CASE WHEN CURRENT_MUNICIPALITY = 'Muntinlupa' THEN 1 ELSE 0 END) AS 'Muntinlupa',
		SUM(CASE WHEN CURRENT_MUNICIPALITY = 'Las Piñas' THEN 1 ELSE 0 END) AS 'Las Piñas',
		SUM(CASE WHEN CURRENT_MUNICIPALITY = 'Taguig' THEN 1 ELSE 0 END) AS 'Taguig',
		SUM(CASE WHEN CURRENT_REGION = 'Ilocos Region' THEN 1 ELSE 0 END) AS 'Ilocos Region',
		SUM(CASE WHEN CURRENT_REGION = 'Cagayan Valley' THEN 1 ELSE 0 END) AS 'Cagayan Valley',
		SUM(CASE WHEN CURRENT_REGION = 'Central Luzon' THEN 1 ELSE 0 END) AS 'Central Luzon',
		SUM(CASE WHEN CURRENT_REGION = 'CALABARZON' THEN 1 ELSE 0 END) AS 'CALABARZON',
		SUM(CASE WHEN CURRENT_REGION = 'MIMARO' THEN 1 ELSE 0 END) AS 'MIMAROPA',
		SUM(CASE WHEN CURRENT_REGION = 'Bicol Region' THEN 1 ELSE 0 END) AS 'Bicol Region',
		SUM(CASE WHEN CURRENT_REGION = 'Western Visayas' THEN 1 ELSE 0 END) AS 'Western Visayas',
		SUM(CASE WHEN CURRENT_REGION = 'Central Visayas' THEN 1 ELSE 0 END) AS 'Central Visayas',
		SUM(CASE WHEN CURRENT_REGION = 'Eastern Visayas' THEN 1 ELSE 0 END) AS 'Eastern Visayas',
		SUM(CASE WHEN CURRENT_REGION = 'Zamboanga Peninsula' THEN 1 ELSE 0 END) AS 'Zamboanga Peninsula',
		SUM(CASE WHEN CURRENT_REGION = 'Northern Mindanao' THEN 1 ELSE 0 END) AS 'Northern Mindanao',
		SUM(CASE WHEN CURRENT_REGION = 'Davao Region' THEN 1 ELSE 0 END) AS 'Davao Region',
		SUM(CASE WHEN CURRENT_REGION = 'SOCCSKSARGEN' THEN 1 ELSE 0 END) AS 'SOCCSKSARGEN',
		SUM(CASE WHEN CURRENT_REGION = 'CARAGA' THEN 1 ELSE 0 END) AS 'CARAGA',
		SUM(CASE WHEN CURRENT_REGION = 'ARMM' THEN 1 ELSE 0 END) AS 'ARMM',
		SUM(CASE WHEN CURRENT_REGION = 'Cordillera Administrative Region (CAR)' THEN 1 ELSE 0 END) AS 'CAR' 
		FROM tbl_application";

		$result = $this->con->query($stmt);
		$temp = array();
		if($result->num_rows>0){
			while($row = mysqli_fetch_assoc($result)){
				$temp[] = $row;
			}
		}

		header('Content-type: application/json');
		return $temp;
	}

// END OF CLASS //
}