-- =====================================================
-- AI CUSTOMER SUPPORT AUTOMATION DATABASE
-- PostgreSQL Database Script
-- =====================================================

-- =====================================================
-- 1. CUSTOMER TICKETS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS customer_analysis_new (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    message TEXT NOT NULL,
    category TEXT,
    sentiment TEXT,
    urgency TEXT,
    response TEXT,
    ticket_status TEXT DEFAULT 'Open',
    assigned_to TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 2. SUPPORT AGENTS
-- =====================================================

CREATE TABLE IF NOT EXISTS support_agents (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    team VARCHAR(100),
    active BOOLEAN DEFAULT TRUE,
    current_tickets INTEGER DEFAULT 0
);

-- =====================================================
-- 3. REPORT HISTORY
-- =====================================================

CREATE TABLE IF NOT EXISTS report_history (
    id SERIAL PRIMARY KEY,
    report_name VARCHAR(100),
    report_type VARCHAR(20),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20)
);

-- =====================================================
-- USEFUL QUERIES
-- =====================================================

-- View all tickets
SELECT *
FROM customer_analysis_new
ORDER BY id DESC;

-- View latest 10 tickets
SELECT *
FROM customer_analysis_new
ORDER BY created_at DESC
LIMIT 10;

-- View all support agents
SELECT *
FROM support_agents;

-- View report history
SELECT *
FROM report_history
ORDER BY generated_at DESC;

-- Check duplicate customer messages
SELECT *
FROM customer_analysis_new
WHERE customer_email = 'ahmed@gmail.com'
  AND message = 'My order arrived damaged and I want a refund.';

-- Show table structure
SELECT
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'customer_analysis_new';

-- Delete invalid rows
DELETE
FROM customer_analysis_new
WHERE customer_email IS NULL;


SELECT *
FROM customer_analysis_new
ORDER BY id DESC;