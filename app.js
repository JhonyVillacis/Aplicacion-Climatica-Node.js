const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener el clima',
        demand: true
    }
}).argv;


let getInfo = async(direccion) => {

    try {

        let coors = await lugar.getLugarLatLng(direccion);
        let temp = await clima.getClima(coors.lat, coors.lng);

        return `El clima en ${ coors.direccion } es el siguiente:\nTemperatura: ${ temp.temp } °C \nPresion: ${ temp.pres } hPa \nHumedad: ${ temp.hum } % \nEstado: ${ temp.est } \nVelocidad del Viento: ${ temp.windspeed } m/s \nAngulo del Viento: ${ temp.windangulo } ° \nLatitud: ${ coors.lat } \nLongitud: ${ coors.lng } \n`;

    } catch (e) {
        return `No se pudo determinar el clima en ${ direccion }`;
    }

}


getInfo(argv.direccion)
    .then(mensaje => console.log(mensaje))
    .catch(e => console.log(e));