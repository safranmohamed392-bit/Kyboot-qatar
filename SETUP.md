# Quick Setup Guide

This guide will help you get the KyBoot Shop running in minutes!

## 🚀 Quick Start (Using Mock Data)

Perfect for testing, development, or contributing without Shopify credentials.

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env

# 3. Enable mock data (edit .env)
# Set: VITE_USE_MOCK_DATA=true

# 4. Start the dev server
npm run dev
```

That's it! Open http://localhost:5173 and you'll see the shop with sample products.

## 🛍️ Using Real Shopify Data

If you have a Shopify store and want to use real products:

### 1. Get Your Shopify Credentials

1. Log in to your Shopify Admin
2. Go to **Settings** → **Apps and sales channels**
3. Click **Develop apps** (or use an existing custom app)
4. Create a new app or select existing one
5. Configure **Storefront API** scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
6. Install the app to your store
7. Copy the **Storefront access token**

### 2. Configure Environment Variables

Edit `.env` file:

```env
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your_actual_token_here
VITE_SHOPIFY_API_VERSION=2025-07
VITE_USE_MOCK_DATA=false
```

### 3. Start the Server

```bash
npm run dev
```

## 🔧 Switching Between Mock and Real Data

You can easily switch between mock data and real Shopify data by changing one environment variable:

**Use Mock Data:**
```env
VITE_USE_MOCK_DATA=true
```

**Use Shopify API:**
```env
VITE_USE_MOCK_DATA=false
```

No other changes needed! The app will automatically detect the setting.

## 🎨 Customizing Mock Data

To add or modify mock products, edit `src/data/mockProducts.ts`:

```typescript
export const mockProducts = [
  {
    node: {
      id: "gid://shopify/Product/1",
      title: "Your Product",
      description: "Description here",
      handle: "product-url-handle",
      priceRange: {
        minVariantPrice: {
          amount: "99.99",
          currencyCode: "USD"
        }
      },
      images: {
        edges: [
          {
            node: {
              url: "https://your-image-url.com/image.jpg",
              altText: "Image description"
            }
          }
        ]
      },
      // ... more fields
    }
  }
];
```

## 🐛 Troubleshooting

### Products not showing?

1. **Check the browser console** - Look for error messages or "Using mock data for products"
2. **Verify .env file** - Make sure it exists and has the correct settings
3. **Restart dev server** - Stop (`Ctrl+C`) and run `npm run dev` again
4. **Try mock data** - Set `VITE_USE_MOCK_DATA=true` to test if it works

### Shopify API errors?

- Verify your store domain (should be `your-store.myshopify.com`)
- Check your Storefront access token
- Ensure Storefront API is enabled with correct permissions
- The app will automatically fall back to mock data if API fails

### Port already in use?

If port 5173 is taken, Vite will use the next available port. Check the console output for the actual URL.

## 📚 Next Steps

- **Customize the theme**: Edit `tailwind.config.ts` and `src/index.css`
- **Add more pages**: Create new files in `src/pages/`
- **Modify components**: Update files in `src/components/`
- **Add features**: Check out the full README.md for more details

## 💡 Tips

- **Hot Reload**: Changes are reflected instantly in the browser
- **Type Safety**: Use TypeScript for better development experience
- **Console**: Keep the browser console open to see helpful messages
- **Mock Data**: Great for rapid prototyping without backend setup

## 🆘 Need Help?

- Check the full [README.md](./README.md) for detailed documentation
- Review the [Shopify Storefront API docs](https://shopify.dev/api/storefront)
- Inspect the browser console for error messages
- Check that all dependencies are installed: `npm install`

Happy coding! 🎉
