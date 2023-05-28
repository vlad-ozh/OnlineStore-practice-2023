const ProductDto = (model) => {
  const reviews = model.reviews.map(review => ({
    id: review.id,
    userId: review.userId,
    userName: review.userName,
    rating: review.rating,
    text: review.text,
    date: review.date,
  }));

  return {
    id: model.id,
    name: model.name,
    brand: model.brand,
    category: model.category.name,
    price: model.price,
    description: model.description,
    image: model.image,
    salesCount: model.salesCount,
    amount: model.amount,
    reviews,
    characteristics: model.characteristics,
  };
};

module.exports = ProductDto;
