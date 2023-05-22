const UserDto = (model) => ({
  id: model.id,
  email: model.email,
  name: model.name,
  isActivated: model.isActivated,
  isAuth: true,
  selectedProducts: model.selectedProducts,
});

module.exports = UserDto;
