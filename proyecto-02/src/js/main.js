"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_API = "https://api.github.com";
const fetchAPI = (method, url) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(url);
    if (method === 'json') {
        return yield res.json();
    }
    else if (method === 'xml') {
        const data = yield res.text();
        return new DOMParser().parseFromString(data, "application/xhtml+xml");
    }
});
const buildHTML = (query, fmt) => {
    const DOM_query = document.querySelector(query);
    DOM_query && (DOM_query.innerHTML += fmt);
};
const cleanHTML = (query) => {
    const DOM_query = document.querySelector(query);
    DOM_query && (DOM_query.innerHTML = "");
};
const fmtIssuesPRTable = (html, title, num, created, login, avatar, state, comments) => {
    return `
<tr>
<td>
<div class="d-flex px-2 py-1">
<div class="d-flex flex-column justify-content-center">
<a href="${html}"><h6 class="mb-0 text-sm">${title} (#${num})</h6></a>
</div>
</div>
</td>
<td>
<div class="avatar-group mt-2">
<span class="text-xs font-weight-bold">${created}</span>
<a href="${html}" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${login}">
<img src="${avatar}" alt="user">
</a>
</div>
</td>
<td class="align-middle text-center text-sm">
<span class="text-xs font-weight-bold">${state}</span>
</td>
<td class="align-middle text-center">
<div class="progress-percentage">
<span class="text-xs font-weight-bold">${comments}</span>
</div>
</td>
</tr>
`;
};
const build_user_info = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const api_user = yield fetchAPI('json', `${BASE_API}/users/anntnzrb`);
        buildHTML("#div-repos-header", `<h4 class="mb-0">${api_user.public_repos}</h4>`);
        buildHTML("#div-followers-header", `<h4 class="mb-0">${api_user.followers}</h4>`);
        const api_stars = yield fetchAPI('json', `${BASE_API}/users/anntnzrb/starred`);
        buildHTML("#div-starred-header", `<h4 class="mb-0">${Array.from(api_stars).length}</h4>`);
        const open_iss_pr = Array.from((yield fetchAPI('json', `${BASE_API}/search/issues?per_page=100&sort=updated&q=author:anntnzrb`)).items);
        const open_iss_pr_count = open_iss_pr.filter((e) => e.state === "open").length;
        buildHTML("#div-open-iss-pr-header", `<h4 class="mb-0"> ${open_iss_pr_count}</h4>`);
        (_a = document.querySelector("#open_iss_pr_form")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", ev => {
            cleanHTML("#table-isspr"); // limpiar tabla cada vez
            const target = ev.target;
            const value = target.value;
            let filtered_iss_pr = open_iss_pr;
            if (value === "open") {
                filtered_iss_pr = filtered_iss_pr.filter((e) => e.state === "open");
            }
            else if (value === "closed") {
                filtered_iss_pr = filtered_iss_pr.filter((e) => e.state === "closed");
            }
            filtered_iss_pr.forEach((e) => {
                const fmt = fmtIssuesPRTable(e.html_url, e.title, e.number, e.created_at, e.user.login, e.user.avatar_url, e.state, e.comments);
                buildHTML("#table-isspr", fmt);
            });
        });
    }
    catch (err) {
        console.error(err);
    }
});
const build_issue_pr_table = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apires = (yield fetchAPI('json', `${BASE_API}/search/issues?per_page=100&sort=updated&q=author:anntnzrb`)).items;
        buildHTML("#div-table-isspr-header", `<p>${Array.from(apires).length} results</p>`);
        apires.forEach((e) => {
            const fmt = fmtIssuesPRTable(e.html_url, e.title, e.number, e.created_at, e.user.login, e.user.avatar_url, e.state, e.comments);
            buildHTML("#table-isspr", fmt);
        });
    }
    catch (err) {
        console.error(err);
    }
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    build_user_info();
    build_issue_pr_table();
});
window.onload = () => main();
