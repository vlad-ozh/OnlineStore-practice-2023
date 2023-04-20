const UserDto = (model) => ({
  email: model.email,
  name: model.name,
  id: model._id,
  isActivated: model.isActivated,
  isAuth: true,
});

module.exports = UserDto;
