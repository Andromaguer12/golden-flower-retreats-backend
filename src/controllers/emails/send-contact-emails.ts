'use strict';

import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { SendEmailEndpointPayload } from '../../typesDefs/routes/contactForm/types';
import sgMail from '@sendgrid/mail';
import {
  contactConfirmationEmailEn,
  contactConfirmationEmailEs,
  sendContactEmailToAdminEs,
} from '../../utils/emailTemplates';

// @desc    sends the free guide
// @route   POST /api/emails/contact-form/send
// @access  Public
const sendContactEmails = asyncHandler(async (req: Request, res: Response) => {
  const { email, name, phone, message, lang }: Partial<SendEmailEndpointPayload> = req.body;

  if (!email || !name || !phone || !message) {
    res.status(400);
  }

  const internalEmail = {
    subject: 'Alguien ha enviado un mensaje a través de la pagina web',
    html: (props: Partial<SendEmailEndpointPayload>) => sendContactEmailToAdminEs(props),
  };

  const translations = {
    es: {
      subject: '¡Gracias por contactar con Golden Flower Retreats!',
      html: (props: { subject: string; name: string }) => contactConfirmationEmailEs(props),
    },
    en: {
      subject: 'Thank you for contact with Golden Flower Retreats!',
      html: (props: { subject: string; name: string }) => contactConfirmationEmailEn(props),
    },
  };

  sgMail.setApiKey(process.env.NODE_SEND_GRID_API_KEY);

  try {
    // email to the user
    const userEmailMsg = {
      to: email,
      from: process.env.NODE_MAILER_AUTH_USER, // Tu correo de la cuenta SendGrid
      subject: translations[lang].subject,
      html: translations[lang].html({
        subject: translations[lang]?.subject,
        name: name.includes(' ') ? name?.split(' ')[0] : name,
      }),
    };

    // email to admin
    const adminEmailMsg = {
      to: process.env.NODE_MAILER_AUTH_OWNER, // Correo del propietario
      from: process.env.NODE_MAILER_AUTH_USER, // Tu correo de la cuenta SendGrid
      subject: internalEmail.subject,
      html: internalEmail.html({
        email,
        name,
        message,
        phone,
      }),
    };

    // Enviar ambos correos
    await sgMail.send(userEmailMsg);
    await sgMail.send(adminEmailMsg);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error('Error enviando el email');
  }

  res.status(201).json({ emailSended: 'success' });
});

export default sendContactEmails;
