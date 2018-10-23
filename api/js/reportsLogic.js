$(document).ready(function () {
    console.log('Page is ready.');

    getAllMonthlyApplicant('');
    getAllDailyApplicant('');
    getAllApplicantSource(gender, startDate, endDate);
    getAllApplicantAge(gender, startDate, endDate);
    getAllApplicantStatus(gender, startDate, endDate);
    getAllJobTitle(gender, startDate, endDate);
    getAllApplicantLocation('Map', gender, startDate, endDate);

    $('#btnMapView').click(function () {
        getAllApplicantLocation('Map', gender, startDate, endDate);
        $(this).addClass('active');
        $('#btnGraphView').removeClass('active');
    });

    $('#btnGraphView').click(function () {
        getAllApplicantLocation('Graph', gender, startDate, endDate);
        $(this).addClass('active');
        $('#btnMapView').removeClass('active');
    });

    $('#dateStart').change(function () {
        startDate = $(this).val();
        filterReports();
    });

    $('#dateEnd').change(function () {
        endDate = $(this).val();
        filterReports();
    });

    $('#selectGender').change(function () {
        switch ($(this).val()) {
            case 'Male':
                gender = 'Male';
                break;

            case 'Female':
                gender = 'Female';
                break;

            case 'Others':
                gender = 'Preferred not to answer';
                break;

            case 'Male and Female':
                gender = '';
                break;

            default:
                gender = '';
                break;
        }
        filterReports();
    });
});

var gender = '', startDate = '', endDate = '';

function filterReports() {
    if (startDate != '' && endDate != '') {
        getAllApplicantAge(gender, startDate, endDate);
        getAllJobTitle(gender, startDate, endDate);
        getAllApplicantSource(gender, startDate, endDate);
        getAllApplicantStatus(gender, startDate, endDate);
        getAllDailyApplicant(gender);
        getAllMonthlyApplicant(gender);
        getAllApplicantLocation('Map', gender, startDate, endDate);
        $('#btnMapView').addClass('active');
        $('#btnGraphView').removeClass('active');
    }
}

function getAllMonthlyApplicant(gender) {
    $.ajax({
        url: 'api/reports/getAllMonthlyApplicant.php',
        type: 'POST',
        data: {
            gender: gender
        },
        success: function (msg) {
            google.charts.load('current', {
                packages: ['corechart', 'bar']
            });
            google.charts.setOnLoadCallback(drawAnnotations);

            function drawAnnotations() {
                var arrayMonthlyApplicantsToShow = [];

                $.each(msg['applicants'], function (index, value) {
                    $.each(msg['applicants'][index], function (index, value) {
                        arrayMonthlyApplicantsToShow.push([index, parseInt(value), value, parseInt(msg['quickApplyApplicants'][0][index]), msg['quickApplyApplicants'][0][index]]);
                    });
                });

                var dataMonthlyApplicants = new google.visualization.DataTable();
                dataMonthlyApplicants.addColumn('string', 'Month');
                dataMonthlyApplicants.addColumn('number', 'Applicants');
                dataMonthlyApplicants.addColumn({
                    type: 'string',
                    role: 'annotation'
                });

                dataMonthlyApplicants.addColumn('number', 'Quick Apply Applicants');
                dataMonthlyApplicants.addColumn({
                    type: 'string',
                    role: 'annotation'
                });

                dataMonthlyApplicants.addRows(arrayMonthlyApplicantsToShow);

                var options = {
                    animation: {
                        startup: true,
                        duration: 10
                    },
                    annotations: {
                        alwaysOutside: true,
                        textStyle: {
                            fontSize: 14,
                            color: '#000',
                            auraColor: 'none'
                        },
                        stem: {
                            color: 'transparent',
                            length: 5
                        },
                        style: 'point'
                    },
                    legend: {
                        position: 'top',
                        alignment: 'center'
                    },
                    bar: {
                        groupWidth: '75%'
                    },
                    backgroundColor: 'transparent',
                    dataOpacity: .8,
                    height: 700,
                    hAxis: {
                        slantedText: true,
                        slantedTextAngle: 90 // here you can even use 180
                    }
                };
                var chart = new google.visualization.ColumnChart(document.getElementById('monthlyApplicantsChart'));
                chart.draw(dataMonthlyApplicants, options);
            }
        }
    });
}

