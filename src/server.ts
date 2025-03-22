'use strict';

import app from './config/server/server-config';

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server (golden-flower-backend) listening on port ${PORT}`));
