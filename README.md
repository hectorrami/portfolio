# 🚀 Deploying a Vite App to GitHub Pages

This guide provides step-by-step instructions to deploy your Vite-powered application to GitHub Pages.

## 📦 Prerequisites

* **Node.js** and **npm** installed on your machine.
* A Vite project initialized.
* A GitHub repository created and linked to your local project.

## 🛠️ Installation

1. **Clone your repository** (if you haven't already):

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Install `gh-pages` package** as a development dependency:

   ```bash
   npm install --save-dev gh-pages
   ```

## ⚙️ Configuration

1. **Update `vite.config.js`**:

   Modify the `base` property to match your repository name:

   ```javascript
   // vite.config.js
   export default {
     base: '/your-repo-name/',
     // ...other configurations
   };
   ```

   Replace `'your-repo-name'` with the actual name of your GitHub repository.

2. **Update `package.json`**:

   Add the following scripts:

   ```json
   {
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview",
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

## 🚀 Deployment

1. **Build the project**:

   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**:

   ```bash
	 git add dist -f
   ```

	```bash
	 git commit -m "your commit message"
   ```

	```bash
	git subtree push --prefix dist origin gh-pages
   ``` 

   This command will build the project and push the contents of the `dist` directory to the `gh-pages` branch of your repository.

## 🌐 Accessing Your Deployed Site

After deployment, your site will be available at:

```
https://your-username.github.io/your-repo-name/
```

Replace `your-username` and `your-repo-name` with your actual GitHub username and repository name.

---