function getAllDailyApplicant(gender) {
    $.ajax({
        url: 'api/reports/getAllDailyApplicant.php',
        type: 'POST',
        data: {
            gender: gender
        },
        success: function (msg) {
            google.charts.load("current", {
                packages: ["calendar"]
            });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var arrayDailyApplicantsToShow = [];
                var arrayQuickApplyDailyApplicantsToShow = [];

                $.each(msg['dailyApplicant'], function (index, value) {
                    arrayDailyApplicantsToShow.push([new Date(value['Date']), parseInt(value['Total'])]);
                });

                $.each(msg['quickApplyDailyApplicant'], function (index, value) {
                    arrayQuickApplyDailyApplicantsToShow.push([new Date(value['Date']), parseInt(value['Total'])]);
                });

                var dataDailyApplicantTable = new google.visualization.DataTable();
                dataDailyApplicantTable.addColumn({
                    type: 'date',
                    id: 'Date'
                });
                dataDailyApplicantTable.addColumn({
                    type: 'number',
                    id: 'Applicant'
                });

                var dataQuickApplyDailyApplicantTable = new google.visualization.DataTable();
                dataQuickApplyDailyApplicantTable.addColumn({
                    type: 'date',
                    id: 'Date'
                });
                dataQuickApplyDailyApplicantTable.addColumn({
                    type: 'number',
                    id: 'Applicant'
                });

                dataDailyApplicantTable.addRows(arrayDailyApplicantsToShow);
                dataQuickApplyDailyApplicantTable.addRows(arrayQuickApplyDailyApplicantsToShow);

                var chart = new google.visualization.Calendar(document.getElementById('dailyApplicantChart'));
                var quickApplyChart = new google.visualization.Calendar(document.getElementById('quickApplyDailyApplicantChart'));

                var options = {
                    title: "Daily Applicants",
                    height: 350,
                    calendar: {
                        underYearSpace: 10, // Bottom padding for the year labels.
                        yearLabel: {
                            fontName: 'Times-Roman',
                            fontSize: 32,
                            color: '#2D5D7B',
                            bold: true,
                            italic: true
                        },
                        monthLabel: {
                            fontName: 'Times-Roman',
                            fontSize: 12,
                            color: '#2D5D7B',
                            bold: true,
                            italic: true
                        },
                        monthOutlineColor: {
                            stroke: '#093A3E',
                            strokeOpacity: 0.8,
                            strokeWidth: 2
                        },
                        unusedMonthOutlineColor: {
                            stroke: '#093A3E',
                            strokeOpacity: 0.8,
                            strokeWidth: 1
                        },
                        underMonthSpace: 16,
                        cellColor: {
                            stroke: '#76a7fa',
                            strokeOpacity: 0.5,
                            strokeWidth: 1,
                        },
                        cellSize: 20
                    },
                    noDataPattern: {
                        backgroundColor: '#bebebe'
                    }
                };
                var quickApplyOptions = {
                    title: "Quick Apply Daily Applicants",
                    height: 350,
                    calendar: {
                        underYearSpace: 10, // Bottom padding for the year labels.
                        yearLabel: {
                            fontName: 'Times-Roman',
                            fontSize: 32,
                            color: '#2D5D7B',
                            bold: true,
                            italic: true
                        },
                        monthLabel: {
                            fontName: 'Times-Roman',
                            fontSize: 12,
                            color: '#2D5D7B',
                            bold: true,
                            italic: true
                        },
                        monthOutlineColor: {
                            stroke: '#093A3E',
                            strokeOpacity: 0.8,
                            strokeWidth: 2
                        },
                        unusedMonthOutlineColor: {
                            stroke: '#093A3E',
                            strokeOpacity: 0.8,
                            strokeWidth: 1
                        },
                        underMonthSpace: 16,
                        cellColor: {
                            stroke: '#76a7fa',
                            strokeOpacity: 0.5,
                            strokeWidth: 1,
                        },
                        cellSize: 20
                    },
                    noDataPattern: {
                        backgroundColor: '#bebebe'
                    }
                }

                chart.draw(dataDailyApplicantTable, options);
                quickApplyChart.draw(dataQuickApplyDailyApplicantTable, quickApplyOptions);

            }
        }
    });
}

