import { Asignatura } from "./clases/Asignatura.js";
import { Estudiante } from "./clases/Estudiante.js";
import { Direccion } from "./clases/Direccion.js";
import { listaEstudiantes } from "./clases/ListaEstudiantes.js";
import { listaAsignaturas } from "./clases/ListaAsignaturas.js";


//let lista = new listaEstudiantes(); // La lista se carga automáticamente desde localStorage

document.addEventListener('DOMContentLoaded', () => {
    console.log('subido');
    
    const agregarEstudianteBtn = document.getElementById('agregarEstudianteBtn');
    const eliminarEstudianteBtn = document.getElementById('eliminarEstudianteBtn');
    const matricularrEstudianteBtn = document.getElementById('matricularEstudianteBtn');
    const formularioAgregarEstudiante = document.getElementById('formularioAgregarEstudiante');
    const formularioEliminarEstudiante = document.getElementById('formularioEliminarEstudiante');
    const formularioMatricularEstudiante = document.getElementById('formularioMatricularEstudiante');
    const formularioDesatricularEstudiante = document.getElementById('formularioDesMatricularEstudiante');
    const nuevoEstudianteForm = document.getElementById('nuevoEstudianteForm');
    const nuevoCalifiacionForm = document.getElementById('aniadirCalificacionform');
    const eliminarEstudianteForm = document.getElementById('eliminarEstudianteForm');
    const cancelarForm = document.getElementById('cancelarForm');
    const resultadoContainer = document.getElementById('resultadoContainer');
    const formularioDesMatricularEstudiante = document.getElementById('formularioDesMatricularEstudiante');
    const formularioAniadirCalifiacion = document.getElementById('formularioaniadirCalifiacion');
    const formularioCalcularPromedio = document.getElementById('formulariocalcularPromedio');
    const formularioBuscarAsignaturas = document.getElementById('formulariobuscarAsignaturas');
    const formularioMostrarEstudiantes = document.getElementById('formularioMostrarEstudiantes');
    const formularioBuscarEstudiante = document.getElementById('formularioBuscarEstudiante');


    // Mostrar estudiantes al cargar la página
    mostrarEstudiantes();

    // Mostrar formulario de agregar estudiante
    agregarEstudianteBtn.addEventListener('click', () => {
        formularioAgregarEstudiante.classList.remove('hidden');
        formularioEliminarEstudiante.classList.add('hidden');
        document.getElementById('formularioMatricularEstudiante')?.classList.add('hidden');
    });


    // Mostrar formulario de eliminar estudiante
    eliminarEstudianteBtn.addEventListener('click', () => {
        formularioEliminarEstudiante.classList.remove('hidden');
        formularioAgregarEstudiante.classList.add('hidden');
        document.getElementById('formularioMatricularEstudiante')?.classList.add('hidden');
    });


    // Ocultar formulario de agregar estudiante
    const cancelarForms = document.querySelectorAll('#cancelarForm');

    cancelarForms.forEach(btn => {
        btn.addEventListener('click', () => {
            formularioAgregarEstudiante.classList.add('hidden');
            formularioEliminarEstudiante.classList.add('hidden');
            formularioMatricularEstudiante.classList.add('hidden');
            formularioDesMatricularEstudiante.classList.add('hidden');
            formularioAniadirCalifiacion.classList.add('hidden');
            formularioCalcularPromedio.classList.add('hidden');
            formularioBuscarAsignaturas.classList.add('hidden');
            formularioMostrarEstudiantes.classList.add('hidden');
            formularioBuscarEstudiante.classList.add('hidden');
        });
    });




    // Manejar el envío del formulario de agregar estudiante
    nuevoEstudianteForm.addEventListener('submit', (e) => {
        e.preventDefault();
    
        // Limpiar mensajes de error anteriores
        limpiarErrores();
    
        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const edad = parseInt(document.getElementById('edad').value.trim(), 10);
        const calle = document.getElementById('calle').value.trim();
        const numero = document.getElementById('numero').value.trim();
        const piso = document.getElementById('piso').value.trim(); // Opcional
        const codigoPostal = document.getElementById('codigoPostal').value.trim();
        const provincia = document.getElementById('provincia').value.trim();
        const localidad = document.getElementById('localidad').value.trim();
    
        let isValid = true;
    
        // Validar Nombre
        if (!nombre) {
            mostrarError('error-nombre', 'El nombre es obligatorio.');
            isValid = false;
        }
    
        // Validar Edad
        if (isNaN(edad) || edad <= 0) {
            mostrarError('error-edad', 'La edad debe ser un número válido mayor a 0.');
            isValid = false;
        }
    
        // Validar Calle
        if (!calle) {
            mostrarError('error-calle', 'La calle es obligatoria.');
            isValid = false;
        }
    
        // Validar Número
        if (!numero) {
            mostrarError('error-numero', 'El número es obligatorio.');
            isValid = false;
        }
    
        // Validar Código Postal
        if (!/^\d{5}$/.test(codigoPostal)) {
            mostrarError('error-codigoPostal', 'El código postal debe tener exactamente 5 números.');
            isValid = false;
        }
    
        // Validar Provincia
        if (!provincia) {
            mostrarError('error-provincia', 'La provincia es obligatoria.');
            isValid = false;
        }
    
        // Validar Localidad
        if (!localidad) {
            mostrarError('error-localidad', 'La localidad es obligatoria.');
            isValid = false;
        }
    
        // Si todas las validaciones pasan, proceder a crear el estudiante
        if (isValid) {
            try {
                // Crear la dirección y el estudiante
                const direccion = new Direccion(calle, numero, piso, codigoPostal, provincia, localidad);
                const nuevoEstudiante = new Estudiante(nombre, edad, direccion);
    
                // Agregar el estudiante a la lista
                listaEstudiantes.agregarEstudiante(nuevoEstudiante);
                listaEstudiantes.guardarEstudiantes(); // Guardar la lista en localStorage

                // Mostrar mensaje de éxito
                resultadoContainer.innerHTML = `<p>Estudiante ${nombre} agregado correctamente.</p>`;
    
                // Actualizar la lista de estudiantes
                mostrarEstudiantes();
    
                // Ocultar el formulario y limpiarlo
                formularioAgregarEstudiante.classList.add('hidden');
                nuevoEstudianteForm.reset();
            } catch (error) {
                alert(error.message);
            }
        }
    });
    

    // Manejar el envío del formulario de eliminar estudiante
    eliminarEstudianteForm.addEventListener('submit', (e) => {
        e.preventDefault();
    
        // Limpiar mensajes de error anteriores
        limpiarErrores();
    
        // Obtener el nombre del estudiante a eliminar
        const nombreEliminar = document.getElementById('nombreEliminar').value.trim();
    
        let isValid = true;
    
        // Validar Nombre
        if (!nombreEliminar) {
            mostrarError('error-nombreEliminar', 'El nombre del estudiante es obligatorio.');
            isValid = false;
        }
    
        // Si todas las validaciones pasan, proceder a eliminar el estudiante
        if (isValid) {
            // Eliminar el estudiante
            listaEstudiantes.eliminarEstudiante(nombreEliminar);
            listaEstudiantes.guardarEstudiantes(); // Guardar la lista en localStorage

            // Mostrar mensaje de éxito
            resultadoContainer.innerHTML = `<p>Estudiante ${nombreEliminar} eliminado correctamente.</p>`;
    
            // Actualizar la lista de estudiantes
            mostrarEstudiantes();
    
            // Ocultar el formulario y limpiarlo
            formularioEliminarEstudiante.classList.add('hidden');
            eliminarEstudianteForm.reset();
        }
    });
    
    // Función para mostrar errores
    function mostrarError(idError, mensaje) {
        const errorContainer = document.getElementById(idError);
        errorContainer.textContent = mensaje;
        errorContainer.style.color = 'red';
    }
    
    // Función para limpiar errores
    function limpiarErrores() {
        const errorContainers = document.querySelectorAll('.error-container');
        errorContainers.forEach(container => {
            container.textContent = '';
        });
    }

    // Función para mostrar la lista de estudiantes
    function mostrarEstudiantes() {
        const listaEstudiantesContainer = document.getElementById('listaEstudiantesContainer');
        listaEstudiantesContainer.innerHTML = '<h2>Lista de Estudiantes</h2>';
        if (listaEstudiantes.lista.length === 0) {
            listaEstudiantesContainer.innerHTML += '<p>No hay estudiantes en la lista.</p>';
        } else {
            listaEstudiantes.lista.forEach(est => {
                listaEstudiantesContainer.innerHTML += `<p>(${est.id}) ${est.nombre} (${est.edad} años)</p>`;
            });
        }
    }

    // Función para guardar la lista en localStorage




    // Botón para mostrar el formulario de matrícula
    document.getElementById('matricularEstudianteBtn').addEventListener('click', () => {
        const formularioMatricularEstudiante = document.getElementById('formularioMatricularEstudiante');
        if (formularioMatricularEstudiante) {
            formularioMatricularEstudiante.classList.remove('hidden');
            formularioAgregarEstudiante.classList.add('hidden');
            formularioEliminarEstudiante.classList.add('hidden');
        }
    });

    // Manejar el envío del formulario de matrícula
    document.getElementById('matricularEstudianteForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
    
        // Limpiar mensajes de error anteriores
        limpiarErrores();
    
        // Obtener valores del formulario
        const estudianteId = parseInt(document.getElementById('estudianteid').value.trim(), 10);
        const asignaturaNombre = document.getElementById('asignaturaMatricular').value.trim();
        const calificacion = parseInt(document.getElementById('Calificaciones').value.trim(), 10);
    
        let isValid = true;
    
        // Validar ID del Estudiante
        if (!estudianteId || isNaN(estudianteId)) {
            mostrarError('error-estudianteid', 'Por favor, ingresa un ID de estudiante válido.');
            isValid = false;
        }
    
        // Validar Nombre de la Asignatura
        if (!asignaturaNombre) {
            mostrarError('error-asignaturaMatricular', 'Por favor, ingresa el nombre de la asignatura.');
            isValid = false;
        }
    
        // Validar Calificación
        if (isNaN(calificacion) || calificacion < 0 || calificacion > 100) {
            mostrarError('error-Calificaciones', 'La calificación debe ser un número entre 0 y 100.');
            isValid = false;
        }
    
        // Si todas las validaciones pasan, proceder a matricular al estudiante
        if (isValid) {
            // Crear la asignatura y matricular al estudiante
            const asignatura = new Asignatura(asignaturaNombre, calificacion);
            listaEstudiantes.matricularEstudiante(estudianteId, asignatura, listaAsignaturas);
            listaEstudiantes.guardarEstudiantes(); // Guardar la lista en localStorage

            // Mostrar mensaje de éxito
            alert(`El estudiante ${estudianteId} ha sido matriculado en ${asignaturaNombre}.`);
    
            // Limpiar el formulario
            formularioMatricularEstudiante.classList.add('hidden');
            document.getElementById('matricularEstudianteForm').reset();
            document.getElementById('calificacionesContainer').innerHTML = ''; // Limpiar contenedor de calificaciones
        }
    });


    document.getElementById('desMatricularEstudianteBtn').addEventListener('click', () => {
        const formularioMatricularEstudiante = document.getElementById('formularioDesMatricularEstudiante');
        if (formularioMatricularEstudiante) {
            formularioMatricularEstudiante.classList.remove('hidden');
            formularioAgregarEstudiante.classList.add('hidden');
            formularioEliminarEstudiante.classList.add('hidden');
        }
    });

 

    document.getElementById('desMatricularEstudianteForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
    
        // Limpiar mensajes de error anteriores
        limpiarErrores();
    
        // Obtener valores del formulario
        const estudianteId = parseInt(document.getElementById('estudianteid').value.trim(), 10);
        const asignaturaNombre = document.getElementById('asignaturaMatricular').value.trim();
    
        let isValid = true;
    
        // Validar ID del Estudiante
        if (!estudianteId || isNaN(estudianteId)) {
            mostrarError('error-estudianteid', 'Por favor, ingresa un ID de estudiante válido.');
            isValid = false;
        }
    
        // Validar Nombre de la Asignatura
        if (!asignaturaNombre) {
            mostrarError('error-asignaturaMatricular', 'Por favor, ingresa el nombre de la asignatura.');
            isValid = false;
        }
    
        // Si todas las validaciones pasan, proceder a desmatricular al estudiante
        if (isValid) {
            // Desmatricular al estudiante de la asignatura
            listaEstudiantes.desmatricularaAsignatura(estudianteId, asignaturaNombre);
            listaEstudiantes.guardarEstudiantes(); // Guardar la lista en localStorage

            // Mostrar mensaje de éxito
            alert(`El estudiante ${estudianteId} ha sido desmatriculado de ${asignaturaNombre}.`);
    
            // Limpiar y ocultar el formulario
            const formularioDesMatricularEstudiante = document.getElementById('formularioDesMatricularEstudiante');
            if (formularioDesMatricularEstudiante) {
                formularioDesMatricularEstudiante.classList.add('hidden'); // Ocultar el formulario
            }
    
            // Limpiar los campos del formulario
            document.getElementById('desMatricularEstudianteForm').reset();
        }
    });
    

    // Mostrar el formulario de añadir calificación cuando se hace clic en el botón
    document.getElementById('aniadirCalificacionBtn')?.addEventListener('click', () => {
        const formularioAniadirCalificacion = document.getElementById('formularioaniadirCalifiacion');
        if (formularioAniadirCalificacion) {
            formularioAniadirCalificacion.classList.remove('hidden'); // Mostrar el formulario
            // Ocultar otros formularios
            document.getElementById('formularioAgregarEstudiante')?.classList.add('hidden');
            document.getElementById('formularioEliminarEstudiante')?.classList.add('hidden');
            document.getElementById('formularioMatricularEstudiante')?.classList.add('hidden');
            document.getElementById('formularioDesMatricularEstudiante')?.classList.add('hidden');
        }
    });



    // Manejar el envío del formulario de añadir calificación
    document.getElementById('aniadirCalificacionform')?.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    
        // Limpiar mensajes de error anteriores
        limpiarErrores();
    
        // Obtener valores del formulario
        const nombreEstudiante = document.getElementById('nombreEstudiante').value.trim();
        const nombreAsignatura = document.getElementById('asignatura').value.trim();
        const calificacion = parseInt(document.getElementById('califiaciones').value);
    
        let isValid = true;
    
        // Validar Nombre del Estudiante
        if (!nombreEstudiante) {
            mostrarError('error-nombreEstudiante', 'Por favor, ingresa el nombre del estudiante.');
            isValid = false;
        }
    
        // Validar Nombre de la Asignatura
        if (!nombreAsignatura) {
            mostrarError('error-asignatura', 'Por favor, ingresa el nombre de la asignatura.');
            isValid = false;
        }
    
        // Validar Calificación
        if (isNaN(calificacion) || calificacion < 0 || calificacion > 10) {
            mostrarError('error-califiaciones', 'La calificación debe ser un número entre 0 y 10.');
            isValid = false;
        }
    
        // Si todas las validaciones pasan, proceder a añadir la calificación
        if (isValid) {
            try {
                // Buscar al estudiante por nombre
                const estudiante = listaEstudiantes.lista.find(est => est.nombre === nombreEstudiante);
                if (!estudiante) {
                    throw new Error(`No se encontró al estudiante con nombre: ${nombreEstudiante}`);
                }
    
                // Buscar la asignatura dentro del estudiante
                const asignatura = listaAsignaturas.busquedaAsignaturas.find(asig => asig.nombre === nombreAsignatura);
                if (!asignatura) {
                    throw new Error(`No se encontró la asignatura: ${nombreAsignatura} para el estudiante.`);
                }
    
                // Añadir la calificación a la asignatura
                listaEstudiantes.añadirCalificacion(nombreEstudiante, nombreAsignatura, calificacion);
                listaEstudiantes.guardarEstudiantes(); // Guardar la lista en localStorage

                // Mostrar mensaje de éxito
                alert(`Calificación ${calificacion} añadida a la asignatura ${nombreAsignatura} para el estudiante ${nombreEstudiante}.`);
    
                // Ocultar y limpiar el formulario
                const formularioAniadirCalificacion = document.getElementById('formularioaniadirCalifiacion');
                if (formularioAniadirCalificacion) {
                    formularioAniadirCalificacion.classList.add('hidden'); // Ocultar el formulario
                }
                document.getElementById('aniadirCalificacionform').reset(); // Limpiar el formulario
            } catch (error) {
                alert(error.message); // Mostrar mensaje de error si algo falla
            }
        }
    });
    



