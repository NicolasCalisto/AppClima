async function searchForNewPlace() {
await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=ab19d928ad6f4d12ab013014222408&q=${
    newLocation.value.trim() === "" ? "Recife" : newLocation.value.trim()
    }&days=7&aqi=yes&alerts=yes`
)
    .then((data) => data.json())
    .then((allInfo) => weatherInfo(allInfo))
    .catch((error) => console.log("A small error has ocurred.", error));
}

searchForNewPlace();

localInput.addEventListener("submit", prDefault);

async function prDefault(e) {
e.preventDefault();
await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=${
    newLocation.value.trim() === "" ? "Recife" : newLocation.value.trim()
    }&days=7&aqi=yes&alerts=yes`
)
    .then((data) => data.json())
    .then((allInfo) => weatherInfo(allInfo))
    .catch((error) => console.log("A small error has ocurred.", error));
newLocation.value = "";
}

let weatherInfo = (allInfo) => {
    // Date
  
    var meses = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
  
    
    let crDate = allInfo.current.last_updated;
  
    let dayIndex = new Date(
      `${
        meses[parseInt(crDate.slice(5, 7) - 1)]
      } ${allInfo.current.last_updated.slice(8, 10)}, ${crDate.slice(
        0,
        4
      )} ${crDate.slice(-5)}`
    );
  
    var dayIndexName = dayIndex.toString().slice(0, 3).trim();
    
    // Day name
  
    switch (dayIndexName) {
      case "Mon":
        dayTime.innerText = "Segunda";
        break;
      case "Tue":
        dayTime.innerText = "Terça";
        break;
      case "Wed":
        dayTime.innerText = "Quarta";
        break;
      case "Thu":
        dayTime.innerText = "Quinta";
        break;
      case "Fri":
        dayTime.innerText = "Sexta";
        break;
      case "Sat":
        dayTime.innerText = "Sábado";
        break;
      case "Sun":
        dayTime.innerText = "Domingo";
        break;
      default:
        dayTime.innerText = "";
    }
  
    dataAtual.innerText = 
      `${crDate.slice(8, 10)} ${
        meses[parseInt(crDate.slice(5, 7) - 1)]} ${
          crDate.slice(0, 4)}`;
      nomeCidade.innerText = `${allInfo.location.name}, ${allInfo.location.country}`;
   
  
    // // icons
  
    mainIcon.setAttribute("src", `${allInfo.current.condition.icon}`);
  
    // temperature
  
    temperatura.innerText = allInfo.current.temp_c + "°C";
    // let iconData = allInfo.current.condition.text;
    //weatherCondition.innerText = iconData; // descrição do tempo
  
    // pressure & humidity & wind
  
    pressao.innerText = allInfo.current.pressure_mb + " hPa";
    humidade.innerText = allInfo.current.humidity + " %";
    vento.innerText = allInfo.current.wind_kph + " km/h";
  
    //hora

    // hora.innerText = allInfo.current.last_updated;

  };