// router.post("/user", authenticate, upload.single("avatar"), ctrl.addAvatar);
// router.post("/user", authenticate, upload.single("recipeImg"), ctrl.addAvatar);
// //upload
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        console.log(file.originalname, "upload");
        // Determine the folder based on file properties or request data
        let folder;
        if (file.fieldname === "avatar") {
            folder = "avatars";
        } else if (file.fieldname === "thumb") {
            folder = "thumbs";
        } else {
            folder = "misc";
        }
        const filename = path.parse(file.originalname).name;

        return {
            folder: folder,
            allowed_formats: ["jpg", "jpeg", "png"], // Adjust the allowed formats as needed
            public_id: filename, // Use original filename as the public ID
            transformation: [
                { width: 350, height: 350 },
                { width: 700, height: 700 },
            ],
        };
    },
});

const upload = multer({ storage });

module.exports = upload;

// //controller
// const someFunc = async (req, res) => {
//   const avatarURL = req.file.path;
// };
