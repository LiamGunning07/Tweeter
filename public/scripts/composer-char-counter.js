$(document).ready(function () {
  // Use an appropriate selector for the textarea element inside the .new-tweet section
  $(".new-tweet textarea").on("input", function () {
    // Your event handling code goes here
    let characterCount = $(this).val().length;
    let remainingCharacters = 140 - characterCount;

    // Update the character count in the output element
    $(".counter").text(remainingCharacters);

    if ( remainingCharacters < 0) { // Logic for counter color when user exceeds character limit
      $(".counter").addClass("over-limit");
    } else {
      $(".counter").removeClass("over-limit");
    }
  });
});