'use strict';

import { Router } from 'express';
import emailRoutes from './emailsRoutes';

const router = Router();

router.use('/emails', emailRoutes);

export default router;