// Mostrar el formulario de calcular promedio cuando se hace clic en el botón
document.getElementById('calcularPromedioBtn')?.addEventListener('click', () => {
    const formularioCalcularPromedio = document.getElementById('formulariocalcularPromedio');
    if (formularioCalcularPromedio) {
        formularioCalcularPromedio.classList.remove('hidden'); // Mostrar el formulario

        // Ocultar otros formularios
        document.getElementById('formularioAgregarEstudiante')?.classList.add('hidden');
        document.getElementById('formularioEliminarEstudiante')?.classList.add('hidden');
        document.getElementById('formularioMatricularEstudiante')?.classList.add('hidden');
        document.getElementById('formularioDesMatricularEstudiante')?.classList.add('hidden');
        document.getElementById('formularioaniadirCalifiacion')?.classList.add('hidden'); // Ocultar formulario de añadir calificación
        document.getElementById('formulariobuscarAsignaturas')?.classList.add('hidden'); // Ocultar formulario de buscar asignaturas
        document.getElementById('formularioMostrarEstudiantes')?.classList.add('hidden'); // Ocultar formulario de mostrar estudiantes
        document.getElementById('formularioBuscarEstudiante')?.classList.add('hidden'); // Ocultar formulario de buscar estudiantes
    }
});

    // Mostrar el formulario de calcular promedio cuando se hace clic en el botón
    document.getElementById('calcularPromedioform')?.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    
        // Limpiar mensajes de error anteriores
        limpiarErrores();
    
        // Obtener valores del formulario
        const nombreEstudiante = document.getElementById('nombreEstudiantee').value.trim();
    
        let isValid = true;
    
        // Validar Nombre del Estudiante
        if (!nombreEstudiante) {
            mostrarError('error-nombreEstudiantee', 'Por favor, ingresa el nombre del estudiante.');
            isValid = false;
        }
    
        // Si todas las validaciones pasan, proceder a calcular el promedio
        if (isValid) {
            try {
                
                // Calcular el promedio del estudiante
                const promedio = listaEstudiantes.obtenerPromedioGeneral(nombreEstudiante);
    
                // Mostrar el resultado
                alert(`El promedio del estudiante ${nombreEstudiante} es: ${promedio.toFixed(2)}`);
    
                // Ocultar y limpiar el formulario
                const formularioCalcularPromedio = document.getElementById('formulariocalcularPromedio');
                if (formularioCalcularPromedio) {
                    formularioCalcularPromedio.classList.add('hidden'); // Ocultar el formulario
                }
                document.getElementById('calcularPromedioform').reset(); // Limpiar el formulario
            } catch (error) {
                alert(error.message); // Mostrar mensaje de error si algo falla
            }
        }
    });


    // Mostrar el formulario de buscar asignaturas cuando se hace clic en el botón
    document.getElementById('buscarAsignaturasbtn')?.addEventListener('click', () => {
        const formularioBuscarAsignaturas = document.getElementById('formulariobuscarAsignaturas');
        if (formularioBuscarAsignaturas) {
            formularioBuscarAsignaturas.classList.remove('hidden'); // Mostrar el formulario
            // Ocultar otros formularios
            document.getElementById('formularioAgregarEstudiante')?.classList.add('hidden');
            document.getElementById('formularioEliminarEstudiante')?.classList.add('hidden');
            document.getElementById('formularioMatricularEstudiante')?.classList.add('hidden');
            document.getElementById('formularioDesMatricularEstudiante')?.classList.add('hidden');
            document.getElementById('formularioaniadirCalifiacion')?.classList.add('hidden');
        }
    });

    // Manejar el envío del formulario de buscar asignaturas
    document.getElementById('buscarAsignaturasform')?.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    
        // Limpiar mensajes de error anteriores
        limpiarErrores();
    
        // Obtener valores del formulario
        const nombreAsignatura = document.getElementById('asignaturasNombre').value.trim();
    
        let isValid = true;
    
        // Validar Nombre de la Asignatura
        if (!nombreAsignatura) {
            mostrarError('error-asignaturasNombre', 'Por favor, ingresa el nombre de la asignatura.');
            isValid = false;
        }
    
        // Si todas las validaciones pasan, proceder a buscar la asignatura
        if (isValid) {
            try {
                // Buscar la asignatura por nombre
                const resultado = listaAsignaturas.busquedaAsignaturas(nombreAsignatura);
                if (!resultado || resultado.length === 0) {
                    throw new Error(`No se encontraron asignaturas con el nombre: ${nombreAsignatura}`);
                }
    
                // Mostrar el resultado en el contenedor HTML
                const resultadoBusquedaContainer = document.getElementById('resultadoBusqueda');
                if (resultadoBusquedaContainer) {
                    resultadoBusquedaContainer.innerHTML = `<p>Resultado de la búsqueda:</p><pre>${resultado}</pre>`;
                    resultadoBusquedaContainer.classList.add('visible'); // Mostrar el contenedor
                }
    
                // Ocultar y limpiar el formulario
                const formularioBuscarAsignaturas = document.getElementById('formulariobuscarAsignaturas');
                if (formularioBuscarAsignaturas) {
                    formularioBuscarAsignaturas.classList.add('hidden'); // Ocultar el formulario
                }
                document.getElementById('buscarAsignaturasform').reset(); // Limpiar el formulario
            } catch (error) {
                alert(error.message); // Mostrar mensaje de error si algo falla
            }
        }
    });



    //
    // Mostrar el formulario de buscar asignatura cuando se hace clic en el botón
    document.getElementById('mostrarEstudiantesbtn')?.addEventListener('click', () => {
        const resultadoContainer = document.getElementById('resultadoContainer');
        if (resultadoContainer) {
            resultadoContainer.innerHTML = `<p>Estudiantes  "${listaEstudiantes.generarReporte()}":</p>`;
        }
    });




    //

    // Mostrar el formulario de buscar asignatura cuando se hace clic en el botón
    document.getElementById('buscarEstudiantebtn')?.addEventListener('click', () => {
        const formularioBuscarEstudiante = document.getElementById('formularioBuscarEstudiante');
        if (formularioBuscarEstudiante) {
            formularioBuscarEstudiante.classList.remove('hidden'); // Mostrar el formulario
            // Ocultar otros formularios
            document.getElementById('formularioAgregarEstudiante')?.classList.add('hidden');
            document.getElementById('formularioEliminarEstudiante')?.classList.add('hidden');
            document.getElementById('formularioMatricularEstudiante')?.classList.add('hidden');
            document.getElementById('formularioDesMatricularEstudiante')?.classList.add('hidden');
            document.getElementById('formularioaniadirCalifiacion')?.classList.add('hidden');
        }
    });



    // Manejar el envío del formulario de buscar asignatura
    document.getElementById('mostrarEstudiantesform')?.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    
        // Limpiar mensajes de error anteriores
        limpiarErrores();
    
        // Obtener valores del formulario
        const nombreEstudiante = document.getElementById('estudiantesMostrar').value.trim();
    
        let isValid = true;
    
        // Validar Nombre del Estudiante
        if (!nombreEstudiante) {
            mostrarError('error-estudiantesMostrar', 'Por favor, ingresa el nombre del estudiante.');
            isValid = false;
        }
    
        // Si todas las validaciones pasan, proceder a buscar el estudiante
        if (isValid) {
            try {
                // Buscar el estudiante por nombre
                const estudiantes = listaEstudiantes.buscarEstudiante(nombreEstudiante);
    
                // Verificar si se encontraron estudiantes
                if (!estudiantes || estudiantes.trim() === "") {
                    throw new Error(`No se encontraron estudiantes con el nombre: ${nombreEstudiante}`);
                }
    
                // Mostrar los resultados en el contenedor
                const resultadoContainer = document.getElementById('resultadoContainer');
                if (resultadoContainer) {
                    resultadoContainer.innerHTML = `<p>Estudiantes encontrados:</p><pre>${estudiantes}</pre>`;
                    resultadoContainer.classList.add('visible'); // Mostrar el contenedor
                }
    
                // Ocultar y limpiar el formulario
                const formularioMostrarEstudiantes = document.getElementById('formularioMostrarEstudiantes');
                if (formularioMostrarEstudiantes) {
                    formularioMostrarEstudiantes.classList.add('hidden'); // Ocultar el formulario
                }
                document.getElementById('mostrarEstudiantesform').reset(); // Limpiar el formulario
            } catch (error) {
                alert(error.message); // Mostrar mensaje de error si algo falla
            }
        }
    });

