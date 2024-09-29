export async function loadHeader() {
  const response = await fetch("../../header.html");
  const data = await response.text();
  document.body.insertAdjacentHTML("afterbegin", data);
  /**
   * Active Link logic, add css modifier based on window.pathname
   */
  const navLinks = document.querySelectorAll("nav a");
  const currentPage = window.location.pathname;
  console.log(currentPage);

  navLinks.forEach((link) => {
    if (link.href.includes(`${currentPage}`)) {
      link.classList.add("active");
    }
  });

  return Promise.resolve();
}

/* function createHeader() {
  const header = document.createElement("header");
  header.innerHTML = `<header>
    <div class="header-container">
        <a href="gathering-army.html">
            <h1 class="text-3xl font-semibold">CLOTH TING</h1>
        </a>
        <p class="flex mt-auto font-semibold shadow-lg"><i class="fa-solid fa-coins"></i>Bonus:
            <span id="resource"></span>
        </p>
        <a href="your-army.html" class="ml-auto"><i class="fa-solid fa-bag-shopping text-3xl"></i></a>
    </div>
    <nav>
        <ul class="nav-container">
            <li><a href="gathering-army.html" class="text-gray-500" id="index-link">SHOP</a></li>
            <li><a href="getting-resources.html" class="text-gray-500">MEMBER BONUS</a></li>
        </ul>
    </nav>
</header>`;
  document.body.insertAdjacentElement("afterbegin", header);
} */
