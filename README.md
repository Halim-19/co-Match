# 🤝 co-Match | Project Documentation

**co-Match** is a real-time collaborative platform that connects users based on shared interests, skills, or professional requirements. By leveraging **Supabase**, the project utilizes a serverless architecture with real-time database subscriptions and built-in authentication.

---

## 🏗️ Technical Architecture

* **Frontend:** React.js / Next.js
* **Backend-as-a-Service:** [Supabase](https://supabase.com/)
* **Auth:** GoTrue (Email, Magic Links, Social)
* **Database:** PostgreSQL
* **Real-time:** Postgres Changes (via WebSockets)
* **Storage:** Supabase Buckets (for profile images/documents)



---

## 🛠️ Database Schema (PostgreSQL)

Run the following in your **Supabase SQL Editor** to set up the core tables for the matching engine:

```sql
-- 1. Profiles Table (Extends Supabase Auth)
create table profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  skills text[], -- Array of skills for matching
  bio text,
  updated_at timestamp with time zone
);

-- 2. Matches Table
create table matches (
  id uuid default uuid_generate_v4() primary key,
  user_one uuid references profiles(id),
  user_two uuid references profiles(id),
  status text check (status in ('pending', 'accepted', 'rejected')) default 'pending',
  created_at timestamp with time zone default now()
);

-- 3. Enable Row Level Security (RLS)
alter table profiles enable row level security;
alter table matches enable row level security;

-- 4. Policies: Users can only edit their own profile
create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

```

---

## 🚀 Getting Started

### 1. Environment Configuration

Create a `.env.local` file in your root directory:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key

```

### 2. Initialize Supabase Client

In `src/lib/supabaseClient.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

```

### 3. Implementing the Matching Logic

Instead of a heavy backend server, use **Supabase Realtime** to notify users when a match occurs:

```javascript
// Listen for new matches in real-time
const matchSubscription = supabase
  .channel('public:matches')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'matches' }, payload => {
    console.log('New Match Found!', payload.new);
    // Trigger UI notification
  })
  .subscribe();

```

---

## 🧩 Key Features (Fixed for Supabase)

### **Authentication**

Users sign up via `supabase.auth.signUp()`. Upon signup, a PostgreSQL trigger automatically creates a entry in the `profiles` table to store extra metadata like skills.

### **The Matching Engine**

To find relevant users, we use **PostgreSQL Array Overlap (`&&`)**. You can call this logic directly from the frontend:

```javascript
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .contains('skills', ['React', 'Node.js']); // Find users with overlapping skills

```

### **File Uploads**

Profile pictures are stored in **Supabase Storage**.

* **Bucket Name:** `avatars`
* **Security:** RLS policy ensures users can only upload to their own folder: `(storage.foldername(name))[1] = auth.uid()`.

---

## 📂 Project Structure

```text
├── src
│   ├── components   # UI Components (MatchCard, Navbar)
│   ├── hooks        # Custom hooks for Supabase logic
│   ├── lib          # Supabase client initialization
│   ├── pages        # Dashboard, Profiles, Login
│   └── types        # TypeScript definitions for DB tables
├── supabase
│   └── migrations   # SQL files for DB versioning
└── .env.local       # API Keys

```

---

## 🛡️ Security Checklist

* [ ] **RLS Enabled:** Every table in the Supabase dashboard must have RLS toggled **ON**.
* [ ] **Service Role Key:** Never use the `service_role` key in the frontend (use `anon` key only).
* [ ] **Email Confirmation:** Enabled in Supabase Auth settings to prevent bot spam.

---

*If you need help writing a specific **PostgreSQL Function (RPC)** for a complex matching algorithm (e.g., scoring based on multiple factors), let me know!*
