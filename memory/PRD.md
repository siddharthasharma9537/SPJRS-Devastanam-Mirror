# PRD: Sri Parvathi Jadala Ramalingeshwara Swamy Devasthanams Web App

## Problem Statement
Build a bilingual (Telugu + English) temple web app that mirrors the Srisailam Devasthanam website structure and functionality, fully rebranded for Sri Parvathi Jadala Ramalingeshwara Swamy Devasthanams, Cheruvugattu, Nalgonda, Telangana.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Radix UI
- **Backend**: FastAPI (Python) on port 8001
- **Database**: MongoDB (local)
- **Auth**: JWT-based (devotee + admin)
- **Payment**: MOCKED (auto-marks as Paid)

## What's Implemented (Feb 5, 2026)

### Global Layout (Srisailam-mirrored)
- **Top Strip**: Date/time, language selector (EN/Telugu), Live TV link with pulse indicator, Print Ticket
- **Navbar**: Full dropdown navigation — About, Sevas & Darshanam (2), Donations (2), Booking (3), Media (4), Support (3 incl Volunteer)
- **Hero Carousel**: 5 auto-rotating slides with title, Telugu subtitle, description, CTA, nav arrows + dots
- **News Ticker**: Scrolling bilingual news with "View All" link
- **Multi-column Footer**: 6 link columns, temple address, phone/email, visitor stats (total + today), social media icons (FB/IG/YT/X), newsletter subscription, mobile app download badges, copyright + privacy/terms

### Devotee Features
- Registration/login (mobile + password)
- **Pratyaksha Seva** (in-person) — 6 sevas, date/slot/gotram booking
- **Paroksha Seva** (remote) — nakshatra/rashi fields, 5 eligible sevas
- **e-Hundi** online donations with preset amounts, anonymous option
- **AnnaPrasadam** food offering donations
- **80G Tax Exemption Receipt** — auto-generated with amount in words, PAN, registration
- **Accommodation** — 4 room types (AC, Non-AC, Cottage, Dormitory), booking with dates
- **Booking Ticket** — printable bilingual ticket
- **Print/Reprint Ticket** — lookup by booking# or mobile
- **My Bookings** — booking history
- **Quick Booking** — fast seva selection page

### Content Pages
- **Photo Gallery** — category filters, lightbox
- **Video Gallery** — embedded video players
- **Temple Live TV** — live stream player with channel list
- **Temple News** — bilingual news with important flags
- **About Temple** — history, significance, festivals, how to reach
- **Contact Us** — form + temple contact info
- **FAQ** — 10 expandable bilingual Q&A items
- **Volunteer Registration** — form with skills/availability

### Homepage Sections (Srisailam-style)
- 6 Feature Cards (e-Hundi, Paroksha, AnnaPrasadam, Accommodation, Temple TV, Gallery) with CTA + More Info
- About section with gallery preview
- Pratyaksha Seva preview (4 sevas with prices)
- Main Offerings list (6 items)
- Photo Gallery preview (6 images)
- Quick Links (Print Ticket, Quick Booking, My Bookings, Volunteer, How to Reach)

### Admin Features
- Dashboard with 8 stat cards
- Seva, Day Profile, Schedule Slot CRUD
- Booking management with filters/status
- Donation management with stats + 80G buttons
- Accommodation CRUD
- News CRUD (bilingual)
- Gallery CRUD
- Devotee list (read-only)

### Backend Features
- Visitor stats tracking (total + today)
- Volunteer registration
- Newsletter subscription
- Contact message submission
- Live stream data

### Testing: 100% backend (10/10), 100% frontend (28/28)

## Routes Implemented
/, /about, /sevas, /paroksha-seva, /donations, /donations/:type, /accommodation, /gallery, /news, /print-ticket, /media/live-tv, /media/gallery/videos, /support/contact, /support/faq, /volunteer, /booking/quick, /donation-receipt/:id, /book/:id, /ticket/:id, /my-bookings, /accommodation/book/:id, /auth/sign-in, /auth/sign-up, /admin/*, + aliases

## P0 (Next)
- Real Razorpay payment integration
- SMS OTP verification
- Accommodation availability check

## P1
- QR code on tickets
- Dashboard charts
- Prasadam delivery for Paroksha
- Email confirmations
- Real Live TV stream URLs

## P2
- Multi-language beyond Telugu/English
- Festival calendar auto-scheduling
- Push notifications
- Mobile app (React Native)
