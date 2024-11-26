-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    date_of_birth DATE NOT NULL,
    address JSONB NOT NULL,
    document_number VARCHAR(50) UNIQUE NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    document_upload TEXT, -- URL or Path to the uploaded document
    is_superadmin BOOLEAN DEFAULT FALSE,
    password_hash TEXT NOT NULL, -- Store securely hashed passwords
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create KYC/KYB Checks Table
CREATE TABLE IF NOT EXISTS kyc_checks (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'Pending', -- Pending, Verified, Rejected
    document_type VARCHAR(50),
    document_number VARCHAR(50),
    details TEXT, -- Additional information about the check
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
