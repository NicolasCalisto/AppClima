const app = document.querySelector('.clima-app');
const temperatura = document.querySelector('.temperatura');
const dataOutput = document.querySelector('.data');
const horaOutput = document.querySelector('.hora');
const condicaoOutput = document.querySelector('.condicao');
const nomeOutput = document.querySelector('.nome');
const icone = document.querySelector('.icone');
const nuvemOutput = document.querySelector('.nuvem');
const humidadeOutput = document.querySelector('.humidade');
const ventoOutput = document.querySelector('.vento');
const form = document.getElementById('.localInput');
const pesquisa = document.querySelector('.pesquisa');
const btn = document.querySelector('.submit');
const cidades = document.querySelectorAll('.cidade');

let localInput = "Recife";

cidades.forEach((cidade) => {
    cidade.addEventListener('click', (e) => {
        localInput = e.target.innerHTML;
        fetchWeatherData();
        
        app.style.opacity = "0";
    });
})

form.addEventListener('submit', (e) => {
    if(pesquisa.ariaValueMax.length == 0) {
        alert('Escreva o nome de uma cidade');
    } else {
        localInput = pesquisa.value;
        fetchWeatherData();
        pesquisa.value = "";
        app.style.opacity = "0";
    }

    e.preventDefault();
});

function diaDaSemana(dia, mes, ano) {
    const dia = [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
    ];
    return dia[new Date(`${dia}/${mes}/${ano}`).getDay()];
}

function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1current.json?key=ab19d928ad6f4d12ab013014222408=${localInput}`)
    .then(response => response.json())
    .then(data => {
        console.log("teste", data)
        temperatura.innerHTML = data.current.temp_c + "&#176;";
        condicaoOutput.innerHTML = data.current.condicao.text;
        const data = data.location.localtime;
        const y = parseInt(data.substr(0, 4));
        const m = parseInt(data.substr(5, 2));
        const d = parseInt(data.substr(8, 2));
        const hora = data.substr(11);

        dataOutput.innerHTML = `${diaDaSemana(d, m, y)} ${d}, ${m}, ${y}`
        horaOutput.innerHTML = hora;
        nomeOutput.innerHTML = data.location.name;

        const iconeId = data.current.condicao.icone.substr("//cnd.weatherapi.com/weather/64x64/".length);
        icone.src = "./img/" + iconeId;

        nuvemOutput.innerHTML = data.current.cloud + "%";
        humidadeOutput.innerHTML = data.current.humidity + "%";
        ventoOutput.innerHTML = data.current.wind_kph + "km/h"

        let horaDoDia = "dia";
        const code = data.current.condicao.code;

        if(!data.current.is_day) {
            horaDoDia = "noite";
        }

        if(code == 1000) {
            app.style.backgroundImage = `url(./img/${horaDoDia}/moon.jpg)`
            btn.style.background = "#e5ba92";
        }
    })
}