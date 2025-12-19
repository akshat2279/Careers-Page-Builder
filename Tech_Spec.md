# Technical Specification

## Assumptions I Made

1. **Single user per company** - Each company has one admin account. Didn't build team/role management since assignment didn't require it.

2. **URL-based assets** - Companies provide URLs for logos/banners instead of uploading files. Simpler to implement and works fine for MVP.

3. **No job application flow** - Assignment said just browsing experience, so I focused on that. Jobs are read-only for candidates.

4. **Sample data already in DB** - Assumed jobs data would be imported separately into MongoDB. Didn't build a job creation UI.

5. **Public careers pages** - Anyone can view `/careers/[slug]` without login. Only company settings need auth.

## Architecture

### High Level
```
Frontend (Next.js React) <-> API Routes <-> MongoDB
```


### Key Design Decisions

**Why Next.js App Router?**
- Server-side rendering for SEO (important for careers pages)
- API routes built-in, no separate backend needed

**Why MongoDB?**
- Flexible schema for dynamic content sections
- Easy to store nested data (benefit cards, content sections)
- Free tier on Atlas works great

**Why JWT for auth?**
- Stateless, scales well
- Easy to implement
- Works across API routes



## API Endpoints

### Auth
- `POST /api/auth/signup` - Create user + company
- `POST /api/auth/login` - Returns JWT token

### Company
- `GET /api/company/settings` - Get company data (auth required)
- `POST /api/company/settings` - Update company data (auth required)

### Jobs
- `GET /api/jobs` - List jobs with filters/search/pagination
  - Query params: offset, limit, search, location, jobType, sortBy

## Security Stuff

**What I did:**
- JWT tokens with 1-day expiry
- Auth middleware checks token on protected routes
- Input validation with Yup schemas
- Regex escaping to prevent ReDoS attacks
- MongoDB collation for case-insensitive queries (safer than regex)
- Connection pooling configured (max 10 connections)




### Recruiter Flow
1. Signup with new company name 
2. Try signup with existing email (should fail) 
3. Login with correct credentials 
4. Login with wrong password (should fail) 
5. Update company settings 
6. Add/remove content sections 
7. Drag to reorder sections 
8. Preview before saving 
9. Save and verify data persists 

### Candidate Flow
1. Visit careers page without login         ✓
2. See company branding (logo, banner, colors) ✓
3. Watch culture video (tested YouTube URL) ✓
4. Filter jobs by location ✓
5. Filter jobs by job type ✓
6. Search by job title ✓
7. Search by department ✓
8. Sort by latest/oldest ✓
9. Infinite scroll loads more jobs ✓
10. Mobile responsive on iPhone/Android ✓

### Edge Cases
1. Empty content sections (shows nothing) 
2. No video URL (section hidden) 
3. Special characters in company name (slug generation works) 
4. Very long job list (pagination works) 
5. No jobs found (shows empty message) 

