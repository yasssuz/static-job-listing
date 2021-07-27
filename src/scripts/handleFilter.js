import { getAllQueries, getQuery } from "./utils";

let filters = [];

export function handleFilterBar() {
  const bar = getQuery(".header__filter-options");
  const main = getQuery(".app");

  if (bar.firstElementChild == null) {
    bar.parentElement.style.display = "none";
    main.classList.remove("filtering");
    return;
  }

  bar.parentElement.style.display = "flex";
  main.classList.add("filtering");
}

function validateFilterOptions(newOpt) {
  const options = getAllQueries(".header__filter-options li");

  options.forEach(opt => {
    if (opt.firstElementChild.textContent === newOpt) {
      throw new Error();
    }
  });
}

function handleFiltering() {
  const jobs = getAllQueries(".jobs__list .job");

  jobs.forEach(job => {
    job.style.display = "none";

    if (filters.every(opt => job.dataset.filter.includes(opt))) {
      job.style.display = "block";
    }
  });
}

export function addFilterOption(e) {
  const option = document.createElement("li");
  const optionValue = e.target.firstElementChild.textContent;
  const bar = getQuery(".header__filter-options");

  validateFilterOptions(optionValue);
  filters.push(optionValue);
  option.setAttribute("class", optionValue);
  option.innerHTML = `
    <small class="small-green-info">${optionValue}</small>
    <button type="button" class="remove-option">
      <img src="./assets/icon-remove.svg" alt="remove option" />
    </button>
  `;
  bar.appendChild(option);
  handleFilterBar();
  handleFiltering();
}

export function removeFilterOption(e) {
  e.target.parentElement.remove();
  const index = filters.indexOf(e.target.previousElementSibling.textContent);

  filters.splice(index, 1);
  handleFilterBar();
  handleFiltering();
}

export function clearFilterOptions() {
  const bar = getAllQueries(".header__filter-options li");
  filters = [];

  bar.forEach(option => option.remove());
  handleFilterBar();
  handleFiltering();
}
