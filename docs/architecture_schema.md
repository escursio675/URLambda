# System Architecture Documentation

## 1. Introduction

This document describes the high-level software architecture of the URLambda application. The system follows a modular MERN-stack architecture using:

- ReactJS + Vite frontend
- Node.js + Express backend
- MongoDB database
- RESTful API communication

The architecture emphasizes:

- Separation of concerns
- Modular component design
- Scalability
- Maintainability
- Layered backend organization

---

# 2. Architectural Style

## Selected Architecture

The application follows a Layered Client-Server Architecture combined with Service-Oriented Backend Structure

## Architectural Layers

```
Frontend (React + Vite)
        ↓
API Layer (Express Routes)
        ↓
Controller Layer
        ↓
Service Layer
        ↓
Database Layer (MongoDB + Mongoose)
```

# 3. High-Level System Architecture

```
┌─────────────────────┐
│     Client/User     │
│  Browser Interface  │
└──────────┬──────────┘
           │ HTTP Requests
           ▼
┌─────────────────────┐
│ React Frontend      │
│ (Vite + Tailwind)   │
└──────────┬──────────┘
           │ REST API Calls
           ▼
┌─────────────────────┐
│ Express Backend API │
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│ Route Layer         │
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│ Controller Layer    │
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│ Service Layer       │
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│ MongoDB Database    │
└─────────────────────┘
```

# 4. Frontend Architecture

## Technology Stack

| Technology | Purpose |
| --- | --- |
| ReactJS | Component-based UI |
| Vite | Frontend bundling/build tool |
| TailwindCSS | Styling framework |
| React Router | Routing/navigation |
| React OAuth | Google authentication |
| Custom Hooks | API abstraction |

# 5. Frontend Directory Structure

```
frontend/
├── components/
├── hooks/
├── routes/
├── src/
├── public/
├── store/
└── vite.config.js
```

# 6. Frontend Component Architecture

## Components Directory

```
components/
├── form.jsx
├── SoftAurora.jsx
└── TextType.jsx
```

### Responsibilities

| Component | Responsibility |
| --- | --- |
| `form.jsx` | URL input, submission, QR actions |
| `SoftAurora.jsx` | Background visual effects |
| `TextType.jsx` | Animated typography rendering |

# 7. Frontend Routing Architecture

## Routing System

```
routes/
└── appRoutes.jsx
```

Uses:

```
react-router-dom
```

Responsibilities:

- Client-side navigation
- Protected routes
- Dashboard navigation
- Authentication routing

# 8. Frontend State Management

## Store Structure

```
store/
└── auth/
```

Responsibilities:

- Authentication state
- User session persistence
- OAuth user management
- Protected dashboard access

# 9. Backend Architecture

## Technology Stack

| Technology | Purpose |
| --- | --- |
| Node.js | Runtime environment |
| ExpressJS | Web framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication tokens |
| Google OAuth | Authentication provider |
| QRCode Library | QR generation |

# 10. Backend Directory Structure

```
backend/src/
├── app.js
├── server.js
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
└── services/
```

# 11. Backend Layered Design

## 11.1 Route Layer

### Directory

**`routes/`**

Responsibilities:

- API endpoint declaration
- Route grouping
- Middleware attachment
- HTTP method mapping

Example:

```
POST /api/v1/shorten
GET /:code
```

## 11.2 Controller Layer

### Directory

**`controllers/`**

Responsibilities:

- HTTP request handling
- Request validation
- Response formatting
- Status code handling

Controllers do NOT:

- Access DB directly
- Contain core business logic

## 11.3 Service Layer

### Directory

**`services/`**

Responsibilities:

- Business logic
- URL generation
- QR generation
- Database interaction abstraction
- Redirection logic

Advantages:

- Reusable logic
- Easier testing
- Cleaner controllers
- Better maintainability

## 11.4 Model Layer

### Directory

**`models/`**

Responsibilities:

