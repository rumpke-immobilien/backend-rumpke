
# Rumpke AI Backend

Backend for the "Ich schenk dir was" program by Rumpke Immobilien. This service exposes a NestJS-based API to manage the Tippgeber (real estate referral) program, integrating form validation, captcha protection, and automated responses via OpenAI.

## Table of Contents
- [Description](#description)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation & Usage](#installation--usage)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [License](#license)

## Description
This backend manages the flow of real estate referrals (tipps) for Rumpke Immobilien. It allows you to:
- Register referral forms (tip-form)
- Validate captchas to prevent spam
- Query the number of referrals
- Answer frequently asked questions about the program using OpenAI

## Technologies
- [NestJS](https://nestjs.com/) (Node.js framework)
- [Prisma ORM](https://www.prisma.io/) (PostgreSQL)
- [OpenAI API](https://platform.openai.com/)
- [Nodemailer](https://nodemailer.com/) (for emails)
- [TypeScript](https://www.typescriptlang.org/)

## Project Structure
```
src/
	app.module.ts           # Main module
	main.ts                 # App bootstrap
	captcha/                # Captcha validation service
	email/                  # Email sending service
	prisma/                 # Database access module and service
	rumpkeai/               # Tippgeber program logic
		dtos/                 # DTO definitions
		use-case/             # Use cases (OpenAI, business logic)
prisma/
	schema.prisma           # Database schema
	migrations/             # SQL migrations
```

## Installation & Usage
1. Clone the repository:
	 ```bash
	 git clone <REPO_URL>
	 cd rumpke-ai
	 ```
2. Install dependencies:
	 ```bash
	 npm install
	 ```
3. Create the `.env` file based on `.env.template` and configure the required variables.
4. Run the database migrations (if using Prisma):
	 ```bash
	 npx prisma migrate dev --name init
	 ```
5. Start the server in development mode:
	 ```bash
	 npm run start:dev
	 ```

## Environment Variables
Example of required variables:
```
DATABASE_URL=postgresql://user:password@localhost:5432/rumpke
OPENAI_API_KEY=sk-...
EMAIL_USER=...
EMAIL_PASS=...
```

## Available Scripts
- `npm run start:dev`   - Start the server in development mode
- `npm run build`       - Build the project
- `npm run test`        - Run tests
- `npm run lint`        - Lint with ESLint
- `npx prisma studio`   - Visual interface for the database

## License
This project is private and has no distribution license.
