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

(async () => {
    try {
        const iss_prs = await fetchAPI('json', `${BASE_API}/search/issues?sort=updated&q=author:anntnzrb`);
        const num = iss_prs.total_count;
        console.log(iss_prs);
        console.log(num);
    } catch (err) {
        console.error(err);
    }
})();
