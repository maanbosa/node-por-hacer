// requireds
const fs = require('fs');

let listadoPorHacer = [];

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

};

// Crear una tarea
const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();
    return porHacer;
};

// Actualizar el estado de una tarea
const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

};

// Borrar una tarea
const borrar = (descripcion) => {
    cargarDB();

    // opcion a: usando el filter
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

    // opcion b: usando el index
    // let index = listadoPorHacer.findIndex(tarea => {
    //     return tarea.descricion === descripcion;
    // });

    // if (index > -0) {
    //     listadoPorHacer.pop(listadoPorHacer[index]);
    //     guardarDB();
    //     return true;
    // } else {
    //     return false;
    // }

};

// Obtener la lista de tareas
const getListado = () => {
    cargarDB();
    return listadoPorHacer;
};

// Guardar la lista de tareas en un archivo JSON
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    })
}


module.exports = {
    crear,
    actualizar,
    borrar,
    getListado
}