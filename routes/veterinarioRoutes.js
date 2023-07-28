import express from "express";
const router = express.Router();
import { 
    registrarUsuario, 
    confirmarUsuario,
    autenticar, 
    perfil,
    forgotPassword,
    comprobarToken,
    nuevoPassword, 
    actualizarPerfil,
    actualizarPassword
} from '../controllers/veterinarioController.js'
import checkAuth from "../middleware/authMiddleware.js";

// Rutas publicas
router.post('/', registrarUsuario);
router.post("/login", autenticar );
router.post("/forgot-password", forgotPassword ); // Validar el email del usuario
router.post("/forgot-password/:token", nuevoPassword ); // Almacenar el  nuevo password

router.get('/confirmar/:tokenUsuario', confirmarUsuario );
router.get("/forgot-password/:token", comprobarToken ); // Leer el token 


// router.route("/forgot-password/:token").get(comprobarToken).post(nuevoPassword); // Otra manera

// Rutas privadas
router.get("/perfil", checkAuth, perfil);
router.put("/perfil/:id", checkAuth, actualizarPerfil);
router.put("/actualizar-password", checkAuth, actualizarPassword);




export default router;
 