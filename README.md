# Product Specs Skeleton Loader & Caching System

This documentation covers the implementation of a high-performance skeleton loader and a LocalStorage-based caching layer for product specifications, specifically designed for BigCommerce Cornerstone themes.

## 🚀 Key Features

- **Instant Loading:** After the first visit, specifications load instantly from LocalStorage.
- **Skeleton Shimmer:** Provides visual feedback during JSON parsing and initial load.
- **Smart Caching:** Includes a 10-minute TTL (Time-To-Live) to ensure data remains fresh.
- **Performance Optimized:** Achieves 0.00 CLS (Cumulative Layout Shift) by using fixed-height loaders.

## 📂 Project Structure

```text
assets/
├── scss/
│   └── components/
│       └── custom/
│           └── _skeleton-loader.scss   # Visual animation styles
└── js/
    └── theme/
        └── custom/
            └── spec-render.js          # Logic, Caching, and Rendering
```

## 🛠 Setup Instructions

### 1. SCSS Integration
Import the skeleton styles into your main theme file (usually `theme.scss`) to ensure the shimmer animation is available:

scss
@import "components/custom/skeleton-loader";

### 2. JavaScript Initialization

Import and call the function in your main product entry point. This logic handles the caching and rendering process:

import renderTechnicalSpecs from './theme/spec-render';

// Call it within your theme's product context
renderTechnicalSpecs();

### 3. HTML Requirements

Ensure your product.html template contains the necessary target elements and the Global Product ID. The script tag must be placed before the spec renderer executes:

<script>
    window.productId = {{JSONstringify product.id}};
</script>

<div id="technical-specs-container" style="display:none;">
    <div id="spec-table-target"></div>
</div>

### 4. Testing and Debugging
Cache Reset: Run localStorage.clear() in the browser console to trigger the skeleton loader again.
Debug Mode: Set const SPEC_DEBUG = true; in spec-render.js to force the skeleton to appear on every refresh.
TTL Validation: The system automatically refreshes data every 10 minutes (600,000ms).

### 5. Performance Impact
CLS Score: 0.00 — The fixed-height skeleton prevents layout shifting.
Network: Zero additional requests for specifications on repeat visits due to LocalStorage caching.
UX: Eliminates "flashing" or sudden appearance of large tables, providing a smooth transition.

