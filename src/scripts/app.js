import {
  addFilterOption,
  handleFilterBar,
  removeFilterOption,
} from "./handleFilter";
import showJobs from "./handleJobs";
import { getAllQueries } from "./utils";

window.addEventListener("load", () => {
  showJobs();
  handleFilterBar();

  getAllQueries(".filter-option-add").forEach(opt =>
    opt.addEventListener("click", addFilterOption)
  );
});

window.addEventListener("click", () => {
  getAllQueries("button").forEach(opt =>
    opt.addEventListener("click", removeFilterOption)
  );
});
