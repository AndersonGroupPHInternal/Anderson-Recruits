<?php
	include('auth.php');/*session_start()*/
	$_SESSION['previous-page'] = 'google.php';
?>

<!DOCTYPE html>
<html>
<head>
	<title>Application List</title>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1; charset=ISO-8859-1">
	<link rel="stylesheet" type="text/css" href="css/bootstrap-material-design.css">
	<link rel="stylesheet" type="text/css" href="css/dataTables.material.css">
	<link rel="stylesheet" type="text/css" href="css/bootstrap-clockpicker.css">
	<link rel="stylesheet" type="text/css" href="css/font-awesome.css">
	<link rel="stylesheet" type="text/css" href="css/sidenav.css">
	<link rel="stylesheet" type="text/css" href="css/datepicker3.css">
	<link rel="stylesheet" type="text/css" href="css/bootstrap-timepicker.min.css">
	<link rel = "stylesheet" type = "text/css" href = "css/dataTables.tableTools.min.css">
	<link rel = "stylesheet" type = "text/css" href = "css/dataTables.tableTools.css">
	<link rel = "stylesheet" type = "text/css" href = "css/buttons.dataTables.min.css">
	<link rel = "stylesheet" type = "text/css" href = "css/buttons.dataTables.css">
	<link rel = "stylesheet" type = "text/css" href = "css/jquery.dataTables.min.css">

	</head>
<body style = 'background-color: white'>
 <?php  header('Content-Type: text/html; charset=ISO_8859-1'); ?>
<style type="text/css">
.sb-search {
	position: relative;
	margin-top: 10px;
	width: 0%;
	min-width: 60px;
	height: 60px;
	float: right;
	overflow: hidden;
	-webkit-transition: width 0.3s;
	-moz-transition: width 0.3s;
	transition: width 0.3s;
	-webkit-backface-visibility: hidden;
}
#myTable tr.selected {
background-color: #83b4ef !important; //color when selected
}
	.active {
		background-color: white;
	}
	ul {
	  list-style-type: none;
	}
		#bgImg {		
		  position: absolute;
		  top: 1%;
		  left: 8%;
		  right: 5%;
		  z-index: 0;
		  background-attachment: fixed;
		  background-position: center;
	}
	
#ulPrint div a, #ulSave div a{
padding: 0;
border: none;
background: none;
}
#ulPrint div a span, #ulSave div span{
float: left;
}
</style>
	<?php  
		include('sidenavhtml.php');
	?>


	<div id="main" >
			<nav style="width:103.25%; margin-top:-2%; margin-left:-2%; background-color:#F0F8FF;">
			  <div class="container-fluid">
				<ul class="nav navbar-nav">
				  <li data-toggle="dropdown-toggle"><a data-toggle='modal'><h4 style="cursor:pointer; color:#00008B; font-family:'Trebuchet MS', Helvetica, sans-serif; padding-top:5px; padding-right:10px; padding-left: -10px" onclick="openNav()"><i class="fa fa-bars"></i> Menu</h4></a></li>
				</ul>
				</div>
			</nav>

	<div class="row"><!--Status Change-->
		<div class="col-md-12"><br><br>
				<div id = 'myData'>
				<center><h3 style="font-weight: bold;margin-bottom: 2%;margin-top:-2%;">Privacy Policy List</h3></center>
				<table name="" id="myTable" class="table table-striped table-hover" style="width:100%; ">
					<thead>
						<tr>
							<th>Application Number</th>
							<th>Name</th>
							<th>Reference Code</th>
							<th>Date Joined</th>
							<th>Status</th>
						</tr>
					</thead>
					<?php  
						include('connect.php');
						$sql = "SELECT * FROM tbl_application_info ORDER BY date_registered DESC";
						$result = $conn->query($sql);
						if ($result->num_rows > 0){
							while($row = $result->fetch_assoc()) {
					?>
								
							<tr>
								<td><?php echo $row['application_no']; ?></td>
								<td><?php echo $row['last_name'].",".$row['first_name']." ".$row['extension_name']." ".$row['middle_name']; ?></td>
                          		<td><?php echo $row['reference_code']; ?></td>
                          		<td><?php echo $row['date_registered']; ?></td>
                          		<td><?php if($row['status']=="1") { echo '<span style="font-weight:bold" class="text-success">Active</span>'; }   else if ($row['status'] == "2") { echo '<span style="font-weight:bold" class="text-warning">Suspend</span>'; } 
                          else if ($row['status'] == "3") { echo '<span style="font-weight:bold" class="text-danger">Delete</span>'; } ?></td>
                          		
							</tr>
					 <?php
                            }
                            }
                            $conn->close();
                            ?>
				</tbody>
			</table>
			</div>
	      </div>
	    </div>
	  </div>

	<footer class="panel-footer" style="background-color:#F0F8FF;">
		<center><p style="color: black; font-size:90%">
			Private and Confidential. Anderson Group BPO Inc. &copy; 2017
		</p></center>
	</footer>
<!--END-->

	<script type="text/javascript" src="js/tether.js"></script>
	<script type="text/javascript" src="js/jquery-3.1.1.js"></script>
	<script type="text/javascript" src="js/jquery.dataTables.js"></script>
	<script type="text/javascript" src="js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="js/buttons.Html5.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>	
	<script type="text/javascript" src="js/material.js"></script>
	<script type="text/javascript" src="js/buttons.print.min.js"></script>
	<script type="text/javascript" src="js/dataTables.buttons.min.js"></script>
	<script type="text/javascript" src="js/dataTables.tableTools.min.js"></script>
	<script type="text/javascript" src="js/dataTables.material.js"></script>
	<script type="text/javascript" src="js/dataTables.select.min.js"></script>
	<script type="text/javascript" src="js/buttons.flash.min.js"></script>
	<script type="text/javascript" src="js/bootstrap-datepicker.js"></script>
	<script type="text/javascript" src="js/bootstrap-clockpicker.js"></script>
	<script type="text/javascript" src="js/bootstrap-timepicker.min.js"></script>
	<script type="text/javascript">
	    $('.clockpicker').clockpicker();
	</script>

	<script type="text/javascript">
	
		function openNav() {
		    document.getElementById("mySidenav").style.width = "300px";
		    document.getElementById("main").style.marginLeft = "300px";
		}
		function closeNav() {
		    document.getElementById("mySidenav").style.width = "0";
		    document.getElementById("main").style.marginLeft= "0";
		}
		setTimeout(function(){
		  $('#removeme').fadeOut();
		  <?php unset($_SESSION['uploadnotice']);
		  		unset($_SESSION['queryerror']); ?>
		}, 5000);

	</script>
</body>
</html>
