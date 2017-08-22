var loadData = function(){
  if (!window.d3plus) {
    console.log("no d3plus");
    return;
  }

  $.ajax({
    type: 'GET',
    url: '/visualization.json',
    async: false,
    dataType: 'json',
    success: function(data){
      drawPieChart(data);
      console.log('success');
    },
    failure: function(result){
      alert('ERROR');
    }
  })
}
function drawPieChart(data){
  var discriminatoryData = data.filter(function (datum) {
    return datum.discriminatory;
  });
  var discriminatoryCount = discriminatoryData.length;
  var nonDiscriminatoryCount = data.length - discriminatoryCount;
  var discriminatoryPercent = (100 * discriminatoryCount / data.length).toFixed(0) + "%";
  var nonDiscriminatoryPercent = (100 * nonDiscriminatoryCount / data.length).toFixed(0) + "%";
  var groupedData = [
    {
      label: "Discriminatory (" + discriminatoryPercent + ")",
      size: discriminatoryCount
    },
    {
      label: "Non-Discriminatory (" + nonDiscriminatoryPercent + ")",
      size: nonDiscriminatoryCount
    }
  ];
  d3plus.viz()
    .container("#viz")
    .data(groupedData)
    .type("pie")
    .id("label")
    .size("size")
    .draw();
}
$(document).ready(function(){
  loadData();
})
