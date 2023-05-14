const path = require('path');

const imagesService = () => {
  const getImagePath = async (category, filename) => {
    const imagesPath = path.join(__dirname, '../images');
    const imagePath = `${imagesPath}/${category}/${filename}`;
    return imagePath;
  };

  return {
    getImagePath,
  };
};

module.exports = imagesService();
