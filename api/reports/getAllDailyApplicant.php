<?php

include '../../constants/Operations.php';

// Create an array
$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

	$db = new Operations();
	$dailyApplicant = $db->getAllDailyApplicant($_POST['gender']);
	$quickApplyDailyApplicant = $db->getAllQuickApplyDailyApplicant();

	$response['error'] = false;
	$response['dailyApplicant'] = $dailyApplicant;
	$response['quickApplyDailyApplicant'] = $quickApplyDailyApplicant;
	$response['message'] = 'These are all the daily applicant.';

}else{

	// If the request method is incorrect.
	$response['error'] = true;
	$response['message'] = 'Method is not correct';

}

// Print the $response array in JSON format
echo json_encode($response);