const topStoriesId = new XMLHttpRequest();
function getTopStoriesId() {
  topStoriesId.open(
    "GET",
    "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty",
    true
  );
  topStoriesId.onload = function () {
    if (this.status === 200) {
      getPosts(JSON.parse(this.responseText));
    }
  };
  topStoriesId.send();
}

function getPosts(posts) {
  // console.log(posts);
  posts.forEach((post) => {
    const topStories = new XMLHttpRequest();
    topStories.open(
      "GET",
      `https://hacker-news.firebaseio.com/v0/item/${post}.json?print=pretty`,
      true
    );
    topStories.send();
    topStories.onload = function () {
      updateUI(JSON.parse(topStories.responseText));
    };
  });
}

logged = false;
i = 1;
function updateUI(posts) {
  if (logged !== true) {
    // console.log(posts);

    console.log("This is a great example of speech syntheis in English");
  }
  logged = true;
  let date = new Date();
  date = Math.round(((Date.now() - posts.time) / 1000) % 24);

  //Checking if the post has no comments, but text
  if (!("kids" in posts) && "text" in posts) {
    document.querySelector(".posts-container").innerHTML += `        
    <div class="post">
    <span class="post-score">${posts.score}</span>
    <span class="post-title"><a href="${posts.url}">${posts.title}</a></span>
    <div class="info"><i class="post-by">${posts.by}</i> <span class="time">| ${date} hours ago</span> | <span class="comments">0 comments</span></div>
    <div class="post-text">${posts.text}</div>
  </div>`;
    console.log(posts);
    document.querySelector(".post").addEventListener("click", () => {
      console.log("m");
    });
  } else if ("kids" in posts && !("text" in posts)) {
    document.querySelector(".posts-container").innerHTML += `        
    <div class="post">
    <div class="post-score">${posts.score} ↑</div>
    <span class="post-title"><a href="${posts.url}">${posts.title}</a></span  >
    <div class="info"><i class="post-by">${posts.by}</i>  <span class="time">| ${date} hours ago</span> | <span class="comments">${posts.kids.length} comments</span></div>
  </div>`;
    [...document.querySelectorAll(".post")].forEach((el) => {
      el.addEventListener("click", (e) => {
        console.log(e.target)
        if (e.target.classList.contains("comments")) {
          alert("mme");
        }
      });
    });
  }
}
getTopStoriesId();
