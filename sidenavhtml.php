<?php
    $id = isset($_GET['id']) ? $_GET['id'] : ' ';
	echo '
	<style>
		h5 {
			color:white;
		}
		h5:hover {
			color:white;
			
		}
		.navi:hover{
			background-color: #30d2e8;
			color: black;
		}
		.boxed{
			border: 1px solid white ;
		}
	</style>
	
	<div id="mySidenav" class="sidenav" style="background-color:#45619D">
	<img src="adg1.png"  width="60%" style="margin-bottom: 10%; margin-left: 4em;">
	<a href="javascript:void(0)" class="closebtn" style="color:black;" onclick="closeNav()">&times;</a> ';
	
	echo' 
	<center>
	<a class="navi" style="text-align: left;border-bottom: 2px solid" href="#sideNavCollapse" data-toggle="collapse"><h5>Lists</h5></a>
	<div id="sideNavCollapse" class="collapse">
	<a class="navi" style="text-align: left;border-bottom: 2px solid;border-top: 2px solid" href="google.php?id='.$id.'"><h5 class="col-sm-offset-1">Application Status</h5></a>
	<a class="navi" style="text-align: left;border-bottom: 2px solid" href="applicants.php?id='.$id.'"><h5 class="col-sm-offset-1">Applicant List</h5></a>
	<a class="navi" style="text-align: left;border-bottom: 2px solid" href="quick_applicants_list.php?id='.$id.'"><h5 class="col-sm-offset-1">Quick Apply Applicants</h5></a>
	<a class="navi" style="text-align: left;border-bottom: 2px solid" href="view_authorization_list.php?id='.$id.'"><h5 class="col-sm-offset-1">General List</h5></a>
	<a class="navi" style="text-align: left;border-bottom: 2px solid" href="policy_viewer.php?id='.$id.'"><h5 class="col-sm-offset-1">Privacy Policy List</h5></a>
	<a class="navi" style="text-align: left;border-bottom: 2px solid" href="user_logs.php?id='.$id.'"><h5 class="col-sm-offset-1">User History Logs</h5></a>
	</div> 
	<a class="navi" style="text-align: left;border-bottom: 2px solid" href="reports.php?id='.$id.'"><h5>Reports</h5></a>
	<a class="navi" style="text-align: left;border-bottom: 2px solid" href="createAccount.php?id='.$id.'"><h5>Create User Accounts</h5></a>
	<a class="navi" style="text-align: left;border-bottom: 2px solid" href="cms.php?id='.$id.'"><h5>Content Management System</h5></a>
	<a class="navi" style="text-align: left;border-bottom: 2px solid" href="about.php?id='.$id.'"><h5>About Us</h5></a>
	' ;
   if($_SESSION['id'] == 1){
	  echo '
	 
	  <a class="navi" style="text-align: left;" href="adminloginpage.php"><h5>Log out</h5></a>
		
	  </div>';
   }else{
		   echo '<a class="navi" id = "accountAnchor" style="text-align: left;border-bottom: 2px solid" href="account.php?id='.$id.'"><h5>Account</h5></a>
				<a class="navi" style="text-align: left;" href="adminloginpage.php"><h5>Log out</h5></a>
				 </div> </center>';	
}

?>