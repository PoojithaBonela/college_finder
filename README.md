# CollegeFinder

CollegeFinder is a full-stack web application that helps students explore, filter, and compare colleges in a single platform. It is designed to simplify the process of finding the right college based on key factors like location, fees, ranking, and more.

---

## Features

### 🔎 Explore Colleges
- Browse a curated list of IITs, NITs, IIITs, and private colleges  
- Clean card-based layout for easy viewing  
- Fully dynamic data fetched from the database  

---

### 🎛 Filters & Sorting
- Filter colleges by:
  - Location (state and city)
  - College type
  - Fees
  - Rating
  - NIRF ranking  
- Multiple filters work together  
- Sorting options:
  - Fees (low to high / high to low)
  - Rating
  - NIRF ranking
  - Newest / oldest colleges  

---

### 🔍 Search
- Search colleges by name, city, or keywords (IIT, NIT, etc.)  
- Case-insensitive and dynamic results  
- Fast and responsive experience  

---

### 🏫 College Details Page
- Detailed view for each college  
- Includes:
  - Location and established year  
  - Rating and NIRF rank  
  - Courses offered (table format)  
  - Fees (total and per year)  
- Data is fetched dynamically from the backend  

---

### ⚖️ College Comparison
- Compare 2–3 colleges side-by-side  
- View differences in:
  - Fees  
  - Rating  
  - NIRF ranking  
  - Other key attributes  
- Helps users make better decisions quickly  

---

### 🎯 JEE Rank Predictor
- Enter JEE rank to get college suggestions  
- Uses a simplified logic:
  - Rank adjustment based on category  
  - Tier-based filtering (IIT, NIT, IIIT, Private)  
  - Sorting based on NIRF ranking  
- Results grouped into:
  - Dream  
  - Target  
  - Safe  

---

## Tech Stack

**Frontend**
- Next.js (App Router)
- React
- Tailwind CSS  

**Backend**
- Node.js
- Express.js  

**Database**
- PostgreSQL (Supabase)  

**Deployment**
- Frontend: Vercel  
- Backend: Render  
- Database: Supabase  

---

## How It Works

### Dynamic Filtering
Filters are sent as query parameters to the backend. The backend builds SQL queries dynamically to return matching results.

### Predictor Logic
1. Adjust rank using a category factor  
2. Determine eligible college tiers  
3. Filter colleges based on rank range  
4. Sort results using NIRF ranking  
5. Group into Dream, Target, and Safe categories  

---

## Project Structure
college_finder/
│
├── frontend/
│ ├── app/
│ ├── components/
│ └── pages/
│
├── backend/
│ ├── routes/
│ ├── controllers/
│ └── server.js
│
└── README.md


---

## Database

Main table: `colleges`

Fields include:
- id
- name  
- location  
- city  
- fees  
- rating
- img_url
- avg_package
- placement_percentage
- description 
- nirf_rank  
- type  
- courses  
- established_year  

---

## Live Demo

Frontend: https://college-finder-azure.vercel.app/
Backend: https://college-finder-8tfh.onrender.com

---

## Notes

- Predictions are approximate and based on simplified logic  
- This project focuses on usability and structured data handling  

---

