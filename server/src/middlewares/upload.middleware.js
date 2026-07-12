import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9);

        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );
    },
});

// const fileFilter = (req, file, cb) => {

//     console.log(file);

//     if (file.mimetype.startsWith("image/")) {
//         cb(null, true);
//     } else {
//         cb(new Error("Only image files are allowed"), false);
//     }

// };

const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".jfif"];

const fileFilter = (req, file, cb) => {

    const ext = path.extname(file.originalname).toLowerCase();

    if (
        file.mimetype.startsWith("image/") ||
        allowedExtensions.includes(ext)
    ) {
        return cb(null, true);
    }

    cb(new Error("Only image files are allowed"));
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

export default upload;