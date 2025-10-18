# Wiki Scroll

A modern, clean Wikipedia article browser built with React, TypeScript, and Tailwind CSS. Browse Wikipedia articles with infinite scroll, search functionality, category filtering, and integrated Google AdSense.

## Features

- 🔍 **Smart Search**: Search Wikipedia articles with real-time results
- 📚 **Categories**: Browse articles by categories (Philosophy, History, Math, Science, etc.)
- ♾️ **Infinite Scroll**: Seamlessly load more articles as you scroll
- 🖼️ **Rich Content**: Article thumbnails, extracts, and metadata
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🎨 **Modern UI**: Clean, modern interface with smooth animations
- 💰 **Ad Integration**: Google AdSense integration for monetization
- ⚡ **Fast Performance**: Optimized for speed and user experience

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **API**: Wikipedia API
- **Deployment**: Nixpacks (VPS/Dokploy ready)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/scot00671234/wiki-scroll-2.git
cd wiki-scroll-2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This project is configured for deployment with Nixpacks and is ready for VPS deployment with Dokploy.

### Nixpacks Configuration

The `nixpacks.toml` file is already configured for:
- Node.js environment
- Automatic dependency installation
- Production build
- Preview server startup

### VPS Deployment with Dokploy

1. Connect your GitHub repository to Dokploy
2. The app will automatically build and deploy using Nixpacks
3. Your Wiki Scroll app will be available at your VPS domain

## Google AdSense

The app includes Google AdSense integration with:
- Banner ads between articles
- Rectangle ads in the sidebar
- Responsive ad units
- Client ID: `ca-pub-4669482504741834`

To customize ads, update the ad slot IDs in `src/components/AdSense.tsx`.

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Search and category header
│   ├── ArticleCard.tsx # Individual article display
│   ├── ArticleList.tsx # Article grid with ads
│   └── AdSense.tsx     # Google AdSense components
├── services/           # API services
│   └── wikipedia.ts    # Wikipedia API integration
├── hooks/              # Custom React hooks
│   └── useInfiniteScroll.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── constants/          # App constants
│   └── categories.ts   # Category definitions
└── App.tsx            # Main application component
```

## API Integration

The app uses the Wikipedia API to fetch:
- Article search results
- Article details with thumbnails
- Category-based articles
- Random articles
- Featured articles

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub.
