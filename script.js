let mykey = "d5e7854d07a92a637c401978878f4915";
let div = document.querySelector(".main");
drawinput();

async function promise(API) {
  try {
    let res = await fetch(API);
    if (res.ok != true) {
      throw new Error(res.status);
    }
    return res.json();
  } catch (err) {
    drawerr(err);
  }
}

async function drawweather() {
  let input = document.querySelector("input");
  const API = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${mykey}&units=metric`;
  let arr = promise(API);
  arr = await arr;
  div.innerHTML = `
  <p class="temp">${arr.main.temp}°C</p>
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
