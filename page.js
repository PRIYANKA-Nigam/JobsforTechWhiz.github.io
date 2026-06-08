const slug =
new URLSearchParams(
window.location.search
).get("slug");

function loadPage(data){

    const page =
    data.feed.entry.find(item=>{

        const pageSlug =
        item.title.$t
        .toLowerCase()
        .replace(/[^a-z0-9]+/g,"-")
        .replace(/^-|-$/g,"");

        return pageSlug === slug;

    });

    if(!page){

        document.getElementById(
            "page-content"
        ).innerHTML =
        "<h2>Page not found</h2>";

        return;
    }
let content = page.content.$t;
content = content.replace(
    /Interview\s*Prep\s*For\s*Insiders/gi,
    "JobsForTechWhiz"
);
if(slug === "privacy-policy"){

    content = content.replace(
        /Last Updated:.*?</i,
        "Last Updated: 9 June 2026<"
    ); 

}

    document.title =
    page.title.$t;

   document.getElementById(
    "page-content"
).innerHTML = `
    <h1>${page.title.$t}</h1> 
    ${content}   
`;
}

const script =
document.createElement("script");

script.src =
"https://interviewprepforinsiders.blogspot.com/feeds/pages/default?alt=json-in-script&max-results=500&callback=loadPage";

document.body.appendChild(script);