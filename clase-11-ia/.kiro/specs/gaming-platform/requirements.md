# Requirements Document: Gaming Platform

## Introduction

A gaming platform built with Angular 22 and Supabase that provides authentication, multiple games, real-time chat, and competitive rankings. The platform includes four distinct games (Hangman, Higher or Lower, Trivia, and Battleship vs AI), user authentication with profile management, game result tracking, and a global chat system with real-time updates.

## Glossary

- **System**: The Gaming Platform application
- **User**: An authenticated player with regular or admin privileges
- **Game**: One of four playable games (Hangman, Higher or Lower, Trivia, Battleship)
- **Result**: A record of a user's performance in a game, including score and metadata
- **Guard**: Route protection mechanism that prevents unauthorized access
- **RLS**: Row-Level Security policies in Supabase for data access control
- **Realtime**: Supabase Realtime feature for live data synchronization

## Requirements

### Requirement 1: User Authentication and Authorization

**User Story:** As a user, I want to authenticate securely, so that I can access my profile and play games.

#### Acceptance Criteria

1. WHEN a user provides valid email/username and password on the login page, THE System SHALL authenticate the user via Supabase Auth
2. WHEN a user attempts to login with invalid credentials, THE System SHALL display a clear error message and prevent access
3. WHEN a user logs out, THE System SHALL clear the session and redirect to the login page
4. WHEN an unauthenticated user attempts to access a protected route, THE System SHALL redirect to the login page
5. WHEN an authenticated user accesses a protected route, THE System SHALL allow access based on their role (regular or admin)

### Requirement 2: User Registration

**User Story:** As a new user, I want to register with required information, so that I can create an account and access the platform.

#### Acceptance Criteria

1. WHEN a user submits the registration form with valid data (email, name, username, password, birth date, profile photo), THE System SHALL create a new user account in Supabase
2. WHEN a user attempts to register with a duplicate email, THE System SHALL prevent registration and display an error message
3. WHEN a user attempts to register with a duplicate username, THE System SHALL prevent registration and display an error message
4. WHEN registration succeeds, THE System SHALL store the profile photo in Supabase Storage and save the user record with all provided information
5. WHEN registration succeeds, THE System SHALL display a success message and redirect to the login page

### Requirement 3: Route Navigation

**User Story:** As a user, I want to navigate between different pages, so that I can access games, chat, rankings, and my profile.

#### Acceptance Criteria

1. THE System SHALL provide navigation routes for: Login, Register, Home, About, Game1, Game2, Game3, Game4, Chat, and Rankings
2. WHEN a user is not authenticated, THE System SHALL prevent access to protected routes (Home, Games, Chat, Rankings)
3. WHEN a user is authenticated, THE System SHALL display the navigation menu with links to all accessible routes
4. WHEN a user navigates between routes, THE System SHALL load the appropriate component without full page refresh

### Requirement 4: Home Page and Game Overview

**User Story:** As a user, I want to see a welcome message and descriptions of all available games, so that I can choose which game to play.

#### Acceptance Criteria

1. WHEN an authenticated user loads the home page, THE System SHALL display a personalized welcome message with their username
2. WHEN a user views the home page, THE System SHALL display cards for all four games (Hangman, Higher or Lower, Trivia, Battleship)
3. WHEN a user views a game card, THE System SHALL display the game name, description, and a link to play
4. WHEN a user clicks a game link, THE System SHALL navigate to the corresponding game component

### Requirement 5: About Page (Quien Soy)

**User Story:** As a user, I want to view developer information, so that I can learn about who created the platform.

#### Acceptance Criteria