//
document.getElementById('buscarEstudiantebtn')?.addEventListener('click', () => {
    const formularioBuscarEstudiante = document.getElementById('formularioBuscarEstudiante');
    if (formularioBuscarEstudiante) {
        formularioBuscarEstudiante.classList.remove('hidden'); // Mostrar el formulario
        // Ocultar otros formularios
        document.getElementById('formularioAgregarEstudiante')?.classList.add('hidden');
        document.getElementById('formularioEliminarEstudiante')?.classList.add('hidden');
        document.getElementById('formularioMatricularEstudiante')?.classList.add('hidden');
        document.getElementById('formularioDesMatricularEstudiante')?.classList.add('hidden');
        document.getElementById('formularioaniadirCalifiacion')?.classList.add('hidden');
    }
});

// Manejar el envío del formulario de búsqueda de estudiante
document.getElementById('buscarEstudianteform')?.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    // Limpiar mensajes de error anteriores
    limpiarErrores();

    // Obtener valores del formulario
    const nombreEstudiante = document.getElementById('estudianteBuscar').value.trim();

    let isValid = true;

    // Validar Nombre del Estudiante
    if (!nombreEstudiante) {
        mostrarError('error-estudianteBuscar', 'Por favor, ingresa el nombre del estudiante.');
        isValid = false;
    }

    // Si todas las validaciones pasan, proceder a buscar el estudiante
    if (isValid) {
        try {
            // Buscar el estudiante por nombre
            const estudiantes = listaEstudiantes.buscarEstudiante(nombreEstudiante);

            // Verificar si se encontraron estudiantes
            if (!estudiantes || estudiantes.length === 0) {
                throw new Error(`No se encontraron estudiantes con el nombre: ${nombreEstudiante}`);
            }

            // Mostrar los resultados en el contenedor
            const resultadoContainer = document.getElementById('resultadoContainer');
            if (resultadoContainer) {
                resultadoContainer.innerHTML = `<p>Estudiantes encontrados:${estudiantes
                    
                    }</p>`;
                resultadoContainer.classList.add('visible'); // Mostrar el contenedor
            }

            // Ocultar y limpiar el formulario
            const formularioBuscarEstudiante = document.getElementById('formularioBuscarEstudiante');
            if (formularioBuscarEstudiante) {
                formularioBuscarEstudiante.classList.add('hidden'); // Ocultar el formulario
            }
            document.getElementById('buscarEstudianteform').reset(); // Limpiar el formulario
        } catch (error) {
            alert(error.message); // Mostrar mensaje de error si algo falla
        }
    }
});
    //
    document.getElementById('promedioGeneral')?.addEventListener('click', () => {
        try {
            // Calcular el promedio general de todos los estudiantes


            const resultadoContainer = document.getElementById('resultadoContainer');
            if (resultadoContainer) {
                resultadoContainer.innerHTML = `
                <p>Promedio General de la Clase: ${listaEstudiantes.obtenerPromedioGeneral()}</p>
            `;
            }
        } catch (error) {
            alert(error.message); // Mostrar mensaje de error si algo falla
        }
    });


});








