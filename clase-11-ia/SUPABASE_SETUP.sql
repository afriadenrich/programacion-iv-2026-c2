-- ==========================================
-- GAMING PLATFORM - SUPABASE SETUP SCRIPT
-- ==========================================
-- Run all queries in Supabase SQL Editor
-- Order matters: Tables first, then RLS policies

-- ==========================================
-- 1. CREATE PROFILE PHOTOS BUCKET
-- ==========================================
-- Go to Storage > Create Bucket
-- Name: profile-photos
-- Public: Yes (allow read access)
-- Run this in SQL Editor after creating bucket:

INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-photos', 'profile-photos', true);

-- Create RLS policy for profile photos bucket
CREATE POLICY "Allow users to upload their own photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profile-photos');

CREATE POLICY "Allow public read access to photos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'profile-photos');

-- ==========================================
-- 2. CREATE USERS TABLE (EXTENDS AUTH)
-- ==========================================

CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  surname TEXT NOT NULL,
  birth_date DATE NOT NULL,
  profile_photo_url TEXT,
  role TEXT DEFAULT 'regular' CHECK (role IN ('regular', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can read public profile info
CREATE POLICY "Users can read public profiles"
ON public.users
FOR SELECT
TO authenticated
USING (true);

-- RLS Policy: Users can only update their own profile
CREATE POLICY "Users can update their own profile"
ON public.users
FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- RLS Policy: Admins can read all user data
CREATE POLICY "Admins can read all users"
ON public.users
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ==========================================
-- 3. CREATE HANGMAN_RESULTS TABLE
-- ==========================================

CREATE TABLE public.hangman_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL REFERENCES public.users(username),
  word TEXT NOT NULL,
  score INTEGER NOT NULL,
  letters_guessed INTEGER NOT NULL,
  incorrect_attempts INTEGER NOT NULL,
  time_taken INTEGER NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_hangman_username ON public.hangman_results(username);
CREATE INDEX idx_hangman_score ON public.hangman_results(score DESC);

-- Enable RLS on hangman_results
ALTER TABLE public.hangman_results ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can insert their own results
CREATE POLICY "Users can insert their own hangman results"
ON public.hangman_results
FOR INSERT
TO authenticated
WITH CHECK (
  username = (SELECT username FROM public.users WHERE id = auth.uid())
);

-- RLS Policy: All authenticated users can read all results (for rankings)
CREATE POLICY "All users can read hangman results"
ON public.hangman_results
FOR SELECT
TO authenticated
USING (true);

-- RLS Policy: Prevent updates and deletes
CREATE POLICY "No updates to hangman results"
ON public.hangman_results
FOR UPDATE
TO authenticated
USING (false);

CREATE POLICY "No deletes to hangman results"
ON public.hangman_results
FOR DELETE
TO authenticated
USING (false);

-- ==========================================
-- 4. CREATE HIGHER_LOWER_RESULTS TABLE
-- ==========================================

CREATE TABLE public.higher_lower_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL REFERENCES public.users(username),
  score INTEGER NOT NULL,
  consecutive_correct INTEGER NOT NULL,
  final_lives INTEGER NOT NULL,
  time_taken INTEGER NOT NULL,
  game_length INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_higher_lower_username ON public.higher_lower_results(username);
CREATE INDEX idx_higher_lower_score ON public.higher_lower_results(score DESC);
CREATE INDEX idx_higher_lower_consecutive ON public.higher_lower_results(consecutive_correct DESC);

-- Enable RLS on higher_lower_results
ALTER TABLE public.higher_lower_results ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can insert their own results
CREATE POLICY "Users can insert their own higher_lower results"
ON public.higher_lower_results
FOR INSERT
TO authenticated
WITH CHECK (
  username = (SELECT username FROM public.users WHERE id = auth.uid())
);

-- RLS Policy: All authenticated users can read all results
CREATE POLICY "All users can read higher_lower results"
ON public.higher_lower_results
FOR SELECT
TO authenticated
USING (true);

-- RLS Policy: Prevent updates and deletes
CREATE POLICY "No updates to higher_lower results"
ON public.higher_lower_results
FOR UPDATE
TO authenticated
USING (false);

CREATE POLICY "No deletes to higher_lower results"
ON public.higher_lower_results
FOR DELETE
TO authenticated
USING (false);

-- ==========================================
-- 5. CREATE TRIVIA_RESULTS TABLE
-- ==========================================

CREATE TABLE public.trivia_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL REFERENCES public.users(username),
  score INTEGER NOT NULL,
  correct_count INTEGER NOT NULL,
  incorrect_count INTEGER NOT NULL,
  time_taken INTEGER NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_trivia_username ON public.trivia_results(username);
CREATE INDEX idx_trivia_score ON public.trivia_results(score DESC);
CREATE INDEX idx_trivia_correct ON public.trivia_results(correct_count DESC);

-- Enable RLS on trivia_results
ALTER TABLE public.trivia_results ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can insert their own results
CREATE POLICY "Users can insert their own trivia results"
ON public.trivia_results
FOR INSERT
TO authenticated
WITH CHECK (
  username = (SELECT username FROM public.users WHERE id = auth.uid())
);

-- RLS Policy: All authenticated users can read all results
CREATE POLICY "All users can read trivia results"
ON public.trivia_results
FOR SELECT
TO authenticated
USING (true);

-- RLS Policy: Prevent updates and deletes
CREATE POLICY "No updates to trivia results"
ON public.trivia_results
FOR UPDATE
TO authenticated
USING (false);

CREATE POLICY "No deletes to trivia results"
ON public.trivia_results
FOR DELETE
TO authenticated
USING (false);

-- ==========================================
-- 6. CREATE BATTLESHIP_RESULTS TABLE
-- ==========================================

CREATE TABLE public.battleship_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL REFERENCES public.users(username),
  winner TEXT NOT NULL CHECK (winner IN ('player', 'ai')),
  total_turns INTEGER NOT NULL,
  player_hits INTEGER NOT NULL,
  player_misses INTEGER NOT NULL,
  ai_hits INTEGER NOT NULL,
  ai_misses INTEGER NOT NULL,
  time_taken INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_battleship_username ON public.battleship_results(username);
CREATE INDEX idx_battleship_winner ON public.battleship_results(winner);
CREATE INDEX idx_battleship_turns ON public.battleship_results(total_turns);

-- Enable RLS on battleship_results
ALTER TABLE public.battleship_results ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can insert their own results
CREATE POLICY "Users can insert their own battleship results"
ON public.battleship_results
FOR INSERT
TO authenticated
WITH CHECK (
  username = (SELECT username FROM public.users WHERE id = auth.uid())
);

-- RLS Policy: All authenticated users can read all results
CREATE POLICY "All users can read battleship results"
ON public.battleship_results
FOR SELECT
TO authenticated
USING (true);

-- RLS Policy: Prevent updates and deletes
CREATE POLICY "No updates to battleship results"
ON public.battleship_results
FOR UPDATE
TO authenticated
USING (false);

CREATE POLICY "No deletes to battleship results"
ON public.battleship_results
FOR DELETE
TO authenticated
USING (false);

-- ==========================================
-- 7. CREATE CHAT_MESSAGES TABLE
-- ==========================================

CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL REFERENCES public.users(username),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_chat_created ON public.chat_messages(created_at DESC);
CREATE INDEX idx_chat_username ON public.chat_messages(username);

-- Enable RLS on chat_messages
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Authenticated users can insert messages
CREATE POLICY "Users can insert chat messages"
ON public.chat_messages
FOR INSERT
TO authenticated
WITH CHECK (
  username = (SELECT username FROM public.users WHERE id = auth.uid())
);

-- RLS Policy: All authenticated users can read all messages
CREATE POLICY "All users can read chat messages"
ON public.chat_messages
FOR SELECT
TO authenticated
USING (true);

-- RLS Policy: Prevent updates and deletes
CREATE POLICY "No updates to chat messages"
ON public.chat_messages
FOR UPDATE
TO authenticated
USING (false);

CREATE POLICY "No deletes to chat messages"
ON public.chat_messages
FOR DELETE
TO authenticated
USING (false);

-- ==========================================
-- 8. CREATE STORAGE BUCKET POLICIES
-- ==========================================

-- These policies are for profile photos bucket
-- Allow authenticated users to read all photos
CREATE POLICY "Public read access to profile photos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'profile-photos');

-- Allow users to upload photos to their own folder
CREATE POLICY "Users can upload profile photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-photos' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- ==========================================
-- 9. ENABLE REALTIME FOR CHAT
-- ==========================================

-- Enable realtime for chat_messages table
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;

-- ==========================================
-- SETUP COMPLETE
-- ==========================================
-- All tables, RLS policies, and storage are configured
-- The app is ready to use with Supabase authentication
