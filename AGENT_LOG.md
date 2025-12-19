# AI Agent Usage Log

This document tracks how I used AI tools (like Cascade/Windsurf, ChatGPT, etc.) during development.

## Initial Setup & Planning

**What I asked AI:**
- "Set up a Next.js project with TypeScript, Tailwind CSS, and MongoDB. I need authentication and a careers page builder."
- "What's the best folder structure for a Next.js app with both public and authenticated routes?"
- "Help me configure MongoDB connection with Mongoose in Next.js"

**What worked well:**
- AI generated a clean project structure with proper separation of concerns
- Database connection setup with connection pooling was solid
- Environment variable configuration was straightforward

**What I had to fix manually:**
- Had to adjust the TypeScript config for React 19 compatibility
- Needed to add proper error handling in the DB connection
- Fixed some import paths that AI got wrong 

## Database Schema Design

**What I asked AI:**
- "Design MongoDB schemas for User, Company, and Jobs collections. Company should have nested content sections and benefit cards."

**What I had to change:**
- Added more validation rules that AI missed (min/max lengths)
- Changed some field types (like making slug lowercase by default)
- Added timestamps which AI forgot initially 


## UI Components

**What I asked AI:**
- "Create a company settings form with React Hook Form and Yup validation"
- "Build a drag-and-drop interface for content sections using dnd-kit"
- "Make a preview modal that shows the careers page before publishing"
- "Create a job listing component with filters and infinite scroll"

**What I kept:**
- The overall component structure was solid
- Form validation schemas were comprehensive
- Drag-and-drop implementation worked great
- Infinite scroll hook was reusable

**What I rewrote:**
- Simplified some overly complex state management
- Removed unnecessary useEffects that were causing re-renders
- Made the preview modal more performant with proper memoization
- Cleaned up the styling to be more consistent 

## Bug Fixes & Optimizations

**Problems I asked AI to help with:**
1. "YouTube videos aren't playing in the iframe, just showing the watch page"
2. "MongoDB queries are slow when filtering jobs"
3. "Getting weird regex errors when users search with special characters"
4. "App crashes when video URL is from S3 instead of YouTube"
5. "Form validation is too slow, runs on every keystroke"

**Which solutions worked:**
- AI created a video URL converter that handles YouTube/Vimeo/S3 - worked perfectly
- Suggested moving $match before $sort in aggregation pipeline - huge performance boost
- Created regex escaping utility to prevent ReDoS attacks - fixed security issue
- Added debouncing to search input - much better UX

**Which ones didn't:**
- First attempt at video detection used file extensions in URL which broke for some CDNs
- Initial regex escaping was too aggressive and broke legitimate searches
- Had to tweak the debounce timing myself (AI suggested 1000ms, I changed to 500ms) 

## Code Review Session

**What I asked AI to review:**
- "Review my code as a senior engineer and find security issues, performance problems, and code quality issues"
- "Check all my API routes for vulnerabilities"
- "Look at my database queries and suggest optimizations"


**prompts:**
- "Review my code as a senior engineer" - got detailed, actionable feedback
- "Fix this specific error: [paste error]" - AI could debug with context







