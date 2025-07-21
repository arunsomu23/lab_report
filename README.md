# Laboratory Report - Hematology
A modern, modular Next.js web application that fetches and displays FHIR diagnostic lab reports using clean architecture, reusable components, and best practices.

📁 Project Structure

```bash
.
├── components/         # Reusable UI components (Card, Breadcrumbs, etc.)
├── hooks/              # Custom React hooks (e.g. useFhirData)
├── layouts/            # Layout components (MainLayout)
├── pages/              # Next.js page routes
├── styles/             # Tailwind global styles
├── package.json        # Package to install dependencies
├── Dockerfile          # Docker setup
├── .env.local          # Environment variables (not committed)
└── README.md

🚀 Features
- Fetch and validate FHIR DiagnosticReport JSON
- Display lab results, observations, and details
- Intuitive breadcrumb navigation
- Tailwind CSS for responsive styling
- Modular file structure
- Dockerized setup for easy deployment

✅ Prerequisites
Node.js ≥ 16
npm ≥ 8

🛠️ Getting Started
1. Clone the repository
git clone https://github.com/arunsomu23/lab-report.git
cd lab-report

2. Install dependencies
npm install

3. Add Environment Variable
NEXT_PUBLIC_FHIR_DR_URL = https://build.fhir.org/diagnosticreport-example.json

4. Run the development server
npm run dev
Open http://localhost:3000 in your browser.

5. Credentials to login
username : admin
password : admin123

🐳 Docker
docker run -p 3000:3000 arun2305/lab-report

🧩 Technologies Used
- Next.js – React framework
- Tailwind CSS – Utility-first CSS framework
- FHIR Library – FHIR client for parsing/validation

📡 FHIR Source
The app pulls data from:
https://build.fhir.org/diagnosticreport-example.json

🧠 Custom Hooks
Hook	        Description
useFhirData	    Fetches, validates, and parses FHIR report and observations

👨‍💻 Author
Built by Arunachalam Somasundaram
- Passionate about healthcare tech and clean engineering

