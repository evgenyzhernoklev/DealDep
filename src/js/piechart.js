var PieChart = function(container) {
  this.container = document.getElementById(container);
  this.popups = $('.popup-person-note');
  this.init();
};

PieChart.prototype.init = function () {
  var self = this;

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {

    var data = google.visualization.arrayToDataTable([
      ['Person', 'Percentage'],
      ['Гужиков Павел',     40],
      ['Ардинцев Иван',     30],
      ['Путин Владимир',    15],
      ['Медведев Дмитрий',  10],
      ['Шойгу Сергей',       5]
    ]);

    var options = {
      colors: ['#2196F3', '#CDDC39', '#673AB7', '#4CAF50', '#FF8F00'],
      fontSize: 16,
      fontName: 'Circe-Regular',
      legend: {
        alignment: 'center'
      },
      pieSliceText: 'none',
      tooltip: {
        text: 'percentage',
        trigger: 'none'
      }
    };

    var chart = new google.visualization.PieChart(self.container);

    // The select handler. Call the chart's getSelection() method
    function selectHandler() {
      var selectedItem = chart.getSelection()[0];
      if (selectedItem) {
        var value = data.getValue(selectedItem.row, 0);
        openPopup(value);
        // console.log('The user selected - ' + value);
      }
    }

    function openPopup(value) {
      var $targetPopup = self.popups.filter(function() {
        return $(this).data('name') == value;
      });

      $targetPopup.bPopup({
        opacity: 0.8,
        follow: [true, false],
        closeClass: 'popup-close'
      });
    }

    // Listen for the 'select' event, and call my function selectHandler() when
    // the user selects something on the chart.
    google.visualization.events.addListener(chart, 'select', selectHandler);

    chart.draw(data, options);
  }
};



$(document).ready(function() {
  if ($('#piechart').length) {
    new PieChart('piechart');
  }
});
