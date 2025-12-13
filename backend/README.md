# TMS Backend (Minimal Express Scaffold)

Quick start for the simple Task Management backend used for development and local testing.

Requirements
- Node.js 14+

Install

```bash
cd backend
npm install
```

Run

Set `MONGODB_URI` in environment or use default `mongodb://127.0.0.1:27017/tms`.

```bash
cd backend
npm start
# or for development with nodemon if installed globally:
npm run dev
```

API
- Health: `GET /` -> {status: 'ok'}
- Tasks list: `GET /api/tasks`
- Create: `POST /api/tasks` (json body: title, description, completed)
- Get: `GET /api/tasks/:id`
- Update: `PUT /api/tasks/:id` (partial body)
- Delete: `DELETE /api/tasks/:id`

Notes
- This backend uses an in-memory store in `models/taskModel.js` for simplicity.
- For production, replace the model with a persistent database (MongoDB / PostgreSQL).
