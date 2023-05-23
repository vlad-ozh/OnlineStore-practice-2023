const { CategoryModel, ProductModel, UserModel } = require('../models');
const ApiError = require('../exceptions/apiError');
const { ProductDto } = require('../dtos');

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
      settingsFindProducts
    ).populate({
      path: 'category',
      select: 'name',
      model: 'Category',
    });

    const productsDto = products.map(product => ProductDto(product));

    return productsDto;
  };

  const getSearchProducts = async (searchData) => {
    const products = await ProductModel.find().populate({
      path: 'category',
      select: 'name',
      model: 'Category',
    });

    const productsFound = products.filter(product =>
      product.name.toLowerCase().includes(searchData.toLowerCase())
    );

    const productsDto = productsFound.map(product => ProductDto(product));

    return productsDto;
  };

  const getSelectedProducts = async (userId) => {
    const user = await UserModel.findOne({ id: userId });

    if (!user) {
      throw ApiError.NotFound();
    }

    const products = await ProductModel.find({
      id: { $in: user.selectedProducts },
    }).populate({
      path: 'category',
      select: 'name',
      model: 'Category',
    });
    const productsDto = products.map(product => ProductDto(product));

    return productsDto;
  };

  const getProductsInCart = async (userId) => {
    const user = await UserModel.findOne({ id: userId });

    if (!user) {
      throw ApiError.NotFound();
    }

    const products = await ProductModel.find({
      id: { $in: user.cart },
    }).populate({
      path: 'category',
      select: 'name',
      model: 'Category',
    });
    const productsDto = products.map(product => ProductDto(product));

    return productsDto;
  };

  return {
    getCategoryInfo,
    getProductsByBrand,
    getSearchProducts,
    getSelectedProducts,
    getProductsInCart,
  };
};

module.exports = productsService();
