const Course = require("../models/course");

exports.index = (req, res, next) => {
  Course.find()
    .then((courses) => {
      next();
      res.render("courses/index", { courses: courses });
    })
    .catch((error) => {
      console.log(`Eror fetching courses: ${error.message}`);
      next(error);
    });
};
exports.new = (req, res, next) => {
  res.render("courses/new");
};
exports.create = (req, res, next) => {
  let newCourse = new Course(req.body);
  Course.create(newCourse)
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
