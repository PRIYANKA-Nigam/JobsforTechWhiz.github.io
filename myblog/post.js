const params =
new URLSearchParams(window.location.search);

const postId =
params.get("id");

const feedUrl =
"https://interviewprepforinsiders.blogspot.com/feeds/posts/default?alt=json&max-results=500";

fetch(feedUrl)
.then(response => response.json())
.then(data => {

    const posts =
    data.feed.entry;

    const post =
    posts.find(item =>
        item.id.$t.includes(postId)
    );

    if(post){

        document.title =
        post.title.$t;

        document.getElementById("post-content")
        .innerHTML = `

        <h1>${post.title.$t}</h1>

        <div>

        ${post.content.$t}

        </div>

        `;
    }

});