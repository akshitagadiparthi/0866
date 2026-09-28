# 0866° website

Plain HTML, no build step. Everything you edit lives in `data/`.

## Everyday edits

| to change | edit |
|---|---|
| the three beans (every 15 days) | `data/arrivals.js` |
| phone, hours, links, swiggy/zomato, video, menu images | `data/config.js` |
| photos | replace a `<div class="photo">photo: …</div>` with `<div class="photo"><img src="assets/img/your-photo.jpg" alt="describe it"></div>` |

To edit on GitHub: open the file, click the pencil, change the text inside the quotes, click **Commit changes**. The live site updates about a minute later.

## One-time setup

1. **Upload these files** to github.com/akshitagadiparthi/0866 (Add file → Upload files → drag everything in → Commit).
2. **Google Sheet for forms.** Create a sheet called "0866 website". Extensions → Apps Script → paste `setup/google-sheet-script.gs` → Deploy → New deployment → type: Web app → execute as: Me, who has access: Anyone → Deploy. Copy the link into `sheetUrl` in `data/config.js`.
3. **Hosting (free):** Cloudflare Pages, connected to the GitHub repo. No build command, output folder `/`.
4. **Domain:** add 0866.in to Cloudflare (free plan), switch the nameservers in GoDaddy to the two Cloudflare gives you, then add 0866.in as a custom domain in Pages. Do the same for 0866.co.in and redirect it to 0866.in.
