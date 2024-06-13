const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const whatsapp = new Client({
    authStrategy: new LocalAuth({
        dataPath: "sessions",
    }),
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    }});

whatsapp.on('qr', qr => {
  qrcode.generate(qr, {
    small: true
  });
  console.log('QR code generated.');
});

whatsapp.on('ready', () => {
  console.log('Client is ready!');
});

whatsapp.on('auth_failure', (msg) => {
  console.error('AUTHENTICATION FAILURE', msg);
});

whatsapp.on('disconnected', (reason) => {
  console.log('Client was logged out', reason);
});

whatsapp.on('error', (error) => {
  console.error('Error encountered:', error);
});

module.exports = { whatsapp };
