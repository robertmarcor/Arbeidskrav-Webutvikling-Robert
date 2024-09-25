export async function loadHeader() {
  const response = await fetch("../../header.html");
  const data = await response.text();
  document.body.insertAdjacentHTML("afterbegin", data);

  /**
   * Active Link logic, add css modifier based on window.pathname
   */
  const navLinks = document.querySelectorAll("nav a");
  const indexLink = document.getElementById("index-link");
  const currentPage = window.location.pathname;
  console.log(currentPage);

  navLinks.forEach((link) => {
    if (link.href.includes(`${currentPage}`)) {
      link.classList.add("active");
      indexLink.classList.remove("active");
    } else if (link.href.includes("")) {
      indexLink.classList.add("active");
    }
  });

  return Promise.resolve();
}
