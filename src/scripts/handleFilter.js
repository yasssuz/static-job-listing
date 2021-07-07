import { getAllQueries, getQuery } from "./utils";

export function handleFilterBar() {
  const bar = getQuery(".header__filter-options");

  if (bar.firstElementChild == null) {
    bar.parentElement.style.display = "none";
  } else {
    bar.parentElement.style.display = "flex";
  }
}

function validateFilterOptions(newOpt) {
  const options = getAllQueries(".header__filter-options .option");

  options.forEach(opt => {
    if (opt.firstElementChild.textContent === newOpt) {
      throw new Error();
    }
  });
}

export function addFilterOption(e) {
  const option = document.createElement("li");
  const optionValue = e.target.firstElementChild.textContent;
  const bar = getQuery(".header__filter-options");

  try {
    validateFilterOptions(optionValue);
  } catch (err) {
    return;
  }

  option.setAttribute("class", "option");
  option.innerHTML = `
    <small class="small-green-info">${optionValue}</small>
    <button class="remove-option">
      <img src="./assets/icon-remove.svg" alt="remove option" />
    </button>
  `;
  bar.appendChild(option);
  handleFilterBar();
}

export function removeFilterOption(e) {
  // const bar = getQuery(".header__filter-options");
  // const optionValue = e.target.previousElementSibling.innerText;

  e.target.parentElement.remove();
  handleFilterBar();
}
