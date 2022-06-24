import { GHUser } from "./interfaces/GHUser"

const base_api: string = "https://api.github.com/users"

const getGHUsers = async (): Promise<GHUser[]> => {
    const res: Response = await fetch(base_api);
    return await res.json()
}

const main = async () => {
    try {
        const gh_users: GHUser[] = await getGHUsers()
        gh_users.forEach(e => {
            const userHTML = `
<tr>
  <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">${e.id}</td>
  <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">${e.login}</td>
  <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">${e.html_url}</td>
  <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">${e.avatar_url}</td>
</tr>
`
            const table = document.querySelector('#table-id')
            table && (table.innerHTML += userHTML);
        })

    } catch (err) {
        console.error(err)
    }
}

main()
