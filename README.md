# Shelfie — Product Inventory Dashboard

A fully functional product inventory dashboard built with ReactJS and Supabase. Users can browse, search, filter, sort, and paginate through a list of products with a responsive UI across mobile, tablet, and desktop.

## Tech Stack

- **ReactJS** with Hooks
- **Tailwind CSS v4** for styling
- **Supabase** (PostgreSQL) for the database and client
- **React Router v7** for client-side routing
- **Vite** as the build tool

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- A Supabase project (see Database Setup below)

### Installation

```bash
# Clone the repository
git clone https://github.com/notorioustomijo/longrun-fullstack-task
cd shelfie

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`.

### Environment Variables

Create a `.env` file in the project root:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

You can find these in your Supabase project under **Settings → API Keys → Legacy anon, service_role API keys**.

---

## Database Setup

### 1. Create the Table

Run the following SQL in your Supabase SQL Editor:

```sql
CREATE TABLE inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT,
  price NUMERIC,
  stock_quantity INTEGER,
  created_at TIMESTAMP DEFAULT now()
);
```

### 2. Enable Row Level Security

RLS is enabled by default. Add the following policy to allow public read access:

```sql
CREATE POLICY "anyone can read inventory"
ON public.inventory
FOR SELECT
USING (true);
```

### 3. Seed Sample Data

Import the provided `products.csv` file via **Table Editor → Import data from CSV** in your Supabase dashboard. The file contains 50 sample products across 5 categories: Electronics, Clothing, Home & Garden, Sports, and Books.

---

## Project Structure

```
src/
├── assets/                  # SVG icons and images
├── components/
│   ├── ErrorState.jsx        # Error UI with retry button
│   ├── FilterModal.jsx       # Filter by category, price, stock
│   ├── LoadingState.jsx      # Animated loading spinner
│   ├── Pagination.jsx        # Previous/Next page controls
│   ├── ProductCard.jsx       # Mobile product card
│   ├── ProductTable.jsx      # Desktop product table
│   ├── ProductTableRow.jsx   # Single table row
│   ├── SearchBar.jsx         # Search input with icon
│   ├── Sidebar.jsx           # Responsive navigation sidebar
│   └── SortModal.jsx         # Sort by field and order
├── page/
│   └── Inventory.jsx         # Main inventory page
├── App.jsx                   # Route definitions and layout
├── main.jsx                  # App entry point
├── supabase.js               # Supabase client initialisation
└── index.css                 # Tailwind imports + Inter font
```

---

## Features

### Pagination
- 10 products per page
- Server-side pagination using Supabase's `.range()` method
- Shows current page, total pages, and total matching product count
- Previous/Next navigation with disabled states at boundaries

### Filtering
- **Search** — case-insensitive name search using `.ilike()`
- **Category** — filter by Electronics, Clothing, Home & Garden, Sports, Books
- **Price Range** — min/max price using `.gte()` and `.lte()`
- **Stock Availability** — In Stock or Out of Stock
- All filters apply server-side in a single combined Supabase query
- Active filter count badge on the Filter By button
- Clear all filters option

### Sorting
- Sort by Name, Price, Stock Quantity, or Date Added
- Ascending and descending order
- Server-side sorting using Supabase's `.order()` method
- Sort state persists when paginating or changing filters
- Active sort label displayed on the Sort By button

### Responsive Design
- **Mobile** — products displayed in a 2-column card grid (1-column below 600px)
- **Tablet (md)** — compact icon-only sidebar, card layout
- **Desktop (lg)** — full sidebar with labels, products displayed in a table

### Loading & Error States
- Animated spinner card shown while data is fetching
- User-friendly error card with a retry button on failed queries
- Empty state with a clear filters prompt when no results match

---

## Design Decisions

The brief provided no mobile or tablet designs, so the following decisions were made for responsive edge cases:

- **Mobile cards** are used instead of a table since tables become unreadable on small screens. Cards show all key product information in a scannable layout.
- **Three sidebar breakpoints** were implemented — a wide icon-and-label sidebar on desktop (lg+), a compact icon-only sidebar on tablet (md–lg), and a narrow icon bar on mobile — to give the product table maximum horizontal space at mid-range screen sizes.
- **Filter and sort controls** open in modals rather than inline dropdowns to keep the UI clean on smaller screens and avoid layout shifts.
- **Search** is intentionally excluded from the filter count badge since it is always visible as a primary control, while the badge only counts the secondary filter options housed inside the modal.
- **Card width** is fixed at `15.625rem` on larger mobile screens and reduces to `13.8rem` below 670px before switching to full-width single-column at 600px, to prevent card overlap at awkward in-between sizes.
