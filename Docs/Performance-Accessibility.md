# Performance and Accessibility Notes

## Performance Approach

- Use server-rendered route pages for fast first load.
- Fetch API data with revalidation cache (`revalidate: 60`) in `lib/api/products.ts`.
- Keep product listing paginated to reduce initial payload on `/products`.
- Use lazy image loading for product media (`loading="lazy"`).
- Keep client components focused on interactive parts (cart, hero slider).

## Lazy Loading Strategy (High Level)

- Keep critical content above the fold lightweight.
- Defer non-critical visual elements and interactions where possible.
- Use route-level and component-level splitting as feature complexity grows.

## Accessibility Approach

- Semantic layout structure (`header`, `main`, `footer`, headings).
- Form fields are labeled in checkout flow.
- Interactive controls use buttons/links with clear labels.
- Dynamic cart count uses `aria-live="polite"` in header badge.
- Error and empty states are presented as readable text blocks.
