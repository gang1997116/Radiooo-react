export function parsePlay(){
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://secure-earth-03984.herokuapp.com/http://yp.shoutcast.com/sbin/tunein-station.m3u?id=99473570");
xhr.overrideMimeType("audio/x-mpegurl"); // Needed, see below.
xhr.onload = ()=>{
  var parsers = require("playlist-parser");
  var M3U = parsers.M3U;
  var playlist = M3U.parse(xhr.response);
  return playlist;
};
xhr.send();

}