function getAllJobTitle(gender, startDate, endDate) {
    $.ajax({
        url: 'api/reports/getAllJobTitle.php',
        type: 'POST',
        data: {
            gender: gender,
            startDate: startDate,
            endDate: endDate
        },
        success: function (msg) {

            var arrayJobTitlesToShow = [];
            $.each(msg['position'], function (index, value) {
                if (value['position'] == '') {
                    arrayJobTitlesToShow.push(['None', parseInt(value['Total'])]);
                } else {
                    arrayJobTitlesToShow.push([value['position'], parseInt(value['Total'])]);
                }
            });

            google.charts.load('current', {
                'packages': ['table']
            });
            google.charts.setOnLoadCallback(drawTable);

            function drawTable() {
                var dataJobTitleApplicant = new google.visualization.DataTable();
                dataJobTitleApplicant.addColumn('string', 'Job Title');
                dataJobTitleApplicant.addColumn('number', 'Total');
                dataJobTitleApplicant.addRows(arrayJobTitlesToShow);

                var table = new google.visualization.Table(document.getElementById('jobTitleApplicantsChart'));

                table.draw(dataJobTitleApplicant, {
                    // showRowNumber: true,
                    width: '100%',
                    height: '50%',
                    pagingButtons: 10,
                    alternatingRowStyle: true
                });
            }
        }
    });
}

function getAllApplicantAge(gender, startDate, endDate) {
    $.ajax({
        url: 'api/reports/getAllApplicantAge.php',
        type: 'POST',
        data: {
            gender: gender,
            startDate: startDate,
            endDate: endDate
        },
        success: function (msg) {
            // Age Bracket Chart
            google.charts.load("current", {
                packages: ['corechart']
            });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {

                var dataAgeBracket = new google.visualization.DataTable();

                dataAgeBracket.addColumn('string', 'Age Bracket');
                dataAgeBracket.addColumn('number', 'Number of Applicants')
                dataAgeBracket.addColumn({
                    type: 'string',
                    role: "style"
                });

                $.each(msg['age'], function (index, value) {
                    $.each(msg['age'][index], function (index, value) {
                        dataAgeBracket.addRows([
                            [index, parseInt(value), "color: #17A398; fill-opacity: 0.7; stroke-color: black; stroke-width: 2; stroke-opacity: .5;"]
                        ]);
                    });
                });

                var view = new google.visualization.DataView(dataAgeBracket);
                view.setColumns([0, 1,
                    {
                        calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation"
                    },
                    2
                ]);

                var options = {
                    // title: "Monthly Applicants",
                    bar: {
                        groupWidth: "80%"
                    },
                    legend: {
                        position: "none"
                    },
                    backgroundColor: 'transparent',
                    height: 500,
                    annotations: {
                        alwaysOutside: true,
                        textStyle: {
                            fontSize: 14,
                            auraColor: 'none'
                        },
                        stem: {
                            color: 'transparent',
                        },
                        style: 'point'
                    },
                };
                var chart = new google.visualization.ColumnChart(document.getElementById("ageBracketChart"));
                chart.draw(view, options);
            }
        }
    });
}

function getAllApplicantStatus(gender, startDate, endDate) {
    $.ajax({
        url: 'api/reports/getAllApplicantStatus.php',
        type: 'POST',
        data: {
            gender: gender,
            startDate: startDate,
            endDate: endDate
        },
        success: function (msg) {

            // Load the Visualization API and the corechart package.
            google.charts.load('current', {
                'packages': ['corechart']
            });

            // Set a callback to run when the Google Visualization API is loaded.
            google.charts.setOnLoadCallback(drawChart);

            // Callback that creates and populates a data table,
            // instantiates the pie chart, passes in the data and
            // draws it.
            function drawChart() {
                // Create the data table.
                var dataApplicantStatus = new google.visualization.DataTable();
                dataApplicantStatus.addColumn('string', 'Status');
                dataApplicantStatus.addColumn('number', 'Applicants');

                $.each(msg['status'], function (index, value) {
                    $.each(msg['status'][index], function (index, value) {
                        dataApplicantStatus.addRows([
                            [index, parseInt(value)],
                        ]);
                    });
                });

                // Set chart options
                var options = {
                    // 'title': 'How Much Pizza I Ate Last Night',
                    legend: {
                        position: 'top',
                        alignment: 'center'
                    },
                    // 'width': 400,
                    height: 700,
                    is3D: true,
                    backgroundColor: 'transparent',
                };

                // Instantiate and draw our chart, passing in some options.
                var chart = new google.visualization.PieChart(document.getElementById('applicantStatusChart'));
                chart.draw(dataApplicantStatus, options);
            }
        }
    });
}

