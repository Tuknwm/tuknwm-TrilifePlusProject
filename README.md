# TrilifePlus

TrilifePlus is a dummy digital insurance platform for exploring life, health, and car insurance simulations. Users can calculate estimated premiums, review policy details, continue to checkout, and view completed transactions in their purchase history.

## Features

- Life, health, and car insurance calculators
- English user interface across the active application
- Age and date validation for insurance forms
- Disabled demo profile and password settings
- Checkout flow with payment method selection
- Purchase history with expandable transaction details
- Dynamic account status based on completed purchases
- Scroll-triggered homepage animations and animated statistics
- Responsive desktop and mobile layout
- Local image assets and a GitHub project link in the footer

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Lucide React
- Lenis smooth scrolling

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Project Structure

```text
src/
├── app/
│   ├── dashboard/
│   │   ├── [type]/          Insurance calculators
│   │   ├── checkout/        Checkout page
│   │   ├── history/         Purchase history
│   │   └── page.tsx         User dashboard
│   ├── page.tsx             Homepage
│   └── layout.tsx           Root layout and metadata
├── components/
│   ├── AuthModal.tsx        Demo sign-in and registration modal
│   ├── Footer.tsx           Site footer
│   ├── Navbar.tsx           Main navigation
│   └── CustomSelect.tsx     Reusable select control
└── public/                  Local images and static assets
```

## Demo Data

This is an educational demo and does not connect to a real insurance provider or payment gateway. Temporary user, simulation, and transaction data are stored in browser local storage and session storage.

## Project Link

[GitHub Repository](https://github.com/Tuknwm/tuknwm-TrilifePlusProject)

## Redesign Note

The active Next.js application is a redesigned version of the original legacy project. The legacy files are retained separately for reference, while the active application uses a modern component structure, refreshed UI, and updated insurance simulation flow.
