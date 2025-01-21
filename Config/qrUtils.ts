import * as QRCode from 'qrcode';
import { readFileSync } from 'fs';
import { PNG } from 'pngjs';
import jsQR from 'jsqr';

// Function to generate QR code
export async function generateQRCode(data: string, filename: string): Promise<void> {
    try {
        await QRCode.toFile(filename, data);
        console.log('QR Code generated successfully!');
    } catch (err) {
        console.error('Error generating QR code:', err);
    }
}

// Function to decode QR code
export function decodeQRCode(imagePath: string): string | null {
    try {
        // Read the QR code image
        const image = readFileSync(imagePath);
        // Decode the QR code image
        const png = PNG.sync.read(image);
        const result = jsQR(png.data, png.width, png.height);
        if (result) {
            return result.data; // Return decoded data
        } else {
            return null; // Return null if no QR code found
        }
    } catch (err) {
        console.error('Error decoding QR code:', err);
        return null;
    }
}
