# GSPHERE Client

Frontend for **GSPHERE**, a gaming collaboration platform designed to help developers, designers, musicians, recruiters, and other creators discover projects, build teams, publish opportunities, and manage collaboration around game development.

This repository contains the browser client. The backend lives in [GSPHERE-Server](https://github.com/edelagziel/GSPHERE-Server).

## Project at a Glance

GSPHERE is a two-repository full-stack project:

```text
Browser Client
HTML / CSS / Vanilla JavaScript / Bootstrap
        |
        | Fetch API + cookie credentials
        v
GSPHERE Server
Node.js / Express / JWT / PostgreSQL
        |
        +--> Cloudinary file uploads
        +--> Gaming news integration/cache
```

The client is intentionally implemented without a frontend framework. UI behavior, API requests, rendering, authentication flows, project management, job flows, and reusable page components are handled with modular JavaScript and Bootstrap-based layouts.

## Main Capabilities

- User registration, login, and logout flows.
- Candidate and recruiter-oriented views.
- Project discovery, creation, editing, membership, and role flows.
- Job posting and job discovery interfaces.
- Candidate application and recruiter management views.
- User profile editing and image/CV upload flows.
- Gaming news views.
- Dynamic reusable project, job, member, candidate, and news cards.
- Shared navbar/sidebar components loaded across multiple pages.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Bootstrap 5
- Bootstrap Icons
- Fetch API
- Cookie-based authenticated requests

Backend technologies such as Express, PostgreSQL, JWT, bcrypt, Multer, and Cloudinary are implemented in the [server repository](https://github.com/edelagziel/GSPHERE-Server).

## Client Architecture

The frontend is organized by feature rather than around a framework component model.

```text
GSPHERE-Client/
├── index.html                 Main entry page
├── Compponenet/               Shared HTML components
├── css/                       Application styling
├── js/
│   ├── buttons/               Button/event behaviors
│   ├── cards/                 Reusable rendering modules
│   ├── config/                API environment configuration
│   ├── data/                  Client-side data helpers
│   ├── jobs/                  Job-related logic
│   ├── nav/sidear/            Navigation/sidebar loading
│   ├── pagesJs/               Page-specific behavior
│   └── utils/                 Shared utilities
├── page/                      Application HTML pages
├── svg/                       SVG assets
└── Temp/                      Legacy/development artifacts
```

Some directory names reflect the original student-project structure and are intentionally left unchanged while the application is being preserved and documented. Renaming them can affect page paths and imports and is therefore treated separately from documentation cleanup.

## API Configuration

The API base URL is defined in:

```text
js/config/config.js
```

Current behavior:

- `localhost` / `127.0.0.1` -> local server on port `3000`
- other hosts -> deployed GSPHERE server

The configured API prefix is `/api`.

Authenticated requests generally use:

```js
credentials: "include"
```

so the browser can send the authentication cookie managed by the backend.

## Main Product Areas

### Projects
Users can browse projects, create and edit projects, enter project rooms, and interact with project-member flows.

### Jobs and Recruiting
Recruiter-facing pages support publishing and managing job opportunities, while candidate-facing pages support job discovery and application flows.

### Profiles
Profile pages load and update user details and integrate with the backend upload flow for profile/CV media.

### News
The client displays gaming-related news supplied through the backend news API.

## Running Locally

1. Clone the client:

```bash
git clone https://github.com/edelagziel/GSPHERE-Client.git
cd GSPHERE-Client
```

2. Run the [GSPHERE-Server](https://github.com/edelagziel/GSPHERE-Server) locally on port `3000`.

3. Serve this repository through a local HTTP server. For example, VS Code **Live Server** can be used.

Do not open the application directly with `file://`; browser `fetch()` behavior requires the client to be served over HTTP.

The backend currently permits selected local development origins, including common localhost Live Server/Vite ports.

## Related Repository

### GSPHERE Server

[https://github.com/edelagziel/GSPHERE-Server](https://github.com/edelagziel/GSPHERE-Server)

The server provides authentication, protected REST APIs, PostgreSQL persistence, project/member management, jobs/applications, profiles, uploads, and news functionality.

## Current Project Status

GSPHERE is an existing working student full-stack project currently undergoing **portfolio-focused documentation and hardening**. The cleanup strategy prioritizes preserving working behavior over broad refactoring.

Known areas being reviewed separately include authentication cookie hardening, authorization checks, upload validation, automated tests, legacy naming, and repository hygiene. These items are not presented here as completed work.

## Contributors

- [Eden Lagziel](https://github.com/edelagziel)

The backend repository also documents additional project contributors.

## License

This repository is distributed under the MIT License.