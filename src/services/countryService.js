import { instance } from './radioService';

const apiEndpoint =
  "https://30-000-radio-stations-and-music-charts.p.rapidapi.com/rapidapi";


export function getCountry(){
    return instance.get(apiEndpoint +'?countries=');
}