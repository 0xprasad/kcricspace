CREATE DATABASE IF NOT EXISTS cricket_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cricket_platform;

CREATE TABLE roles (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(32) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (name) VALUES ('admin'), ('user');

CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  role_id BIGINT NOT NULL,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  phone VARCHAR(32) NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(255) NULL,
  google_id VARCHAR(190) NULL UNIQUE,
  status ENUM('active', 'blocked', 'pending') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(id),
  INDEX idx_users_role (role_id),
  INDEX idx_users_status (status)
);

CREATE TABLE teams (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  owner_user_id BIGINT NOT NULL,
  name VARCHAR(120) NOT NULL UNIQUE,
  short_code VARCHAR(8) NOT NULL UNIQUE,
  city VARCHAR(80) NOT NULL,
  home_ground VARCHAR(120) NULL,
  logo_url VARCHAR(255) NULL,
  captain_player_id BIGINT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_team_owner FOREIGN KEY (owner_user_id) REFERENCES users(id),
  INDEX idx_teams_city (city)
);

CREATE TABLE players (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NULL,
  team_id BIGINT NULL,
  full_name VARCHAR(120) NOT NULL,
  date_of_birth DATE NULL,
  city VARCHAR(80) NULL,
  role ENUM('batsman', 'bowler', 'all_rounder', 'wicket_keeper') NOT NULL,
  batting_hand ENUM('right', 'left') NOT NULL DEFAULT 'right',
  bowling_style VARCHAR(80) NULL,
  jersey_number VARCHAR(12) NULL,
  avatar_url VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_players_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_players_team FOREIGN KEY (team_id) REFERENCES teams(id),
  INDEX idx_players_team (team_id),
  INDEX idx_players_name (full_name)
);

ALTER TABLE teams ADD CONSTRAINT fk_team_captain FOREIGN KEY (captain_player_id) REFERENCES players(id);

CREATE TABLE tournaments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  created_by BIGINT NOT NULL,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(180) NOT NULL UNIQUE,
  description TEXT NULL,
  type ENUM('league', 'knockout', 'hybrid') NOT NULL,
  format ENUM('T10', 'T20', 'ODI', 'TEST') NOT NULL,
  city VARCHAR(80) NOT NULL,
  venue VARCHAR(120) NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  registration_deadline DATE NOT NULL,
  max_teams INT NOT NULL,
  entry_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  prize_pool DECIMAL(12,2) NOT NULL DEFAULT 0,
  status ENUM('draft', 'open', 'live', 'completed', 'cancelled') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_tournament_creator FOREIGN KEY (created_by) REFERENCES users(id),
  INDEX idx_tournaments_dates (start_date, end_date),
  INDEX idx_tournaments_status (status, format)
);

CREATE TABLE tournament_teams (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  tournament_id BIGINT NOT NULL,
  team_id BIGINT NOT NULL,
  registration_status ENUM('pending', 'approved', 'rejected', 'withdrawn') NOT NULL DEFAULT 'pending',
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  approved_at TIMESTAMP NULL,
  UNIQUE KEY uq_tournament_team (tournament_id, team_id),
  CONSTRAINT fk_tournament_teams_tournament FOREIGN KEY (tournament_id) REFERENCES tournaments(id),
  CONSTRAINT fk_tournament_teams_team FOREIGN KEY (team_id) REFERENCES teams(id),
  INDEX idx_tournament_teams_status (registration_status)
);

CREATE TABLE matches (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  tournament_id BIGINT NOT NULL,
  team_a_id BIGINT NOT NULL,
  team_b_id BIGINT NOT NULL,
  winner_team_id BIGINT NULL,
  toss_winner_team_id BIGINT NULL,
  elected_to ENUM('bat', 'bowl') NULL,
  ground_name VARCHAR(120) NOT NULL,
  city VARCHAR(80) NULL,
  scheduled_at DATETIME NOT NULL,
  started_at DATETIME NULL,
  ended_at DATETIME NULL,
  overs_per_innings INT NOT NULL,
  status ENUM('scheduled', 'live', 'completed', 'abandoned') NOT NULL DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_matches_tournament FOREIGN KEY (tournament_id) REFERENCES tournaments(id),
  CONSTRAINT fk_matches_team_a FOREIGN KEY (team_a_id) REFERENCES teams(id),
  CONSTRAINT fk_matches_team_b FOREIGN KEY (team_b_id) REFERENCES teams(id),
  CONSTRAINT fk_matches_winner FOREIGN KEY (winner_team_id) REFERENCES teams(id),
  INDEX idx_matches_schedule (scheduled_at, status),
  INDEX idx_matches_tournament (tournament_id)
);