1. WHEN a user navigates to the About page, THE System SHALL fetch developer data from GitHub API (https://api.github.com/users/afriadenrich)
2. WHEN GitHub data is successfully retrieved, THE System SHALL display it in a card format showing profile information
3. WHEN GitHub data cannot be retrieved, THE System SHALL display an error message and retry option

### Requirement 6: Game 1 - Hangman

**User Story:** As a user, I want to play Hangman, so that I can test my word-guessing skills against a timer.

#### Acceptance Criteria

1. WHEN a user starts Hangman, THE System SHALL select a random word from a predefined word array and initialize the game state
2. WHEN a user clicks a letter button on the on-screen keyboard, THE System SHALL process the guess and update the display
3. WHEN a user guesses correctly, THE System SHALL reveal the letter in all positions and continue the game
4. WHEN a user guesses incorrectly, THE System SHALL decrement the remaining attempts and display the hangman drawing state
5. WHEN the timer reaches zero, THE System SHALL end the game and record the result
6. WHEN the user completes the game, THE System SHALL save the result to the hangman_results table with score and timestamp

### Requirement 7: Game 2 - Higher or Lower (Chance Game)

**User Story:** As a user, I want to play Higher or Lower, so that I can test my decision-making with poker cards and limited lives.

#### Acceptance Criteria

1. WHEN a user starts Higher or Lower, THE System SHALL initialize with three lives and display an initial poker card
2. WHEN a user predicts whether the next card is higher or lower, THE System SHALL compare and update game state
3. WHEN a user makes a correct prediction, THE System SHALL show the new card and increment the score
4. WHEN a user makes an incorrect prediction, THE System SHALL decrement lives and display feedback
5. WHEN lives reach zero or timer expires, THE System SHALL end the game and record the result
6. WHEN the game completes, THE System SHALL save the result to the higher_lower_results table with score, lives remaining, and timestamp

### Requirement 8: Game 3 - Trivia Questions

**User Story:** As a user, I want to answer trivia questions, so that I can test my knowledge with multiple choice options.

#### Acceptance Criteria

1. WHEN a user starts Trivia, THE System SHALL load 20 random questions from a predefined question array with multiple choice options
2. WHEN a user selects an answer, THE System SHALL immediately show whether the answer is correct or incorrect with the correct answer highlighted
3. WHEN a user completes all questions or the timer expires, THE System SHALL calculate the final score and end the game
4. WHEN the game completes, THE System SHALL save the result to the trivia_results table with score, correct_count, and timestamp

### Requirement 9: Game 4 - Battleship vs AI

**User Story:** As a user, I want to play Battleship against an AI opponent, so that I can enjoy a strategic game with clear turn management.

#### Acceptance Criteria

1. WHEN a user starts Battleship, THE System SHALL display a ship placement interface where the user places ships without overlapping
2. WHEN ships are placed validly (no overlap, within board bounds), THE System SHALL initialize the game board and begin gameplay
3. WHEN a user takes a turn and clicks a target cell, THE System SHALL process the hit/miss and display feedback
4. WHEN the AI takes a turn, THE System SHALL display "AI is thinking" and process the move within a timeout period
5. WHEN the AI move completes, THE System SHALL update the board and display the result to the user
6. WHEN one player sinks all opponent ships, THE System SHALL declare the winner and record the result
7. WHEN the game completes, THE System SHALL save the result to the battleship_results table with winner, turns, and timestamp

### Requirement 10: Rankings System

**User Story:** As a user, I want to view top performers, so that I can see how my scores compare to other players.

#### Acceptance Criteria

1. WHEN a user navigates to Rankings, THE System SHALL display a list of available games to filter by
2. WHEN a user selects a game, THE System SHALL display the top 10 results ordered by best performance (descending)
3. WHEN rankings are displayed, THE System SHALL show username, score, and game-specific metrics for each result
4. WHEN a user views rankings, THE System SHALL query the corresponding game_results table and order by performance metrics

### Requirement 11: Global Chat System

**User Story:** As a user, I want to chat with other players in real-time, so that I can communicate and socialize.

#### Acceptance Criteria

1. WHEN an authenticated user navigates to Chat, THE System SHALL display a list of previous messages with username, timestamp, and content
2. WHEN a user types a message and presses send, THE System SHALL save the message to the chat table with timestamp
3. WHEN new messages are sent by any user, THE System SHALL use Supabase Realtime to update all connected clients immediately
4. WHEN an unauthenticated user attempts to access Chat, THE System SHALL redirect to the login page
5. WHEN messages are displayed, THE System SHALL show the message author username, content, and formatted timestamp

### Requirement 12: Error Handling and User Feedback

**User Story:** As a user, I want clear error messages and success feedback, so that I understand the outcome of my actions.

#### Acceptance Criteria

1. WHEN a form submission fails, THE System SHALL display a clear error message describing what went wrong
2. WHEN an operation succeeds, THE System SHALL display a success toast notification using Toast.js format
3. WHEN an error occurs during API calls, THE System SHALL display a user-friendly error message and recovery option
4. WHEN form validation fails, THE System SHALL display inline error messages next to invalid fields

### Requirement 13: Responsive Design with Tailwind CSS

**User Story:** As a user, I want the application to work on all devices, so that I can play games on desktop, tablet, or mobile.

#### Acceptance Criteria

1. THE System SHALL use Tailwind CSS for all styling and responsive breakpoints
2. WHEN a user accesses the application on a mobile device, THE System SHALL display a mobile-optimized layout
3. WHEN a user accesses the application on a desktop, THE System SHALL display a full-featured layout with all functionality

### Requirement 14: Reusable Global Components

**User Story:** As a developer, I want to reuse common components, so that the codebase is maintainable and consistent.

#### Acceptance Criteria

1. THE System SHALL provide a reusable Navigation component displayed on all pages
2. THE System SHALL provide a reusable Footer component displayed on all pages
3. WHEN global components are used, THE System SHALL ensure consistent styling and behavior across all routes
