app.controller('searchController', function ($scope, searchService) {

    $scope.searchTerm = "Bill Gates";
    

    $scope.searchQuery = {}

    function drawBasic() {

        var data = google.visualization.arrayToDataTable([
          ['Element', 'Density', { role: 'style' }],
          ['2017', 100, '#b87333'],           
          ['2016', 125, 'silver'],           
          ['2015', 19, 'gold'],
          ['2014', 21, 'color: #e5e4e2']
        ]);

        var options = {
            title: 'Videos By Year (Values hard coded)',
            hAxis: {
                title: 'Year',
                viewWindow: {
                    min: [7, 30, 0],
                    max: [17, 30, 0]
                }
            },
            vAxis: {
                title: 'Videos per year'
            }
        };

        var chart = new google.visualization.ColumnChart(
          document.getElementById('chart_div'));

        chart.draw(data, options);
    }


    $scope.getResults = function (isNext) {
        if (isNext) {
            $scope.searchQuery.PageCount = $scope.searchQuery.PageCount + 1;
        } else {
            $scope.searchQuery.PageCount = 0;
        }
        $scope.searchQuery.SearchString = $scope.searchTerm;
        var servCall = searchService.getSearchResults($scope.searchQuery);
        servCall.then(function(d) {
            $scope.results = d.data;
            drawBasic();
        }, function(error) {
            console.log(error);
        });
    }

    $scope.JSONToCSVConvertor = function () {
        debugger;
        var array = $scope.results.webPages.value;
        var str = '';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ',';

                line += array[i][index];


                str += line + '\r\n';
            }

            str += line + '\r\n';
        }

        //var csvString = csvRows.join("%0A");
        var a = document.createElement('a');
        a.href = 'data:attachment/csv,' + str;
        a.target = '_blank';
        a.download = 'myFile.csv';

        document.body.appendChild(a);
        a.click();
    }

    $scope.getResults();

})