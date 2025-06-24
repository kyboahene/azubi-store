# Azubi Store – E-commerce Website

This project is a fully functional, multi-page e-commerce website built with Next.js. The goal is to closely replicate the provided design guidelines and deliver a seamless shopping experience.

## Features

- **Responsive Layout:** Optimized for all screen sizes (mobile, tablet, desktop).
- **Interactive UI:** All interactive elements include hover states for better user experience.
- **Product Catalog:** Browse products with details and images.
- **Shopping Cart:**
  - Add and remove products
  - Update product quantities
  - Cart state persists after page refresh (using localStorage)
- **Checkout Flow:**
  - Complete all required fields
  - Real-time form validation with clear error messages
  - Accurate order totals:
    - Product subtotal
    - Fixed shipping cost: $50
    - VAT: 20% of product total (excluding shipping)
  - Order confirmation modal with summary after successful checkout

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Data & Assets
- Product data is loaded from a local `data.json` file.
- Download design guidelines and media assets from the provided link and place them in the appropriate folders (`public/` for images, etc).

## Project Structure
- `app/` – Main application pages and components
- `public/` – Static assets (images, icons, etc)
- `data.json` – Product data (add to project root if not present)

## License
This project is for educational and demonstration purposes.
