import React, { Fragment, useState } from 'react';
import uuid from 'uuid/v4'; 

const Formulario = ({crearCita}) => {
    
    // Crear state de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha:'',
        hora: '',
        sintomas: ''
    });

    // Crear State de Error
    const [error, actualizarError] = useState(false)

    // Funcion que se ejecuta cada vez que el usuario escribe en cada input
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    // Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    // Cuando el usuario ingresa el boton de agregar cita
    const submitCita = e =>{
        e.preventDefault(); // prevenis que envies por el metodo GET

        // Validar 
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' ||
        hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        }

        // Eliminar el mensaje previo
        actualizarError(false);

        // Asignar un ID
        cita.id = uuid();
        

        // Crear la Cita 
        crearCita(cita);

        // Reiniciar el Formulario
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha:'',
            hora: '',
            sintomas: ''
        })
        
    }

    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            { error ? <p className="alerta-error">Todos los campos son obligatorios</p>
            : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre de Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre del Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
        
     );
}
 
export default Formulario;