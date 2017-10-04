var PieChart = function(container) {
  this.container = document.getElementById(container);
  this.init();
};

PieChart.prototype.init = function () {
  var self = this;

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {

    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Гужиков Павел',     40],
      ['Ардинцев Иван',     30],
      ['Путин Владимир',    15],
      ['Медведев Дмитрий',  10],
      ['Шойгу Сергей',       5]
    ]);

    var options = {
      fontSize: 16,
      fontName: 'Circe-Regular',
      tooltip: {
        text: 'percentage'
      },
      legend: {
        alignment: 'center'
      }
    };

    var chart = new google.visualization.PieChart(self.container);

    chart.draw(data, options);
  }
};



$(document).ready(function() {
  if ($('#piechart').length) {
    new PieChart('piechart');
  }
});
