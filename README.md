# ChatBot

A full-stack chatbot application built with React, Express, TypeScript, and
Node NLP. The frontend provides a simple chat interface, while the backend
classifies messages and returns responses based on the configured intents.

## Project structure

```text
ChatBot/
├── backend/
│   ├── config/config.json       # Backend fallback configuration
│   ├── src/
│   │   ├── controllers/         # Request handling and validation
│   │   ├── nlp/                 # NLP manager and message processing
│   │   ├── routes/              # Express routes
│   │   ├── app.ts               # Express application
│   │   └── index.ts             # Server startup and NLP training
│   ├── tests/                   # Backend API tests
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── helper/              # API client
│   │   ├── tests/               # Frontend tests
│   │   └── App.js               # Chat interface
│   ├── .env.development
│   └── package.json
└── README.md
```

## Requirements

- Node.js 18 or later
- npm 9 or later

## Configuration

The backend runs on port `5000` by default:

```json
{
  "PORT": 5000
}
```

The frontend development server runs on port `5001` and sends API requests to
the backend:

```env
REACT_APP_BASE_URL="http://localhost:5000"
PORT=5001
```

The frontend environment file is located at `frontend/.env.development`.
Restart the frontend after changing environment variables.

The backend also accepts these environment variables:

```env
PORT=5000
FRONTEND_URL=http://localhost:5001
```

`PORT` overrides the value in `backend/config/config.json`. `FRONTEND_URL`
restricts the allowed CORS origin; if it is not defined, the backend allows
all origins for local development.

## Installation

Install dependencies in each project:

```powershell
cd backend
npm install

cd ..\frontend
npm install
```

## Running the application

Open two terminals from the repository root.

### Terminal 1: backend

```powershell
cd backend
npm run dev
```

The backend trains the NLP model and starts at:

```text
http://localhost:5000
```

### Terminal 2: frontend

```powershell
cd frontend
npm start
```

Open the application at:

```text
http://localhost:5001
```

## API endpoints

### Health check

```http
GET /health
```

Response:

```json
{
  "status": "ok"
}
```

### Process a chatbot message

```http
GET /chatbot?message=hello
```

Response:

```json
{
  "data": "Hey!"
}
```

The `message` query parameter is required and cannot exceed 500 characters.
Invalid requests return a JSON error with HTTP status `400`.

## Available scripts

### Backend

Run these commands from `backend/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the TypeScript development server |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Start the compiled backend |
| `npm run typecheck` | Check TypeScript without emitting files |
| `npm test` | Run backend API tests |
| `npm run test:types` | Run the TypeScript check |

### Frontend

Run these commands from `frontend/`:

| Command | Description |
| --- | --- |
| `npm start` | Start the React development server |
| `npm run build` | Create a production build |
| `npm test` | Run frontend tests |

## Testing

Run backend tests:

```powershell
cd backend
npm test
```

Run frontend tests in non-interactive mode:

```powershell
cd frontend
$env:CI="true"
npm test -- --watchAll=false --runInBand
```

The test suites cover the health endpoint, chatbot validation, message
processing, frontend rendering, API responses, empty messages, and API errors.

## Development notes

- The backend trains the NLP model during startup.
- Generated backend files are written to `backend/dist/` and are ignored by
  Git.
- The backend model file is generated locally and is not committed.
- The frontend must be restarted after changing `.env.development`.
- Keep the backend and frontend running in separate terminals during local
  development.
