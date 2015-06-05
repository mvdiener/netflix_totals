
// season 1 70020061
// season 2 70040542
// season 3 70047013

// xmlhttp.onreadystatechange = function() {
//   if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//     var data = JSON.parse(xmlhttp.responseText);
//   }
//   return data;
// }

var xmlhttp = new XMLHttpRequest();
var url = "http://www.netflix.com/WiMovie/70153393?trkid=13573466&actionMethod=seasonDetails&seasonId=70020061&seasonKind=ELECTRONIC";

xmlhttp.open("GET", url, true);
xmlhttp.send();

var formatted = xmlhttp.responseText.replace(/\\/g,"");

var div = document.createElement('div');
div.innerHTML = formatted;
var episodeList = div.getElementsByClassName("episodeList")[0]
var episodeCount = episodeList.children.length;
var episodeArray = episodeList.getElementsByClassName("mini-progress-bar");

var totalPercent = seasonPercentWatched(episodeArray, episodeCount);


// no mini-progress-bar on episodes that haven't been watched yet
// need a way to figure out the total number of episodes without relying on progress bar
// if an episode has been watched or has progress, there is a span with class="progress"

var seasonPercentWatched = function(episodeArray, episodeCount) {
  var totals = 0
  for (var i = episodeArray.length - 1; i >= 0; i--) {
    var progress = episodeArray[i].children[0].outerHTML;
    var percentWatched = parseInt(progress.match(/\d+/)[0]);
    totals += percentWatched
  };
  return (totals / episodeCount).toFixed(2);
};
