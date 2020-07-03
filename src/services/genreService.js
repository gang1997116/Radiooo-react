import { instance } from './radioService';

const apiEndpoint =
  "https://30-000-radio-stations-and-music-charts.p.rapidapi.com/rapidapi";


export function getGenres(){
    return instance.get(apiEndpoint +'?categories=1');
}