const Course = require("../models/course");
const htppStatus = require("http-status-codes");
const User = require("../models/user");

exports.index = (req, res, next) => {
  Course.find({}).then((courses) => {
    res.locals.courses = courses;
    next();
    res.render("courses/index", { courses: courses });
  });
};
exports.new = (req, res, next) => {
  res.render("courses/new");
};
exports.create = (req, res, next) => {
  const courseParams = new Course(req.body);
  Course.create(courseParams)
    .then((course) => {
      course;
      res.redirect("/courses");
      next();
    })
    .catch((error) => {
      console.log(`Error saving course :${error.message}`);
      next(error);
    });
};
exports.show = (req, res, next) => {
  let courseId = req.params.id;
  Course.findById(courseId)
    .then((course) => {
      res.render("courses/show", { course: course });
      next();
    })
    .catch((error) => {
      console.log(`Error fetching course by ID :${error.message}`);
      next(error);
    });
};
exports.edit = (req, res, next) => {
  let courseId = req.params.id;
  Course.findById(courseId)
    .then((course) => {
      res.render("courses/edit", { course: course });
      next();
    })
    .catch((error) => {
      console.log(`Error fetching course by ID :${error.message}`);
      next(error);
    });
};
exports.update = (req, res, next) => {
  let courseId = req.params.id;
  Course.findByIdAndUpdate(courseId, { $set: req.body })
    .then((course) => {
      res.render(`courses/${courseId}`, { course: course });
      next();
    })
    .catch((error) => {
      console.log(`Error fetching course by ID :${error.message}`);
      next(error);
    });
};
exports.delete = (req, res, next) => {
  let courseId = req.params.id;
  Course.findByIdAndRemove(courseId, { $set: req.body })
    .then(() => {
      res.redirect("/courses");
      next();
    })
    .catch((error) => {
      console.log(`Error deleting course by ID :${error.message}`);
      next();
    });
};
exports.respondJSON = (req, res) => {
  res.json({
    status: htppStatus.StatusCodes.OK,
    data: res.locals,
  });
  console.log(res.locals);
};
exports.errorJSON = (req, res, next) => {
  let errorObject;

  if (error) {
    errorObject = {
      status: httpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  } else {
    errorObject = {
      status: httpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Erreur inconnue",
    };
  }

  res.json(errorObject);
};
exports.join = (req, res, next) => {
  let courseId = req.params.id;
  currentUser = req.user;

  if (currentUser) {
    User.findByIdAndUpdate(currentUser, {
      $addToSet: {
        courses: courseId,
      },
    })
      .then(() => {
        res.locals.success = true;
        next();
      })
      .catch((err) => {
        next(err);
      });
  } else {
    next(new Error("User must log in"));
  }
};

exports.filterUserCourses = (req, res, next) => {
  let currentUser = res.locals.currentUser;
  if (currentUser) {
    let mappedCourses = res.locals.courses.map((course) => {
      let userJoined = currentUser.course.some((userCourse) => {
        return userCourse.equals(course._id);
      });
      return Object.assign(course.toObject(), { joined: userJoined });
    });
    res.locals.courses = mappedCourses;
    next();
  } else {
    next();
  }
};
