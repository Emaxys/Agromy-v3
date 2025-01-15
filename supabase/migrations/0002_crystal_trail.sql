/*
  # Add delivery addresses and admin features

  1. New Tables
    - `delivery_addresses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `city` (text)
      - `address` (text)
      - `created_at` (timestamp)
    - `admin_users`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on new tables
    - Add policies for authenticated users
*/

-- Delivery addresses table
CREATE TABLE IF NOT EXISTS delivery_addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  city text NOT NULL,
  address text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE delivery_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policies for delivery_addresses
CREATE POLICY "Users can manage their own delivery addresses"
  ON delivery_addresses
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Policies for admin_users
CREATE POLICY "Admin users can view admin table"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid()
  ));