# MediCare Plus — Hospital Website (Static Frontend)

Pure **HTML + CSS** frontend. JavaScript is only for simple UI helpers (mobile menu, theme toggle, accordion, swiper). Ready to connect your PHP / Node / Django backend.

## Quick Start

Open `index.html` in a browser, or:

```bash
cd Hospital-Website
npx serve .
```

## Structure

```
Hospital-Website/
├── index.html … contact.html, login.html   # Public pages (static)
├── customer/                               # Patient panel (static)
├── doctor/                                 # Doctor panel (static)
├── admin/                                  # Admin panel (static)
├── css/                                    # All styles
└── js/main.js                              # Simple UI only
```

## JavaScript (`js/main.js`)

Only these UI helpers:
- Page loader hide
- Dark / light theme
- Sticky header
- Mobile navigation
- Scroll to top
- FAQ accordion
- Tabs
- Password show/hide
- Dashboard sidebar toggle
- Dropdowns
- Swiper / AOS init (when CDN present)

**No data fetching, no auth, no localStorage CRUD.** Forms use `action="#" method="post"` — replace with your backend endpoints.

## Demo Navigation (static)

| Area | Open |
|------|------|
| Website | `index.html` |
| Patient panel | `customer/dashboard.html` |
| Doctor panel | `doctor/dashboard.html` |
| Admin panel | `admin/login.html` → `admin/dashboard.html` |

## Backend Integration

1. Change form `action="#"` to your API/route URLs.
2. Keep field `name` attributes (`email`, `password`, `patient_name`, `department`, etc.).
3. After login, redirect to the correct panel from your server.
4. Replace hardcoded table rows with server-rendered HTML (PHP/Django templates) or your framework.

## Tech

- HTML5, CSS3
- Font Awesome 6, Google Fonts
- Swiper + AOS (home page carousels / animations)
- One simple `js/main.js`
