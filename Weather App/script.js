document.getElementById('location-form').addEventListener('submit', getWeather);

const apiKey = "24eac195b20e0250ccf878ba06ee0615";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; 

const searchBox = document.getElementById("location-input");
const searchBtn = document.getElementById("location-button");
const weatherIcon = document.querySelector(".weather-icon");


async function getWeather(e) {
  //Write you code logic here
  e.preventDefault();
  var city=searchBox.value;

  const response = await fetch(apiUrl + city +  `&appid=${apiKey}`);
  if(response.status == 404){
    document.querySelector(".error").style.display = "block";
    document.querySelector("#weather-data").style.display = "none";
    searchBox.value="";
  }else{
    var data = await response.json();

    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=data.main.temp + "°c";

    if(data.weather[0].main == "Clouds"){
       weatherIcon.src = "photos/clouds.png"; 
    }
    if(data.weather[0].main == "Rain"){
       weatherIcon.src = "photos/rainy-day.png"; 
    }
    if(data.weather[0].main == "Drizzle"){
       weatherIcon.src = "photos/drizzle.png"; 
    }
    if(data.weather[0].main == "Clear"){
       weatherIcon.src = "photos/sun (1).png"; 
    }
    if(data.weather[0].main == "Mist"){
       weatherIcon.src = "photos/cloud.png"; 
    }

  document.getElementById("weather-data").style.display = "block";
  document.querySelector(".error").style.display ="none";
  searchBox.value="";
  }
    

  // Error should be very specific
  // Error: Failed to fetch weather data,   should always fetch this error in case of any failure otherwise you test cases will get failed.
  

}

