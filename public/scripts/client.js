/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const createTweetElement = function(tweetData) {
  const $tweet = $(`<article>
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

const $tweet = createTweetElement(tweetData);

console.log($tweet);
console.log($('.tweets-container'));
$('.tweets-container').append($tweet);