
// season 1 70020061
// season 2 70040542
// season 3 70047013

// no mini-progress-bar on episodes that haven't been watched yet
// need a way to figure out the total number of episodes without relying on progress bar
// if an episode has been watched or has progress, there is a span with class="progress"

// get jQuery loaded in console
var script = document.createElement('script');script.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";document.getElementsByTagName('head')[0].appendChild(script);


$(function(){

  // get array of season ids
  var getSeasonIds = $("#seasonsNav").find("a").map(function(){return $(this).data("vid")});

  // make ajax call to get json for each season
  var seasonArrayJSON = [];

  // set up all the ajax calls that will populate season array of json objects
  for(var i=0; i < getSeasonIds.length; i++) {
      $.ajax({
          url : "http://www.netflix.com/WiMovie/70153393?trkid=13573466&actionMethod=seasonDetails&seasonId=" + getSeasonIds[i] + "&seasonKind=ELECTRONIC"
      }).success(function(m) {
          seasonArrayJSON.push(m);
      });
  };

  // when all ajax calls are complete, run the following function
  $.when.apply($, seasonArrayJSON).then(processAllSeasons(seasonArrayJSON));

  // function to process all seasons
  var percentWatchedArray = []
  var processAllSeasons = function(seasonArrayJSON){
    $.each(seasonArrayJSON, function (index, value){
      var episodeList = $($.parseHTML(value.html)).find(".episodeList")[0];
      var episodeCount = episodeList.children.length;
      var episodeArray = $(episodeList).find(".mini-progress-bar");
      percentWatchedArray.push(seasonPercentWatched(episodeArray, episodeCount))
    });
  };

  // get percent watched of a single season
  var seasonPercentWatched = function(episodeArray, episodeCount) {
    var totals = 0
    for (var i = episodeArray.length - 1; i >= 0; i--) {
      var progress = episodeArray[i].children[0].outerHTML;
      var percentWatched = parseInt(progress.match(/\d+/)[0]);
      totals += percentWatched
    };
    return (totals / episodeCount).toFixed(2);
  };

// var formatted = xmlhttp.responseText.replace(/\\/g,"");

// var div = document.createElement('div');
// div.innerHTML = formatted;
// var episodeList = div.getElementsByClassName("episodeList")[0]
// var episodeCount = episodeList.children.length;
// var episodeArray = episodeList.getElementsByClassName("mini-progress-bar");

// var totalPercent = seasonPercentWatched(episodeArray, episodeCount);

});