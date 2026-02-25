# InfinityElectronics Frontend Case

Frontend implementation for the Novicell case: modern e-commerce SPA experience using headless API data from Fake Store.

## Tech Stack

- Next.js (App Router)
- TypeScript
- React Context for cart state
- Plain CSS (`app/globals.css`)

## Run Locally

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Implemented Features

- Frontpage with hero and featured products
- Product listing page:
  - category filter
  - sorting
  - pagination
- Product detail page:
  - product details
  - rating and review count
  - add to cart
  - similar products section
- Shopping cart:
  - real-time cart updates
  - quantity update and remove item
  - checkout form flow (frontend mock)
- Responsive header/footer with required links and social links

## Data Source

- Fake Store API docs: https://fakestoreapi.com/docs
- Products: https://fakestoreapi.com/products

## Documentation

- Architecture: `Docs/Architechture.md`
- Architecture PDF: `Docs/Architechture.pdf`
- Components: `Docs/Components.md`
- Performance and Accessibility notes: `Docs/Performance-Accessibility.md`
- Submission checklist: `Docs/Submission-Checklist.md`

## Notes / Tradeoffs

- Some backend-dependent features are mocked/stubbed for case scope (for example, checkout completion and product variants data shape).
- Focus was on reusable component design, route structure, and clear state boundaries between server data and client cart state.
