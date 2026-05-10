# URLambda — User Documentation (Version 1.1)

## 1. Introduction

### 1.1 Purpose

This document provides end-user guidance for the URLambda application. It explains the purpose of the system, supported features, installation and usage procedures, and troubleshooting instructions.

The application is a web-based URL shortening platform that allows users to:

- Convert long URLs into short shareable links
- Generate QR codes for shortened links
- Download QR codes as images
- Create and manage accounts
- Access a personal dashboard for link management
- View previously generated shortened URLs

## 2. System Overview

URLambda is a MERN-stack-based URL shortening application.

### Core Features

- URL shortening
- Automatic URL redirection
- QR code generation
- QR code image download
- User authentication
- Dashboard-based link management
- Link deletion
- Persistent database storage using MongoDB

## 3. System Requirements

### 3.1 Hardware Requirements

Minimum recommended configuration:

| Component | Requirement |
| --- | --- |
| Processor | Dual-core CPU |
| RAM | 4 GB |
| Storage | 500 MB free space |
| Internet | Stable broadband connection |

### 3.2 Software Requirements

- Operating System - Linux/Windows/macOS
- Browser - Chrome, Firefox, Edge, Brave

## 4. Deployment Access

The URLambda application is deployed as a cloud-hosted web application.

### Production Access

Users can access the application directly through the deployed Vercel frontend URL using any modern web browser.

Supported browsers include:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Brave Browser
- Safari

An active internet connection is required for accessing the application and generating shortened URLs.

## 5. User Guide

## 5.1 Home Page

The homepage contains:

- URL input field
- Generate button
- Generated short URL display area
- Copy button
- QR generation section

## 5.2 Creating a Short URL

### Steps

1. Open the application homepage.
2. Enter a valid URL beginning with:

```
http://
```

or

```
https://
```

1. Click the “Generate” button.
2. The system generates a shortened URL.
3. Use the “Copy” button to copy the generated link.

### Example

Input:

```
https://google.com
```

Generated Output:

```
https://urlambda.vercel.app/abc123
OR
http://localhost:5000/abc123
```

## 5.3 Accessing a Shortened URL

When a shortened URL is opened:

1. The backend receives the short code.
2. The system searches the MongoDB database.
3. The original URL is resolved.
4. The user is redirected automatically.

If the short code does not exist:

```
404 - URL Not Found
```

is displayed.

## 5.4 Generating QR Codes

### Steps

1. Generate a shortened URL.
2. Click the “Generate QR” button.
3. A QR code corresponding to the short URL is displayed.

The QR code can be scanned using:

- Mobile camera applications
- QR scanner applications
- Browser QR scanners

## 5.5 Downloading QR Codes

### Steps

1. Generate a QR code.
2. Click the “Download QR” button.
3. The QR image is downloaded locally in a .png format.

## 5.6 User Registration

### Steps

1. Navigate to the signup page.
2. Select a valid Google account.
3. The account is created successfully.

## 5.7 User Login

### Steps

1. Navigate to the login page.
2. Select the Google Account associated with the URLambda site
3. Click “Login”.
4. Upon successful authentication, the dashboard opens.

## 5.8 Dashboard Features

Authenticated users can:

- View previously generated URLs
- Generate QR codes for saved URLs
- Delete URLs
- Create new shortened links
- Copy previously generated short links

## 6. API Overview

### 6.1 Generate Short URL

**Endpoint**

```
POST /api/v1/shorten
```

**Request Body**

```json
{
  "longUrl": "https://google.com"
}
```

**Response**

```json
{
  "shortUrl": "http://localhost:5000/abc123"
}
```

### 6.2 Redirect Endpoint

**Endpoint**

```
GET /:code
```

Example:

```
GET /abc123
```

Behavior:

- Resolves original URL
- Redirects user automatically

## 7. Error Messages

| Error | Cause |
| --- | --- |
| Invalid URL | URL format is incorrect |
| URL is required | Input field is empty |
| URL not found | Short code does not exist |
| Internal server error | Backend/server issue |

## 8. Security Features

The application includes:

- Input validation
- URL validation
- Database persistence
- Authentication-based access control
- Protected dashboard routes

Recommended future improvements:

- Password hashing using bcrypt
- Rate limiting
- HTTPS deployment
- API throttling

## 9. Limitations

Current limitations include:

- Localhost-based development deployment
- No production analytics engine
- Basic QR customization support
- No link expiration support
- No distributed caching layer

## 10. Future Enhancements

Planned improvements:

- Advanced analytics dashboard
- Click tracking and visualization
- Custom aliases
- Expiring links
- Fully customizable QR styling
- Cloud deployment
- CDN integration
- Multi-user collaboration

## 11. Troubleshooting

### Invalid URL Error

### Cause

The entered URL does not follow proper HTTP/HTTPS format.

### Solution

Ensure the URL begins with:

```
http://
```

or

```
https://
```

### URL Not Found

**Cause:** The requested short code does not exist in the database.

**Solution:** Verify that the shortened URL is correct and has not been deleted.

### QR Code Not Generating

**Cause:** Temporary backend or network issue.

**Solution:** Refresh the page and regenerate the shortened URL.

### Login Failure

**Cause:** Incorrect email or password.

**Solution:** Verify credentials and retry login.

## 12. Conclusion

URLambda provides a lightweight, scalable, and modular URL shortening solution using the MERN stack. The application demonstrates modern software engineering principles including modular architecture, RESTful API design, layered backend structure, MongoDB integration, and responsive frontend design.

The current version successfully supports URL shortening, redirection, QR generation, authentication, and dashboard-based management while maintaining extensibility for future features and scalability improvements.