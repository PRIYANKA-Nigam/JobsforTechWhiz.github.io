const btn =
document.getElementById(
"theme-toggle"
);

const savedTheme =
localStorage.getItem("theme");

if(savedTheme==="dark"){
document.body.classList.add("dark");
}

btn.addEventListener(
"click",
()=>{

document.body.classList.toggle(
"dark"
);

localStorage.setItem(
"theme",
document.body.classList.contains(
"dark"
)
?
"dark"
:
"light"
);

});