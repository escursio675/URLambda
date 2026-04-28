# System Requirements Specifications

## Functional Requirements

**REQ-F01:** URL Validation & Processing

- The system must accept a standard HTTP/HTTPS URL from the user.
- The system must validate the syntax of the inputted URL before processing.If the URL is valid, the system must generate a unique, shortened alphanumeric identifier

**REQ-F02:** Link Redirection

- When a user navigates to the shortened URL, the system must intercept the request, query the database for the corresponding long URL, and execute an HTTP 301 (Permanent) or 302 (Temporary) redirect to the original destination.
- If the short URL does not exist in the database, the system must render a custom "404 Not Found" error page.

**REQ-F03:** User Dashboard & UI (React)

- The frontend must provide an input form for generating short links.
- The system must display the generated short link to the user with a single-click "Copy to Clipboard" function.

## Non-Functional Requirements

**REQ-NF01:** Performance (Latency)

- The redirection process (from clicking the short link to resolving the long URL) must occur with minimal latency.
- The backend API should process the redirection query in under 100 ms (approx) under normal load.

**REQ-NF02:** Scalability

- The architecture must support a high read-to-write ratio.
- The system will utilize Node.js's non-blocking I/O and MongoDB's efficient document retrieval to ensure that an increase in concurrent link clicks does not degrade the performance of the link creation service.

**REQ-NF03:** Usability & Responsiveness

- The user interface must be fully responsive, providing an optimal viewing and interaction experience across mobile phones, tablets, and desktop monitors. This will be enforced using TailwindCSS.
