# Portfolio Website

Welcome to my personal portfolio website, showcasing my projects, skills, and experiences. This site is built using Vite and deployed to GitHub Pages.

## 🚀 Features

- **Fast and modern build tool**: Utilizing Vite for a swift development experience.
- **Continuous Deployment**: Automated deployment to GitHub Pages via GitHub Actions.
- **Responsive Design**: Optimized for both desktop and mobile views.

## 🔧 Technologies Used

- **Vite**: A next-generation, fast build tool.
- **GitHub Actions**: For continuous integration and deployment.
- **GitHub Pages**: Hosting the static si

- **React**: For frontend development

## 📦 Setup & Installation
To run this project locally:

1. Clone the repository:
```bash
git clone https://github.com/hectorrami/portfolio.git
cd portfolio
```
2. Install dependencies
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## 📄 Deployment Workflow

This project employs a GitHub Actions workflow to automate deployment to GitHub Pages. The workflow is defined in `.github/workflows/deploy.yml` and runs on every push to the `main` branch.

### Workflow Overview

1. **Checkout Code** – Retrieves the latest source code.
2. **Set Up Node.js** – Prepares the Node.js environment.
3. **Install Dependencies** – Installs necessary npm packages.
4. **Build Project** – Builds the
5. **Deploy to GitHub Pages** – Publishes the site to the `gh-pages` branch.

### GitHub Actions Configuration

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist