import {
  addFilterOption,
  clearFilterOptions,
  handleFilterBar,
  removeFilterOption,
} from "./handleFilter";
import showJobs from "./handleJobs";
import { getAllQueries, getQuery } from "./utils";

window.addEventListener("load", () => {
  showJobs();
  handleFilterBar();

  getAllQueries(".filter-option-add").forEach(opt =>
    opt.addEventListener("click", addFilterOption)
  );
});

window.addEventListener("click", () => {
  getAllQueries(".header__filter-options li").forEach(opt =>
    opt.addEventListener("click", removeFilterOption)
  );

  getQuery(".header__clear-options").addEventListener(
    "click",
    clearFilterOptions
  );
});
