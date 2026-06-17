

function openBuyDialog(){

    document.getElementById(
        "buyDialog"
    ).style.display = "block";

}

function closeBuyDialog(){

    document.getElementById(
        "buyDialog"
    ).style.display = "none";

}

window.onclick = function(e){

    const dialog =
    document.getElementById("buyDialog");

    if(e.target === dialog){

        closeBuyDialog();

    }

};



document.addEventListener(
"DOMContentLoaded",
function(){

   const btn =
   document.querySelector(".buy-nav");

   if(btn){

      btn.addEventListener(
      "click",
      function(e){

         e.preventDefault();

         openBuyDialog();

      });

   }

});

/*loading buy now dialog box dynamically */
fetch("buy_now_dialog.html")
.then(r => r.text())
.then(html => {

    document.body.insertAdjacentHTML(
        "beforeend",
        html
    );

});