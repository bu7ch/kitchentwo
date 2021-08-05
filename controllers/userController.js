const User = require("../models/user"),
  passport = require("passport"),
  getUserParams = (body) => {
    return {
      name: {
        first: body.first,
        last: body.last,
      },
      email: body.email,
      password: body.password,
      zipCode: body.zipCode,
    };
  };
exports.index = (req, res, next) => {
  User.find()
    .then((users) => {
      res.render("users/index", { users: users });
      next();
    })
    .catch((err) => {
      console.log(`Error fetching users: ${err.message}`);
      next(err);
    });
};

exports.new = (req, res, next) => {
  res.render("users/new");
};
exports.create = (req, res, next) => {
  let newUser = new User(getUserParams(req.body));
  User.create(newUser, req.body.password, (e, user) => {
    if (user) {
      req.flash("success", `${user.fullName}'s account created successfully`);
      res.redirect("/users");
      next();
    } else {
      req.flash("error", `Failed to create user account because ${e.message}`);
      res.redirect("/users/new");
      next();
    }
  });
};
exports.show = (req, res, next) => {
  let userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      res.render("users/show", { user: user });
      next();
    })
    .catch((err) => {
      console.log(`Error fetching user ID: ${error.message}`);
      next();
    });
};

exports.edit = (req, res, next) => {
  let userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      res.render("users/edit", { user: user });
      next();
    })
    .catch((err) => {
      console.log(`Error fetching user ID: ${error.message}`);
      next();
    });
};

exports.update = (req, res, next) => {
  let userId = req.params.id;
  usersParams = getUserParams(req.body);
  User.findByIdAndUpdate(userId, { $set: usersParams })
    .then((user) => {
      res.render("users/show", { user: user });
      next();
    })
    .catch((err) => {
      console.log(`Error updating user ID: ${error.message}`);
      next();
    });
};

exports.delete = (req, res, next) => {
  let userId = req.params.id;
  User.findByIdAndRemove(userId)
    .then(() => {
      res.redirect("/users");
      next();
    })
    .catch((err) => {
      console.log(`Error deleteing user ID: ${error.message}`);
      next();
    });
};
