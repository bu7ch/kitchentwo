const Subscriber = require("../models/subscriber");

const getSubscriberParams = (body) => {
  return {
    name: body.name,
    email: body.email,
    zipCode: parseInt(body.zipCode),
  };
};

exports.index = (req, res, next) => {
  Subscriber.find()
    .then((subscribers) => {
      res.render("subscribers/index", { subscribers: subscribers });
      next();
    })
    .catch((err) => {
      console.log(`Error fetching subscribers: ${err.message}`);
      next(err);
    });
};

exports.new = (req, res) => {
  res.render("subscribers/new");
};

exports.create = (req, res, next) => {
  let newSubscriber = getSubscriberParams(req.body);
  Subscriber.create(newSubscriber)
    .then((subscriber) => {
      subscriber;
      res.redirect("/subscribers");
      next();
    })
    .catch((err) => {
      console.log(`Error saving new subscriber ${err.message}`);
      next(err);
    });
};

exports.show = (req, res, next) => {
  let subscriberId = req.params.id;
  Subscriber.findById(subscriberId)
    .then((subscriber) => {
      res.render("subscribers/show", { subscriber: subscriber });
      next();
    })
    .catch((error) => {
      console.log(`Error fetching subscriber by ID :${error.message}`);
      next(error);
    });
};
exports.edit = (req, res, next) => {
  let subscriberId = req.params.id;
  Subscriber.findById(subscriberId)
    .then((subscriber) => {
      res.render("subscribers/edit", { subscriber: subscriber });
      next();
    })
    .catch((error) => {
      console.log(`Error fetching subscriber by ID :${error.message}`);
      next(error);
    });
};
exports.update = (req, res, next) => {
  let subscriberId = req.params.id;
  Subscriber.findByIdAndUpdate(subscriberId, { $set: req.body })
    .then((subscriber) => {
      res.render(`/subscribers`);
      next();
    })
    .catch((error) => {
      console.log(`Error fetching subscriber by ID :${error.message}`);
      next(error);
    });
};
exports.delete = (req, res, next) => {
  let subscriberId = req.params.id;
  Subscriber.findByIdAndRemove(subscriberId, { $set: req.body })
    .then(() => {
      res.redirect("/subscribers");
      next();
    })
    .catch((error) => {
      console.log(`Error deleting subscriber by ID :${error.message}`);
      next();
    });
};
