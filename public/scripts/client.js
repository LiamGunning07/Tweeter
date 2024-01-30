/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
const createTweetElement = function(tweetData) {
  const $tweet = $(`
  <br>
  <article>
  <h5><img src= "${tweetData.user.avatars}"> ${tweetData.user.name}<span>${tweetData.user.handle}</span></h5> <p>${escape(tweetData.content.text)}</p>
  <footer>
  <time>${timeago.format(tweetData.user.created_at)}</time>
  <div class="icons">
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-share"></i>
    <i class="fa-solid fa-heart"></i>
    </div>
  </footer> 
  </article>`);

  return $tweet;
}

const renderTweets = function(tweets) {
$('.tweets-container').empty();
tweets.forEach(tweet => {
  $('.tweets-container').prepend(createTweetElement(tweet));
});
};


$(function() {

  $('#my-form').on('submit', function(event) {
    event.preventDefault(); // Prevent the default form submit action
    var formData = $(this).serialize(); // Serialize form data
    console.log("Form data", formData);

    if(formData.length == 5) {
      $('#validation-error-message')
        .text('Tweets must contain at least 1 character.')
        .slideDown(400) // Slide down with a duration of 400 milliseconds
        .delay(5000)    // Delay for 5 seconds
        .slideUp(400);  // Slide up with a duration of 400 milliseconds
      
      return;
      };
      
      if(formData.length > 145) {
        $('#validation-error-message')
          .text('Tweets must have less than 140 characters.')
          .slideDown(400)
          .delay(5000)
          .slideUp(400);
        
        return;
      };

    $.ajax({
      type: "POST",
      url: "/tweets", // Replace with your server endpoint
      data: formData,
      success: function(response) {
        loadTweets();
        $('#tweet-text').val(' ');
      },
      error: function(xhr, status, error) {
        // Handle errors (show error message, etc.)
        alert("An error occurred: " + error);
      }
    });
  });

  const $button = $('#load-more-posts');
  $button.on('click', function() {
      console.log('Button clicked, performing ajax call...');
      // Fix: Use $.ajax instead of $.ajax('more-posts.html', { method: 'GET' })
      $.ajax({
          url: "/tweets",
          method: 'GET',
      }).then(function(morePostsHtml) {
          console.log('Success: ', morePostsHtml);

          // Fix: Remove the extra 'Html)' and replaceWith with html() function
          $button.before(morePostsHtml);
      });
  });

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(tweets) {
        // Call renderTweets function to render tweets to the DOM
        renderTweets(tweets).prepend("");
      },
      error: function(error) {
        // Handle the error if the request fails
        console.error('Error fetching tweets:', error);
      }
    });
  }

  // Call the loadTweets function when the document is ready
  loadTweets();
});
