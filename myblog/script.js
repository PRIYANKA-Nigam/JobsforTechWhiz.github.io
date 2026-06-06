function loadPosts(data){
console.log(
  "Total Blogger Posts:",
  data.feed.openSearch$totalResults.$t
);
console.log(
      "Posts Returned:",
      data.feed.entry.length
    );
    const posts = data.feed.entry;

    const container =
    document.getElementById("posts-container");

    container.innerHTML = "";

    posts.forEach(post => {

        const title = post.title.$t;

        const content =
        post.content.$t
        .replace(/<[^>]+>/g,'');

        const summary =
        content.substring(0,200);

        const postUrl =
        post.link.find(
            l => l.rel === "alternate"
        ).href;

        container.innerHTML += `
        <div class="post-card">

            <h2>${title}</h2>

            <p>${summary}...</p>

            <a class="read-more"
               href="${postUrl}"
               target="_blank">

               Read More

            </a>

        </div>
        `;
    });

}

const script =
document.createElement("script");

script.src =
"https://interviewprepforinsiders.blogspot.com/feeds/posts/default?alt=json-in-script&max-results=35&callback=loadPosts";

document.body.appendChild(script);