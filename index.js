const searchBtn = document.getElementById('search-btn');
const input = document.getElementById('input');

const date = document.getElementById('date');
 const temp = document.getElementById('temp');
  const img = document.getElementById('img');
 const city = document.getElementById('city');
  const weather = document.getElementById('weather');
 const humidity= document.getElementById('humidity');
 const pressure = document.getElementById('pressure');
const getLocation = document.getElementById('location-btn')
const desc = document.getElementById('description');
const section = document.getElementById('info')
const msg = document.getElementById('msg')
const errorMsg = document.getElementById('error-msg')


const w = document.getElementById('w')
const  h= document.getElementById('h')
const a = document.getElementById('a')







 const d = new Date()
 
 
 
const days= ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months =  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

 date.innerHTML =  days[d.getDay()] +', '+ d.getDate()+ " " + months[d.getMonth()]


getLocation.addEventListener('click',()=>{
    myLocation();
})



var lat,long;

 function myLocation(){
    if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition(position=>{
     long = position.coords.longitude;
     lat = position.coords.latitude;
     fetchApi(lat,long)
       errorMsg.style.display='none';
    })

} else if(!navigator.geolocation){
   errorMsg.innerHTML ='PLEASE CHECK YOUR INTERNET CONNECTION'
      console.log('error')
    }
}








var APIKEY = 'c5ce977f6e4993a2414c833cea00cac2'

async function fetchApi(){
  
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${long}&appid=${APIKEY}`);
        const data = await res.json();
       
        console.log(data)

        temp.innerHTML= (data.main.temp).toFixed() +'&#8451'
        city.innerHTML = data.name.toUpperCase()
        weather.innerHTML = data.weather[0].main.toUpperCase()
        desc.innerHTML = data.weather[0].description.toUpperCase()
        humidity.innerHTML = data.main.humidity
        pressure.innerHTML = data.main.pressure
        w.innerHTML = 'WEATHER'
        h.innerHTML = 'HUMIDITY'
        a.innerHTML = 'AIRPRESSURE'

}


searchBtn.addEventListener('click',searchLocation)



async function searchLocation(){

if(input.value == ""){
     console.log('enter a city')
     msg.innerHTML= 'ENTER A CITY NAME'
        msg.style.display = 'block'
     setTimeout(()=>{
  msg.style.display = 'none'
     },1000)


}else {
   msg.innerHTML= 'LOADING'
      msg.style.display = 'block'
     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&lat=${lat}&lon=${long}&appid=${APIKEY}`)
     .then((res)=>res.json())
     .then((data)=>{console.log(data)
      msg.style.display = 'none';
       errorMsg.style.display='none' ;  
        temp.innerHTML= (data.main.temp).toFixed() + '&#8451';
        city.innerHTML = data.name.toUpperCase()
        weather.innerHTML = data.weather[0].main.toUpperCase()
        humidity.innerHTML = data.main.humidity
        pressure.innerHTML = data.main.pressure
        desc.innerHTML = data.weather[0].description.toUpperCase()
          w.innerHTML = 'WEATHER'
        h.innerHTML = 'HUMIDITY'
        a.innerHTML = 'AIRPRESSURE'
    })
    .catch(()=>{
      errorMsg.style.display="block"
      msg.innerHTML= 'CITY NOT FOUND'
      msg.style.display = 'block'
      errorMsg.innerHTML ="ENTER A CITY"
      setTimeout(()=>{
      msg.style.display = 'none'
     },1000)
     

    })
      
      
        
    }
    input.value = ""
}


input.addEventListener('keyup', (e)=>{
if(e.keyCode==13){
e.preventDefault();
searchLocation()

}

})
