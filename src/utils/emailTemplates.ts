import { SendEmailEndpointPayload } from '../typesDefs/routes/contactForm/types';

export interface SendFreeGuideEmailTemplateProps {
  subject: string;
  email: string;
  name: string;
}

export const sendFreeGuideEmailTemplateEs = ({ subject, name }: SendFreeGuideEmailTemplateProps) => `
<!DOCTYPE html>
<html lang='es' style='font-family: Arial, sans-serif; background-color: #f4f4f4;'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta name='description' content='Correo de la página de contacto'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <title>${subject}</title>
</head>
<body style='margin: 0; padding: 0;'>
    <table style='max-width: 600px; margin: 20px auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);'>
        <tr>
            <td align='center'>
                <h2 style='color: #333;'>¡Hola, ${name}!</h2>
                <p style='color: #555; font-size: 16px;'>Estamos emocionados de compartir contigo tu guía GRATUITA:</p>
                <h3 style='color: #028396;'>5 Claves para Organizar un Retiro Transformador</h3>
                <p style='color: #555; font-size: 14px;'>Haz clic en el botón de abajo para descargar tu guía y comenzar a planificar una experiencia inolvidable.</p>
                <a href=${process.env.NODE_FREE_GUIDE} style='background: #028396; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 5px; display: inline-block; margin-top: 10px; font-weight: bold;'>Descargar Ahora</a>
            </td>
        </tr>
        <tr>
            <td align='center' style='padding: 20px 0;'>
                <p style='color: #777; font-size: 14px;'>Mantente inspirado con nuestras últimas novedades y contenido exclusivo.</p>
                <p style='color: #777; font-size: 14px;'>Síguenos en redes sociales:</p>
                <table cellspacing='10' cellpadding='0'>
                    <tr>
                        <td><a href='${process.env.NODE_INSTAGRAM_LINK}'><img src='${process.env.NODE_INSTAGRAM_ICON}' width='32' alt='Instagram'></a></td>
                        <td><a href='${process.env.NODE_FACEBOOK_LINK}'><img src='${process.env.NODE_FACEBOOK_ICON}' width='32' alt='Facebook'></a></td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align='center'>
                <p style='color: #999; font-size: 12px;'>Golden Flower Retreats ©</p>
                <p style='color: #999; font-size: 12px;'>¡Gracias por ser parte de nuestra comunidad!</p>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const sendFreeGuideEmailTemplateEn = ({ subject, name }: SendFreeGuideEmailTemplateProps) => `
<!DOCTYPE html>
<html lang='en' style='font-family: Arial, sans-serif; background-color: #f4f4f4;'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta name='description' content='Email de la página de contacto'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <title>${subject}</title>
</head>
<body style='margin: 0; padding: 0;'>
    <table style='max-width: 600px; margin: 20px auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);'>
        <tr>
            <td align='center'>
                <h2 style='color: #333;'>Hello, ${name}!</h2>
                <p style='color: #555; font-size: 16px;'>We're excited to share your FREE guide with you:</p>
                <h3 style='color: #f1c232;'>5 Keys to Hosting a Transformational Retreat</h3>
                <p style='color: #555; font-size: 14px;'>Click the button below to download your guide and start planning an unforgettable experience.</p>
                <a href='#' style='background: #f1c232; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 5px; display: inline-block; margin-top: 10px; font-weight: bold;'>Download Now</a>
            </td>
        </tr>
        <tr>
            <td align='center' style='padding: 20px 0;'>
                <p style='color: #777; font-size: 14px;'>Stay inspired with our latest updates and exclusive content.</p>
                <p style='color: #777; font-size: 14px;'>Follow us on social media:</p>
                <table cellspacing='10' cellpadding='0'>
                    <tr>
                        <td><a href='${process.env.NODE_INSTAGRAM_LINK}'><img src='${process.env.NODE_INSTAGRAM_ICON}' width='32' alt='Instagram'></a></td>
                        <td><a href='${process.env.NODE_FACEBOOK_LINK}'><img src='${process.env.NODE_FACEBOOK_ICON}' width='32' alt='Facebook'></a></td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align='center'>
                <p style='color: #999; font-size: 12px;'>Golden Flower Retreats ©</p>
                <p style='color: #999; font-size: 12px;'>Thank you for being part of our community!</p>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const contactConfirmationEmailEs = ({ subject, name }: { subject: string; name: string }) => `
<!DOCTYPE html>
<html lang='es' style='font-family: Arial, sans-serif; background-color: #f4f4f4;'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta name='description' content='Confirmación de contacto'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <title>${subject}</title>
</head>
<body style='margin: 0; padding: 0;'>
    <table style='max-width: 600px; margin: 20px auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);'>
        <tr>
            <td align='center'>
                <h2 style='color: #333;'>¡Hola, ${name}!</h2>
                <p style='color: #555; font-size: 16px;'>Gracias por contactarte con <strong>Golden Flower Retreats</strong>.</p>
                <p style='color: #555; font-size: 14px;'>Este correo es para confirmar que hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes posible.</p>
                <p style='color: #555; font-size: 14px;'>Si necesitas una respuesta urgente, no dudes en comunicarte con nosotros a través de nuestros canales oficiales.</p>
            </td>
        </tr>
        <tr>
            <td align='center' style='padding: 20px 0;'>
                <p style='color: #777; font-size: 14px;'>Síguenos en redes sociales:</p>
                <table cellspacing='10' cellpadding='0'>
                    <tr>
                        <td><a href='${process.env.NODE_INSTAGRAM_LINK}'><img src='${process.env.NODE_INSTAGRAM_ICON}' width='32' alt='Instagram'></a></td>
                        <td><a href='${process.env.NODE_FACEBOOK_LINK}'><img src='${process.env.NODE_FACEBOOK_ICON}' width='32' alt='Facebook'></a></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const contactConfirmationEmailEn = ({ subject, name }: { subject: string; name: string }) => `
