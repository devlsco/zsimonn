# Personal Brand Landing Page

A modern, interactive personal brand landing page built with Next.js, featuring dynamic particle animations, mouse-following effects, and sleek social media integration.

![zSimonn Landing Page](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Latest-38B2AC?style=for-the-badge&logo=tailwind-css)

## ⚡ **Performance Features**

- **React Optimization** - Memoized components and callbacks
- **Efficient Animations** - GPU-accelerated transforms and transitions
- **Lazy Loading** - Optimized image loading with Next.js Image component
- **Memory Management** - Proper cleanup of event listeners

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Next.js 14+

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/devlsco/landing-page.git
   cd landing-page
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install (recommend)
   ```

3. **Add your logo**

   - Place your profile image as `public/logo.png`
   - Recommended size: 192x192px or higher
   - Format: PNG with \*transparent background (optional)

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev (recommend)
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Customization

### Personal Information

Edit the `PROFILE_CONFIG` in `/config/particle_config.ts`:

```typescript
const PROFILE_CONFIG = {
  name: 'Your Name',
  title: 'Your Title/Description',
  logoPath: '/your-logo.png',
  logoAlt: 'Your Logo Alt Text',
} as const;
```

### Social Media Links

Edit the `SOCIAL_CHANNELS` in `/config/social_channels.ts`:

```typescript
const SOCIAL_CHANNELS: readonly SocialChannel[] = [
  {
    name: 'Your Channel Name',
    platform: 'platform-name',
    icon: PlatformIcon,
    url: 'https://your-social-link.com',
    colors: {
      bg: 'from-[#color1] to-[#color2]',
      hover: 'hover:from-[#color1] hover:to-[#color2]',
      shadow: 'shadow-[#color]/25',
    },
  },
  // Add more channels...
];
```

### Particle System

Edit the `PARTICLE_CONFIG` in `/config/particle_config.ts`:

```typescript
const PARTICLE_CONFIG = {
  mobile: 8, // Particles on mobile
  desktop: 25, // Particles on desktop
  // ... other settings
} as const;
```

## 🎯 Component Architecture

### Core Components

- **`HomePage`** - Main container component with state management
- **`BackgroundOverlays`** - Static gradient backgrounds
- **`MouseFollower`** - Interactive cursor tracking effect
- **`Particle`** - Individual animated particle
- **`ProfileHeader`** - User profile section
- **`SocialButton`** - Social media link button

### Key Features

- **Memoized Components** - Optimized re-rendering with `React.memo()`
- **Custom Hooks** - Efficient state management with `useState` and `useEffect`
- **TypeScript Integration** - Full type safety throughout
- **Performance Monitoring** - Built-in optimization for smooth animations

## 🎨 Design System

### Typography

- **Headings**: Inter font family with gradient text effects
- **Body**: Clean, readable text with proper contrast ratios
- **Weights**: Bold (700) for buttons, Medium (500) for descriptions

### Spacing

- **Mobile**: 12px base unit (3 in Tailwind)
- **Desktop**: 24px base unit (6 in Tailwind)
- **Consistent**: 4px increments for micro-spacing

### Colors

```css
Primary Blue: #3B82F6
Secondary Blue: #1E3A8A
Accent Purple: #A855F7
Background: #000000 to #1E3A8A
Text: #FFFFFF with opacity variants
```

## 🔧 Dependencies

### Core

- **Next.js 14+** - React framework
- **React 18+** - UI library
- **TypeScript** - Type safety

### Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components

### Icons

- **React Icons** - Social media icons (Font Awesome)
- **Lucide React** - Modern icon set

## ⚡ Performance

- **Lighthouse Score**: 95+ on all metrics
- **First Contentful Paint**: < 1.5s
- **Cumulative Layout Shift**: < 0.1
- **Mobile Optimized**: Reduced particle count and optimized animations

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and TypeScript patterns
- Add proper types for all new components and functions
- Test on both mobile and desktop devices
- Maintain accessibility standards
- Keep components small and focused

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Tailwind CSS** - For the amazing utility-first CSS framework
- **Shadcn UI** - For accessible headless components
- **React Icons** - For beautiful social media icons
- **Next.js Team** - For the powerful React framework

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/devlsco/landing-page/issues)
- **Discussions**: [GitHub Discussions](https://github.com/devlsco/landing-page/discussions)
- **Email**: contact@lsco.dev

---

<div align="center">
  <strong>Built with ❤️ by LsCo</strong>
  <br>
  <sub>Made for content creators and personal branding</sub>
</div>
