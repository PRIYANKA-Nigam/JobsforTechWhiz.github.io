// const params =
// new URLSearchParams(window.location.search);

// const id =
// params.get("id");
const slug =
new URLSearchParams(
window.location.search
).get("slug");

function loadPost(data){


   const post =
data.feed.entry.find(item => {

const postSlug =
item.title.$t
.toLowerCase()
.replace(/[^a-z0-9]+/g,"-")
.replace(/^-|-$/g,"");

return postSlug === slug;

});

const summary =
post.content.$t
.replace(/<[^>]+>/g,'')
.substring(0,160);

const metaDesc =
document.querySelector(
'meta[name="description"]'
);

if(metaDesc){

metaDesc.setAttribute(
"content",
summary
);

}
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

    document.title =
post.title.$t +
" | JobsForTechWhiz";
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

let finalRelatedPosts = relatedPosts; //for the case when there r no relatable post

if(finalRelatedPosts.length === 0){

    finalRelatedPosts =
    data.feed.entry
    .filter(item =>
        item.id.$t !== post.id.$t
    )
    .slice(0,4);

}
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
finalRelatedPosts.forEach(item=>{

    const title =
    item.title.$t;

    const postId =
    item.id.$t.split("-").pop();

    let thumb = "";

if(item.media$thumbnail){
    thumb = item.media$thumbnail.url;
}

relatedContainer.innerHTML += `
<div class="related-card">

    ${thumb ? `
    <img
    src="${thumb}"
    class="related-thumb">
    ` : ""}

    <a href="post.html?slug=${slug}">
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