import express from 'express';
import path from 'path';
import fs from 'node:fs';

const app = express();

const port = process.env.PORT || 5000;

app.use(express.static('public'));

const routesPath = path.join(__dirname, 'routes');
const routesFiles = fs.readdirSync(routesPath);

for (const file of routesFiles) {
    const filePath = path.join(routesPath, file);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const route = require(filePath);

    app.use('/', route);
}

app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});