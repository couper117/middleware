import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
    image: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model('Product', productSchema, 'products');

//Multer is a Node.js middleware for Express that handles multipart/form-data, primarily used for uploading files. It processes file uploads, storing them on disk or in memory, and adds file/field data to the req.file or req.files objects. It is essential for managing image, video, or document uploads