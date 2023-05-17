const ProductDto = (model) => ({
  id: model.id,
  name: model.name,
  brand: model.brand,
  category: model.category.name,
  price: model.price,
  description: model.description,
  image: model.image,
  salesCount: model.salesCount,
  characteristics: model.characteristics,
});

module.exports = ProductDto;
