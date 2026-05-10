# Feature Log

1. FEATURE: Core functionalities (COMPLETED: 30th April, 11: 41)

User Needs: input long URL, convert to short URL, view and copy short URL, redirect to the same site as the long URL using the short URL

Requirements List: basic frontend for UX, input fields, backend for conversion, redirection and storage, database for storing the mappings

Initiated Development: 28th April

1. FEATURE: QR Code Generation (COMPLETED: 3rd May, 19:32)

User Needs: generate a QR code on demand for the shortened URL

Requirements List: backend support for QR code generation, API endpoint for on-demand requests, integration with existing URL mapping/routing system, barebones frontend for triggering generation and displaying the QR code

Initiated Development: 3rd May

1. FEATURE: Copy URL button (COMPLETED: 5th May, 10:03)

User Needs: simplify the process of copying the generated URL

Requirements: button with dynamic texts - “Copy” and “Copied!” to indicate writing of the URL to user clipboard clicking which copies the short URL to clipboard. The state reverts back to initial state after 8 seconds.

1. FEATURE: Authentication + Authorization + Dashboard (COMPLETED: 10th May, 04:35)

User Needs: view details of urls shortened connected to user profile, delete records, add more records connected to user profile, view everything in an organised manner in a dashboard

Requirements: implementating authentication & authorization (Google OAuth 2.0 + JWT). implementing a dashboard to retrieve & modify relevant records.