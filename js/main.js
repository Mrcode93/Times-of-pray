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
let container = document.querySelector(".container");
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
                    //date
                    calender.innerHTML = data.data[day - 1].date.readable;
                    hijri.innerHTML = +data.data[day - 1].date.hijri.day +
                        1 +
                        " " +
                        data.data[day - 1].date.hijri.year +
                        " " +
                        data.data[day - 1].date.hijri.month.ar;
                    let array = [];
                    //fajer
                    let names = document.querySelectorAll(".box .times");

                    let times = data.data[day - 1].timings;

                    //!================================================================
                    for (let i in times) {
                        array.push(times[i]);
                    }
                    array = [...new Set(array)];
                    array = array.slice(0, -4);
                    for (let x = 0; x < array.length; x++) {
                        array[x] = array[x].replace(" (+03)", "");
                        for (let i = 0; i < names.length; i++) {
                            if (x == i) {
                                names[i].innerHTML = array[x];
                            }
                        }
                    }
                    line(array);
                    setNextPrayer(names);
                });
        });
    }
}
window.addEventListener("DOMContentLoaded", getTimes());

//line width
let row = document.querySelector(".row .hour");
let amer = document.querySelectorAll(".now");

function line(array) {
    let time = new Date();
    let hh = time.getHours();
    let mm = time.getMinutes();
    mm = mm < 10 ? "0" + mm : mm;
    let tt = hh + "" + mm;
    tt = Math.floor((Number((tt / 10) * 3) / 630) * 100);
    if (tt >= 100) {
        tt = 0;
    }
    row.style.cssText = `width: ${tt}%`;
    for (let e = 0; e < array.length; e++) {
        let x = array[e].replace(":", "");
        x = (((x / 10) * 3) / 630) * 100;
        x = Math.round(x);
        for (let i = 0; i < amer.length; i++) {
            if (e == i) {
                amer[i].style.cssText = `right: ${x}%; visibility: visible;`;
                amer[i].classList.add("active");
                if (tt >= x) {
                    amer[i].classList.add("done");
                }
            }
        }
    }
}

//next step
function setNextPrayer(names) {
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth();
    let day = time.getDate();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    min = min < 10 ? "0" + min : min;
    hour = hour < 10 ? "0" + hour : hour;
    var currentTime = hour + ":" + min;

    var nextPrayer;
    for (var i = 0; i < names.length; i++) {
        // names[i] = names[i].innerHTML;

        if (currentTime <= names[0].innerHTML) nextPrayer = names[0];
        else if (currentTime <= names[1].innerHTML) nextPrayer = names[1];
        else if (currentTime <= names[2].innerHTML) nextPrayer = names[2];
        else if (currentTime <= names[3].innerHTML) nextPrayer = names[3];
        else if (currentTime <= names[4].innerHTML) nextPrayer = names[4];
        else nextPrayer = names[5];
    }

    // if (currentTime <= fajerTime) nextPrayer = "fajr";
    // else if (currentTime <= eshragTime) nextPrayer = "eshrag";
    // else if (currentTime <= duhurTime) nextPrayer = "duhur";
    // else if (currentTime <= asrTime) nextPrayer = "asr";
    // else if (currentTime <= maghribTime) nextPrayer = "maghrib";
    // else nextPrayer = "isha";

    let nextTimer = nextPrayer.innerHTML;

    let mainDiv = nextPrayer.parentNode;
    let container = document.querySelectorAll(".box");
    mainDiv.classList.add("next");
    container.forEach((e) => {
        if (e.classList.contains("next")) {
            e.classList.add("amer");
        }
    });

    let amer = document.querySelector(".amer #next");

    x = setInterval(function() {
        let d1 = new Date(`${year} ${month + 1} ${day} ${nextTimer}:00`);
        var now = new Date();

        var t = d1.getTime() - now.getTime();
        hour = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        min = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        sec = Math.floor((t % (1000 * 60)) / 1000);
        min = min < 10 ? "0" + min : min;
        hour = hour < 10 ? "0" + hour : hour;
        sec = sec < 10 ? "0" + sec : sec;
        amer.innerHTML = ` الوقت المتبقي:
        ${hour}:${min}:${sec}`;
        if (x === 0) {
            window.location.reload();
        }
    }, 1000);
}