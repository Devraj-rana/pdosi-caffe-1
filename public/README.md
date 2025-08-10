# Public Assets Directory

This directory contains all static assets for the Pdosi Caffe website.

## Folder Structure

- **`/images/`** - Main images directory
  - **`/menu/`** - Food and beverage images for menu items
  - **`/icons/`** - Icon files and small graphics
  - **`/banners/`** - Hero images, promotional banners, and large graphics

## Usage

Files in this directory are served from the root path. For example:
- `public/images/menu/aloo-patty.jpg` → accessible at `/images/menu/aloo-patty.jpg`
- `public/images/icons/logo.png` → accessible at `/images/icons/logo.png`

## Image Guidelines

- Use descriptive, kebab-case filenames (e.g., `aloo-patty.jpg`)
- Optimize images for web (consider using Next.js Image component for automatic optimization)
- Supported formats: JPG, PNG, SVG, WebP
- Keep file sizes reasonable for better performance
