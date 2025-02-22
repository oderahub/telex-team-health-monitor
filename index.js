"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const dotenv_1 = require("dotenv");
const wellness_1 = __importDefault(require("./src/routes/wellness"));
const node_cron_1 = __importDefault(require("node-cron"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.disable('x-powered-by');
app.get('/', (req, res) => {
    res.send('Team health monitor!');
});
app.use('/api', wellness_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
function keepAlive(url) {
    https_1.default
        .get(url, (res) => {
        console.log(`Status: ${res.statusCode}`);
    })
        .on('error', (error) => {
        console.error(`Error: ${error.message}`);
    });
}
// Schedule a job to keep the server alive
node_cron_1.default.schedule('*/5 * * * *', () => {
    keepAlive('');
    console.log('Pinged the server every 5 minutes');
});
