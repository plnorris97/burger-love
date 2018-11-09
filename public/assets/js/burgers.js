// Make sure we wait to attach our handlers until the DOM is fully loaded.
// burger-block handlebars
$(function() {
    $("#eat-burger").on("click", function(event) {
        console.log("got here");
      var id = $(this).data("id");
      var newBurger = $(this).data("newdevoured");
        console.log(newBurger);

      var newBurgerState = {
        devoured: !newBurger
      };
      console.log(newBurgerState);
      location.reload();

      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newBurgerState
      }).then(
        function() {
          console.log("changed devoured to", newBurger);
          // Reload the page to get the updated list
          location.reload();
        }
    );
    });
//   Main Handlebars
    $("#create-burger").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        console.log("got here");
        event.preventDefault();

        console.log($("#burg").val());
        var newItem = {
        burger_name: $("#burg").val().trim(),
        devoured: 0,
        };
        console.log(newItem);

        // Send the POST request.
        $.ajax("/api/burgers", {
        type: "POST",
        data: newItem
        }).then(
        function() {
            console.log("created new burger");
            // Reload the page to get the updated list
            location.reload();
        }
        );
    });
});
