const UserDto = (model) => {
  const cart = model.cart.map(product => ({
    id: product.id,
    amount: product.amount,
  }));

  return {
    id: model.id,
    email: model.email,
    name: model.name,
    isActivated: model.isActivated,
    isAuth: true,
    selectedProducts: model.selectedProducts,
    cart,
  };
};

module.exports = UserDto;
