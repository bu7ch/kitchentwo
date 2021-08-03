const express = require('express'),
app = express(),
port = process.env.PORT || 3000,
coursesController = require('./controllers/courseController'),
router = express.Router();




router.get('/courses', coursesController.index);
router.get('/courses/new', coursesController.new);
router.post('/courses/create', coursesController.create);
router.get('/courses/:id', coursesController.show);
router.get('/courses/:id/edit', coursesController.edit);
router.put('/courses/:id/update', coursesController.update);
router.delete('/courses/:id/delete', coursesController.delete);



app.use("/", router);

app.listen(port, ()=>{
  console.log(`Server is running on port: ${port}`);
});