- MongoDB schema definition
- Data validation
- Collection modeling
- Index configuration

Current Models:

- `url.model.js`
- `user.model.js`

## 11.5 Middleware Layer

### Directory

**`middleware/`**

Responsibilities:

- Authentication validation
- JWT verification
- Request filtering
- Error interception
- Protected route handling

# 12. API Architecture

The application exposes RESTful API endpoints.

## API Flow

```
Client Request
      ↓
Express Route
      ↓
Controller
      ↓
Service
      ↓
MongoDB
      ↓
Response Returned
```

---

# 13. Authentication Architecture

## Authentication Mechanism

```
Google OAuth + JWT
```

### Authentication Flow

```
User Login
    ↓
Google OAuth Authentication
    ↓
Backend Verification
    ↓
JWT Generation
    ↓
Client Token Storage
    ↓
Protected Route Access
```

# 14. URL Shortening Workflow

## Internal Flow

```
User submits URL
        ↓
Frontend API Request
        ↓
Backend Validation
        ↓
Short Code Generation
        ↓
MongoDB Storage
        ↓
Short URL Returned
```

# 15. URL Redirection Workflow

```
User opens short URL
        ↓
Express Route receives :code
        ↓
Database lookup using shortCode
        ↓
Original URL resolved
        ↓
HTTP Redirect Response
```

# 16. QR Generation Workflow

```
Short URL generated
        ↓
QR Service invoked
        ↓
QRCode package generates image
        ↓
Frontend displays QR
        ↓
User downloads image
```

# 17. Database Architecture

## Database System

MongoDB

### Collections

| Collection | Purpose |
| --- | --- |
| `users` | User accounts |
| `urls` | URL mappings |

# 18. Database Relationship Model

```
User (1)
   │
   └─────── (Many)
                URL
```

# 19. Scalability Considerations

The architecture supports scalability through:

- Non-blocking Node.js event loop
- Indexed MongoDB queries
- Layered backend design
- Stateless REST API structure
- Modular frontend components

# 20. Security Architecture

## Implemented Security Measures

| Security Feature | Purpose |
| --- | --- |
| URL validation | Prevent malformed links |
| JWT authentication | Secure protected routes |
| OAuth authentication | External identity verification |
| MongoDB schema validation | Data integrity |
| CORS middleware | Cross-origin protection |

# 21. Deployment Architecture

## Frontend Deployment

Vercel

Responsibilities:

- React frontend hosting
- CDN delivery
- Static asset optimization

## Backend Deployment

The backend API may be deployed using:

- Render
- Railway
- VPS/Docker deployment
- Cloud virtual machines

## Database Deployment

MongoDB Atlas or self-hosted MongoDB instance.

# 22. Design Principles Applied

| Principle | Implementation |
| --- | --- |
| Separation of Concerns | Layered backend structure |
| Modular Design | React components + services |
| Information Hiding | Service abstraction |
| Reusability | Shared services/components |
| Maintainability | Structured directories |
| Scalability | Event-driven backend |

# 23. Advantages of Current Architecture

## Benefits

- Clean project structure
- Easy feature extensibility
- Efficient URL lookup
- Maintainable service abstraction
- Frontend-backend separation
- Supports future analytics integration
- Suitable for cloud deployment

# 24. Future Architectural Enhancements

Planned improvements include:

| Feature | Architectural Addition |
| --- | --- |
| Analytics | Dedicated analytics microservice |
| Caching | Redis integration |
| Load balancing | Reverse proxy layer |
| Rate limiting | API gateway |
| Monitoring | Logging + observability stack |
| Queue processing | Background workers |
| CDN optimization | Distributed caching |

# 25. Conclusion

The URLambda architecture follows a modular layered client-server design optimized for scalability, maintainability, and extensibility. The separation between frontend presentation, backend business logic, and database persistence enables clean development practices while supporting future enhancements such as analytics, caching, distributed deployment, and advanced QR customization features.