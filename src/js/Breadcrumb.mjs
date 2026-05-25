export function loadBreadcrumb(){
  const breadCrumbUl = document.getElementById("breadcrumb");
  if (!breadCrumbUl) return;

  // this will return the complete path
  const path = window.location.pathname;
  // this will generate an array of strings with each segment of the url path
  const segments = path.split("/").filter(segment => segment !== "");


  let currentPath = "/";

  const homeLi = document.createElement("li");
  homeLi.className = "breadcrumb-item";
  homeLi.innerHTML = `<a href="${currentPath}">Home</a>`;
  breadCrumbUl.appendChild(homeLi);

  // this generates the full path depending on the items in the array
  segments.forEach((segment, index) => {
    let cleanSegment = segment.replace(".html", "");
    currentPath += segment + (index === segments.length -1 ? "" : "/");

    const li = document.createElement("li");
    li.className = "breadcrumb-item";

    const itemText = cleanSegment
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    if (index === segments.length -1) {
      li.classList.add("active");
      li.setAttribute("aria-current", "page");
      li.textContent = itemText;
    }else {
      li.innerHTML = `<a href="${currentPath}">${itemText}</a>`;
    }
    breadCrumbUl.appendChild(li);
  });
}
