document.addEventListener("DOMContentLoaded", function () {
  // Load saved likes and comments from localStorage
  loadSavedData();

  // Handle like button clicks
  document.querySelectorAll(".like-btn").forEach(button => {
      button.addEventListener("click", function () {
          let likeCount = this.querySelector(".like-count");
          let photoId = this.getAttribute("data-photo");
          let currentLikes = parseInt(localStorage.getItem(`likes-${photoId}`)) || 0;
          currentLikes++;
          localStorage.setItem(`likes-${photoId}`, currentLikes);
          likeCount.textContent = currentLikes;
      });
  });

  // Handle comment submissions
  document.querySelectorAll(".comment-btn").forEach(button => {
      button.addEventListener("click", function () {
          let commentInput = this.previousElementSibling;
          let commentText = commentInput.value.trim();
          let commentList = this.nextElementSibling;
          let photoId = this.getAttribute("data-photo");
          
          if (commentText !== "") {
              let newComment = document.createElement("li");
              newComment.textContent = commentText;
              commentList.appendChild(newComment);
              saveComment(photoId, commentText);
              commentInput.value = ""; // Clear input field
          }
      });
  });

  // Handle save for later functionality
  document.querySelectorAll(".save-btn").forEach(button => {
    button.addEventListener("click", function () {
        let photoSrc = this.closest(".photo-item").querySelector("img").getAttribute("src");
        let savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

        if (!savedItems.includes(photoSrc)) {
            savedItems.push(photoSrc);
            localStorage.setItem("savedItems", JSON.stringify(savedItems));
            alert(`You now have ${savedItems.length} item(s) saved for later.`);
        } else {
            alert("This item is already saved.");
        }
    });
  });

  // Show/hide comments using jQuery
  $(".comment-section").hide();
  $(".comment-btn").click(function () {
      $(this).next(".comment-section").slideToggle();
  });

  // Dropdown menu effect
  $("header").hover(
      function () {
          $("nav ul").slideDown();
      },
      function () {
          $("nav ul").slideUp();
      }
  );

  // Display saved items in saveForLater.html
  document.addEventListener("DOMContentLoaded", function () {
    let savedItemsContainer = document.getElementById("saved-items-container");
    let savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

    console.log("Saved Items:", savedItems);

    if (savedItems.length > 0) {
        savedItemsContainer.innerHTML = "";
        savedItems.forEach(photoSrc => {
            let img = document.createElement("img");
            img.src = photoSrc;
            img.alt = "Saved Photo";
            img.classList.add("saved-image");
            savedItemsContainer.appendChild(img);
        });
    } else {
        console.log("No saved items found.");
    }
});

// ... rest of the code remains the same ...

  // Load saved data from localStorage
  function loadSavedData() {
      document.querySelectorAll(".like-btn").forEach(button => {
          let photoId = button.getAttribute("data-photo");
          let likeCount = button.querySelector(".like-count");
          let savedLikes = localStorage.getItem(`likes-${photoId}`);
          if (savedLikes) {
              likeCount.textContent = savedLikes;
          }
      });

      document.querySelectorAll(".comment-list").forEach(list => {
          let photoId = list.getAttribute("data-photo");
          let savedComments = JSON.parse(localStorage.getItem(`comments-${photoId}`)) || [];
          savedComments.forEach(comment => {
              let newComment = document.createElement("li");
              newComment.textContent = comment;
              list.appendChild(newComment);
          });
      });
  }

  // Save comments to localStorage
  function saveComment(photoId, comment) {
      let savedComments = JSON.parse(localStorage.getItem(`comments-${photoId}`)) || [];
      savedComments.push(comment);
      localStorage.setItem(`comments-${photoId}`, JSON.stringify(savedComments));
  }
});
