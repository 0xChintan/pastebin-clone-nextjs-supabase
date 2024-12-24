# Pastebin Clone with Next.js and Supabase

## Overview

This project is a modern Pastebin clone built with Next.js and Supabase. It features a sleek, SaaS-like user interface powered by [shadcn/ui](https://ui.shadcn.dev/) and provides functionality for creating, sharing, and managing text pastes. User authentication and paste management are seamlessly integrated with Supabase, ensuring a secure and efficient experience.

## Features

- **Modern UI**: Built with a focus on user experience and responsive design.
- **Authentication**: Secure email/password authentication using Supabase.
- **Protected Routes**: User dashboard and management pages are protected, ensuring only authenticated access.
- **Paste Creation**: Form to create pastes with the following options:
  - Title
  - Content
  - Optional password protection
  - Expiration time selector
- **User Dashboard**: View, manage, and share pastes created by the user.
- **Instant Shareable Links**: Generate links for sharing pastes publicly.
- **Password Verification**: Secure access for protected pastes.
- **Responsive Design**: Fully functional on both mobile and desktop devices.

---

## Tech Stack

- **Frontend**: Next.js with shadcn/ui for a modern, responsive UI.
- **Backend**: Supabase for database, authentication, and API management.
- **Styling**: Tailwind CSS integrated with shadcn/ui.
- **State Management**: React hooks and Supabase client integration.

---

## Getting Started

### Prerequisites

- Node.js
- Supabase account
- Supabase project

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/0xChintan/pastebin-clone-nextjs-supabase.git
   cd pastebin-clone-nextjs-supabase
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## Supabase Setup

1. Log in to your Supabase account and create a new project.
2. Set up authentication by enabling email/password sign-in in the Authentication settings.
3. Create a database table named `pastes` with the following schema:
   ```sql
   CREATE TABLE pastes (
       id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
       title text NOT NULL,
       content text NOT NULL,
       password_hash text,
       expires_at timestamptz,
       created_at timestamptz DEFAULT now(),
       user_id uuid REFERENCES auth.users,
       is_public boolean DEFAULT true,
       view_count integer DEFAULT 0,
       short_code text UNIQUE
   );
   ```

---

## Key Functionalities

### Authentication

- Handled with Supabase's authentication API.
- Protected routes implemented using middleware in Next.js.

### Paste Creation

- A form with fields for title, content, optional password, and expiration time.
- Data is stored securely in the Supabase database.

### User Dashboard

- Displays all pastes created by the logged-in user.
- Provides options to edit or delete pastes.

### Public Paste Pages

- Shareable links generated instantly.
- Password-protected pastes prompt users to enter the correct password before displaying content.

---

## Available Scripts

### `npm run dev`

Starts the development server.

### `npm run build`

Builds the app for production.

### `npm run start`

Runs the production build.
