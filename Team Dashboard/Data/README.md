# Team Dashboard

A simple, static dashboard for tracking team metrics and updates.

## Features

- Real-time metrics display (copper runs, fiber runs, bricks patched, fusion racks, errors/rework)
- Company and site updates
- Responsive design
- Auto-refresh every 5 minutes
- Easy data management through JSON files

## Setup

1. Update `data/metrics.json` with your current metrics
2. Update `data/updates.json` with your news and site information
3. Host the files on any web server or use GitHub Pages

## Updating Data

### Metrics
Edit `data/metrics.json` to update the numbers displayed on the dashboard.

### Updates
Edit `data/updates.json` to add new company updates or site information.

## Hosting Options

- **GitHub Pages**: Push to a GitHub repo and enable Pages
- **Netlify**: Drag and drop the folder to Netlify
- **Internal server**: Copy files to your company's web server
- **Local network**: Set up a simple HTTP server

## Browser Support

Works in all modern browsers. No special requirements or dependencies.
