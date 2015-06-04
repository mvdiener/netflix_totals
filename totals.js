var xmlhttp = new XMLHttpRequest();
var url = "http://www.netflix.com/WiMovie/70153393?trkid=13573466&actionMethod=seasonDetails&seasonId=70020061&seasonKind=ELECTRONIC";

// season 1 70020061
// season 2 70040542
// season 3 70047013

xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var data = JSON.parse(xmlhttp.responseText);
  }
  return data;
}

xmlhttp.open("GET", url, true);
xmlhttp.send();

var formatted = xmlhttp.responseText.replace(/\\/g,"");
var div = document.createElement('div');
div.innerHTML = formatted;
var episodeArray = div.getElementsByClassName("episodeList")[0].getElementsByClassName("mini-progress-bar");
var progress = episodeArray[0].children[0].outerHTML;

// no mini-progress-bar on episodes that haven't been watched yet
// need a way to figure out the total number of episodes without relying on progress bar

var getTotals = function(json) {

}
