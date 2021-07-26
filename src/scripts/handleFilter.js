import { getAllQueries, getQuery } from "./utils";

export function handleFilterBar() {
  const bar = getQuery(".header__filter-options");
  const main = getQuery(".app");

  if (bar.firstElementChild == null) {
    bar.parentElement.style.display = "none";
    main.classList.remove("filtering");
  } else {
    bar.parentElement.style.display = "flex";
    main.classList.add("filtering");
  }
}

function validateFilterOptions(newOpt) {
  const options = getAllQueries(".header__filter-options li");

  options.forEach(opt => {
    if (opt.firstElementChild.textContent === newOpt) {
      throw new Error();
    }
  });
}

function handleFiltering(addingOption) {
  const filterOptions = getAllQueries(".header__filter-options li");
  const jobs = getAllQueries(".jobs__list .job");

  addingOption
    ? filterOptions.forEach(opt => {
        jobs.forEach(job => {
          if (job.style.display === "none") return;

          if (!job.classList.contains(opt.classList.value)) {
            job.style.display = "none";
            return;
          }

          job.style.display = "block";
        });
      })
    : jobs.forEach(job => {
        filterOptions.forEach(opt => {
          if (job.style.display === "none") {
            if (job.classList.contains(opt.classList.value)) {
              job.style.display = "block";
            }
          }
        });
      });

  filterOptions.length === 0 &&
    jobs.forEach(job => {
      job.style.display = "block";
    });
}

// filterOptions.forEach(opt => {
//   jobs.forEach(job => {
//     if (job.style.display === "none") {
//       if (job.classList.contains(opt.classList.value)) {
//         job.style.display = "block";
//       }
//     }
//   });
// });

export function addFilterOption(e) {
  const option = document.createElement("li");
  const optionValue = e.target.firstElementChild.textContent;
  const bar = getQuery(".header__filter-options");

  try {
    validateFilterOptions(optionValue);
  } catch (err) {
    return;
  }

  option.setAttribute("class", optionValue);
  option.innerHTML = `
    <small class="small-green-info">${optionValue}</small>
    <button type="button" class="remove-option">
      <img src="./assets/icon-remove.svg" alt="remove option" />
    </button>
  `;
  bar.appendChild(option);
  handleFilterBar();
  handleFiltering(true);
}

export function removeFilterOption(e) {
  e.target.parentElement.remove();
  handleFilterBar();
  handleFiltering(false);
}

export function clearFilterOptions() {
  const bar = getAllQueries(".header__filter-options li");

  bar.forEach(option => option.remove());
  handleFilterBar();
  handleFiltering(false);
}
