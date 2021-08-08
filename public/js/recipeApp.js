// $(document).ready(() => {
//   $("#modal-button").click(() => {
//     $(".modal-body").html("");
//     $.get("/courses?format=json", (data) => {
//       data.forEach((course) => {
//         $(".modal-body").append(
//           `<div>
//             <span class="course-title">#{course.title}</span>
//             <div class="course-description">#{course.description}</div>
//           </div>
//           `
//         );
//
//   });
// });

// const myModal = document.getElementById("modal-button");

const myModal = new bootstrap.Modal(document.getElementById("modal-button"));

$.get("/courses?format=json", (data) => {
  if (myModal) {
    myModal.show();
  }
  data.forEach((course) => {
    $(".modal-body").append(
      `<div>
                  <span class="course-title">${course.title}</span>
                  <div class="course-description">${course.description}</div>
                </div>
                `
    );
  });
});
