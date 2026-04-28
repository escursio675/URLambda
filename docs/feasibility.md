# Feasibility

The project will be developed using the MERN Stack (MongoDB, ExpressJS, ReactJS, NodeJS) alongside Vite and TailwindCSS.

### Why this stack over others?

Traditional stacks (like LAMP or Spring Boot) are robust but can be heavier and require context-switching between different languages for the frontend and backend. The MERN stack provides an isomorphic JavaScript environment—meaning JavaScript/TypeScript is used across the entire application. This unified language reduces cognitive load, accelerates the Incremental development process, and allows for seamless data flow via JSON from the database right to the frontend UI.

### Specific Problems Addressed by this Stack

A URL shortener inherently faces a high read-to-write ratio (a link is created once but clicked thousands of times). It requires a backend capable of handling high concurrent I/O operations without bottlenecking. The event-driven architecture of Node.js combined with the reactive state management of React directly solves these performance constraints.

### Technology Breakdown

- **NodeJS (Runtime Environment):** Node.js uses a non-blocking, event-driven I/O model. This is critical for a URL shortener, which must process thousands of rapid redirection requests simultaneously. Instead of creating a new thread for every link click (which consumes heavy server resources), Node handles them asynchronously on a single thread, ensuring high scalability and low latency.
- **ExpressJS (Backend Framework):**
Express acts as a minimal and flexible web application framework on top of Node.js. It simplifies the routing required for the core functionality: capturing the short URL parameter and querying the database for the original long URL.
- **MongoDB (Database):**
MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. A URL shortener requires fast read operations and the ability to log unstructured analytics data (like user agents, IP addresses, and click timestamps). MongoDB’s schema-less nature allows us to easily scale and adapt our analytics tracking without complex database migrations.
- **ReactJS (Frontend Library):**
React’s component-based architecture perfectly aligns with the modular design principles of our project. It allows the frontend to be broken down into reusable UI components (e.g., the URL input form, the dashboard, the analytics graphs).
- **Vite (Build Tool):**
Vite replaces older bundlers like Webpack (used in Create React App). It significantly improves the frontend developer experience by providing near-instant Hot Module Replacement (HMR) and optimized build times. This ensures that UI development and documentation can happen rapidly and concurrently without long compilation delays.
- **TailwindCSS (Styling):**
Tailwind is a utility-first CSS framework. Rather than writing custom, external CSS files which can lead to code bloat and maintenance issues, Tailwind allows us to style components directly within the React JSX. This ensures strict adherence to component-level design and drastically speeds up the creation of a responsive, modern user interface.

# Operational Feasibility

The system is highly operationally feasible because the Agile methodology ensures continuous alignment with actual user needs. By developing the URL shortener in short, iterative sprints, the team can deliver functional segments of the application frequently. This approach allows for immediate testing and feedback on the core UI and routing logic before more complex features (like detailed analytics or custom aliases) are fully built.

# Economic Feasibility

The project is economically feasible as it uses open-source technologies (Node.js, MongoDB, React) with no licensing costs. Development is performed locally, requiring minimal infrastructure. Deployment, if needed, can be done using free-tier cloud services.

# Constraints

The system is designed for small to moderate scale usage typical of an academic project and does not initially address large-scale distributed deployment.
