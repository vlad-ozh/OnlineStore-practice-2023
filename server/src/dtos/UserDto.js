const UserDto = (model) => ({
  id: model.id,
  email: model.email,
  name: model.name,
  isActivated: model.isActivated,
  isAuth: true,
  selectedProducts: model.selectedProducts,
  cart: model.cart,
});

module.exports = UserDto;
