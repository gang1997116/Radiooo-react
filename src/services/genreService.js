import axios from "axios";

const apiEndpoint =
  "https://30-000-radio-stations-and-music-charts.p.rapidapi.com/rapidapi";
export const instance = axios.create({
  baseURL: apiEndpoint,
  headers: {
    "x-rapidapi-host": "30-000-radio-stations-and-music-charts.p.rapidapi.com/",
    "x-rapidapi-key": "4c4c703187msh7ceb377e6edd80fp1e8baajsn13dbcb0375ac",
  },
});

export function getGenres(){
    return instance.get(apiEndpoint +'?categories=1');
}