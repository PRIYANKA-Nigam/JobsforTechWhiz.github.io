const params =
new URLSearchParams(window.location.search);

const id =
params.get("id");

function loadPost(data){

    const post =
    data.feed.entry.find(
        item => item.id.$t.includes(id)
    );
const currentCategories =
post.category
? post.category.map(cat => cat.term)
: [];
    if(!post){

        document.getElementById(
            "post-content"
        ).innerHTML =
        "<h2>Post not found</h2>";

        return;
    }

    console.log(post.content.$t);

    let content = post.content.$t;

    content = content.replace(
        /src="\/\//g,
        'src="https://'
    );

//     const relatedPosts =
// data.feed.entry
// .filter(item =>

//     item.id.$t !== post.id.$t

// )
// .slice(0,4);

const relatedPosts =
data.feed.entry.filter(item => {

    if(item.id.$t === post.id.$t){
        return false;
    }

    if(!item.category){
        return false;
    }

    return item.category.some(cat =>
        currentCategories.includes(cat.term)
    );

}).slice(0,4);

console.log("Related:", relatedPosts.length);
console.log(relatedPosts);
    document.title =
    post.title.$t;

    document.getElementById(
        "post-content"
    ).innerHTML = `
        <h1>${post.title.$t}</h1>
        <div>${content}</div>
    `;
    const relatedContainer =
document.getElementById(
    "related-posts"
);

relatedContainer.innerHTML = "";
console.log(
document.getElementById("related-posts")
);
relatedPosts.forEach(item=>{

    const title =
    item.title.$t;

    const postId =
    item.id.$t.split("-").pop();

    relatedContainer.innerHTML += `

    <div class="related-card">

        <a href="post.html?id=${postId}">

        ${title}

        </a>

    </div>

    `;

});
}

const script =
document.createElement("script");

script.src =
"https://interviewprepforinsiders.blogspot.com/feeds/posts/default?alt=json-in-script&max-results=100&callback=loadPost";

document.body.appendChild(script);