# 🔧 Troubleshooting: Products Not Showing

## ✅ Issues Fixed

### 1. TypeScript Errors (FIXED)
All TypeScript linting errors with `any` types have been resolved:
- ✅ `src/lib/shopify.ts` - Changed `any` to `Record<string, unknown>`
- ✅ `src/pages/ProductDetail.tsx` - Added proper types for product and variant

### 2. Mock Data Configuration (FIXED)
- ✅ `.env` file updated to use mock data: `VITE_USE_MOCK_DATA=true`
- ✅ Mock products available in `src/data/mockProducts.ts` (8 products)

## 🚀 How to Start the Server

**Open a new terminal and run:**

```powershell
cd "c:\Users\SAFRANMOH\Desktop\kyboot-shop-next-main 1254\kyboot-shop-next-main"
npm run dev
```

Or if you haven't installed dependencies yet:

```powershell
cd "c:\Users\SAFRANMOH\Desktop\kyboot-shop-next-main 1254\kyboot-shop-next-main"
npm install
npm run dev
```

## 🔍 What to Check

### 1. Check if Server is Running
After running `npm run dev`, you should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 2. Open in Browser
- Navigate to: `http://localhost:5173`
- Products should appear on home page and products page

### 3. Check Browser Console
Press F12 to open Developer Tools and check the Console tab:
- ✅ Should see: `"Using mock data for products"`
- ❌ Should NOT see any red error messages

### 4. Verify Products Display
- **Home page** (`/`): Should show 4 featured products
- **Products page** (`/products`): Should show all 8 products
- **Product detail**: Click any product to see details

## 🐛 Common Issues & Solutions

### Issue: "npm: command not found" or similar
**Solution:** Install Node.js from https://nodejs.org/

### Issue: Port 5173 already in use
**Solution:** 
```powershell
# Find and kill process on port 5173
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

Or just use a different port:
```powershell
npm run dev -- --port 3000
```

### Issue: ESLint errors
**Solution:** All TypeScript errors are now fixed. Try:
```powershell
npm run lint
```

### Issue: Products still not showing
**Solutions:**

1. **Verify .env file:**
   ```powershell
   type .env
   ```
   Should show: `VITE_USE_MOCK_DATA=true`

2. **Clear cache and restart:**
   ```powershell
   # Stop server (Ctrl+C)
   rm -r node_modules/.vite
   npm run dev
   ```

3. **Check mock data file exists:**
   ```powershell
   ls src/data/mockProducts.ts
   ```

4. **Hard refresh browser:**
   - Press `Ctrl + Shift + R` (Chrome/Edge)
   - Or `Ctrl + F5`

### Issue: API or network errors
**Solution:** With `VITE_USE_MOCK_DATA=true`, you should not see any API errors. Mock data works offline.

## 📊 Expected Behavior

### With Mock Data (`VITE_USE_MOCK_DATA=true`)
✅ **Pros:**
- Works immediately, no setup needed
- No Shopify account required
- Works offline
- 8 sample products available
- No API rate limits

⚠️ **Limitations:**
- Cannot add real products
- Cart checkout won't create real orders
- Demo data only

### With Shopify API (`VITE_USE_MOCK_DATA=false`)
✅ **Pros:**
- Real products from your Shopify store
- Real checkout process
- Live inventory

⚠️ **Requirements:**
- Valid Shopify store
- Storefront API token
- Internet connection

## 🎯 Quick Verification Steps

### Step 1: Check Files Exist
```powershell
cd "c:\Users\SAFRANMOH\Desktop\kyboot-shop-next-main 1254\kyboot-shop-next-main"
ls .env
ls src/lib/shopify.ts
ls src/data/mockProducts.ts
```

All should exist ✅

### Step 2: Verify .env Content
```powershell
type .env
```

Should include: `VITE_USE_MOCK_DATA=true` ✅

### Step 3: Check for TypeScript Errors
```powershell
npm run lint
```

Should pass with no errors ✅

### Step 4: Start Server
```powershell
npm run dev
```

Should start successfully ✅

### Step 5: Test in Browser
1. Open: http://localhost:5173
2. Check console for: "Using mock data for products"
3. Verify 4 products shown on home page
4. Click "Shop Now" or navigate to /products
5. Verify 8 products shown
6. Click any product to see details

## 📸 What You Should See

### Home Page
- Hero section with background image
- "Featured Products" heading
- 4 product cards with:
  - Product images
  - Product names
  - Prices
  - "View Details" button

### Products Page
- "All Products" heading
- 8 product cards in a grid
- Each product card clickable

### Product Detail Page
- Large product image(s)
- Product title and description
- Price
- Size/Color selectors (if available)
- "Add to Cart" button

## 🆘 Still Having Issues?

### Check the Following:

1. **Node.js version:**
   ```powershell
   node --version
   ```
   Should be v18 or higher

2. **NPM version:**
   ```powershell
   npm --version
   ```
   Should be v9 or higher

3. **Dependencies installed:**
   ```powershell
   ls node_modules
   ```
   Should show many folders (React, Vite, etc.)

4. **No other server on port 5173:**
   ```powershell
   netstat -ano | findstr :5173
   ```
   Should be empty when server is not running

### Full Reset (Nuclear Option)

If nothing works, try a complete fresh start:

```powershell
cd "c:\Users\SAFRANMOH\Desktop\kyboot-shop-next-main 1254\kyboot-shop-next-main"

# Delete everything
rm -r node_modules
rm -r .vite
rm package-lock.json

# Reinstall
npm install

# Verify .env
type .env

# Start fresh
npm run dev
```

## 📝 Summary of Changes Made

1. ✅ Fixed TypeScript errors in `src/lib/shopify.ts`
2. ✅ Fixed TypeScript errors in `src/pages/ProductDetail.tsx`
3. ✅ Updated `.env` to use mock data by default
4. ✅ Mock data properly configured (8 products)
5. ✅ All pages updated to use centralized API utility
6. ✅ Automatic fallback to mock data on API failure

## 🎉 Success Criteria

✅ Server starts without errors
✅ Browser opens without console errors
✅ Console shows "Using mock data for products"
✅ Home page displays 4 products
✅ Products page displays 8 products
✅ Product details page works
✅ Can add products to cart
✅ Navigation works smoothly

If all above are ✅, your setup is working perfectly!
