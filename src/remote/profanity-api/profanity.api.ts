export async function censor(text:string){
    let censoredText:string;

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
        //return text;
    });

    //return censoredText;
}