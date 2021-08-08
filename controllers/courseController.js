const Course = require("../models/course");
const htppStatus = require("http-status-codes");

exports.index = (req, res, next) => {
  Course.find()
    .then((courses) => {
      if (req.query.format === "json") {
        res.json(courses);
      } else {
        res.render("courses/index", { courses: courses });
        next();
      }
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

exports.respondJSON = (req, res) => {
  res.json({
    status: htppStatus.StatusCodes.OK,
    data: res.locals,
  });
};

exports.errorJSON = (req,res, next) => {
  let errorObject;

  if(error){
    errorObject = {
      status: httpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message
    }
  } else {
    errorObject = {
      status: httpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Erreur inconnue"
    }
  }

  res.json(errorObject);
}