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
const build_user_info = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const api_user = yield fetchAPI('json', `${BASE_API}/users/anntnzrb`);
        buildHTML("#div-repos-header", `<h4 class="mb-0">${api_user.public_repos} public repositories</h4>`);
        buildHTML("#div-followers-header", `<h4 class="mb-0">${api_user.followers}</h4>`);
        const api_stars = yield fetchAPI('json', `${BASE_API}/users/anntnzrb/starred`);
        let stars_count = 0;
        api_stars.forEach((_) => ++stars_count);
        buildHTML("#div-starred-header", `<h4 class="mb-0">${stars_count}</h4>`);
        let open_iss_pr_count = 0;
        const open_iss_pr = (yield fetchAPI('json', `${BASE_API}/search/issues?per_page=100&sort=updated&q=author:anntnzrb`)).items
            .filter((e) => e.state ===
            "open")
            .forEach((e) => ++open_iss_pr_count);
        buildHTML("#div-open-iss-pr-header", `<h4 class="mb-0"> ${open_iss_pr_count}</h4>`);
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
            const fmt = `
<tr>
<td>
<div class="d-flex px-2 py-1">
<div class="d-flex flex-column justify-content-center">
<a href="${e.html_url}"><h6 class="mb-0 text-sm">${e.title} (#${e.number})</h6></a>
</div>
</div>
</td>
<td>
<div class="avatar-group mt-2">
<span class="text-xs font-weight-bold">${e.created_at}</span>
<a href="${e.user.html_url}" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${e.user.login}">
<img src="${e.user.avatar_url}" alt="user">
</a>
</div>
</td>
<td class="align-middle text-center text-sm">
<span class="text-xs font-weight-bold">${e.state}</span>
</td>
<td class="align-middle text-center">
<div class="progress-percentage">
<span class="text-xs font-weight-bold">${e.comments}</span>
</div>
</td>
</tr>
`;
            buildHTML("#table-isspr", fmt);
        });
    }
    catch (err) {
        console.error(err);
    }
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    build_user_info();
    build_issue_pr_table();
}))();
