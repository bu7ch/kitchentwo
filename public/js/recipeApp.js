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

$.get("/courses?format=json", (results = {}) => {
  if (myModal) {
    myModal.show();
  }
  let data = results.data;
  if (!data || !data.courses) return;
  data.courses
    .forEach((course) => {
      $(".modal-body").append(
        `<div>
                  <span class="course-title">${course.title}</span>
                  <button class='button 
                  ${
                    course.joined ? "joined-button" : "join-button"
                  }' data-id="${course._id}"> 
                  ${course.joined ? "Joined" : "Join"} 
                  </button>
                  <div class="course-description">${course.description}</div>
                </div>
                `
      );
    })
    .then(() => {
      addJoinButtonListener();
    });
});

let addJoinButtonListener = () => {
  $.course(".join-button").click((event) => {
    let $button = $(event.target),
      courseId = $button.data("id");
    $.get(`/api/courses/${courseId}/join`, (results = {}) => {
      let data = results.data;
      if (data && data.success) {
        $button
          .text("Joined")
          .addClass("joined-button")
          .removeCLass("join-button");
      } else {
        $button.text("Try Again");
      }
    });
  });
};
