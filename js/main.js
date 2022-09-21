let myCity = document.querySelector(".city span");
// get location
function city() {
    // get the current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            //get city name from lat and lon

            fetch(
                    "https://api.openweathermap.org/data/2.5/weather?lat=" +
                    lat +
                    "&lon=" +
                    lon +
                    "&appid=" +
                    "0e2f740fb3c72c42d7c19ef224fe684c"
                )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.name);
                    myCity.innerHTML = data.name;
                });
        });
    }
}
window.addEventListener("DOMContentLoaded", city());

//set o'clock
let times = document.querySelector(".hour");

setInterval(showTime, 1000);

function showTime() {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    am_pm = " AM";
    if (hour > 12) {
        hour -= 12;
        am_pm = " PM";
    }
    if (hour == 0) {
        hr = 12;
        am_pm = "AM";
    }
    // hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    let currentTime = hour + ":" + min + ":" + sec + am_pm;
    times.innerHTML = currentTime;
}
showTime();
let fjr = document.querySelector(".fajr .times");
let duhr = document.querySelector(".duhr .times");
let asr = document.querySelector(".asr .times");
let mgrb = document.querySelector(".maghrib .times");
let isha = document.querySelector(".isha .times");
// get times of  prayer
function getTimes() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    // console.log(year, month + 1, day);
    let calender = document.querySelector(".normal");
    let hijri = document.querySelector(".hijri");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            //get city name from lat and lon

            fetch(
                    "http://api.aladhan.com/v1/calendar?latitude=" +
                    lat +
                    "&longitude=" +
                    lon +
                    "&method=8&month=" +
                    month +
                    "&year=" +
                    year
                )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.data[day - 1].timings);
                    //date
                    calender.innerHTML = data.data[day - 1].date.readable;
                    hijri.innerHTML =
                        data.data[day - 1].date.hijri.day +
                        " " +
                        data.data[day - 1].date.hijri.year +
                        " " +
                        data.data[day - 1].date.hijri.month.ar;
                    //fajer
                    let fajr = data.data[day - 1].timings.Fajr;
                    fjr.innerHTML = fajr.slice(0, fajr.length - 5) + " AM";
                    //dhur
                    let dhr = data.data[day - 1].timings.Dhuhr;
                    duhr.innerHTML = dhr.slice(0, dhr.length - 5) + " PM";
                    // assur
                    let asur = data.data[day - 1].timings.Asr;
                    asr.innerHTML = asur.slice(0, asur.length - 5) + " PM";
                    //mugrib
                    let magrb = data.data[day - 1].timings.Maghrib;
                    mgrb.innerHTML = magrb.slice(0, magrb.length - 5) + " PM";
                    //ishaa
                    let ishaa = data.data[day - 1].timings.Isha;
                    isha.innerHTML = ishaa.slice(0, ishaa.length - 5) + " PM";
                    //next pray
                    function next() {
                        let time = new Date();
                        let hour = time.getHours();
                        let min = time.getMinutes();
                        let sec = time.getSeconds();
                        let one = fajr.slice(0, fajr.length - 5);
                        let two = dhr.slice(0, fajr.length - 5);
                        let three = asur.slice(0, fajr.length - 5);
                        let four = magrb.slice(0, fajr.length - 5);
                        let five = ishaa.slice(0, fajr.length - 5);
                        let currentTimeer = hour + min;
                        console.log(currentTimeer);
                        console.log("================================================");
                        let array = [one, two, three, four, five];
                        for (let i = 0; i < array.length; i++) {
                            amer = array[i].replace(":", "");
                            console.log(amer);
                            if (array[i] > currentTimeer) {}
                        }
                    }
                    next();
                });
        });
    }
}
window.addEventListener("DOMContentLoaded", getTimes());

function next(data, day) {
    // let fajr = data.data[day - 1].timings.Fajr;
    // fjr.innerHTML = fajr.slice(0, fajr.length - 5);
    // //dhur
    // let dhr = data.data[day - 1].timings.Dhuhr;
    // duhr.innerHTML = dhr.slice(0, dhr.length - 5);
    // assur
    // let asur = data.data[day - 1].timings.Asr;
    // asur = asur.slice(0, asur.length - 5);
    // console.log(data);
    //mugrib
    // let magrb = data.data[day - 1].timings.Maghrib;
    // mgrb.innerHTML = fajr.slice(0, magrb.length - 5);
    // //ishaa
    // let ishaa = data.data[day - 1].timings.Isha;
    // isha.innerHTML = ishaa.slice(0, ishaa.length - 5);
}