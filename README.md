# KyBoot Shop - Next-Gen E-commerce Platform

A modern e-commerce platform built with React, TypeScript, Vite, and Shopify Storefront API. Features a beautiful UI with shadcn/ui components and supports both live Shopify integration and mock data for development.

## 🚀 Features

- **Modern Tech Stack**: React 18, TypeScript, Vite, TailwindCSS
- **Beautiful UI**: Built with shadcn/ui components
- **Shopify Integration**: Connects to Shopify Storefront API for real product data
- **Mock Data Support**: Use mock data for development without Shopify credentials
- **Shopping Cart**: Full cart functionality with persistent state using Zustand
- **Responsive Design**: Mobile-first design that works on all devices
- **Fast Performance**: Optimized with Vite for lightning-fast development and builds

## 📋 Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- (Optional) Shopify store with Storefront API access

## 🛠️ Installation & Setup

### Step 1: Clone the repository

```sh
git clone <YOUR_GIT_URL>
cd kyboot-shop-next-main
```

### Step 2: Install dependencies

```sh
npm install
# or
bun install
```

### Step 3: Configure Environment Variables

Copy the example environment file:

```sh
cp .env.example .env
```

Edit `.env` and configure your settings:

#### Option A: Use Mock Data (Recommended for Testing)

```env
VITE_USE_MOCK_DATA=true
```

This will use the built-in mock product data from `src/data/mockProducts.ts`. Perfect for:
- Development and testing
- Demo purposes
- Contributing to the project without Shopify credentials

#### Option B: Use Shopify Storefront API

```env
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your_storefront_access_token_here
VITE_SHOPIFY_API_VERSION=2025-07
VITE_USE_MOCK_DATA=false
```

To get your Shopify credentials:
1. Go to your Shopify Admin
2. Navigate to Settings > Apps and sales channels
3. Create a custom app or use an existing one
4. Enable Storefront API access
5. Copy your Storefront access token

### Step 4: Start the development server

```sh
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── CartDrawer.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Products.tsx
│   ├── ProductDetail.tsx
│   ├── Auth.tsx
│   ├── About.tsx
│   └── Contact.tsx
├── stores/             # State management (Zustand)
│   └── cartStore.ts
├── lib/                # Utility functions
│   ├── utils.ts
│   └── shopify.ts      # Shopify API integration
├── data/               # Mock data
│   └── mockProducts.ts
└── hooks/              # Custom React hooks
```

## 🎨 Customization

### Adding Mock Products

Edit `src/data/mockProducts.ts` to add or modify mock products:

```typescript
export const mockProducts = [
  {
    node: {
      id: "gid://shopify/Product/1",
      title: "Your Product Name",
      description: "Product description",
      handle: "product-handle",
      // ... more fields
    }
  }
];
```

### Styling

The project uses TailwindCSS for styling. Configuration can be found in:
- `tailwind.config.ts` - Tailwind configuration
- `src/index.css` - Global styles and CSS variables

## 🚢 Building for Production

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Commit your changes: `git commit -am 'Add my feature'`
5. Push to the branch: `git push origin feature/my-feature`
6. Submit a pull request

**Note**: When contributing, you can use mock data by setting `VITE_USE_MOCK_DATA=true` in your `.env` file. No Shopify credentials required!

## 📝 Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_SHOPIFY_STORE_DOMAIN` | Your Shopify store domain | No* | - |
| `VITE_SHOPIFY_STOREFRONT_TOKEN` | Shopify Storefront API token | No* | - |
| `VITE_SHOPIFY_API_VERSION` | Shopify API version | No | `2025-07` |
| `VITE_USE_MOCK_DATA` | Use mock data instead of Shopify | No | `false` |

*Required only if `VITE_USE_MOCK_DATA=false`

## 📄 License

This project is open source and available under the MIT License.

##  Troubleshooting

### Products not showing?

1. Check if you're using mock data: Look for console message "Using mock data for products"
2. If using Shopify API:
   - Verify your credentials in `.env`
   - Check browser console for errors
   - Ensure your Storefront API token has the correct permissions
3. Try enabling mock data: Set `VITE_USE_MOCK_DATA=true` in `.env`

### API Errors?

The app automatically falls back to mock data if Shopify API fails. Check the browser console for detailed error messages.

## How can I edit this code?

**Use your preferred IDE**

Follow the installation steps above to work locally.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

You can deploy this project to various platforms:

- **Vercel**: Connect your GitHub repository to Vercel for automatic deployments
- **Netlify**: Deploy directly from GitHub with continuous deployment
- **GitHub Pages**: Use GitHub Actions to deploy the built site
- **Any static hosting**: Run `npm run build` and deploy the `dist` folder

For production deployment, make sure to:
1. Set up your environment variables on the hosting platform
2. Run `npm run build` to create an optimized production build
3. Serve the `dist` folder as static files

