# Agency Client Portal

An open-source client portal solution for agencies to manage projects, communicate with clients, and streamline workflows.

## Introduction

Agency Client Portal is a powerful, customizable web application designed to help agencies improve client communication, project management, and overall efficiency. Built with modern web technologies, it offers a seamless experience for both agencies and their clients.

Key features:
- Project management dashboard
- Client communication tools
- File sharing and collaboration
- Task tracking and assignment
- Customizable branding options

## Setup and Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- PostgreSQL database
- SMTP server for email notifications

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/harishdeivanayagam/agencykit.git
   cd agency-client-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy the `.env.example` file to `.env` and update the values with your configuration.

4. Run database migrations:
   ```bash
   npm run migrate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000` to access the application.

## Database and Email Configuration

### PostgreSQL Setup

1. Install PostgreSQL on your system if not already installed.
2. Create a new database for the project.
3. Update the `DATABASE_URL` in your `.env` file with the connection string for your PostgreSQL database.

### SMTP Configuration

1. Set up an SMTP server or use a service like SendGrid, Mailgun, or Amazon SES.
2. Update the following variables in your `.env` file:
   ```bash
   SMTP_HOST=your_smtp_host
   SMTP_PORT=your_smtp_port
   SMTP_USER=your_smtp_username
   SMTP_PASSWORD=your_smtp_password
   ```

## Contributing

We welcome contributions to the Agency Client Portal project. Please read our [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to submit pull requests, report issues, and suggest improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Copyright

Copyright (c) 2024 Harish Deivanayagam. All rights reserved.
