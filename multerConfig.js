const multer = require('multer');
const path = require('path');

module.exports.setup = (res, req, next) => {
  const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
      );
    },
  });

  const upload = multer({
    storage: storage,
    limits: { fileSize: 80 },
  })

  return upload.single('csv');
};

