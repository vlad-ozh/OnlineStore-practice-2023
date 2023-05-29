const { CategoryModel, ProductModel, UserModel } = require('../models');
const ApiError = require('../exceptions/apiError');
const { ProductDto, CategoryDto } = require('../dtos');
const uuid = require('uuid');

const productsService = () => {
  const getCategoryInfo = async (categoryName) => {
    const category = await CategoryModel.findOne({ name: categoryName });

    if (!category) {
      throw ApiError.NotFound();
    }

    return CategoryDto(category);
  };

  const getCategories = async () => {
    const categories = await CategoryModel.find();
    const categoriesDto = categories.map(category => CategoryDto(category));

    return categoriesDto;
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

    const productIds = user.cart.map(product => product.id);

    const products = await ProductModel.find({
      id: { $in: productIds },
    }).populate({
      path: 'category',
      select: 'name',
      model: 'Category',
    });

    const productsAvailable = products.filter(product => product.amount > 0);

    if (productsAvailable.length !== user.cart.length) {
      const productsAvailableIds = productsAvailable.map(product => product.id);

      user.cart = user.cart.filter(product =>
        productsAvailableIds.includes(product.id)
      );

      await user.save();
    }

    const productsDto = productsAvailable.map(product => ProductDto(product));

    return productsDto;
  };

  const getProduct = async (productId) => {
    const product = await ProductModel.findOne({
      id: productId,
    }).populate({
      path: 'category',
      select: 'name',
      model: 'Category',
    });

    if (!product) {
      throw ApiError.NotFound();
    }

    const productDto = ProductDto(product);

    return productDto;
  };

  const createReview = async (userId, productId, rating, text) => {
    const product = await ProductModel.findOne({
      id: productId,
    });

    if (!product) {
      throw ApiError.NotFound();
    }

    const user = await UserModel.findOne({ id: userId });

    const getDate = () => {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}.${month}.${year}`;
    };

    product.reviews.unshift({
      id: uuid.v4(),
      userName: user.name,
      userId: user.id,
      rating,
      text,
      date: getDate(),
    });

    await product.save();

    const productDto = ProductDto(product);

    return productDto;
  };

  return {
    getCategoryInfo,
    getCategories,
    getProductsByBrand,
    getSearchProducts,
    getSelectedProducts,
    getProductsInCart,
    getProduct,
    createReview,
  };
};

module.exports = productsService();
