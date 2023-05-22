const TokenDto = (model) => ({
  email: model.email,
  name: model.name,
  id: model._id,
  isActivated: model.isActivated,
});

module.exports = TokenDto;
