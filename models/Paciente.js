import mongoose from 'mongoose';

const pacientesSchema = new mongoose.Schema({
        nombre: {
            type : String,
            required: true
        },
        propietario: {
            type : String,
            required: true
        },
        email: {
            type : String,
            required: true
        },
        fecha: {
            type : Date,
            required: true,
            default: Date.now()
        },
        sintomas: {
            type : String,
            required: true
        },
        //Referencia al veterinario que lo registro
        veterinario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Veterinario' // El nombre que se le dio en el "model"
        },
    },
    {
        timestamps:true // Cree las columnas de editado/creado
    }
    
);

const Paciente = mongoose.model("Paciente", pacientesSchema);
export default Paciente;