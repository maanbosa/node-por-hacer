//const argv = require('yargs').argv;

const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'actualizar':
        console.log('actualizar una tarea');

        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);

        break;

    case 'listar':
        console.log('listar todas las tareas');
        let listado = porHacer.getListado();

        for (let tarea of listado) {
            console.log("Tareas por hacer");
            console.log(tarea.descripcion);
            console.log(tarea.completado);
            console.log('=================');
        }
        break;

    case 'borrar':
        console.log('eliminar una tarea de la lista de tareas');

        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);

        break;

    default:
        console.log('comando no valido');

}