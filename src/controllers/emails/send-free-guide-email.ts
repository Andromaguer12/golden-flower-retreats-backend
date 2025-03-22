'use strict';

import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { SendEmailEndpointPayload } from '../../typesDefs/routes/contactForm/types';
import sgMail from '@sendgrid/mail';
import {
  sendFreeGuideEmailTemplateEn,
  sendFreeGuideEmailTemplateEs,
  SendFreeGuideEmailTemplateProps,
} from '../../utils/emailTemplates';

// @desc    sends the free guide
// @route   POST /api/emails/free-guide/send
// @access  Public
const sendFreeGuideEmail = asyncHandler(async (req: Request, res: Response) => {
  const { email, name, lang }: Partial<SendEmailEndpointPayload> = req.body;

  if (!email) {
    res.status(400);
  }

  const translations = {
    es: {
      subject: 'Guia Gratuita "5 Claves para Organizar un Retiro Transformador" de Golden Flower Retreats',
      html: (props: SendFreeGuideEmailTemplateProps) => sendFreeGuideEmailTemplateEs(props),
    },
    en: {
      subject: 'Free Guide: "5 Keys to Hosting a Transformational Retreat" by Golden Flower Retreats',
      html: (props: SendFreeGuideEmailTemplateProps) => sendFreeGuideEmailTemplateEn(props),
    },
  };

  sgMail.setApiKey(process.env.NODE_SEND_GRID_API_KEY);

  try {
    // email to the user
    const userEmailMsg = {
      to: email,
      from: process.env.NODE_MAILER_AUTH_USER,
      subject: translations[lang].subject,
      html: translations[lang].html({
        subject: translations[lang]?.subject,
        name: name?.includes(' ') ? name?.split(' ')[0] : name,
        email,
      }),
    };

    // Enviar ambos correos
    await sgMail.send(userEmailMsg);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error('Error enviando el email');
  }

  res.status(201).json({ emailSended: 'success' });
});

export default sendFreeGuideEmail;
