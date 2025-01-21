import { generateQRCode, decodeQRCode } from "./qrutils";

// Example usage
const qrData = 'Hello, world!'; // Data you want to encode in the QR code
const qrFilename = 'qrcode.png'; // Output file name

// Generate QR code
generateQRCode(qrData, qrFilename)
    .then(() => {
        // Decode QR code
        const decodedData = decodeQRCode(qrFilename);
        if (decodedData) {
            console.log('Decoded QR code:', decodedData);
        } else {
            console.log('No QR code found or error decoding QR code.');
        }
    })
    .catch(err => {
        console.error('Error:', err);
    });