function getAllApplicantSource(gender, startDate, endDate) {
    $.ajax({
        url: 'api/reports/getAllApplicantSource.php',
        type: 'POST',
        data: {
            gender: gender,
            startDate: startDate,
            endDate: endDate
        },
        success: function (msg) {

            // Load the Visualization API and the corechart package.
            google.charts.load('current', {
                'packages': ['corechart']
            });

            // Set a callback to run when the Google Visualization API is loaded.
            google.charts.setOnLoadCallback(drawChart);

            // Callback that creates and populates a data table,
            // instantiates the pie chart, passes in the data and
            // draws it.
            function drawChart() {
                // Create the data table.
                var dataApplicantSource = new google.visualization.DataTable();
                dataApplicantSource.addColumn('string', 'Source');
                dataApplicantSource.addColumn('number', 'Applicants');

                $.each(msg['source'], function (index, value) {
                    $.each(msg['source'][index], function (index, value) {
                        dataApplicantSource.addRows([
                            [index, parseInt(value)],
                        ]);
                    });
                });

                // Set chart options
                var options = {
                    // 'title': 'How Much Pizza I Ate Last Night',
                    legend: {
                        position: 'right',
                        alignment: 'center'
                    },
                    // 'width': 400,
                    height: 700,
                    is3D: true,
                    backgroundColor: 'transparent',
                };

                // Instantiate and draw our chart, passing in some options.
                var chart = new google.visualization.PieChart(document.getElementById('applicantSourceChart'));
                chart.draw(dataApplicantSource, options);
            }
        }
    });
}

function getAllApplicantLocation(viewType, gender, startDate, endDate) {
    
    $.ajax({
        url: 'api/reports/getAllApplicantLocation.php',
        type: 'POST',
        data: {
            gender: gender,
            startDate: startDate,
            endDate: endDate
        },
        success: function (msg) {
            if (viewType == 'Map') {
                google.charts.load('current', {
                    'packages': ['map']
                });
                google.charts.setOnLoadCallback(drawMap);

                function drawMap() {

                    var arrayLocationsToShow = [];

                    $.each(msg['location'], function (index, value) {
                        if (getLatLng(value['Place'])[0] != 'none' || getLatLng(value['Place'])[1] != 'none') {
                            arrayLocationsToShow.push([getLatLng(value['Place'])[0], getLatLng(value['Place'])[1], value['Place'] + ': ' + value['Total']]);
                        }
                    });

                    var dataApplicantLocation = new google.visualization.DataTable();
                    dataApplicantLocation.addColumn('number', 'Lat');
                    dataApplicantLocation.addColumn('number', 'Long');
                    dataApplicantLocation.addColumn('string', 'Name');
                    dataApplicantLocation.addRows(arrayLocationsToShow);

                    var options = {
                        height: 700,
                        mapType: 'normal',
                        showTooltip: true,
                        showInfoWindow: true
                    };

                    var map = new google.visualization.Map(document.getElementById('applicantLocationsChart'));

                    map.draw(dataApplicantLocation, options);
                };
            } else if (viewType == 'Graph') {

                // Age Bracket Chart
                google.charts.load("current", {
                    packages: ['corechart']
                });
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {

                    var dataApplicantLocation = new google.visualization.DataTable();
                    dataApplicantLocation.addColumn('string', 'Place');
                    dataApplicantLocation.addColumn('number', 'Applicant number');
                    dataApplicantLocation.addColumn({
                        type: 'string',
                        role: "style"
                    });

                    $.each(msg['location'], function (index, value) {
                        if (getLatLng(value['Place'])[0] != 'none' || getLatLng(value['Place'])[1] != 'none') {
                            dataApplicantLocation.addRows([
                                [value['Place'], parseInt(value['Total']), "color: #17A398; fill-opacity: 0.7; stroke-color: black; stroke-width: 2; stroke-opacity: .5;"]
                            ]);
                        }
                    });

                    var view = new google.visualization.DataView(dataApplicantLocation);
                    view.setColumns([0, 1,
                        {
                            calc: "stringify",
                            sourceColumn: 1,
                            type: "string",
                            role: "annotation"
                        },
                        2
                    ]);

                    var options = {
                        // title: "Monthly Applicants",
                        bar: {
                            groupWidth: "80%"
                        },
                        legend: {
                            position: "none"
                        },
                        backgroundColor: 'transparent',
                        annotations: {
                            alwaysOutside: true,
                            textStyle: {
                                fontSize: 14,
                                auraColor: 'none'
                            },
                            stem: {
                                color: 'transparent',
                            },
                            style: 'point'
                        },
                        hAxis: {
                            slantedText: true,
                            slantedTextAngle: 90
                        }
                    };
                    var chart = new google.visualization.ColumnChart(document.getElementById("applicantLocationsChart"));
                    chart.draw(view, options);
                }
            }
        }
    });
}

