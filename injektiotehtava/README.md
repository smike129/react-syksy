# Injection exercise - Node.js Version

This is a Node.js conversion of the original PHP educational security vulnerabilities website. The site demonstrates SQL injection and Cross-Site Scripting (XSS) vulnerabilities for educational purposes.

## Features

- **SQL Injection Exercises** (3 exercises)
- **Cross-Site Scripting (XSS) Exercises** (2 exercises)
- Educational content about web security vulnerabilities
- Intentionally vulnerable code for learning purposes

## Prerequisites

- Node.js (version 22 or higher)
- No additional database setup required (uses built-in SQLite)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Database setup:**
   - The application automatically creates a SQLite database file (`database/injection.db`)
   - No additional configuration required

## Running the Application

1. **Start the server:**
   ```bash
   npm start
   ```

2. **For development (with auto-restart):**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   - Open your browser and go to `http://localhost:3000`

## Exercise Information

### XSS Exercises
- **Exercise 1:** Basic XSS with image injection
- **Exercise 2:** Persistent XSS in a forum system

### SQL Injection Exercises
- **Exercise 1:** User enumeration and information disclosure
- **Exercise 2:** Admin privilege escalation
- **Exercise 3:** Database manipulation (table deletion)

## Security Notice

⚠️ **IMPORTANT:** This application contains intentionally vulnerable code for educational purposes. Do not deploy this in a production environment or expose it to the internet without proper security measures.

## File Structure

```
/
├── server.js              # Main Express server
├── package.json           # Node.js dependencies
├── config/
│   └── database.js        # Database connection
├── database/              # SQLite database directory
│   └── injection.db       # SQLite database file (auto-created)
├── views/                 # EJS templates
│   ├── layout.ejs         # Main layout template
│   ├── home.ejs           # Home page
│   ├── xss1.ejs           # XSS exercise 1
│   ├── xss2.ejs           # XSS exercise 2
│   ├── sql1.ejs           # SQL injection exercise 1
│   ├── sql2.ejs           # SQL injection exercise 2
│   ├── sql3.ejs           # SQL injection exercise 3
│   ├── helper.ejs         # Helper page
│   └── 404.ejs            # 404 error page
├── public/
    └── styles.css         # CSS styles
```

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** SQLite (built into Node.js 22+)
- **Template Engine:** EJS
- **Styling:** CSS
