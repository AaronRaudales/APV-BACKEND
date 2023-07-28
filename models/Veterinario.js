import mongoose from 'mongoose'
import bcrypt from 'bcrypt';
import generarId from '../helpers/generarId.js';

const VeterinarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true, // que es obligatorio
        trim: true // Elimina los espacios en blanco 
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // El email sera unico
        trim: true
    },
    telefono: {
        type: String,
        default: null, // Por que es un campo no obligatorio
        trim: true
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: generarId()
    },
    confirmado: {
        type: Boolean,
        default: false
    }
});

// Funcion par hashear las contraseñas
VeterinarioSchema.pre('save', async function(next) {
    if(!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10) //Rondas de hasheo
    this.password = await bcrypt.hash(this.password, salt)
});

// Comprobar contraseñas cuando se registra
VeterinarioSchema.methods.comprobarPassword = async function(passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password);
};

// Modelo
const Veterinario = mongoose.model("Veterinario", VeterinarioSchema);
export default Veterinario;

