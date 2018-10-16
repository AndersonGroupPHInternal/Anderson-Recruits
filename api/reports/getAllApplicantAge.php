<?php

include '../../constants/Operations.php';

// Create an array
$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

	$db = new Operations();
	$result = $db->getAllApplicantAge();

	$response['error'] = false;
	$response['age'] = $result;
	$response['message'] = 'These are all the applicant age.';

}else{

	// If the request method is incorrect.
	$response['error'] = true;
	$response['message'] = 'Method is not correct';

}

// Print the $response array in JSON format
echo json_encode($response);