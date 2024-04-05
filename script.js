let mykey = "d5e7854d07a92a637c401978878f4915";
let mykey2 = "at_Vo7aie4UySYciAYoeGNHBTv7spv00";
let div = document.querySelector(".main");
drawinput();

window.addEventListener("load", () => nav());

async function nav2() {
  try {
    const API2 = `https://geo.ipify.org/api/v2/country,city?apiKey=${mykey2}`;
    let coord = await promise(API2);
    let lat = coord.location.lat;
    let lon = coord.location.lng;
    drawweather(lat, lon);
  } catch (err) {
    console.log();
    drawerr(err.message);
  }
}

function nav() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      drawweather(lat, lon);
    },
    (err) => {
      nav2();
    }
  );
}

async function promise(API) {
  try {
    let res = await fetch(API);
    console.log(res);
    if (res.ok != true) {
      throw new Error(res.status);
    }
    return res.json();
  } catch (err) {
    drawerr(err);
  }
}

async function drawweather(lat, lon) {
  console.log(lat, lon);
  let input = document.querySelector("input");
  const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&q=${input.value}&appid=${mykey}&units=metric`;
  console.log(API);
  let arr = promise(API);
  arr = await arr;
  console.log(arr);
  let tem = arr.main.temp;
  tem = Math.ceil(tem);
  div.innerHTML = `
  <p class="temp">${tem}°C</p>
  <p class="weather">${arr.weather[0].main} in ${arr.name}</p>
  <button class="change">Change city</button>
  `;
  // console.log(arr);

  let button = div.querySelector(".change");
  button.addEventListener("click", function () {
    drawinput();
  });
}

function drawinput() {
  div.innerHTML = `
    <div class="main">
        <form>
          <input class="text" />
          <button class="find">Find</button>
        </form>
      </div>
    `;

  let form = document.querySelector("form");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    drawweather();
  });
}

function drawerr(err) {
  div.innerHTML = `
  <p class="ops">Ooops. Something went wrong.</p>
  <p class="err">${err}</p>
  <button class="again">Try again</button>
  `;
  let buttonagain = div.querySelector(".again");
  buttonagain.addEventListener("click", function () {
    drawinput();
  });
}
