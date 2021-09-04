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

const myModal = document.getElementById("modal-button");
$(document).ready(() => {
  $("#modal-button").click(() => {
    $.get("/api/courses", (results = {}) => {
      if (myModal) {
        myModal.addEventListener("show.bs.modal", function (event) {});
      }
      let data = results.data;
      if (!data || !data.courses) return;
      data.courses.forEach((course) => {
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
      });
    }).then(() => {
      addJoinButtonListener();
    });
  });
});

let addJoinButtonListener = () => {
  $(".join-button").click(event => {
    let $button = $(event.target),
      courseId = $button.data("id");
    $.get(`/api/courses/${courseId}/join`, (results = {}) => {
      let data = results.data;
      if (data && data.success) {
        $button
          .text("Joined")
          .addClass("joined-button")
          .removeClass("join-button");
      } else {
        $button.text("Try again");
      }
    });
  });
};

// var myModal = document.getElementById('myModal')
// if(myModal){
//   myModal.addEventListener('show.bs.modal', function (event) {
//     // // // Button that triggered the modal
//     // var button = event.relatedTarget
//     // // Extract info from data-bs-* attributes
//     // var recipient = button.getAttribute('data-bs-whatever')
//     // // If necessary, you could initiate an AJAX request here
//     // // and then do the updating in a callback.
//     // //
//     // // Update the modal's content.
//     // var modalTitle = exampleModal.querySelector('.modal-title')
//     // var modalBodyInput = exampleModal.querySelector('.modal-body input')

//     // modalTitle.textContent = 'New message to ' + recipient
//     // modalBodyInput.value = recipient
//   })
// }
