Findly – Using React/Express/Mongo | 2025

Features:

This project is a modern lost-and-found web app with an iOS-inspired, glassmorphic interface. It’s a continuation of my earlier experiments with Vite + Tailwind, now upgraded with role-based access and a smoother layout. New additions include: a sticky “Lost Items” bar directly under the navbar, a responsive navbar that never blocks clicks, two roles (Poster & Claimer), and a claims workflow so claimers can request ownership while posters review, approve, or decline. The UI adapts to light/dark mode and uses subtle animations for a polished feel.

Poster: create & delete items, view/manage claims.

Claimer: cannot post; can submit claim requests with contact + message.

Design: Liquid Glass aesthetic (translucent cards, soft shadows, animated sheen).

Quality of life: Pagination, mobile-friendly grid, image support, sticky header.

Demo / Repo: (add your GitHub repo link)
Note: The layout ensures cards scroll underneath the sticky “Lost Items” bar and navbar—no overlap, just smooth reading.

Group Members: Solo

Purpose: Help travelers quickly post, browse, and recover lost items—clean UX first, with a simple flow for claim requests.

Project Duration: September 2025 – October 2025

Tech Stack: React (Vite), Tailwind CSS (PostCSS), Framer Motion, Node.js, Express.js, MongoDB, Axios

Images Showcasing Project:

Home (glass hero) — docs/findly-home.png

Lost Items (sticky bar + grid) — docs/findly-list.png

Post Item (Poster) — docs/findly-post.png

Claims (Poster review) — docs/findly-claims.png
The earliest version used a Create React App scaffold; I migrated to Vite + Tailwind (PostCSS) for faster DX and fixed Windows-specific module issues by removing @tailwindcss/vite and using a clean PostCSS config. The new layout also prevents decorative overlays from intercepting clicks.
