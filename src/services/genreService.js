const proxyUrl = "https://secure-earth-03984.herokuapp.com/";
const key = "k=eaCawoEg1P6qI2eb";

async function getData(targetUrl) {
  const myJson = await fetch(proxyUrl + targetUrl);
  const data = await myJson.json();
  return data;
}
export async function getGenres() {
  var targetUrl = "http://api.shoutcast.com/genre/primary?f=json&" + key;
  const data = await getData(targetUrl);
  const genre = data.response.data.genrelist.genre;
  return genre;
}
export async function getGenreById(genreId) {
  var targetUrl = `http://api.shoutcast.com/genre/secondary?id=${genreId}&f=json&` + key;
  const data = await getData(targetUrl);
  const genre = data.response.data.genrelist.genre.name;
  return genre;
}

export async function getSecondGenres(parentId){
  let targetUrl=`http://api.shoutcast.com/genre/secondary?parentid=${parentId}&f=json&`+key;
  const data = await getData(targetUrl);
  const genre = data.response.data.genrelist.genre;
  return genre;
}
export async function getAgeGenres() {
  var targetUrl =
    "http://api.shoutcast.com/genre/secondary?parentid=212&f=json&" + key;
  const data = await getData(targetUrl);
  const ageGenre = data.response.data.genrelist.genre;
  return ageGenre;
}
export async function getStations(genreId) {
  let targetUrl =
    `http://api.shoutcast.com/station/advancedsearch?genre_id=${genreId}&f=json&` +
    key;
  const data = await getData(targetUrl);
  const stations = data.response.data.stationlist.station;
  return stations;
}
