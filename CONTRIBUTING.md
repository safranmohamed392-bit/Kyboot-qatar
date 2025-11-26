# Contributing to KyBoot Shop

Thank you for your interest in contributing! This guide will help you get started.

## 🎯 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or bun
- Git
- A code editor (VS Code recommended)

### Setup for Contributors

1. **Fork the repository**
   - Click the "Fork" button on GitHub
   - Clone your fork: `git clone https://github.com/YOUR_USERNAME/kyboot-shop-next-main.git`

2. **Install dependencies**
   ```bash
   cd kyboot-shop-next-main
   npm install
   ```

3. **Configure for development**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set:
   ```env
   VITE_USE_MOCK_DATA=true
   ```
   
   **Important**: You don't need Shopify credentials! The app works perfectly with mock data.

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:5173`
   - You should see the shop with 8 sample products

## 🔧 Development Workflow

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Test your changes thoroughly

3. **Test locally**
   ```bash
   npm run dev      # Test in development
   npm run build    # Ensure it builds
   npm run preview  # Test production build
   npm run lint     # Check for linting issues
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```
   
   Use conventional commits:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting)
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance tasks

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to your fork on GitHub
   - Click "Pull Request"
   - Describe your changes
   - Link any related issues

## 📝 What to Contribute

### Good First Issues
- UI improvements
- Adding new components
- Improving documentation
- Adding tests
- Bug fixes
- Performance optimizations

### Feature Ideas
- User authentication
- Wishlist functionality
- Product reviews
- Search and filters
- Order history
- Payment integration
- Admin dashboard
- Multi-language support
- Dark mode improvements
- Accessibility enhancements

### Documentation
- Improve README
- Add code comments
- Create tutorials
- API documentation
- Component documentation

## 🎨 Code Style Guidelines

### TypeScript
- Use TypeScript for type safety
- Define interfaces for complex objects
- Avoid `any` type when possible
- Use descriptive variable names

```typescript
// Good
interface ProductProps {
  product: ShopifyProduct;
  onAddToCart: (id: string) => void;
}

// Avoid
const handleClick = (x: any) => { ... }
```

### React Components
- Use functional components with hooks
- Keep components small and focused
- Use proper prop typing
- Add descriptive component comments

```typescript
/**
 * ProductCard displays a single product with image, title, and price
 * @param product - The product data to display
 */
export const ProductCard = ({ product }: ProductCardProps) => {
  // Component logic
}
```

### CSS/Styling
- Use TailwindCSS utility classes
- Follow existing design patterns
- Ensure responsive design
- Test on mobile and desktop

### File Organization
- Keep related files together
- Use clear, descriptive names
- Follow existing structure
- Group imports logically

## 🧪 Testing

### Manual Testing Checklist
- [ ] Home page loads correctly
- [ ] Products display properly
- [ ] Product details page works
- [ ] Cart functionality works
- [ ] Navigation works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] All links work

### Adding Tests
We welcome test contributions! Consider adding:
- Unit tests for utilities
- Component tests
- Integration tests
- E2E tests

## 🐛 Reporting Bugs

### Before Reporting
1. Check if the bug already exists in Issues
2. Test with mock data enabled
3. Check browser console for errors
4. Try in different browsers

### Bug Report Template
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Node version: [e.g. 18.0.0]
- Using mock data: [Yes/No]
```

## 💡 Feature Requests

We love new ideas! When suggesting features:
1. Check if it already exists
2. Describe the use case
3. Explain the benefit
4. Consider implementation
5. Be open to discussion

## 📚 Resources

### Project Stack
- **React 18**: [Documentation](https://react.dev/)
- **TypeScript**: [Handbook](https://www.typescriptlang.org/docs/)
- **Vite**: [Guide](https://vitejs.dev/guide/)
- **TailwindCSS**: [Docs](https://tailwindcss.com/docs)
- **shadcn/ui**: [Components](https://ui.shadcn.com/)
- **Zustand**: [State Management](https://github.com/pmndrs/zustand)

### Learning Resources
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Tailwind Play](https://play.tailwindcss.com/) - Try Tailwind
- [TypeScript Playground](https://www.typescriptlang.org/play)

## 🤝 Code of Conduct

### Our Standards
- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information
- Inappropriate conduct

## 📞 Getting Help

- **Questions**: Open a GitHub Discussion
- **Bugs**: Create an Issue
- **Chat**: Join our community (if available)
- **Documentation**: Check README.md and SETUP.md

## 🙏 Thank You!

Every contribution helps make this project better. Whether it's:
- Fixing a typo
- Improving documentation
- Adding a feature
- Reporting a bug
- Suggesting improvements

Your time and effort are appreciated! 🎉

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

**Ready to contribute?** Fork the repo and start coding! 🚀

**Questions?** Don't hesitate to ask in Issues or Discussions.

**First time contributing?** That's awesome! We're here to help. 💪