<!DOCTYPE html>
<html lang='en' style='font-family: Arial, sans-serif; background-color: #f4f4f4;'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta name='description' content='Contact Confirmation'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <title>${subject}</title>
</head>
<body style='margin: 0; padding: 0;'>
    <table style='max-width: 600px; margin: 20px auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);'>
        <tr>
            <td align='center'>
                <h2 style='color: #333;'>Hello, ${name}!</h2>
                <p style='color: #555; font-size: 16px;'>Thank you for reaching out to <strong>Golden Flower Retreats</strong>.</p>
                <p style='color: #555; font-size: 14px;'>This email is to confirm that we have received your message and will get back to you as soon as possible.</p>
                <p style='color: #555; font-size: 14px;'>If you need an urgent response, please don't hesitate to contact us through our official channels.</p>
            </td>
        </tr>
        <tr>
            <td align='center' style='padding: 20px 0;'>
                <p style='color: #777; font-size: 14px;'>Follow us on social media:</p>
                <table cellspacing='10' cellpadding='0'>
                    <tr>
                        <td><a href='${process.env.NODE_INSTAGRAM_LINK}'><img src='${process.env.NODE_INSTAGRAM_ICON}' width='32' alt='Instagram'></a></td>
                        <td><a href='${process.env.NODE_FACEBOOK_LINK}'><img src='${process.env.NODE_FACEBOOK_ICON}' width='32' alt='Facebook'></a></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const sendContactEmailToAdminEs = ({ email, name, phone, message }: Partial<SendEmailEndpointPayload>) => `
<!DOCTYPE html>
<html lang='es' style='font-family: Arial, sans-serif; background-color: #f4f4f4;'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta name='description' content='Correo de contacto recibido'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <title>Nuevo mensaje de contacto</title>
</head>
<body style='margin: 0; padding: 0;'>
    <table style='max-width: 600px; margin: 20px auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);'>
        <tr>
            <td align='center'>
                <h2 style='color: #333;'>Nuevo mensaje de contacto</h2>
                <p style='color: #555; font-size: 16px;'>Has recibido un nuevo mensaje de contacto en Golden Flower Retreats.</p>
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${phone}</p>
                <p><strong>Mensaje:</strong></p>
                <p style='background: #f4f4f4; padding: 10px; border-radius: 5px;'>${message}</p>
            </td>
        </tr>
        <tr>
            <td align='center'>
                <p style='color: #999; font-size: 12px;'>Golden Flower Retreats ©</p>
                <p style='color: #999; font-size: 12px;'>Este mensaje fue enviado automáticamente desde el formulario de contacto.</p>
            </td>
        </tr>
    </table>
</body>
</html>`;
