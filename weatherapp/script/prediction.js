const key ='key';

const getWeatherCon=async(id)=>{
    const url ='http://dataservice.accuweather.com/currentconditions/v1/';

    const query = `${id}?apikey=${key}`;
    const res = await fetch(url+query);
    const data = await res.json();
    return data[0];

};

const getCity=async(konum)=>{
    const url ='http://dataservice.accuweather.com/locations/v1/cities/search';

    const query = `?apikey=${key}&q=${konum}`;

    const res = await fetch(url+query);
    const data = await res.json();
    return data[0];


};
