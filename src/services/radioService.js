import http from './httpService';

const apiEndpoint = '/movies';

function RadioUrl(id){
    return `${apiEndpoint}/${id}`
}
export function getRadios(){
    return http.get(apiEndpoint)
}
export function getRadio(radioId){
    return http.get(RadioUrl(radioId));
}

export function saveRadio(radio){
    if(radio._id){
        const body={...radio};
        delete body._id;
        return http.put(RadioUrl(radio._id),body);
    }
    return http.post(apiEndpoint,radio);
}

export function deleteRadio(radioId){
    return http.delete(RadioUrl(radioId));
}
