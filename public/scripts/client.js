/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
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
  <h5><img src= "${tweetData.user.avatars}"> ${tweetData.user.name}<span>${tweetData.user.handle}</span></h5>     <p>${tweetData.content.text}</p>
  <footer>
  <time>${tweetData.user.created_at}</time>
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
tweets.forEach(tweet => {
  $('.tweets-container').append(createTweetElement(tweet));
});
};


$(function() {
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
        renderTweets(tweets);
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
