const form = document.querySelector('form');
const info = document.querySelector('.info');
const card = document.querySelector('.card');
const nightnday = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const update= (data)=>{

    const {detailcity,weathercon} = data;

    info.innerHTML = `<div class="text-mute text-uppercase text-center info">
    <h1 class="my-3" style="color: #EDF5E1;">${detailcity.LocalizedName}</h1>
        <div class="my-3" style="color: #EDF5E1;">${weathercon.WeatherText}</div>
        <div class="display-4 my-4" style="color: #EDF5E1;">
        <span>${weathercon.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
        </div>
    </div>
    `;

    const iconSrc = `img/icons/${weathercon.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);

    console.log(weathercon.IsDayTime);    
    let timeSrc = weathercon.IsDayTime?'img/day.svg':'img/night.svg';

    nightnday.setAttribute('src',timeSrc);

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const city = form.city.value.trim();

    cityupdate(city).then(data=>{
        update(data)
    })
    
    form.reset();
    localStorage.setItem('city',city);
});

const cityupdate = async(city)=>{
    const detailcity = await getCity(city);
    const weathercon = await getWeatherCon(detailcity.Key);

    return{
        detailcity,
        weathercon,
    }
};

if(localStorage.getItem('city')){

    cityupdate(localStorage.getItem('city'))
    .then(data=>{
        update(data);
    });

}
