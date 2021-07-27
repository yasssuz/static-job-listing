import data from "../../data.json";
import { getQuery } from "./utils";

function mountRequirements(tools) {
  return tools.map(
    tool => `
    <li class="filter-option-add">
      <small class="small-green-info">${tool}</small>
    </li>
    `
  );
}

function mountJobElement(job) {
  const mountedJob = document.createElement("li");

  mountedJob.setAttribute("class", `job ${job.featured && "job-featured"}`);
  mountedJob.setAttribute(
    "data-filter",
    ` ${job.role} ${job.level} ${job.languages.map(
      language => ` ${language} `
    )} ${job.tools.map(tool => ` ${tool} `)}`
  );
  mountedJob.innerHTML = `
    <img src="${job.logo}" alt=${job.company} />
    <header class="top-info">
      <small class="small-green-info">${job.company}</small>
      ${job.new ? `<div class="new">new!</div>` : ``}
      ${job.featured ? `<div class="featured">featured</div>` : ``}
    </header>
    <main class="main-info">
      <h1>${job.position}</h1>
      <div class="specifics">
        <span>${job.postedAt}</span>
        <div class="point"></div>
        <span>${job.contract}</span>
        <div class="point"></div>
        <span>${job.location}</span>
      </div>
    </main>
    <footer class="bottom-info">
      <ul>
        <li class="filter-option-add">
          <small class="small-green-info">${job.role}</small>
        </li>
        <li class="filter-option-add">
          <small class="small-green-info">${job.level}</small>
        </li>
        ${mountRequirements(job.languages)}
        ${mountRequirements(job.tools)}
      </ul>
    </footer>
  `;

  getQuery(".jobs__list").appendChild(mountedJob);
}

export default function showJobs() {
  const jobs = data;

  jobs.map(job => mountJobElement(job));
}
