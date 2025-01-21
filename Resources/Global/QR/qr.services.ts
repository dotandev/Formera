import { v2 as cloudinary } from "cloudinary";
import qrcode from "qrcode";
import zlib from "zlib";
import { Request, Response } from "express";
import config from "../../../Config/config";

export class QrService {
    constructor() {
        // Configure Cloudinary
        cloudinary.config({
            cloud_name: config.db.cloudinary.CLOUDINARY_CLOUD_NAME,
            api_key: config.db.cloudinary.CLOUDINARY_API_KEY,
            api_secret: config.db.cloudinary.CLOUDINARY_API_SECRET,
        });
    }

    /**
     * Generate QR code and return as a PNG data URL
     * @param url - URL or text to encode in the QR code
     */
    public async generateQRCode(url: string): Promise<string> {
        try {
            return await qrcode.toDataURL(url, { width: 200 }); // Set width as needed
        } catch (error) {
            console.error("Error generating QR code:", error);
            throw new Error("Failed to generate QR code");
        }
    }

    /**
     * Compress a Base64 string using zlib
     * @param data - Base64 string of the QR code
     */
    public compressQRCode(data: string): Buffer {
        try {
            const base64Data = data.split(",")[1]; // Remove the data:image/png;base64, prefix
            const buffer = Buffer.from(base64Data, "base64");
            return zlib.deflateSync(buffer); // Compress using zlib
        } catch (error) {
            console.error("Error compressing QR code:", error);
            throw new Error("Failed to compress QR code");
        }
    }

    /**
     * Save QR code to Cloudinary
     * @param url - URL or text to encode in the QR code
     */
    public async saveQRCodeToCloudinary(url: string): Promise<string> {
        try {
            // Generate QR code as PNG and save to a local file
            const qrCodePath = "./qrcode.png"; // Local path to save PNG temporarily
            await qrcode.toFile(qrCodePath, url, { width: 200 });

            // Upload the PNG file to Cloudinary
            const result = await cloudinary.uploader.upload(qrCodePath, {
                folder: "qr-codes", // Cloudinary folder
                public_id: `qr_${Date.now()}`, // Unique public ID
            });

            console.log("QR Code uploaded to Cloudinary:", result.secure_url);
            return result.secure_url; // Return the Cloudinary URL
        } catch (error) {
            console.error("Error uploading QR code to Cloudinary:", error);
            throw new Error("Failed to upload QR code to Cloudinary");
        }
    }

    /**
     * Generate and respond with a QR code image in a web request
     * @param req - Express request
     * @param res - Express response
     */
    public async generateCodeForWeb(req: Request, res: Response): Promise<any> {
        try {
            const { url } = req.query; // URL to encode passed via query params
            if (!url || typeof url !== "string") {
                return res.status(400).send("Invalid or missing URL");
            }

            // Generate QR code as Base64
            const qrCodeImage = await this.generateQRCode(url);

            // Send the QR code as an embedded image
            res.setHeader("Content-Type", "text/html");
            res.send(`<img src="${qrCodeImage}" alt="QR Code" />`);
        } catch (error) {
            console.error("Error generating QR code for web:", error);
            res.status(500).send("Failed to generate QR code");
        }
    }
}













































// import { Request, Response } from "express";
// import { QRCode } from "jsqr";
// import qrcode from "qrcode";


// export class QrService {
//     constructor() { }

//     public async generateQRCode(url?: string): Promise<string> {
//         try {
//             let url = 'https://musvent.com';
//             const qrCodeImage = await qrcode.toDataURL(url);
//             // const processedQRCode = qrCodeImage.replace("data:image/png;base64,", "");
//             // const HTMLImage = `<img src="${qrCodeImage}" alt="QR Code" />`;
//             // const URL = `http://localhost:3000/api/v1/qr/save?data=${url}`;
//             // console.log(HTMLImage);
//             // // console.log(processedQRCode);
//             console.log(qrCodeImage);
//             // return qrCodeImage;
//             return qrCodeImage;
//         // } catch (error) {
//             throw new Error("Error generating QR Code onee");
//         }
//     }

//     public async generateCodeForWeb (req: Request, res: Response) {
//         try {
//             let url = 'https://musvent.com';
//             const qrCodeImage = await qrcode.toDataURL(url);
//             // const processedQRCode = qrCodeImage.replace("data:image/png;base64,", "");
//             // const HTMLImage = `<img src="${qrCodeImage}" alt="QR Code" />`;
//             // const URL = `http://localhost:3000/api/v1/qr/save?data=${url}`;
//             // console.log(HTMLImage);
//             // // console.log(processedQRCode);
//             console.log(qrCodeImage);
//             // return qrCodeImage;
//             return res.send(`<img src="${qrCodeImage}" alt="QR Code" />`);
//         } catch (error) {
//             throw new Error("Error generating QR Code onee");
//         }
//     }

//     // async decodeQRCode(imageData: ImageData): Promise<string> {
//     //     const code = new Promise<string>((resolve, reject) => {
//     //     const qrCode: QRCode = null as any;
//     //     if (qrCode) {
//     //         resolve(qrCode.data);
//     //     } else {
//     //         reject("Error decoding QR Code");
//     //     }
//     //     });
//     //     return code;
//     // }

//     // async saveQRCode(data: string): Promise<void> {
//     //     try {
//     //     const qrCode = await this.generateQRCode(data);
//     //     // Save the QR Code to the server
//     //     } catch (error) {
//     //     throw new Error("Error saving QR Code");
//     //     }
//     // }   


// }


// import zlib from "zlib";
// // import qrcode from "qrcode";

// async function generateAndCompressQRCode() {
//     const url = "https://bit.ly/3abcd"; // Shortened URL
//     const qrCodeImage = await qrcode.toDataURL(url); // Generate Base64 QR code

//     // Compress the Base64 string
//     const compressed = zlib.deflateSync(qrCodeImage);

//     console.log("Original Length:", qrCodeImage.length);
//     console.log("Compressed Length:", compressed.length);
//     console.log("Compression Ratio:", qrCodeImage.length / compressed.length);
//     console.log("Compressed Data:", compressed.toString("base64"));
//     console.log("Decompressed Data:", zlib.inflateSync(compressed).toString("base64"));

//     return compressed;
// }

// generateAndCompressQRCode()
//     .then((compressed) => {
//         console.log("Compression successful");
//     })
//     .catch((err) => {
//         console.error("Error:", err);
//     });
