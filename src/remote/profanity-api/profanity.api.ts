
// Takes in a string, ands sends it to an external api to check for profanity. 
// The censored content is then returned to the user.
//
// Only fifty requests per day are allowed with this API. If more traffic is needed in 
// the future, another API should be used.
// If the number of requests is exceeded, the string should be returned as-is.
//
// Found on https://rapidapi.com/collection/profanity-filter.
//

export async function censor(text:string){
    const axios = require("axios");

    const encodedParams = new URLSearchParams();
    encodedParams.append("content", text);
    encodedParams.append("censor-character", "*");

    const options = {
    method: 'POST',
    url: 'https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter',
    headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '6ab9d31f4bmsh73cf396fd269686p184099jsne897bbc0c215',
            'X-RapidAPI-Host': 'neutrinoapi-bad-word-filter.p.rapidapi.com'
        },
        data: encodedParams
    };

    return await axios.request(options).then(function (response:any) {
	    console.log(response.data);
        return response.data["censored-content"];
    }).catch(function (error:any) {
	    console.error(error);
        return text;
    });
}