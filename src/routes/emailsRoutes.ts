'use strict';

import express from 'express';
import sendFreeGuideEmail from '../controllers/emails/send-free-guide-email';
import sendContactEmails from '../controllers/emails/send-contact-emails';
const router = express.Router();

router.route('/free-guide/send').post(sendFreeGuideEmail);
router.route('/contact-form/send').post(sendContactEmails);

export default router;
