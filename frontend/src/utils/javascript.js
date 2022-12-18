function tabmenu(tabitems, contitems, index) {
  tabitems.forEach((item) => {
    item.classList.remove("menuActive");
    contitems.forEach((item) => {
      item.classList.remove("contentActive");
    });
  });
  tabitems[index].classList.add("menuActive");
  contitems[index].classList.add("contentActive");
}

// bread crump hrefs
export const routes = [
  { id: 1, path: "/courses", name: "دوره ها" },
  { id: 2, path: "/course/[slug]", name: "دوره ها" },
  { id: 3, path: "/blogs", name: "وبلاگ" },
  { id: 4, path: "/blog/[slug]", name: "وبلاگ" },
  { id: 5, path: "/about", name: "درباره" },
  { id: 6, path: "/contact", name: "تماس" },
];

function disableScroll() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };
}

export { tabmenu, disableScroll };
