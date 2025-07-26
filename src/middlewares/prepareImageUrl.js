import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const prepareImageUrl = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
      return next();
    }

    let imageUrl;

    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      imageUrl = await saveFileToCloudinary(file);
    } else {
      imageUrl = await saveFileToUploadDir(file);
    }

    req.body.img = imageUrl;

    next();
  } catch (error) {
    next(error);
  }
};
