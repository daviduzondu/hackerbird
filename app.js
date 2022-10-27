const topStoriesId = new XMLHttpRequest();
let loadBar = document.querySelector(".loadbar");

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
      updateUI(JSON.parse(topStories.responseText), posts.length);
    };
  });
}

logged = false;
i = 0;

function updateUI(posts, postx) {
  // loadBar.setAttribute("style", `width:${(i / postx) * 100}%`);

  loadBar.style.width = `${Math.floor((i / postx) * 100)}%`;
  if (localStorage.getItem("i") === "500") {
    i = 500;
  } else {
    i++;
  }
  switch (loadBar.style.width) {
    case "10%":
      document.querySelector(".loading-message").innerText =
        "Fetching posts...";
      break;

    case "25%":
      document.querySelector(".loading-message").innerText =
        "Rendering page...";
      break;
    case "50%":
      document.querySelector(".loading-message").innerText =
        "Hang on, we're halfway done...";
      break;
    case "75%":
      document.querySelector(".loading-message").innerText = "Almost there...";
      break;
    case "99%":
      document.querySelector(".loading-message").innerText = "Welcome";
      break;
    default:
      break;
  }
  if (logged !== true) {
    console.log(posts);
    // console.log("This is a great example of speech syntheis in English");
  }
  logged = true;
  let date = new Date();
  date = Math.round(((Date.now() - posts.time) / 1000) % 24);

  //Checking if the post has no comments, but text
  if (!("kids" in posts) && "text" in posts) {
    document.querySelector(".posts-container").innerHTML += `        
    <div class="post">
    <span class="post-score">↑ ${posts.score}</span>
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
    <div class="post-score">↑ ${posts.score}</div>
    <span class="post-title"><a href="${posts.url}">${posts.title}</a></span  >
    <div class="info"><i class="post-by">${posts.by}</i>  <span class="time">| ${date} hours ago</span> | <span class="comments">${posts.kids.length} comments</span></div>
  </div>`;
    [...document.querySelectorAll(".post")].forEach((el) => {
      el.addEventListener("click", (e) => {
        console.log(e.target);
        if (e.target.classList.contains("comments")) {
          alert("mme");
        }
      });
    });
  }
  checkDOMLoaded(i, postx);
}
getTopStoriesId();

function checkDOMLoaded(i, postx) {
  if (i === postx) {
    localStorage.setItem("i", "500");
    console.log(localStorage.i);
    console.log("The i is", i);
    document.querySelector(".app-container").classList.remove("hidden");
    document.querySelector(".loading").classList.add("hidden");
  }
}

document.querySelector(".app-container").classList.add("hidden");