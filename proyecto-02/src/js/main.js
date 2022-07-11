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
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const iss_prs = yield fetchAPI('json', `${BASE_API}/search/issues?sort=updated&q=author:anntnzrb`);
        const num = iss_prs.total_count;
        console.log(iss_prs);
        console.log(num);
    }
    catch (err) {
        console.error(err);
    }
}))();
