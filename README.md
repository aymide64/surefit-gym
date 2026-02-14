# Surefit Gym & Fitness Centre 🏋️‍♂️

A premium, high-energy fitness landing page for Surefit Gym in Ikeja, Lagos, featuring modern dark luxury aesthetics and an integrated AI fitness assistant.

![Surefit Gym](https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200)

## 🌐 Live Demo

Visit the live site: [https://aymide64.github.io/surefit-gym](https://aymide64.github.io/surefit-gym)

## ✨ Features

- **Modern Dark Luxury Design** - Premium aesthetic with lime green accents
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- **AI Fitness Assistant** - Chatbot powered by Google's Gemini AI
- **Interactive Sections**:
  - Hero with call-to-action
  - Features showcase
  - Services/Facilities display
  - Pricing plans
  - Testimonials
  - Contact with embedded map
  - Footer with social links

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn
- GitHub account

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/aymide64/surefit-gym.git
   cd surefit-gym
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables (optional - for AI features)**
   ```bash
   # Create a .env.local file
   echo "VITE_GEMINI_API_KEY=your_gemini_api_key_here" > .env.local
   ```
   > Note: The AI assistant works without an API key using fallback responses!

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📦 Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🚀 Deploying to GitHub Pages

### Method 1: Automatic Deployment (Recommended)

This project includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the main branch.

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/aymide64/surefit-gym.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

3. **Update the homepage URL**
   - Edit `package.json` and replace `yourusername` with your actual GitHub username:
     ```json
     "homepage": "https://aymide64.github.io/surefit-gym"
     ```
   - Edit `vite.config.ts` and update the base path:
     ```typescript
     const base = mode === 'production' ? '/surefit-gym/' : '/';
     ```

4. **Push the changes**
   ```bash
   git add .
   git commit -m "Update GitHub Pages config"
   git push
   ```

5. **Wait for deployment**
   - Go to **Actions** tab in your repository
   - Wait for the workflow to complete (usually 1-2 minutes)
   - Your site will be live at `https://aymide.github.io/surefit-gym`

### Method 2: Manual Deployment

If you prefer manual deployment:

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Deploy**
   ```bash
   npm run deploy
   ```

## 🔧 Configuration

### Updating Your Information

Edit these files to customize the website:

- **`App.tsx`** - Main content, sections, text, images
- **`index.html`** - Page title, meta tags, SEO
- **`services/geminiService.ts`** - AI assistant responses

### Adding Your Gemini API Key (Optional)

To enable the AI assistant with real responses:

1. Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Add it as a GitHub secret:
   - Go to **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `VITE_GEMINI_API_KEY`
   - Value: Your API key
3. Update the GitHub Actions workflow to use the secret

## 📁 Project Structure

```
surefit-gym/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── services/
│   └── geminiService.ts        # AI assistant service
├── App.tsx                     # Main application component
├── index.css                   # Global styles
├── index.html                  # HTML entry point
├── index.tsx                   # React entry point
├── types.ts                    # TypeScript types
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🛠️ Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling (via CDN)
- **Lucide React** - Icons
- **Google Gemini AI** - AI assistant (optional)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For questions or support, please contact:
- **Phone:** 0802 360 9696
- **Location:** 2 Adewunmi Estate, Kudirat Abiola Way, Oregun, Ikeja, Lagos

---

Built with 💪 by Elichspace

