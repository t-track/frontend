# T-track - Horse Racing Results

A modern, responsive web application for tracking horse racing events and live results.

## Features

- **Live Event Tracking**: Real-time updates for ongoing races
- **Event Management**: Browse upcoming and past racing events
- **Rider & Horse Profiles**: Detailed information and performance history
- **Dark Mode**: Toggle between light and dark themes
- **Mobile Responsive**: Optimized for all device sizes
- **PWA Support**: Install as a mobile app

## Live API Integration

The application supports live data integration through a configurable API system.

### API Configuration

1. Copy `.env.example` to `.env`
2. Set your API base URL:
   ```
   REACT_APP_API_BASE_URL=https://your-api-domain.com
   ```

### API Data Format

The application expects JSON data in the following format:

```json
{
  "List": {
    "ListName": "API T-Track|Live Category Name",
    "HeadLine1": "Event Title",
    "Fields": [...],
    "LastChange": "2025-07-08 20:45:44"
  },
  "Data": [
    ["bib", "rider_name", "rider_id", "flag", "horse_name", "horse_id", "rank", ...]
  ],
  "DataFields": [...]
}
```

### Deployment Configuration

For GitHub Pages deployment:

1. Update the `base` path in `vite.config.ts` to match your repository name
2. Set your API URL in the environment variables
3. Deploy using: `npm run deploy`

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Technology Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons
- **Vite** for build tooling

## Live Data Features

- **Real-time Updates**: Automatic polling every 30 seconds
- **Connection Status**: Visual indicators for API connectivity
- **Error Handling**: Graceful fallbacks when API is unavailable
- **Data Transformation**: Converts API data to internal format
- **Caching**: Efficient data management and updates

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - see LICENSE file for details.