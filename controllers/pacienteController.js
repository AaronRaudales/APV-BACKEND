import Paciente from '../models/Paciente.js';
import mongoose from 'mongoose';

const agregarPaciente = async(req, res) => {
    
   try{
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id

    const pacienteAlmacenado = await paciente.save();
    res.json(pacienteAlmacenado);

   }catch(error) {
        console.log(error);   }
};

// Obtiene los pacientes de un veterinario
const obtenerPacientes = async(req, res) => {
    const pacientes = await Paciente.find()
        .where('veterinario')
        .equals(req.veterinario);

    res.json(pacientes)
};

// Metodos de un paciente en especifico
const obtenerPaciente = async(req,res) => {
    try {
        const { id } = req.params;
    
        if(id.length !== 24) {
            const error = new Error("¡Advertencia! Id no válido.");
            return res.status(400).json({msg: error.message});
        }

        const paciente = await Paciente.findById(id);

        if(!paciente){
            const error = new Error("Paciente no encontrado.");
            return res.status(400).json({msg: error.message});
        }

        // Autenticacion para comprobar que ese veterinario atendio al paciente (Se convierten a toString para poder compararlos)
        if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
            const error = new Error("Accion no valida");
            return res.status(400).json({msg: error.message});
        }


        res.json(paciente);

    } catch (error) {
        console.log(error);
    }
};

const actualizarPaciente = async(req,res) => {
    try {
        const { id } = req.params;

        if(id.length !== 24) {
            const error = new Error("¡Advertencia! Id no válido.");
            return res.status(400).json({msg: error.message});
        }

        // Pasamos la validación, buscamos al paciente
        const paciente = await Paciente.findById(id);
    
        if(!paciente){
            const error = new Error("Paciente no encontrado.");
            return res.status(400).json({msg: error.message});
        }
    
        // Autenticacion para comprobar que ese veterinario atendio al paciente (Se convierten a toString para poder compararlos)
        if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
            const error = new Error("Accion no valida");
            return res.status(400).json({msg: error.message});
        }
    
        //Actualizar Paciente
        paciente.nombre = req.body.nombre || paciente.nombre;
        paciente.propietario = req.body.propietario || paciente.propietario;
        paciente.email = req.body.email || paciente.email;
        paciente.fecha = req.body.fecha || paciente.fecha;
        paciente.sintomas = req.body.sintomas || paciente.sintomas;


        const pacienteActualizado = await paciente.save()
        res.json(pacienteActualizado)

    } catch (error) {
        console.log(error);
    }

};

const eliminarPaciente = async(req,res) => {
    try {
        const { id } = req.params;
    
        if(id.length !== 24) {
            const error = new Error("¡Advertencia! Id no válido.");
            return res.status(400).json({msg: error.message});
        }

        const paciente = await Paciente.findById(id);

        if(!paciente){
            const error = new Error("Paciente no encontrado.");
            return res.status(400).json({msg: error.message});
        }

        // Autenticacion para comprobar que ese veterinario atendio al paciente (Se convierten a toString para poder compararlos)
        if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
            const error = new Error("Accion no valida");
            return res.status(400).json({msg: error.message});
        }

        await paciente.deleteOne();
        res.json({ msg: 'Paciente eliminado' });

    } catch (error) {
        console.log(error);
    }
};

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}