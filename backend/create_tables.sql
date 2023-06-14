CREATE TABLE
    IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        title VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        amount NUMERIC(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );

CREATE TABLE
    IF NOT EXISTS goals (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        title VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        amount NUMERIC(10, 2) NOT NULL,
        balance NUMERIC(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );

CREATE TABLE
    IF NOT EXISTS cards (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        card_name VARCHAR(255) NOT NULL,
        bank VARCHAR(255) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );

# Querys Transaction 