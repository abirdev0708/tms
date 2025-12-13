# nodejstesting

# Task Management System (Full Stack)

A scalable task management system built with React, Node.js, MongoDB, and Redis.

## Features
- JWT Authentication (Access + Refresh tokens)
- Role-based Authorization (Admin/User)
- Pagination & Filtering
- Redis Caching
- Rate Limiting
- Secure API Design
- Modular Architecture

## Tech Stack
Frontend:
- React
- React Router
- Redux Toolkit

Backend:
- Node.js
- Express
- MongoDB
- Redis
- JWT

## Architecture
Client → API Gateway → Node.js API → MongoDB
                      ↘ Redis Cache

## Setup
1. Clone repository
2. Install dependencies
3. Configure `.env`
4. Run `npm start`

## Security
- HttpOnly cookies
- Password hashing
- Rate limiting
- Role-based access control

## Author
Abirlal Mukherjee
