'use strict';

/** Classe Sensor */
/**
 * @class Representa um dado de um Sensor
 * @constructs Sensor
 * @property {string} name - nome do Local.
 * @property {string} date - data do envio dos dados do Sensor.
 * @property {string} sensorId - ID do Sensor.
 * @property {string} value - valor do Sensor.
 */
function Sensor(name, date, sensorId, value) {
    this.name = name;
    this.date = date;
    this.sensorId = sensorId;
    this.value = value;
}


/** Métodos de Instância */
/**
 * Representação da informação de um dado de um Sensor sob a forma do código HTML para construir um artigo.
 * @returns {string} representação da informação de um sensor sob a forma do código HTML para construir um artigo.
 */
Sensor.prototype.toString = function () {
    let resultado = "<article>";
    let count = 0;
    Object.values(this).forEach(valor => {
        if(count === 0){
            resultado += "<h2>Name: " + valor + "</h2>";
        }
        else if(count === 1){
            resultado += "<p class=\"subtitle\">Date: " + valor + "</p>";
        }
        else if(count === 2){
            resultado += "<p>Sensor ID: " + valor + "</p>";
        }
        else if(count === 3){
            resultado += "<p>Value: " + valor + "</p>";
        }
        count++;
    })
    return resultado += "</article>";
};

/**
 * Função que tem como principal objetivo solicitar ao servidor NODE.JS o recurso idea através do verbo GET,
 * usando pedidos assincronos e JSON.
 * Coloca as ideias no main com id="ideias".
 * Função executada no 'onload' do iframe.
 */
function getSensors() {
    let sensores = "";

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', '/sensors');
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            this.response.sensors.forEach(sensor => {
                //let sensorObj = new Sensor(sensor.name, sensor.date, sensor.sensorId, sensor.value);
                let sensorObj = new Sensor(sensor.id, sensor.local, sensor.depart, sensor.updated_at, sensor.last_write_at, sensor.sensors);
                sensores += sensorObj;
            });
            document.getElementById("sensors").innerHTML = sensores;
        }
    };
    xhr.send();
};
