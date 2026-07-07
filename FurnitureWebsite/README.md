# Shajiya Sri Furniture Mart — Showroom Website

A premium, production-ready showcase website for **Shajiya Sri Furniture Mart**,
a furniture showroom in Salem, Tamil Nadu. This is **not** an e-commerce site —
there is no cart, checkout, online payment, or customer login. Every product
links out to a **WhatsApp Enquiry** or a **Call Now** button, and the goal of
the site is to drive showroom visits and enquiries.

```
FurnitureWebsite/
├── frontend/    React (Vite) + TypeScript + Tailwind + shadcn/ui
├── backend/     Flask + SQLAlchemy + JWT (REST API + admin panel backend)
├── database/    Raw SQL schema reference (Flask-Migrate manages this in practice)
└── docs/        Extra documentation
```

## Tech stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React 19 (Vite), TypeScript, Tailwind CSS, shadcn/ui, React Router DOM, Framer Motion, Swiper.js, Lucide React, Axios, React Hook Form, Zod |
| Backend    | Flask, Flask-SQLAlchemy, Flask-JWT-Extended, Flask-CORS, Flask-Migrate, PyMySQL, Werkzeug |
| Database   | MySQL |
| Frontend host | Vercel |
| Backend host  | Render |

---

## 1. Local development setup

### 1.1 Backend (Flask + MySQL)

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# Edit .env:
#  - set DB_USER / DB_PASSWORD / DB_HOST / DB_NAME (or a single DATABASE_URL)
#  - set SECRET_KEY and JWT_SECRET_KEY to random strings
#  - set ADMIN_USERNAME / ADMIN_PASSWORD for the first admin login
#  - set CORS_ORIGINS to include http://localhost:5173

# Create the database once (MySQL shell):
#   CREATE DATABASE shajiya_sri_furniture CHARACTER SET utf8mb4;

flask --app run.py db init        # first time only
flask --app run.py db migrate -m "Initial tables"
flask --app run.py db upgrade

flask --app run.py seed-admin      # creates the first admin login
flask --app run.py seed-demo-data  # optional: sample categories/products/gallery

python run.py                      # starts on http://localhost:5000
```

Health check: `GET http://localhost:5000/api/health`

### 1.2 Frontend (React + Vite)

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env: VITE_API_BASE_URL=http://localhost:5000/api
npm run dev                        # starts on http://localhost:5173
```

The frontend and backend are now connected locally: the frontend reads
`VITE_API_BASE_URL` from `frontend/.env` (see `src/services/api.ts`), and the
backend allows that origin via `CORS_ORIGINS` in `backend/.env`.

---

## 2. How the frontend and backend are connected

- **Frontend → Backend:** `frontend/src/services/api.ts` creates a single
  Axios instance using `import.meta.env.VITE_API_BASE_URL` as the base URL,
  and automatically attaches the admin JWT (from `localStorage`) to every
  request's `Authorization` header when present.
- **Backend CORS:** `backend/app/__init__.py` reads a comma-separated
  `CORS_ORIGINS` environment variable and only allows those origins to call
  `/api/*`. Nothing is hard-coded, so the same code works for local dev,
  staging, and production just by changing environment variables.
- **Auth:** Admin login (`POST /api/auth/login`) returns a JWT
  (`accessToken`) which the frontend stores and reuses on subsequent admin
  requests. There is deliberately no public customer registration/login —
  only the admin panel is authenticated.

---

## 3. Deploying the backend to Render

1. Push this repository to GitHub.
2. In Render: **New → Blueprint**, select the repo. Render will detect
   `backend/render.yaml` and provision a web service with:
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn run:app --bind 0.0.0.0:$PORT`
   - Health check: `/api/health`
3. Render's managed database is PostgreSQL, not MySQL. Provision MySQL from
   an external provider (Railway, PlanetScale, Aiven, or your own server),
   then in the Render dashboard set these environment variables manually
   (they are marked `sync: false` in `render.yaml` so they're never
   committed to git):
   - `DATABASE_URL` — e.g. `mysql+pymysql://user:password@host:3306/dbname`
   - `CORS_ORIGINS` — your Vercel URL, e.g. `https://shajiya-sri-furniture.vercel.app`
   - `ADMIN_USERNAME`, `ADMIN_PASSWORD`
4. After the first deploy, open the Render **Shell** tab for the service and run:
   ```bash
   flask --app run.py db upgrade
   flask --app run.py seed-admin
   flask --app run.py seed-demo-data   # optional
   ```
5. Confirm it's live: `https://<your-service>.onrender.com/api/health`

## 4. Deploying the frontend to Vercel

1. In Vercel: **Add New → Project**, import the same GitHub repo, and set
   **Root Directory** to `frontend`. Vercel auto-detects Vite via
   `frontend/vercel.json`.
2. Add an environment variable in Vercel's Project Settings:
   - `VITE_API_BASE_URL` = `https://<your-render-service>.onrender.com/api`
3. Deploy. `vercel.json` includes a SPA rewrite so client-side routes
   (`/products`, `/admin`, etc.) work on refresh/direct link.
4. Once you have the Vercel URL, go back to Render and update
   `CORS_ORIGINS` to include it, then redeploy the backend so the browser
   is allowed to call the API from production.

---

## 5. Admin panel

- URL: `/admin/login` on the deployed frontend (or `http://localhost:5173/admin/login` locally)
- Log in with the `ADMIN_USERNAME` / `ADMIN_PASSWORD` you set before running
  `seed-admin`.
- From the dashboard you can add/edit/delete products, manage the gallery,
  and view contact-form enquiries submitted by visitors.

## 6. Environment variable reference

See `frontend/.env.example` and `backend/.env.example` for the full,
commented list of variables each app needs.

## 7. Notes

- All product/gallery images ship as placeholder URLs — replace them with
  real showroom photography through the admin panel whenever it's convenient.
- Testimonials seeded via `seed-demo-data` are clearly flagged as samples
  (`isSample: true`) until the owner supplies genuine customer reviews.
