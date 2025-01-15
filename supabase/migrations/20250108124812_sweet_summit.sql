/*
  # Add wallet functionality tables

  1. New Tables
    - `wallets`: Stores user wallet balances and coins
    - `wallet_transactions`: Records all wallet transactions
    - `token_transfers`: Manages token transfer between users

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Wallets table
CREATE TABLE IF NOT EXISTS wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) UNIQUE,
  balance numeric NOT NULL DEFAULT 0,
  coins integer NOT NULL DEFAULT 0,
  last_updated timestamptz DEFAULT now()
);

-- Wallet transactions table
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  amount numeric NOT NULL,
  type text NOT NULL,
  status text NOT NULL,
  coins_received integer,
  transfer_code text,
  recipient_id uuid REFERENCES auth.users(id),
  timestamp timestamptz DEFAULT now()
);

-- Token transfers table
CREATE TABLE IF NOT EXISTS token_transfers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id uuid REFERENCES auth.users(id),
  to_user_id uuid REFERENCES auth.users(id),
  amount integer NOT NULL,
  transfer_code text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_transfers ENABLE ROW LEVEL SECURITY;

-- Wallet policies
CREATE POLICY "Users can view their own wallet"
  ON wallets
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own wallet"
  ON wallets
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own wallet"
  ON wallets
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Transaction policies
CREATE POLICY "Users can view their own transactions"
  ON wallet_transactions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create transactions"
  ON wallet_transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Token transfer policies
CREATE POLICY "Users can view their token transfers"
  ON token_transfers
  FOR SELECT
  TO authenticated
  USING (from_user_id = auth.uid() OR to_user_id = auth.uid());

CREATE POLICY "Users can initiate transfers"
  ON token_transfers
  FOR INSERT
  TO authenticated
  WITH CHECK (from_user_id = auth.uid());

CREATE POLICY "Users can complete transfers"
  ON token_transfers
  FOR UPDATE
  TO authenticated
  USING (status = 'pending');