# Static website deployment

This project is a frontend-only Vite/React website. It has no application server, database, or runtime environment-variable requirements. Contact, careers, and vendor forms open WhatsApp with the visitor's message pre-filled.

## Build

Use Node.js 20 or newer. From the project root run:

```sh
npm ci
npm run build
```

The complete static website is generated in `dist`. You can preview the production build locally with:

```sh
npm run preview
```

## Deploy

Upload the **contents** of `dist` to the static hosting provider's document root (for example, the domain's `public_html` directory in cPanel). Do not upload the source project, `node_modules`, or local `.env` files.

The site uses client-side routes, so the static host must serve `index.html` for paths that do not match an existing file. The build includes `dist/.htaccess` with the Apache rewrite rules. For other static hosts, configure their equivalent single-page-app fallback.

After deployment, check the home page and client-side routes such as `/vendors`, `/career`, and `/contact` directly and after refresh. Test a form to confirm it opens WhatsApp with the entered details pre-filled; the visitor sends the message from WhatsApp.
