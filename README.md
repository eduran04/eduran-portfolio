# ED-Portfolio

Personal portfolio — static `index.html` at the repo root with `styles.css` and `main.js` (no build step).

## Deploy on Vercel (from GitHub)

### 1. Push this folder to GitHub

If this directory is not yet a Git repository:

```bash
cd ED-Portfolio
git init
git add .
git commit -m "Initial portfolio site"
```

Create a new empty repository on GitHub (no README/license if you want a clean first push), then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

Use your real URL and branch name if they differ.

### 2. Import the repo in Vercel

1. Sign in at [vercel.com](https://vercel.com) and choose **Add New… → Project**.
2. **Import** the GitHub repository that contains this site.
3. Under **Configure Project**, use these settings for a static site with **no build** and **`index.html` at the project root**:
   - **Framework Preset**: Other (or leave default if it detects none).
   - **Root Directory**: `.` (repository root), unless the app lives in a subfolder.
   - **Build Command**: leave **empty**.
   - **Output Directory**: leave **empty** or **`.`** so the root `index.html` is served at `/`.
   - **Install Command**: none / skip.

4. Deploy. The production URL appears on the dashboard; every push to the default branch updates production, and pull requests get **preview URLs**.

### Optional

- **Custom domain**: Project → **Settings** → **Domains**; add your domain and apply the DNS records Vercel shows.
- **`vercel.json`**: not required for a root `index.html`. Add it later if you need redirects, headers (CSP, caching), or a non-root output directory.

## Local preview

From this directory:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.
