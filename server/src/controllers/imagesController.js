const { imagesService } = require('../services');

module.exports = {
  getImage: async (req, res, next) => {
    try {
      const category = req.params.category;
      const filename = req.params.filename;

      const imagePath = await imagesService.getImagePath(category, filename);

      return res.sendFile(imagePath);
    } catch (error) {
      next(error);
    }
  },
};
