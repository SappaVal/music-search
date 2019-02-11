import { get } from 'axios';
let BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

export default function(options, callback){
    if(!options.apiKey)
    {
        throw new Error("Erreur : pas de clé API Youtube");
    }

    let params = {
        part : 'snippet',
        key : options.apiKey,
        q: options.term + " backing track",
        maxResults : (options.items) ? options.items : 5,
        type : 'video',
        videoCategoryId : 10

    };

    get(BASE_URL, { params }).then(response => {
        if(callback)
        {
            callback(response.data.items)
        }
    }).catch(error => console.error(error));
}