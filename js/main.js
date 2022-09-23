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
                    // console.log(data.name);
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
        hour = 12;
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
let sunrise = document.querySelector(".sun-rise .times");
let duhr = document.querySelector(".duhr .times");
let asr = document.querySelector(".asr .times");
let mgrb = document.querySelector(".maghrib .times");
let isha = document.querySelector(".isha .times");
// get times of  prayers
function getTimes() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
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
                    1 +
                    "&year=" +
                    year
                )
                .then((response) => response.json())
                .then((data) => {
                    next(data);
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
                    //sun-rise
                    let sun = data.data[day - 1].timings.Sunrise;
                    sunrise.innerHTML = sun.slice(0, sun.length - 5) + " AM";
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
                });
        });
    }
}
window.addEventListener("DOMContentLoaded", getTimes());
//nex pray time
function next(data) {
    let time = new Date(Date.now());
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    am_pm = " AM";
    if (hour > 12) {
        hour -= 12;
        am_pm = " PM";
    }
    if (hour == 0) {
        hour = 12;
        am_pm = "AM";
    }
    //fajer
    let fajr = data.data[day - 1].timings.Fajr;
    fjr.innerHTML = fajr.slice(0, fajr.length - 5) + " AM";
    //sun-rise
    let sun = data.data[day - 1].timings.Sunrise;
    sunrise.innerHTML = sun.slice(0, sun.length - 5) + " AM";
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
    min = min < 10 ? "0" + min : min;
    hour = hour < 10 ? "0" + hour : hour;
    let one = fajr.slice(0, fajr.length - 6);
    let two = sun.slice(0, sun.length - 6);
    let three = dhr.slice(0, fajr.length - 6);
    let four = asur.slice(0, fajr.length - 6);
    let five = magrb.slice(0, fajr.length - 6);
    let six = ishaa.slice(0, fajr.length - 6);
    //currentTime
    let currentTimeer = hour + ":" + min + ":" + sec;
    let array = [one, two, three, four, five, six];
    let divArr = [fjr, sunrise, duhr, asr, mgrb, isha];
    for (let i = 0; i < array.length; i++) {
        //next time
        let timeStr1 = array[i].replace(":", "");
        //current time
        let timeStr2 = currentTimeer.replace(":", "").replace(":", "").slice(0, -2);

        if (timeStr1 > timeStr2) {
            // console.log(parseInt(timeStr1.replace(regex, ""), 10));
            var x = setInterval(function() {
                let nextTime = `${year} ${month} ${day} ${array[i]}`;
                let d1 = new Date(nextTime);
                var now = new Date();

                var t = d1.getTime() - now.getTime();
                hour = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                min = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
                var sec = Math.floor((t % (1000 * 60)) / 1000);
                document
                    .querySelectorAll("#times")
                    .forEach(
                        (element) =>
                        (element.innerHTML = hour + "h " + min + "m " + sec + "s ")
                    );
            }, 1000);
            let num = timeStr1.replace(":", "");
            divArr.forEach((e) => {
                let element = e.innerHTML.replace(":", "");
                element = element.slice(0, element.length - 4);
                if (Number(element) === Number(num)) {
                    e.parentNode.classList.add("active");
                }
            });
            break;
        }
    }
}