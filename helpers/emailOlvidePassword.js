import nodemailer from 'nodemailer';

const emailOlvidePassword = async (datos) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    const {email, nombre, token} = datos;

    // Enviar el email
    const info = await transport.sendMail({
        from: "APV - Administrador de Pacientes de Veterinaria",
        to: email,
        subject:"Restablece tu Password",
        text: "Restablece tu Password",
        html: `<p>Hola ${nombre}, has solicitado restablecer tu contraseña.</p>
            <p>Sigue el siguiente enlace para generar una nueva contraseña:
            <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Restablecer Password</a></p>

            <p>Si tu no creaste esta cuenta, ignora este mensaje.</p>
        `,

    })
    console.log("Mensaje enviado: %s", info.messageId);
};

export default emailOlvidePassword;