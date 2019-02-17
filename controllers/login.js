exports.checklogin = (req, res, next) => {
  req.check('userName', 'User Name is empty').notEmpty();
  req.check('password', 'Password is invalid').isLength({
    min: 4
  });

  let errors = req.validationErrors();

  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
  } else {
    req.session.success = true;
  }
  res.redirect('/loginCheck');
};
