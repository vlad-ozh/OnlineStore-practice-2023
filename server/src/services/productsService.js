const { CategoryModel, ProductModel } = require('../models');
const ApiError = require('../exceptions/apiError');

const productsService = () => {
  const getCategoryInfo = async (categoryName) => {
    const category = await CategoryModel.findOne({ name: categoryName });

    if (!category) {
      throw ApiError.NotFound();
    }

    const products = await ProductModel.find({
      category,
    }).populate({
      path: 'category',
      select: 'name',
      model: 'Category',
    });

    let categoryBrands = [];

    products.forEach(product => {
      const brand = product.brand;

      if (!categoryBrands.includes(brand)) {
        categoryBrands.push(brand);
      }
    });

    categoryBrands.sort((a, b) => a.localeCompare(b));

    return {
      name: category.name,
      brands: categoryBrands,
    };
  };

  const getProductsByBrand = async (categoryName, brand) => {
    const category = await CategoryModel.findOne({ name: categoryName });
    console.log('🚀 ~ getProductsByBrand ~ category:', category);

    if (!category) {
      throw ApiError.NotFound();
    }

    let settingsFindProducts = {};

    if (brand === 'all') {
      settingsFindProducts = { category };
    } else {
      settingsFindProducts = { category, brand };
    }

    const products = await ProductModel.find(
      settingsFindProducts,
    ).populate({
      path: 'category',
      select: 'name',
      model: 'Category',
    });

    return products;
  };

  return {
    getCategoryInfo,
    getProductsByBrand,
  };
};

module.exports = productsService();
