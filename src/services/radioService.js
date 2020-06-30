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

function RadioUrl(id){
    return `${apiEndpoint}?id=${id}`
}
export function getRadios(country,keyword,genre){
    return instance.get(apiEndpoint +
        `?country=${country}&keyword=${keyword}&genre=${genre}`);
}
export function getRadio(radioId){
    return instance.get(RadioUrl(radioId));
}

// export function saveRadio(radio){
//     if(radio.i){
//         const body={...radio};
//         delete body.i;
//         return http.put(RadioUrl(radio.i),body);
//     }
//     return http.post(apiEndpoint,radio);
// }

// export function deleteRadio(radioId){
//     return http.delete(RadioUrl(radioId));
// }
