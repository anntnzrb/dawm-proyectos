const BASE_API: string = "https://api.github.com"

const fetchAPI = async (method: string, url: string) => {
    const res = await fetch(url);

    if (method === 'json') {
        return await res.json();
    } else if (method === 'xml') {
        const data = await res.text();
        return new DOMParser().parseFromString(data, "application/xhtml+xml");
    }
}

const buildHTML = (query: string, fmt: string) => {
    const DOM_query = document.querySelector(query);
    DOM_query && (DOM_query.innerHTML += fmt);
}

const cleanHTML = (query: string) => {
    const DOM_query = document.querySelector(query);
    DOM_query && (DOM_query.innerHTML = "");
}
const fmtIssuesPRTable = (html: string, title: string, num: string, created: string, login: string, avatar: string,
                          state: string, comments: string) => {
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
}

const build_user_info = async () => {
    try {
        const api_user = await fetchAPI('json', `${BASE_API}/users/anntnzrb`);

        buildHTML("#div-repos-header",
            `<h4 class="mb-0">${api_user.public_repos}</h4>`);

        buildHTML("#div-followers-header",
            `<h4 class="mb-0">${api_user.followers}</h4>`);

        const api_stars = await fetchAPI('json', `${BASE_API}/users/anntnzrb/starred`);
        buildHTML("#div-starred-header",
            `<h4 class="mb-0">${Array.from(api_stars).length}</h4>`);

        const open_iss_pr =
            Array.from((await fetchAPI('json',
                `${BASE_API}/search/issues?per_page=100&sort=updated&q=author:anntnzrb`)).items);

        const open_iss_pr_count = open_iss_pr.filter((e: any) => e.state === "open").length;

        buildHTML("#div-open-iss-pr-header",
            `<h4 class="mb-0"> ${open_iss_pr_count}</h4>`);

        document.querySelector("#open_iss_pr_form")
            ?.addEventListener("change", ev => {
                cleanHTML("#table-isspr"); // limpiar tabla cada vez

                const target = ev.target as HTMLTextAreaElement;
                const value = target.value;
                let filtered_iss_pr = open_iss_pr;
                if (value === "open") {
                    filtered_iss_pr = filtered_iss_pr.filter((e: any) => e.state === "open");
                } else if (value === "closed") {
                    filtered_iss_pr = filtered_iss_pr.filter((e: any) => e.state === "closed");
                }

                filtered_iss_pr.forEach((e: any) => {
                    const fmt = fmtIssuesPRTable(e.html_url, e.title, e.number, e.created_at,
                                                 e.user.login, e.user.avatar_url,
                                                 e.state, e.comments);

                    buildHTML("#table-isspr", fmt);
                });
            });

    } catch (err) {
        console.error(err);
    }
}

const build_issue_pr_table = async () => {
    try {
        const apires = (await fetchAPI('json', `${BASE_API}/search/issues?per_page=100&sort=updated&q=author:anntnzrb`)).items;
        buildHTML("#div-table-isspr-header",
            `<p>${Array.from(apires).length} results</p>`)

        apires.forEach((e: any) => {
            const fmt = fmtIssuesPRTable(e.html_url, e.title, e.number, e.created_at,
                                         e.user.login, e.user.avatar_url,
                                         e.state, e.comments);

            buildHTML("#table-isspr", fmt);
        });

    } catch (err) {
        console.error(err);
    }
};

const main = async () => {
    build_user_info();
    build_issue_pr_table();
}

 window.onload = () => main();
