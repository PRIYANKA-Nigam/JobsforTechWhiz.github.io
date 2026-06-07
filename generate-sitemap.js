const https = require("https");
const fs = require("fs");

https.get(
"https://interviewprepforinsiders.blogspot.com/feeds/posts/default?alt=json&max-results=100",
res => {

let data = "";

res.on("data", chunk => {
data += chunk;
});

res.on("end", () => {

const feed = JSON.parse(data);

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

sitemap += `
<url>
<loc>
https://priyanka-nigam.github.io/JobsforTechWhiz.github.io/
</loc>
</url>
`;

feed.feed.entry.forEach(post => {

const slug =
post.title.$t
.toLowerCase()
.replace(/[^a-z0-9]+/g,"-")
.replace(/^-|-$/g,"");

sitemap += `
<url>
<loc>
https://priyanka-nigam.github.io/JobsforTechWhiz.github.io/post.html?slug=${slug}
</loc>
</url>
`;

});

sitemap += `</urlset>`;

fs.writeFileSync(
"sitemap.xml",
sitemap
);

console.log("Sitemap generated");

});

});