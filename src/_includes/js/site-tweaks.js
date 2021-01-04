<script>
window.onload = function () {
  if (localStorage.getItem("menu-scroll-position")) {
    document.getElementById("menu").scrollLeft = localStorage.getItem(
      "menu-scroll-position"
    );
  }
};
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});
var mybutton = document.getElementById("top-link");
window.onscroll = function () {
  if (
    document.body.scrollTop > 800 ||
    document.documentElement.scrollTop > 800
  ) {
    mybutton.style.visibility = "visible";
    mybutton.style.opacity = "1";
  } else {
    mybutton.style.visibility = "hidden";
    mybutton.style.opacity = "0";
  }
};
function menu_on_scroll() {
  localStorage.setItem(
    "menu-scroll-position",
    document.getElementById("menu").scrollLeft
  );
}
</script>