/*document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const btnEstudiantes = document.getElementById('btn-estudiantes');
    const btnAsignaturas = document.getElementById('btn-asignaturas');
    const btnReporte = document.getElementById('btn-reporte');
    const gestionEstudiantes = document.getElementById('gestion-estudiantes');
    const gestionAsignaturas = document.getElementById('gestion-asignaturas');
    const reporteGeneral = document.getElementById('reporte-general');
    const volverMenu1 = document.getElementById('volver-menu1');
    const volverMenu2 = document.getElementById('volver-menu2');
    const volverMenu3 = document.getElementById('volver-menu3');
    const formEstudiantes = document.getElementById('form-estudiantes');
    const formAsignaturas = document.getElementById('form-asignaturas');
    const listaEstudiantesUI = document.getElementById('lista-estudiantes');
    const listaAsignaturasUI = document.getElementById('lista-asignaturas');
    const contenidoReporte = document.getElementById('contenido-reporte');
    const buscarAsignaturaInput = document.getElementById('buscar-asignatura');
    const btnBuscarAsignatura = document.getElementById('btn-buscar-asignatura');

    // Eventos para mostrar/ocultar secciones
    btnEstudiantes.addEventListener('click', () => {
        gestionEstudiantes.classList.remove('hidden');
        gestionAsignaturas.classList.add('hidden');
        reporteGeneral.classList.add('hidden');
    });

    btnAsignaturas.addEventListener('click', () => {
        gestionAsignaturas.classList.remove('hidden');
        gestionEstudiantes.classList.add('hidden');
        reporteGeneral.classList.add('hidden');
    });

    btnReporte.addEventListener('click', () => {
        reporteGeneral.classList.remove('hidden');
        gestionEstudiantes.classList.add('hidden');
        gestionAsignaturas.classList.add('hidden');
        verReporteGeneral();
    });

    // Eventos para volver al menú principal
    volverMenu1.addEventListener('click', () => {
        gestionEstudiantes.classList.add('hidden');
    });

    volverMenu2.addEventListener('click', () => {
        gestionAsignaturas.classList.add('hidden');
    });

    volverMenu3.addEventListener('click', () => {
        reporteGeneral.classList.add('hidden');
    });

    // Evento para añadir estudiantes
    formEstudiantes.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre-estudiante').value;
        const edad = document.getElementById('edad-estudiante').value;
        const calle = document.getElementById('calle-estudiante').value;
        const numero = document.getElementById('numero-estudiante').value;
        const piso = document.getElementById('piso-estudiante').value;
        const codigoPostal = document.getElementById('codigo-postal-estudiante').value;
        const provincia = document.getElementById('provincia-estudiante').value;
        const localidad = document.getElementById('localidad-estudiante').value;

        const estudiante = new Estudiante(nombre, edad, new Direccion(calle, numero, piso, codigoPostal, provincia, localidad));
        listaEstudiantes.agregarEstudiante(estudiante);
        localStorage.setItem('estudiantes', JSON.stringify(listaEstudiantes.estudiantes));
        actualizarListaEstudiantes();
        formEstudiantes.reset();
    });

    // Evento para añadir asignaturas
    formAsignaturas.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre-asignatura').value;
        const asignatura = new Asignatura(nombre);
        listaAsignaturas.añadirAsignatura(asignatura);
        localStorage.setItem('asignaturas', JSON.stringify(listaAsignaturas.asignaturas));
        actualizarListaAsignaturas();
        formAsignaturas.reset();
    });

    // Evento para buscar asignaturas
    btnBuscarAsignatura.addEventListener('click', () => {
        const nombre = buscarAsignaturaInput.value.trim();
        if (nombre) {
            const resultados = listaAsignaturas.busquedaAsignaturas(nombre);
            listaAsignaturasUI.innerHTML = '';
            resultados.forEach(asignatura => {
                const li = document.createElement('li');
                li.textContent = asignatura.toString();
                listaAsignaturasUI.appendChild(li);
            });
        }
    });

    // Evento para eliminar asignaturas
    listaAsignaturasUI.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const nombreAsignatura = e.target.textContent.split(' ')[0]; // Asume que el nombre es la primera palabra
            listaAsignaturas.eliminarAsignatura(nombreAsignatura);
            localStorage.setItem('asignaturas', JSON.stringify(listaAsignaturas.asignaturas));
            actualizarListaAsignaturas();
        }
    });

    // Función para actualizar la lista de estudiantes en la UI
    function actualizarListaEstudiantes() {
        listaEstudiantesUI.innerHTML = '';
        listaEstudiantes.estudiantes.forEach(estudiante => {
            const li = document.createElement('li');
            li.textContent = estudiante.toString();
            listaEstudiantesUI.appendChild(li);
        });
    }

    // Función para actualizar la lista de asignaturas en la UI
    function actualizarListaAsignaturas() {
        listaAsignaturasUI.innerHTML = '';
        listaAsignaturas.asignaturas.forEach(asignatura => {
            const li = document.createElement('li');
            li.textContent = asignatura.toString();
            listaAsignaturasUI.appendChild(li);
        });
    }

    // Función para generar el reporte general
    function verReporteGeneral() {
        contenidoReporte.textContent = listaEstudiantes.generarReporte() + "\n" + listaAsignaturas.generarReporte();
    }

    // Cargar datos del localStorage al iniciar
    if (localStorage.getItem('estudiantes')) {
        listaEstudiantes.estudiantes = JSON.parse(localStorage.getItem('estudiantes'));
        actualizarListaEstudiantes();
    }

    if (localStorage.getItem('asignaturas')) {
        listaAsignaturas.asignaturas = JSON.parse(localStorage.getItem('asignaturas'));
        actualizarListaAsignaturas();
    }
});*/