CREATE TABLE innings (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  match_id BIGINT NOT NULL,
  innings_number INT NOT NULL,
  batting_team_id BIGINT NOT NULL,
  bowling_team_id BIGINT NOT NULL,
  total_runs INT NOT NULL DEFAULT 0,
  wickets INT NOT NULL DEFAULT 0,
  overs_bowled DECIMAL(4,1) NOT NULL DEFAULT 0,
  UNIQUE KEY uq_match_innings (match_id, innings_number),
  CONSTRAINT fk_innings_match FOREIGN KEY (match_id) REFERENCES matches(id),
  CONSTRAINT fk_innings_batting_team FOREIGN KEY (batting_team_id) REFERENCES teams(id),
  CONSTRAINT fk_innings_bowling_team FOREIGN KEY (bowling_team_id) REFERENCES teams(id)
);

CREATE TABLE balls (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  innings_id BIGINT NOT NULL,
  over_number INT NOT NULL,
  ball_in_over INT NOT NULL,
  striker_id BIGINT NOT NULL,
  non_striker_id BIGINT NULL,
  bowler_id BIGINT NOT NULL,
  runs_bat INT NOT NULL DEFAULT 0,
  extras_type ENUM('none', 'wide', 'no_ball', 'bye', 'leg_bye') NOT NULL DEFAULT 'none',
  extras_runs INT NOT NULL DEFAULT 0,
  is_wicket BOOLEAN NOT NULL DEFAULT FALSE,
  dismissal_type VARCHAR(32) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_balls_innings FOREIGN KEY (innings_id) REFERENCES innings(id),
  CONSTRAINT fk_balls_striker FOREIGN KEY (striker_id) REFERENCES players(id),
  CONSTRAINT fk_balls_bowler FOREIGN KEY (bowler_id) REFERENCES players(id),
  INDEX idx_balls_progression (innings_id, over_number, ball_in_over)
);

CREATE TABLE scorecards (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  match_id BIGINT NOT NULL UNIQUE,
  summary_json JSON NOT NULL,
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_scorecards_match FOREIGN KEY (match_id) REFERENCES matches(id)
);

CREATE TABLE player_stats (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  player_id BIGINT NOT NULL UNIQUE,
  matches_played INT NOT NULL DEFAULT 0,
  innings_batted INT NOT NULL DEFAULT 0,
  runs_scored INT NOT NULL DEFAULT 0,
  batting_average DECIMAL(8,2) NOT NULL DEFAULT 0,
  strike_rate DECIMAL(8,2) NOT NULL DEFAULT 0,
  wickets_taken INT NOT NULL DEFAULT 0,
  bowling_average DECIMAL(8,2) NOT NULL DEFAULT 0,
  economy_rate DECIMAL(8,2) NOT NULL DEFAULT 0,
  catches INT NOT NULL DEFAULT 0,
  run_outs INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_player_stats_player FOREIGN KEY (player_id) REFERENCES players(id),
  INDEX idx_player_stats_runs (runs_scored DESC),
  INDEX idx_player_stats_wickets (wickets_taken DESC)
);

CREATE TABLE team_stats (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  team_id BIGINT NOT NULL UNIQUE,
  matches_played INT NOT NULL DEFAULT 0,
  matches_won INT NOT NULL DEFAULT 0,
  matches_lost INT NOT NULL DEFAULT 0,
  points INT NOT NULL DEFAULT 0,
  net_run_rate DECIMAL(8,3) NOT NULL DEFAULT 0,
  total_runs INT NOT NULL DEFAULT 0,
  total_wickets INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_team_stats_team FOREIGN KEY (team_id) REFERENCES teams(id),
  INDEX idx_team_stats_rank (points DESC, net_run_rate DESC)
);

CREATE TABLE payments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  tournament_id BIGINT NOT NULL,
  team_id BIGINT NOT NULL,
  provider ENUM('razorpay') NOT NULL,
  provider_order_id VARCHAR(120) NOT NULL UNIQUE,
  provider_payment_id VARCHAR(120) NULL,
  provider_signature VARCHAR(255) NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'INR',
  status ENUM('created', 'authorized', 'captured', 'failed', 'refunded') NOT NULL DEFAULT 'created',
  paid_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_payments_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_payments_tournament FOREIGN KEY (tournament_id) REFERENCES tournaments(id),
  CONSTRAINT fk_payments_team FOREIGN KEY (team_id) REFERENCES teams(id),
  INDEX idx_payments_status (status, created_at)
);
