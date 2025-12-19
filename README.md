# Careers Page Builder

This is a take-home assignment project that lets companies create branded careers pages and allows candidates to browse jobs.

## What I Built

Basically two main parts:
1. **Recruiter side** - Login, customize company page (colors, logo, content sections), preview, and save
2. **Candidate side** - Public careers page where people can browse jobs with filters and search

## Tech Stack

- Next.js 16 with App Router
- React 19
- MongoDB + Mongoose
- TypeScript
- Tailwind CSS
- JWT for auth

## Setup

1. Clone and install:
```bash
git clone <repo-url>
cd my-app
npm install
```

2. Create `.env.local` file:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=some_random_secret_key
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. Run it:
```bash
npm run dev
```

Go to http://localhost:3000




## What Works

- User signup/login with JWT
- Company settings page with all customization options
- Drag and drop for content sections
- Preview modal
- Public careers page with company branding
- Job listing with filters, search, infinite scroll
- Mobile responsive
- Video embed support (YouTube, Vimeo, S3)


## Deployment

Deployed on Vercel. Just connected the repo and added environment variables in Vercel dashboard.

Live URL: [Add your Vercel URL here]
