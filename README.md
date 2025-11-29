# SmartPaws – Where Intelligence Meets Affection

[![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.6.0-yellow?logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)

## Project Brief

SmartPaws is a modern, full-featured e-commerce platform built to sell the latest smart pet technology: GPS trackers, AI-powered feeders, health-monitoring collars, smart cameras, automatic litter boxes, and interactive toys.

The goal was to create a fast, beautiful, and fully animated online store that feels premium on both mobile and desktop. Customers can sign up, browse products in grid or list view, add items to a persistent cart/wishlist, go through a smooth multi-step checkout, track their orders, and chat with an AI assistant named “Max” for instant help.

A hidden admin dashboard gives the store owner complete control: manage products, view and update every order in real time, see revenue stats, and monitor user activity — all protected behind role-based authentication.

Everything is powered by Next.js 16 (App Router), Firebase Authentication + Firestore, and styled with Tailwind CSS v4. Custom animations (floating paw prints, gradient orbs, shimmer effects, custom cursor) make the experience playful and unique.

In short: SmartPaws delivers a next-level shopping experience for pet parents who want cutting-edge tech for their dogs and cats — fast, secure, responsive, and delightful to use.


Live Demo: [[https://pawstore-rust.vercel.app](https://pawstore-rust.vercel.app/)

## Features

| Feature                        | Description                                                                 |
|-------------------------------|-----------------------------------------------------------------------------|
| Firebase Authentication      | Email/password + Google Sign-In with email verification                    |
| Full Shopping Experience      | Product catalog → Cart → Multi-step Checkout → Order History                |
| Wishlist & Cart Persistence   | Saved via Firestore (per-user)                                              |
| Responsive Design             | Mobile-first, desktop-optimized with smooth animations                      |
| Custom Cursor & Animations    | Floating paw prints, gradient orbs, shimmer effects, custom cursor         |
| Interactive AI Chatbot        | Friendly pet-themed assistant (“Max”) with pre-programmed responses         |
| Product Filters & Views       | Grid/List view, category filter, sort by price/rating                       |
| Secure Checkout               | Shipping address, payment method selection (Card / COD), order summary     |
| User Profile & Orders         | View and track past orders, edit profile information                       |

## Tech Stack

- **Framework**: Next.js (App Router) with React 
- **Styling**: Tailwind CSS + custom animations
- **Authentication & Backend**: Firebase Auth + Firestore + Storage
- **Icons**: Lucide React
- **Deployment**: Vercel 

## Project Structure (Key Folders)

```
src/
├── app/                  # Next.js pages (page.js is the main layout)
├── components/           # UI components
├── data/                 # Static product data (products.js)
├── lib/                  # Firebase config & helpers
├── public/               # Images, favicons, etc.
└── styles/               # globals.css (Tailwind + custom styles)
```