function getLatLng(location) {
    var latlng = [];
    switch (location) {
        // METRO MANILA
        case 'Metro Manila (NCR)':
            latlng[0] = 14.5995;
            latlng[1] = 120.9842;
            return latlng;
        case 'Pasig':
            latlng[0] = 14.5764;
            latlng[1] = 121.0851;
            return latlng;
        case 'Makati':
            latlng[0] = 14.5547;
            latlng[1] = 121.0244;
            return latlng;
        case 'Marikina':
            latlng[0] = 14.6507;
            latlng[1] = 121.1029;
            return latlng;
        case 'Mandaluyong':
            latlng[0] = 14.5794;
            latlng[1] = 121.0359;
            return latlng;
        case 'Quezon City':
            latlng[0] = 14.6760;
            latlng[1] = 121.0437;
            return latlng;
        case 'Caloocan':
            latlng[0] = 14.7566;
            latlng[1] = 121.0450;
            return latlng;
        case 'Pasay':
            latlng[0] = 14.5378;
            latlng[1] = 121.0014;
            return latlng;
        case 'Parañaque':
            latlng[0] = 14.4793;
            latlng[1] = 121.0198;
            return latlng;
        case 'Muntinlupa':
            latlng[0] = 14.4081;
            latlng[1] = 121.0415;
            return latlng;
        case 'Las Piñas':
            latlng[0] = 14.4445;
            latlng[1] = 120.9939;
            return latlng;
        case 'Taguig':
            latlng[0] = 14.5176;
            latlng[1] = 121.0509;
            return latlng;

            // CENTRAL LUZON
        case 'Central Luzon':
            latlng[0] = 15.4828;
            latlng[1] = 120.7120;
            return latlng;

            // CALABARZON
        case 'Cavite':
            latlng[0] = 14.2456;
            latlng[1] = 120.8786;
            return latlng;
        case 'Rizal':
            latlng[0] = 14.6037;
            latlng[1] = 121.3084;
            return latlng;
        case 'Laguna':
            latlng[0] = 14.1407;
            latlng[1] = 121.4692;
            return latlng;
        case 'Batangas':
            latlng[0] = 13.9450;
            latlng[1] = 121.1312;
            return latlng;
        case 'Quezon':
            latlng[0] = 13.9347;
            latlng[1] = 121.9473;
            return latlng;

            // case 'Ilocos Region':
            //     latlng[0] = 16.0832;
            //     latlng[1] = 120.6200;
            //     return latlng;
            // case 'Cagayan Valley':
            //     latlng[0] = 16.9754;
            //     latlng[1] = 121.8107;
            //     return latlng;
            // case 'MIMARO':
            //     latlng[0] = 9.8432;
            //     latlng[1] = 118.7365;
            //     return latlng;
            // case 'Bicol Region':
            //     latlng[0] = 13.4210;
            //     latlng[1] = 123.4137;
            //     return latlng;
            // case 'Western Visayas':
            //     latlng[0] = 11.0050;
            //     latlng[1] = 122.5373;
            //     return latlng;
            // case 'Central Visayas':
            //     latlng[0] = 9.8169;
            //     latlng[1] = 124.0641;
            //     return latlng;
            // case 'Eastern Visayas':
            //     latlng[0] = 12.2446;
            //     latlng[1] = 125.0388;
            //     return latlng;
            // case 'Zamboanga Peninsula':
            //     latlng[0] = 8.1541;
            //     latlng[1] = 123.2588;
            //     return latlng;
            // case 'Northern Mindanao':
            //     latlng[0] = 8.0202;
            //     latlng[1] = 124.6857;
            //     return latlng;
            // case 'Davao Region':
            //     latlng[0] = 7.1907;
            //     latlng[1] = 125.4553;
            //     return latlng;
            // case 'SOCCSKSARGEN':
            //     latlng[0] = 6.2707;
            //     latlng[1] = 124.6857;
            //     return latlng;
            // case 'CARAGA':
            //     latlng[0] = 8.8015;
            //     latlng[1] = 125.7407;
            //     return latlng;
            // case 'ARMM':
            //     latlng[0] = 6.9568;
            //     latlng[1] = 124.2422;
            //     return latlng;
            // case 'CAR':
            //     latlng[0] = 17.3513;
            //     latlng[1] = 121.1719;
            //     return latlng;
        default:
            latlng[0] = 'none';
            latlng[1] = 'none';
            return latlng;
    }
}