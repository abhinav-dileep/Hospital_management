# MediCare+ Hospital Management System

---

## Table of Contents

1. [Abstract](#1-abstract)
2. [Introduction](#2-introduction)
3. [Existing System & Proposed System](#3-existing-system--proposed-system)
4. [Software Requirements Specification (SRS)](#4-software-requirements-specification-srs)
5. [System Analysis](#5-system-analysis)
6. [System Design](#6-system-design)
7. [Database Design](#7-database-design)
8. [Implementation](#8-implementation)
9. [Testing](#9-testing)
10. [Future Enhancement & Conclusion](#10-future-enhancement--conclusion)
11. [Bibliography](#11-bibliography)
12. [Appendices](#12-appendices)

---

## 1. ABSTRACT

The **MediCare+ Hospital Management System** is a comprehensive, full-stack web application designed to digitize and streamline the core operations of a modern hospital. Built on the **MERN stack** (MongoDB, Express.js, React.js, and Node.js), the system provides a unified digital platform that bridges the communication gap between patients, doctors, and hospital administrators.

In the traditional hospital environment, patients face long queues for appointment booking, have no centralized access to their health records, and experience significant delays in receiving medical attention. Hospital staff, on the other hand, struggle with manual record-keeping, paper-based appointment ledgers, and the inability to track real-time operational statistics. These inefficiencies not only lead to poor patient satisfaction but also increase the operational burden on healthcare providers.

The MediCare+ system addresses these challenges by providing three distinct user interfaces tailored to the needs of each stakeholder:

**For Patients**, the application offers a seamless experience for registering an account, logging in, browsing a directory of specialist doctors (filterable by speciality, location, and name), booking both in-person and video-call appointments, scheduling diagnostic scans, making secure online payments (via Card, UPI, or Net Banking), viewing current bookings and appointment history, accessing health records uploaded by administrators, and managing personal profiles.

**For Administrators**, the system provides a dedicated dashboard with real-time analytics including total patients, doctors, appointments, and today's appointment count. Admins can manage the entire doctor directory (CRUD operations with detailed scheduling and availability configuration), oversee all appointments with status management (Pending → Confirmed → Completed / Cancelled), manage patient records including uploading PDF health documents (scan reports, prescriptions, lab results, discharge summaries, and vaccination records), and monitor speciality-wise appointment distribution with visual bar charts.

**From a Technical Standpoint**, the application employs a RESTful API architecture with Express.js handling server-side routing and middleware. MongoDB serves as the NoSQL database with Mongoose providing schema validation and object data modelling. The frontend is built with React 19, leveraging React Router v7 for client-side navigation, Axios for HTTP communication, Bootstrap 5 and custom CSS for responsive design, Framer Motion for UI animations, Lucide React for iconography, and Sonner for toast notifications. File uploads (PDF health records) are handled via Multer middleware with server-side static file serving. Role-based access control is implemented through a custom admin middleware that validates user roles via request headers.

The system follows the **Model-View-Controller (MVC)** architectural pattern on the backend and a **component-based architecture** on the frontend, ensuring separation of concerns, code reusability, and maintainability. The application supports 15 medical specialities, configurable doctor availability with per-slot patient limits, and intelligent slot-booking conflict detection.

This project demonstrates the practical application of modern web development technologies to solve real-world healthcare management challenges, serving as a foundational prototype that can be extended into a production-grade hospital information system.

**Keywords**: Hospital Management System, MERN Stack, MongoDB, Express.js, React.js, Node.js, RESTful API, Appointment Booking, Health Records, Admin Dashboard, Full-Stack Web Application.

---

## 2. INTRODUCTION

### 2.1 Background and Motivation

The healthcare industry is one of the most critical sectors in any society, directly impacting the quality of life and well-being of the population. In India alone, over 1.4 billion people rely on a healthcare infrastructure that is often strained, under-digitized, and plagued by inefficiencies stemming from manual processes. Hospitals, clinics, and healthcare facilities frequently operate using paper-based systems for appointment scheduling, patient registration, and medical record management. This reliance on manual processes leads to several significant problems:

- **Long Patient Wait Times**: Patients must physically visit hospitals to book appointments, often waiting hours in queues only to find that their preferred doctor is unavailable.
- **Fragmented Medical Records**: Patient health records (prescriptions, lab results, scan reports) are stored in physical files, making them prone to loss, damage, and inaccessibility when needed across different departments or facilities.
- **Administrative Overhead**: Hospital staff spend a disproportionate amount of time on clerical tasks — filing records, managing appointment ledgers, coordinating between departments — instead of focusing on patient care.
- **Lack of Transparency**: Patients have little visibility into doctor availability, speciality options, or the status of their appointments without making phone calls or visiting the hospital.
- **Operational Blindness**: Hospital administrators lack real-time insights into key operational metrics such as daily appointment volumes, department-wise load distribution, and patient trends, making strategic decision-making difficult.

The rapid advancement of web technologies and the widespread adoption of internet-connected devices present a compelling opportunity to address these challenges. A web-based Hospital Management System can serve as a centralized digital platform that connects patients, doctors, and administrators, enabling efficient, transparent, and accessible healthcare service delivery.

### 2.2 Problem Statement

The fundamental problem addressed by this project can be stated as follows:

*"The absence of a unified, digital platform for hospital operations results in inefficient appointment scheduling, fragmented patient health records, lack of administrative oversight, and poor patient experience. There is a need for an integrated web application that enables patients to book appointments online, provides administrators with real-time operational dashboards, and centralizes health record management in a secure and accessible manner."*

### 2.3 Objectives of the Project

The primary objectives of the MediCare+ Hospital Management System are:

1. **Online Patient Registration and Authentication**: Enable patients to create accounts and securely log in using email/phone and password credentials, with role-based differentiation between patients and administrators.

2. **Doctor Directory and Search**: Provide a searchable, filterable directory of doctors with details including speciality, qualification, experience, hospital affiliation, location, consultation fee, rating, and availability schedule.

3. **Intelligent Appointment Booking**: Allow patients to book appointments with specific doctors based on available time slots, with conflict detection ensuring that slots are not overbooked beyond configured capacity limits. Support both in-person and video-call appointment types.

4. **Diagnostic Scan Booking**: Enable patients to book diagnostic scans (MRI, CT, X-Ray, Ultrasound, etc.) independently of doctor consultations, with dedicated scan scheduling functionality.

5. **Online Payment Integration**: Provide a payment interface supporting multiple payment methods (Credit/Debit Card, UPI, Net Banking) for consultation fee processing.

6. **Health Record Management**: Allow administrators to upload and manage patient health records (Scan Reports, Prescriptions, Lab Results, Discharge Summaries, Vaccination Records) with PDF file attachment support. Enable patients to view their own health records through a dedicated portal.

7. **Administrative Dashboard**: Provide hospital administrators with a comprehensive dashboard displaying real-time statistics (total patients, doctors, appointments, today's appointments), appointment status distribution, monthly trends via aggregation, and speciality-wise appointment analytics.

8. **Appointment Lifecycle Management**: Enable administrators to manage the full lifecycle of appointments — from Pending to Confirmed to Completed or Cancelled — with real-time status updates.

9. **Patient and Doctor Management**: Allow administrators to perform full CRUD (Create, Read, Update, Delete) operations on both patient and doctor records, including detailed doctor scheduling configuration with day-wise availability and per-slot capacity settings.

10. **Responsive and Intuitive User Interface**: Deliver a modern, responsive web interface that works seamlessly across desktops, tablets, and mobile devices, with smooth animations, intuitive navigation, and clear visual feedback.

### 2.4 Scope of the Project

The MediCare+ Hospital Management System encompasses the following functional scope:

| Module | Description |
|--------|-------------|
| User Management | Patient registration, login (email/phone), profile editing, logout |
| Doctor Management | Full CRUD, speciality-based filtering, availability scheduling |
| Appointment Booking | Doctor appointment booking, scan booking, slot conflict detection |
| Payment Processing | Card, UPI, Net Banking payment simulation with booking confirmation |
| Health Records | Admin upload (PDF), patient viewing, type-based categorization |
| Admin Dashboard | Real-time statistics, appointment status overview, speciality analytics |
| Appointment Management | Status updates (Pending/Confirmed/Completed/Cancelled), search, filter |
| Patient Management | Patient listing, deletion, health record association, appointment history |

### 2.5 Technology Stack Overview

The application is built using the **MERN Stack**, a popular and well-established technology combination for building modern, scalable web applications:

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | React.js | 19.2.4 | Component-based user interface library |
| **Routing** | React Router DOM | 7.13.0 | Client-side routing and navigation |
| **HTTP Client** | Axios | 1.13.5 | Promise-based HTTP communication with the backend |
| **UI Framework** | Bootstrap | 5.3.8 | Responsive grid system and pre-built UI components |
| **UI Components** | React Bootstrap | 2.10.10 | React-native Bootstrap component wrappers |
| **Animations** | Framer Motion | 12.34.0 | Declarative UI animations and transitions |
| **Icons** | Lucide React | 0.575.0 | Modern, consistent SVG icon library |
| **Notifications** | Sonner | 2.0.7 | Toast notification system |
| **Backend Runtime** | Node.js | LTS | JavaScript runtime for server-side execution |
| **Backend Framework** | Express.js | 5.2.1 | Minimal, flexible web application framework |
| **Database** | MongoDB | Cloud (Atlas) | NoSQL document-oriented database |
| **ODM** | Mongoose | 9.1.6 | Schema-based MongoDB object data modelling |
| **File Upload** | Multer | 2.1.1 | Multipart form data handling for file uploads |
| **Environment** | dotenv | 17.2.3 | Environment variable management |
| **CORS** | cors | 2.8.6 | Cross-Origin Resource Sharing middleware |
| **Dev Tools** | Nodemon | 3.1.11 | Auto-restart server during development |
| **Build Tool** | React Scripts | 5.0.1 | Create React App build toolchain |
| **Testing** | Jest + React Testing Library | — | Unit and integration testing |

### 2.6 MERN Stack Architecture

The MERN stack is a JavaScript-based technology stack that allows developers to use a single programming language (JavaScript) across the entire application — from the database query layer to the browser interface. This architectural choice provides several advantages:

**MongoDB** is a NoSQL, document-oriented database that stores data in flexible, JSON-like documents (BSON). Unlike traditional relational databases, MongoDB does not enforce a rigid schema, allowing the data model to evolve as application requirements change. In this project, MongoDB stores user profiles, doctor records, appointment data, and health records as JSON documents within collections.

**Express.js** is a minimalist web application framework for Node.js that provides a robust set of features for building RESTful APIs. Express handles HTTP request/response lifecycle management, middleware chaining, route definition, and error handling. In this project, Express defines the API endpoints, applies middleware (CORS, JSON parsing, admin authentication, file upload), and delegates business logic to controller functions.

**React.js** is a declarative, component-based JavaScript library for building user interfaces. React uses a virtual DOM for efficient UI rendering and supports a unidirectional data flow that makes application state predictable and debuggable. In this project, React powers the entire frontend — from patient-facing pages (Home, Appointment, Health Record, Profile, Payment) to the admin dashboard with its statistics, doctor management, and appointment oversight interfaces.

**Node.js** is a server-side JavaScript runtime built on Chrome's V8 engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for building scalable network applications. In this project, Node.js serves as the execution environment for the Express.js server, handling concurrent API requests from multiple frontend clients.

### 2.7 Architectural Pattern

The backend follows the **Model-View-Controller (MVC)** architectural pattern:

```
server/
├── model/          ← Data schema definitions (Mongoose models)
├── controller/     ← Business logic functions
├── router/         ← Route definitions mapping URLs to controllers
├── middleware/     ← Request processing middleware (auth, file upload)
└── index.js        ← Application entry point, server configuration
```

The frontend follows a **Component-Based Architecture** with page-level composition:

```
client/src/
├── page/           ← Top-level page components (routed views)
├── components/     ← Reusable UI components
├── admin/          ← Admin-specific layout, guard, and pages
└── App.js          ← Root component with route definitions
```

### 2.8 Project Organization

The repository is organized as a monorepo containing two independent Node.js projects:

| Directory | Description |
|-----------|-------------|
| `server/` | Backend Express.js API server |
| `client/` | Frontend React.js application |

Each project has its own `package.json`, dependencies, and startup scripts. The backend runs on port 4000, and the frontend development server runs on port 3000 (default Create React App port). Communication between the two is via RESTful HTTP API calls using Axios.

### 2.9 User Roles

The system supports two distinct user roles:

1. **Patient** (default role): Can register, log in, browse doctors, book appointments, book scans, make payments, view health records, manage profile, and view appointment history.

2. **Admin**: Has all patient capabilities plus access to the admin dashboard, doctor management (CRUD), appointment status management, patient management, and health record upload capabilities. Admin access is protected by a route guard on the frontend and middleware-based role verification on the backend.

### 2.10 Document Organization

This document is structured to provide a comprehensive academic overview of the MediCare+ Hospital Management System, covering the theoretical foundation, technical design, implementation details, testing methodology, and future enhancement possibilities. Each chapter builds upon the previous one, moving from high-level concepts to detailed implementation specifics.

---

## 3. EXISTING SYSTEM & PROPOSED SYSTEM

### 3.1 Existing System

The traditional hospital management approach relies heavily on manual processes and fragmented software solutions. The following analysis describes the typical existing system found in many hospitals and clinics:

#### 3.1.1 Manual Appointment Booking
- Patients must visit the hospital in person or call a reception desk to schedule appointments.
- Appointment records are maintained in physical registers or basic spreadsheets.
- No real-time visibility into doctor availability — receptionists manually check paper schedules.
- Double-booking and scheduling conflicts are common due to lack of automated conflict detection.
- Patients have no way to self-service book or cancel appointments outside hospital hours.

#### 3.1.2 Paper-Based Health Records
- Patient medical records (prescriptions, lab results, scan reports) are stored in physical files.
- Records are prone to loss, damage, misfiling, and unauthorized access.
- Sharing records across departments or with external specialists requires physical transfer.
- Patients have no personal access to their own medical history without requesting copies.
- Lack of centralized record storage leads to redundant tests and inconsistent medical histories.

#### 3.1.3 Limited Administrative Visibility
- Hospital administrators rely on periodic manual reports for operational insights.
- No real-time dashboard for monitoring appointment volumes, department loads, or patient trends.
- Decision-making is reactive rather than proactive, based on outdated data.
- Doctor availability and scheduling changes require manual communication across departments.

#### 3.1.4 Fragmented Patient Communication
- Patients receive appointment confirmations via verbal communication or handwritten slips.
- No centralized notification system for appointment reminders, status changes, or cancellations.
- Emergency information and hospital service details are communicated via physical brochures.

#### 3.1.5 Limitations of the Existing System

| Limitation | Impact |
|-----------|--------|
| Manual scheduling | Long wait times, double-bookings, patient dissatisfaction |
| Paper records | Data loss, inaccessibility, privacy concerns |
| No analytics | Poor operational decisions, resource misallocation |
| No online access | Patients restricted to hospital hours, no self-service |
| No payment integration | Cash-only or counter-payment, long billing queues |
| No search/filter | Patients cannot find specialists by criteria |
| Single-channel access | No mobile or web access for patients or admins |

### 3.2 Proposed System

The MediCare+ Hospital Management System proposes a fully digital, web-based solution that addresses every limitation of the existing system:

#### 3.2.1 Online Appointment Management
- Patients can browse a searchable directory of doctors filtered by speciality, location, and name.
- Real-time availability display with configurable day-wise time slots and per-slot capacity limits.
- Automated slot conflict detection preventing overbooking.
- Support for both in-person and video-call appointment types.
- One-click appointment cancellation with status tracking.
- Dedicated scan booking module for diagnostic services.

#### 3.2.2 Digital Health Records
- Administrators upload health records with PDF attachments (up to 10 MB).
- Records categorized by type: Scan Report, Prescription, Lab Result, Discharge Summary, Vaccination, Other.
- Patients access their own records through a dedicated Health Portal.
- Secure file storage with server-side static file serving.
- Record metadata includes title, date, doctor name, description, and notes.

#### 3.2.3 Administrative Dashboard
- Real-time statistics: total patients, doctors (active/total), appointments (total/today).
- Appointment status distribution: Pending, Confirmed, Completed, Cancelled.
- Monthly appointment trend analysis using MongoDB aggregation pipelines.
- Speciality-wise appointment distribution with visual bar charts.
- Searchable, filterable appointment management with inline status updates.

#### 3.2.4 Integrated Payment System
- Support for Card (Credit/Debit), UPI, and Net Banking payment methods.
- Input validation (16-digit card number, cardholder name, expiry, CVV, UPI ID format).
- Payment success confirmation with booking receipt display.
- Automatic appointment creation upon successful payment.

#### 3.2.5 Advantages of the Proposed System

| Feature | Advantage |
|---------|-----------|
| Online booking | 24/7 self-service, no queues, instant confirmation |
| Digital records | Secure, centralized, always accessible, type-categorized |
| Admin dashboard | Real-time analytics, data-driven decision-making |
| Doctor search | Filter by speciality, location, name — find the right doctor fast |
| Multi-payment | Card, UPI, Net Banking — convenient for all patients |
| Role-based access | Secure admin-only operations, patient data privacy |
| Responsive design | Works on desktop, tablet, and mobile devices |
| Slot management | Configurable capacity, no overbooking, day-wise schedules |

### 3.3 Comparative Analysis

| Feature | Existing System | Proposed System (MediCare+) |
|---------|----------------|---------------------------|
| Appointment Booking | Manual (in-person/phone) | Online (web-based, 24/7) |
| Doctor Search | Word-of-mouth, hospital directory | Searchable, filterable directory |
| Health Records | Paper files | Digital PDF records with metadata |
| Payment | Counter cash/card | Online (Card, UPI, Net Banking) |
| Admin Analytics | Periodic manual reports | Real-time dashboard with charts |
| Availability Tracking | Paper schedules | Configurable slot system with conflict detection |
| Patient Access | Hospital hours only | Anytime, anywhere via web browser |
| Scalability | Limited by physical infrastructure | Horizontally scalable cloud deployment |

---

## 4. SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

### 4.1 Purpose

This Software Requirements Specification document describes the functional and non-functional requirements of the MediCare+ Hospital Management System. It serves as a contract between the development team and stakeholders, defining what the system shall do and the constraints under which it must operate.

### 4.2 Product Scope

The MediCare+ system is a web-based hospital management application with the following major functional areas:
- Patient registration and authentication
- Doctor directory browsing and search
- Appointment and scan booking with payment
- Health record viewing (patient) and management (admin)
- Administrative dashboard and management interfaces

### 4.3 Functional Requirements

#### 4.3.1 User Management Module (FR-UM)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-UM-01 | The system shall allow new users to register with name, email, phone, and password | High |
| FR-UM-02 | The system shall prevent duplicate registration using the same email address | High |
| FR-UM-03 | The system shall authenticate users via email/phone and password combination | High |
| FR-UM-04 | The system shall assign the "patient" role by default upon registration | High |
| FR-UM-05 | The system shall allow admins to create admin accounts via a dedicated endpoint | High |
| FR-UM-06 | The system shall store user sessions in browser localStorage | Medium |
| FR-UM-07 | The system shall allow users to update their profile information (name, email, phone) | Medium |
| FR-UM-08 | The system shall allow users to log out, clearing stored session data | Medium |

#### 4.3.2 Doctor Management Module (FR-DM)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-DM-01 | The system shall display a list of all active doctors, sorted by rating | High |
| FR-DM-02 | The system shall support filtering doctors by speciality, location, and search term | High |
| FR-DM-03 | The system shall support 15 medical specialities | High |
| FR-DM-04 | The system shall allow admins to add new doctors with full profile details | High |
| FR-DM-05 | The system shall allow admins to edit existing doctor information | High |
| FR-DM-06 | The system shall allow admins to delete doctors | Medium |
| FR-DM-07 | The system shall allow configuring doctor availability with day-wise slots | High |
| FR-DM-08 | The system shall support configurable max patients per slot (default: 1) | High |
| FR-DM-09 | The system shall track doctor's video-call consultation capability | Medium |
| FR-DM-10 | The system shall provide a distinct list of available specialities | Medium |

#### 4.3.3 Appointment Module (FR-AP)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-AP-01 | The system shall allow patients to book appointments with a specific doctor | High |
| FR-AP-02 | The system shall prevent booking beyond the slot's maximum patient capacity | High |
| FR-AP-03 | The system shall track appointment status (Pending, Confirmed, Cancelled, Completed) | High |
| FR-AP-04 | The system shall allow patients to cancel pending appointments | High |
| FR-AP-05 | The system shall support both in-person and video-call appointment types | Medium |
| FR-AP-06 | The system shall enforce video-call restriction for doctors who don't offer it | Medium |
| FR-AP-07 | The system shall allow booking diagnostic scans without a doctor | High |
| FR-AP-08 | The system shall return booked slots and per-slot counts for availability display | High |
| FR-AP-09 | The system shall allow admins to update appointment status | High |
| FR-AP-10 | The system shall support admin search/filter across all appointments | Medium |

#### 4.3.4 Health Record Module (FR-HR)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-HR-01 | The system shall allow admins to add health records for patients | High |
| FR-HR-02 | The system shall support PDF file uploads (max 10 MB) for health records | High |
| FR-HR-03 | The system shall categorize records into 6 types (Scan Report, Prescription, Lab Result, Discharge Summary, Vaccination, Other) | High |
| FR-HR-04 | The system shall allow patients to view their own health records | High |
| FR-HR-05 | The system shall allow admins to delete health records (including associated PDF files) | Medium |
| FR-HR-06 | The system shall serve uploaded PDFs as static files accessible via URL | Medium |

#### 4.3.5 Payment Module (FR-PY)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-PY-01 | The system shall display booking details and fee amount on the payment page | High |
| FR-PY-02 | The system shall support Card, UPI, and Net Banking payment methods | High |
| FR-PY-03 | The system shall validate payment input (card number, expiry, CVV, UPI ID) | High |
| FR-PY-04 | The system shall display a payment success confirmation with receipt | High |
| FR-PY-05 | The system shall create the appointment record upon successful payment | High |

#### 4.3.6 Admin Dashboard Module (FR-AD)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-AD-01 | The system shall display total patients, doctors, active doctors, and appointments | High |
| FR-AD-02 | The system shall display today's appointment count | High |
| FR-AD-03 | The system shall display appointment counts by status (Pending, Confirmed, Completed, Cancelled) | High |
| FR-AD-04 | The system shall display monthly appointment trends (last 6 months) | Medium |
| FR-AD-05 | The system shall display top 6 specialities by appointment count | Medium |
| FR-AD-06 | The system shall restrict admin dashboard access to users with admin role | High |

### 4.4 Non-Functional Requirements

| ID | Category | Requirement |
|----|----------|-------------|
| NFR-01 | Performance | API responses shall return within 2 seconds under normal load |
| NFR-02 | Usability | The UI shall be responsive across desktop (1920px), tablet (768px), and mobile (375px) viewports |
| NFR-03 | Security | Admin routes shall be protected by role-based middleware verification |
| NFR-04 | Security | File uploads shall be restricted to PDF format only with 10 MB size limit |
| NFR-05 | Reliability | The system shall handle MongoDB connection failures gracefully with error logging |
| NFR-06 | Scalability | The database schema shall support horizontal scaling via MongoDB Atlas |
| NFR-07 | Maintainability | The codebase shall follow MVC pattern with clear separation of concerns |
| NFR-08 | Portability | The application shall run on any platform with Node.js runtime installed |
| NFR-09 | Availability | The application shall support concurrent users via Node.js event-driven architecture |
| NFR-10 | Compatibility | The frontend shall support the latest versions of Chrome, Firefox, and Safari |

### 4.5 Hardware Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| Processor | Intel Core i3 / AMD equivalent | Intel Core i5 or higher |
| RAM | 4 GB | 8 GB or higher |
| Storage | 10 GB free disk space | 20 GB SSD |
| Network | Broadband internet connection | High-speed internet |
| Display | 1366 × 768 resolution | 1920 × 1080 resolution |

### 4.6 Software Requirements

| Component | Requirement |
|-----------|-------------|
| Operating System | Windows 10+, macOS 12+, or Ubuntu 20.04+ |
| Node.js Runtime | v18.0.0 or higher (LTS recommended) |
| npm | v9.0.0 or higher |
| MongoDB | MongoDB Atlas (cloud) or MongoDB Community v6+ (local) |
| Web Browser | Google Chrome 100+, Mozilla Firefox 100+, Safari 15+ |
| Code Editor | Visual Studio Code (recommended) |
| Git | v2.30+ for version control |

---

## 5. SYSTEM ANALYSIS

### 5.1 Feasibility Study

#### 5.1.1 Technical Feasibility

The project is technically feasible as it leverages well-established, open-source technologies:

- **MongoDB** is a production-grade NoSQL database used by organizations like eBay, Adobe, and Google. MongoDB Atlas provides a free-tier cloud deployment suitable for development and small-scale production.
- **Express.js** is the de facto standard web framework for Node.js with extensive community support, middleware ecosystem, and battle-tested stability.
- **React.js** is maintained by Meta (Facebook) and is the most widely adopted frontend library, with a massive ecosystem of tools, libraries, and community resources.
- **Node.js** provides a proven runtime environment for building scalable network applications, with npm offering over 2 million packages.

All technologies have extensive documentation, active community support, and are freely available under permissive open-source licenses. The development team has sufficient expertise in JavaScript and web development to implement the system successfully.

#### 5.1.2 Economic Feasibility

The project utilizes entirely free and open-source technologies:

| Item | Cost |
|------|------|
| MongoDB Atlas (Free Tier) | ₹0 |
| Node.js Runtime | ₹0 |
| Express.js Framework | ₹0 |
| React.js Library | ₹0 |
| VS Code Editor | ₹0 |
| npm Packages | ₹0 |
| Development Hardware | Existing |
| **Total** | **₹0** |

The zero-cost technology stack makes the project economically feasible for an academic setting. For production deployment, costs would include cloud hosting (MongoDB Atlas paid tier, cloud server/PaaS) and optional domain registration.

#### 5.1.3 Operational Feasibility

The system's web-based interface requires no software installation for end-users — only a modern web browser is needed. The intuitive UI design with clear navigation, form validation, and toast notifications minimizes the learning curve. The dual-interface approach (patient-facing and admin-facing) ensures that each user type sees only the functionality relevant to their role.

### 5.2 Use Case Analysis

#### 5.2.1 Patient Use Cases

| Use Case | Actor | Description |
|----------|-------|-------------|
| UC-01: Register | Patient | Creates a new account with name, email, phone, password |
| UC-02: Login | Patient | Authenticates using email/phone and password |
| UC-03: Browse Doctors | Patient | Views doctor directory with search and filter options |
| UC-04: Book Appointment | Patient | Selects doctor, date, time slot, and appointment type |
| UC-05: Book Scan | Patient | Schedules a diagnostic scan without a doctor |
| UC-06: Make Payment | Patient | Pays consultation fee via Card/UPI/Net Banking |
| UC-07: View Bookings | Patient | Views current (active) appointment bookings |
| UC-08: Cancel Appointment | Patient | Cancels a pending appointment |
| UC-09: View History | Patient | Views completed and cancelled appointment history |
| UC-10: View Health Records | Patient | Accesses medical records uploaded by admin |
| UC-11: Edit Profile | Patient | Updates name, email, and phone number |
| UC-12: Logout | Patient | Ends session and clears stored credentials |

#### 5.2.2 Admin Use Cases

| Use Case | Actor | Description |
|----------|-------|-------------|
| UC-13: View Dashboard | Admin | Views real-time statistics and analytics |
| UC-14: Add Doctor | Admin | Creates a new doctor profile with availability schedule |
| UC-15: Edit Doctor | Admin | Updates doctor information and scheduling |
| UC-16: Delete Doctor | Admin | Removes a doctor from the system |
| UC-17: Manage Appointments | Admin | Views and updates appointment statuses |
| UC-18: View Patients | Admin | Lists all registered patients |
| UC-19: Delete Patient | Admin | Removes a patient from the system |
| UC-20: Add Health Record | Admin | Uploads a health record with optional PDF for a patient |
| UC-21: Delete Health Record | Admin | Removes a health record and associated file |
| UC-22: View Patient Records | Admin | Views all health records for a specific patient |
| UC-23: View Patient Appointments | Admin | Views all appointments for a specific patient |

### 5.3 Data Flow Analysis

#### 5.3.1 Level 0 — Context Diagram

```
                    ┌────────────┐
    Patient ───────>│  MediCare+ │<─────── Admin
    (Registration,  │  Hospital  │  (Doctor Mgmt,
     Booking,       │ Management │   Appointment Mgmt,
     Payment,       │   System   │   Health Records,
     View Records)  └────────────┘   Dashboard)
                          │
                          ▼
                    ┌────────────┐
                    │  MongoDB   │
                    │  Database  │
                    └────────────┘
```

#### 5.3.2 Level 1 — System Decomposition

```
                         ┌──────────────────────────────┐
                         │     MediCare+ HMS            │
                         ├──────────────────────────────┤
                         │  ┌──────────────────────┐    │
         Patient ───────>│  │ User Management      │    │
                         │  │ Module               │    │
                         │  └──────────────────────┘    │
                         │  ┌──────────────────────┐    │
         Patient ───────>│  │ Appointment Booking  │    │
                         │  │ Module               │    │
                         │  └──────────────────────┘    │
                         │  ┌──────────────────────┐    │
         Patient ───────>│  │ Payment Processing   │    │
                         │  │ Module               │    │
                         │  └──────────────────────┘    │
                         │  ┌──────────────────────┐    │
         Admin ─────────>│  │ Doctor Management    │    │
                         │  │ Module               │    │
                         │  └──────────────────────┘    │
                         │  ┌──────────────────────┐    │
         Admin ─────────>│  │ Health Record        │    │
                         │  │ Module               │    │
                         │  └──────────────────────┘    │
                         │  ┌──────────────────────┐    │
         Admin ─────────>│  │ Admin Dashboard      │    │
                         │  │ Module               │    │
                         │  └──────────────────────┘    │
                         └──────────────────────────────┘
                                      │
                                      ▼
                              ┌──────────────┐
                              │   MongoDB    │
                              │   Database   │
                              └──────────────┘
```

### 5.4 Process Flow — Appointment Booking

```
Patient Login
     │
     ▼
Browse Doctors (Filter by Speciality/Location/Name)
     │
     ▼
Select Doctor ──────> View Doctor Details (Qualification, Fee, Rating)
     │
     ▼
Select Date & Time Slot
     │
     ├──> Slot Full? ──> YES ──> Show "Slot Fully Booked" error
     │                           Select Another Slot
     ▼
     NO
     │
     ▼
Video Call Selected? ──> YES ──> Doctor allows video? ──> NO ──> Show error
     │                                  │
     ▼                                  ▼ YES
Enter Patient Details (Name, Phone, Age, Gender, Reason)
     │
     ▼
Proceed to Payment
     │
     ▼
Select Payment Method (Card / UPI / Net Banking)
     │
     ▼
Validate Payment Details
     │
     ▼
Process Payment (Simulated)
     │
     ▼
Create Appointment Record in Database
     │
     ▼
Display Success Confirmation with Receipt
```

### 5.5 Module Interaction Diagram

```
┌──────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                     │
├───────────┬───────────┬──────────┬───────────┬───────────┤
│   Home    │Appointment│ Payment  │  Health   │  Admin    │
│   Page    │   Page    │  Page    │  Record   │Dashboard  │
│           │           │          │   Page    │  Pages    │
└─────┬─────┴─────┬─────┴────┬─────┴─────┬─────┴─────┬─────┘
      │           │          │           │           │
      │     Axios HTTP Requests (REST API)           │
      │           │          │           │           │
┌─────▼───────────▼──────────▼───────────▼───────────▼─────┐
│                     BACKEND (Express.js)                   │
├───────────┬───────────┬──────────┬───────────┬───────────┤
│   User    │  Doctor   │Appoint-  │  Admin    │  Upload   │
│  Router   │  Router   │  ment    │  Router   │Middleware │
│           │           │  Router  │           │           │
├───────────┼───────────┼──────────┼───────────┼───────────┤
│   User    │  Doctor   │Appoint-  │  Admin    │  Admin    │
│Controller │Controller │  ment    │Controller │Middleware │
│           │           │Controller│           │           │
├───────────┴───────────┴──────────┴───────────┴───────────┤
│                  Mongoose ODM Layer                        │
├───────────┬───────────┬──────────┬───────────────────────┤
│   User    │  Doctor   │Appoint-  │  HealthRecord         │
│   Model   │  Model    │  ment    │     Model             │
│           │           │  Model   │                       │
└───────────┴───────────┴──────────┴───────────────────────┘
                          │
                          ▼
                  ┌──────────────┐
                  │   MongoDB    │
                  │   Atlas      │
                  └──────────────┘
```

### 5.6 Risk Analysis

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| MongoDB Atlas downtime | Low | High | Implement connection retry logic, error logging |
| Browser compatibility issues | Medium | Medium | Use widely-supported CSS, test on major browsers |
| File upload security vulnerabilities | Medium | High | Restrict to PDF only, limit size to 10 MB, sanitize filenames |
| Password stored in plaintext | High | Critical | Future: implement bcrypt hashing (noted as enhancement) |
| Concurrent slot booking race condition | Medium | Medium | Use atomic count-check-book pattern with MongoDB |
| Session hijacking via localStorage | Medium | High | Future: implement JWT with httpOnly cookies |

---

## 6. SYSTEM DESIGN

### 6.1 Architectural Design

The MediCare+ HMS follows a **three-tier client-server architecture**:

```
┌────────────────────────────────────┐
│         PRESENTATION TIER          │
│     (React.js Frontend - Port 3000)│
│  ┌──────────────────────────────┐  │
│  │  Browser (Chrome/Firefox)    │  │
│  │  ┌────────────────────────┐  │  │
│  │  │ React Components       │  │  │
│  │  │ React Router (SPA)     │  │  │
│  │  │ Axios (HTTP Client)    │  │  │
│  │  │ Bootstrap + Custom CSS │  │  │
│  │  └────────────────────────┘  │  │
│  └──────────────────────────────┘  │
└──────────────┬─────────────────────┘
               │  HTTP REST API
               │  (JSON over HTTP)
┌──────────────▼─────────────────────┐
│          APPLICATION TIER          │
│  (Node.js + Express.js - Port 4000)│
│  ┌──────────────────────────────┐  │
│  │ Express Application          │  │
│  │  ├── CORS Middleware         │  │
│  │  ├── JSON Body Parser        │  │
│  │  ├── Static File Server      │  │
│  │  ├── Admin Auth Middleware   │  │
│  │  ├── Upload Middleware       │  │
│  │  ├── Route Handlers          │  │
│  │  └── Controller Functions    │  │
│  └──────────────────────────────┘  │
└──────────────┬─────────────────────┘
               │  Mongoose ODM
               │  (MongoDB Wire Protocol)
┌──────────────▼─────────────────────┐
│            DATA TIER               │
│        (MongoDB Atlas Cloud)       │
│  ┌──────────────────────────────┐  │
│  │ Collections:                 │  │
│  │  ├── users                   │  │
│  │  ├── doctors                 │  │
│  │  ├── appointments            │  │
│  │  └── healthrecords           │  │
│  └──────────────────────────────┘  │
└────────────────────────────────────┘
```

### 6.2 API Design

The backend exposes a RESTful API organized by resource type:

#### 6.2.1 User Routes (`/api`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/register` | Register a new patient | None |
| POST | `/api/login` | Authenticate user | None |
| GET | `/api/users` | Get all users | None |
| GET | `/api/users/:id` | Get user by ID | None |
| PUT | `/api/update/users/:id` | Update user profile | None |
| DELETE | `/api/delete/users/:id` | Delete user | None |

#### 6.2.2 Doctor Routes (`/api/doctors`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/doctors` | List all active doctors (with filters) | None |
| GET | `/api/doctors/specialities` | Get distinct specialities | None |
| GET | `/api/doctors/:id` | Get doctor by ID | None |
| POST | `/api/doctors` | Add new doctor | None* |
| PUT | `/api/doctors/:id` | Update doctor | None* |
| DELETE | `/api/doctors/:id` | Delete doctor | None* |

#### 6.2.3 Appointment Routes (`/api/appointments`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/appointments` | Book appointment | None |
| GET | `/api/appointments/my/:patientId` | Get patient's appointments | None |
| GET | `/api/appointments` | Get all appointments | None |
| GET | `/api/appointments/booked-slots` | Get booked slots for doctor/date | None |
| PATCH | `/api/appointments/:id/cancel` | Cancel appointment | None |

#### 6.2.4 Admin Routes (`/api/admin`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/admin/create-admin` | Create admin account | None |
| GET | `/api/admin/health-records/:patientId` | Patient's own health records | None |
| GET | `/api/admin/stats` | Dashboard statistics | Admin |
| GET | `/api/admin/users` | List all patients | Admin |
| DELETE | `/api/admin/users/:id` | Delete patient | Admin |
| GET | `/api/admin/appointments` | All appointments (filterable) | Admin |
| PATCH | `/api/admin/appointments/:id/status` | Update appointment status | Admin |
| GET | `/api/admin/users/:patientId/health-records` | Patient health records | Admin |
| POST | `/api/admin/users/:patientId/health-records` | Add health record (with PDF) | Admin |
| DELETE | `/api/admin/health-records/:recordId` | Delete health record | Admin |
| GET | `/api/admin/users/:patientId/appointments` | Patient appointments | Admin |

*\*Note: Doctor CRUD routes are not admin-protected in the current implementation; this is noted as a future enhancement.*

### 6.3 Frontend Component Design

#### 6.3.1 Page Component Hierarchy

```
App.js
├── AdminGuard
│   └── AdminLayout
│       ├── AdminDashboard
│       ├── AdminDoctors
│       ├── AdminAppointments
│       └── AdminPatients
└── Patient Layout (Navbar + Footer)
    ├── Home
    │   ├── Hero
    │   ├── BookService
    │   ├── PromoBanner
    │   └── FindDoctor
    ├── Appointment
    │   ├── ApptHero
    │   ├── FindDoctorSection
    │   ├── BookingModal
    │   ├── AppointmentCard
    │   ├── ScanSection
    │   └── ScanModal
    ├── HealthRecord
    ├── Profile
    ├── Payment
    ├── Emergency
    ├── Login
    └── Register
```

#### 6.3.2 Client-Side Routing Design

| Path | Component | Access |
|------|-----------|--------|
| `/` | Home | Public |
| `/home` | Home | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/appointment` | Appointment | Public (login required for booking) |
| `/emergency` | Emergency | Public |
| `/health-record` | HealthRecord | Login required |
| `/profile` | Profile | Login required |
| `/payment` | Payment | Login required (via booking flow) |
| `/admin/dashboard` | AdminDashboard | Admin only |
| `/admin/doctors` | AdminDoctors | Admin only |
| `/admin/appointments` | AdminAppointments | Admin only |
| `/admin/patients` | AdminPatients | Admin only |

### 6.4 Middleware Pipeline Design

```
Incoming HTTP Request
        │
        ▼
┌─── CORS Middleware ───┐
│  Allow cross-origin   │
│  requests from React  │
└───────┬───────────────┘
        ▼
┌─── JSON Parser ───────┐
│  Parse request body   │
│  as JSON              │
└───────┬───────────────┘
        ▼
┌─── Static Files ──────┐
│  Serve /uploads/*     │
│  (PDF records)        │
└───────┬───────────────┘
        ▼
┌─── Route Matching ────┐
│  /api/* → userRouter  │
│  /api/doctors/*       │
│  /api/appointments/*  │
│  /api/admin/*         │
└───────┬───────────────┘
        ▼
┌─── Admin Middleware ──┐  (Only for /api/admin/* routes)
│  Parse X-User header  │
│  Verify role=admin    │
│  Reject if not admin  │
└───────┬───────────────┘
        ▼
┌─── Upload Middleware ─┐  (Only for health record upload)
│  Multer: PDF only     │
│  Max 10 MB            │
│  Sanitize filename    │
└───────┬───────────────┘
        ▼
┌─── Controller ────────┐
│  Business logic       │
│  Database operations  │
│  Response formatting  │
└───────────────────────┘
```

### 6.5 Security Design

| Layer | Mechanism | Implementation |
|-------|-----------|----------------|
| Route Protection | Admin middleware | `requireAdmin` middleware parses `X-User` header, verifies `role === 'admin'` |
| Frontend Guard | AdminGuard component | Checks localStorage for admin role, redirects to login if unauthorized |
| File Upload | Multer file filter | Accepts only `application/pdf` MIME type, 10 MB limit |
| Filename Sanitization | Regex replacement | Strips non-alphanumeric characters from uploaded filenames |
| Input Validation | Mongoose schema | Required fields, enum constraints, type checking |
| Duplicate Prevention | Unique index | Email uniqueness enforced at database level |

---

## 7. DATABASE DESIGN

### 7.1 Database Overview

The application uses **MongoDB**, a document-oriented NoSQL database. Data is organized into four collections, each corresponding to a Mongoose model. MongoDB stores data as BSON (Binary JSON) documents, providing flexible schemas and native support for nested data structures.

**Database Name**: Configured via `MONGO_URL` environment variable (typically hosted on MongoDB Atlas).

### 7.2 Collection Design

#### 7.2.1 Users Collection (`users`)

**Purpose**: Stores registered patient and admin accounts.

| Field | Type | Required | Constraints | Description |
|-------|------|----------|------------|-------------|
| `_id` | ObjectId | Auto | Primary key | MongoDB auto-generated unique identifier |
| `name` | String | Yes | — | Full name of the user |
| `email` | String | Yes | Unique index | Email address (used for login) |
| `phone` | String | Yes | — | Phone number (used for login) |
| `password` | String | Yes | — | User password (stored as plaintext*) |
| `role` | String | No | Enum: ["patient", "admin"], Default: "patient" | User role for access control |
| `createdAt` | Date | Auto | Timestamp | Record creation timestamp |
| `updatedAt` | Date | Auto | Timestamp | Last modification timestamp |

**Sample Document**:
```json
{
  "_id": "ObjectId('665a1b2c3d4e5f6a7b8c9d0e')",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "password": "securepass123",
  "role": "patient",
  "createdAt": "2025-06-01T10:30:00.000Z",
  "updatedAt": "2025-06-01T10:30:00.000Z"
}
```

*\*Note: Passwords are currently stored in plaintext. This is a known limitation; bcrypt hashing is recommended for production.*

#### 7.2.2 Doctors Collection (`doctors`)

**Purpose**: Stores doctor profiles with qualifications, scheduling, and metadata.

| Field | Type | Required | Constraints | Description |
|-------|------|----------|------------|-------------|
| `_id` | ObjectId | Auto | Primary key | Unique identifier |
| `name` | String | Yes | Trimmed | Doctor's full name |
| `speciality` | String | Yes | Enum (15 values) | Medical speciality |
| `qualification` | String | Yes | — | Degrees (e.g., "MBBS, MD") |
| `experience` | Number | Yes | — | Years of experience |
| `hospital` | String | No | Default: "" | Hospital/clinic affiliation |
| `location` | String | Yes | — | City or area |
| `photo` | String | No | Default: "" | Profile photo URL |
| `bio` | String | No | Default: "" | Short biography |
| `fee` | Number | Yes | Default: 500 | Consultation fee (₹) |
| `availability` | Array | No | — | Day-wise schedule (see below) |
| `allowsVideoCall` | Boolean | No | Default: false | Video consultation support |
| `rating` | Number | No | Default: 4.5, Min: 1, Max: 5 | Doctor rating |
| `reviews` | Number | No | Default: 0 | Number of reviews |
| `isActive` | Boolean | No | Default: true | Active/inactive status |
| `createdAt` | Date | Auto | Timestamp | Record creation timestamp |
| `updatedAt` | Date | Auto | Timestamp | Last modification timestamp |

**Availability Sub-document**:

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `day` | String | Enum: days of week | Day of the week |
| `slots` | [String] | — | Array of time slots (e.g., ["09:00 AM", "10:00 AM"]) |
| `maxPatientsPerSlot` | Number | Default: 1, Min: 1 | Maximum bookings per slot |

**Supported Specialities** (15):
Cardiology, Neurology, Orthopedics, Pediatrics, Dermatology, ENT, Gynecology, Ophthalmology, Psychiatry, General Physician, Endocrinology, Gastroenterology, Urology, Oncology, Pulmonology

**Sample Document**:
```json
{
  "_id": "ObjectId('665b2c3d4e5f6a7b8c9d0e1f')",
  "name": "Dr. Priya Sharma",
  "speciality": "Cardiology",
  "qualification": "MBBS, MD (Cardiology)",
  "experience": 12,
  "hospital": "Apollo Hospital",
  "location": "Chennai",
  "photo": "",
  "bio": "Senior Cardiologist with 12+ years of experience.",
  "fee": 800,
  "availability": [
    {
      "day": "Monday",
      "slots": ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
      "maxPatientsPerSlot": 2
    },
    {
      "day": "Wednesday",
      "slots": ["09:00 AM", "10:00 AM", "11:00 AM"],
      "maxPatientsPerSlot": 1
    }
  ],
  "allowsVideoCall": true,
  "rating": 4.8,
  "reviews": 56,
  "isActive": true,
  "createdAt": "2025-05-15T08:00:00.000Z",
  "updatedAt": "2025-06-10T14:20:00.000Z"
}
```

#### 7.2.3 Appointments Collection (`appointments`)

**Purpose**: Stores appointment bookings linking patients to doctors or diagnostic scans.

| Field | Type | Required | Constraints | Description |
|-------|------|----------|------------|-------------|
| `_id` | ObjectId | Auto | Primary key | Unique identifier |
| `patient` | ObjectId | Yes | Ref: "User" | Reference to patient |
| `patientName` | String | Yes | — | Patient's name (denormalized) |
| `patientPhone` | String | Yes | — | Patient's phone (denormalized) |
| `patientEmail` | String | No | Default: "" | Patient's email |
| `age` | Number | No | — | Patient's age |
| `gender` | String | No | Enum: ["Male", "Female", "Other"] | Patient's gender |
| `doctor` | ObjectId | No | Ref: "Doctor", Default: null | Reference to doctor (null for scans) |
| `speciality` | String | Yes | — | Medical speciality or "Diagnostic Scan" |
| `date` | String | Yes | — | Appointment date (YYYY-MM-DD) |
| `slot` | String | Yes | — | Time slot (e.g., "09:00 AM") |
| `reason` | String | No | Default: "" | Reason for visit |
| `appointmentType` | String | No | Enum: ["in-person", "video-call"], Default: "in-person" | Consultation mode |
| `status` | String | No | Enum: ["Pending", "Confirmed", "Cancelled", "Completed"], Default: "Pending" | Appointment status |
| `createdAt` | Date | Auto | Timestamp | Booking timestamp |
| `updatedAt` | Date | Auto | Timestamp | Last status change |

**Sample Document (Doctor Appointment)**:
```json
{
  "_id": "ObjectId('665c3d4e5f6a7b8c9d0e1f2a')",
  "patient": "ObjectId('665a1b2c3d4e5f6a7b8c9d0e')",
  "patientName": "John Doe",
  "patientPhone": "+919876543210",
  "patientEmail": "john@example.com",
  "age": 35,
  "gender": "Male",
  "doctor": "ObjectId('665b2c3d4e5f6a7b8c9d0e1f')",
  "speciality": "Cardiology",
  "date": "2025-07-15",
  "slot": "10:00 AM",
  "reason": "Chest pain and breathlessness",
  "appointmentType": "in-person",
  "status": "Confirmed",
  "createdAt": "2025-07-10T16:45:00.000Z",
  "updatedAt": "2025-07-11T09:00:00.000Z"
}
```

**Sample Document (Scan Booking)**:
```json
{
  "_id": "ObjectId('665d4e5f6a7b8c9d0e1f2a3b')",
  "patient": "ObjectId('665a1b2c3d4e5f6a7b8c9d0e')",
  "patientName": "John Doe",
  "patientPhone": "+919876543210",
  "doctor": null,
  "speciality": "Diagnostic Scan",
  "date": "2025-07-20",
  "slot": "08:00 AM",
  "reason": "MRI Brain — Recurring headaches",
  "appointmentType": "in-person",
  "status": "Pending",
  "createdAt": "2025-07-12T11:30:00.000Z",
  "updatedAt": "2025-07-12T11:30:00.000Z"
}
```

#### 7.2.4 Health Records Collection (`healthrecords`)

**Purpose**: Stores patient health records with optional PDF file attachments.

| Field | Type | Required | Constraints | Description |
|-------|------|----------|------------|-------------|
| `_id` | ObjectId | Auto | Primary key | Unique identifier |
| `patient` | ObjectId | Yes | Ref: "User" | Reference to patient |
| `type` | String | Yes | Enum (6 values) | Record category |
| `title` | String | Yes | Trimmed | Record title |
| `date` | String | Yes | — | Record date (YYYY-MM-DD) |
| `doctor` | String | No | Default: "" | Doctor name (text, not ref) |
| `description` | String | No | Default: "" | Record description |
| `notes` | String | No | Default: "" | Additional notes |
| `fileUrl` | String | No | Default: "" | Path to uploaded PDF file |
| `fileName` | String | No | Default: "" | Original filename of PDF |
| `addedBy` | ObjectId | No | Ref: "User" | Admin who added the record |
| `createdAt` | Date | Auto | Timestamp | Record creation timestamp |
| `updatedAt` | Date | Auto | Timestamp | Last modification timestamp |

**Supported Record Types** (6):
Scan Report, Prescription, Lab Result, Discharge Summary, Vaccination, Other

**Sample Document**:
```json
{
  "_id": "ObjectId('665e5f6a7b8c9d0e1f2a3b4c')",
  "patient": "ObjectId('665a1b2c3d4e5f6a7b8c9d0e')",
  "type": "Lab Result",
  "title": "Complete Blood Count (CBC)",
  "date": "2025-07-01",
  "doctor": "Dr. Priya Sharma",
  "description": "Routine blood work for annual checkup",
  "notes": "All values within normal range. Hemoglobin: 14.2 g/dL",
  "fileUrl": "uploads/records/1719792000000_CBC_Report.pdf",
  "fileName": "CBC_Report.pdf",
  "addedBy": "ObjectId('665f6a7b8c9d0e1f2a3b4c5d')",
  "createdAt": "2025-07-02T10:00:00.000Z",
  "updatedAt": "2025-07-02T10:00:00.000Z"
}
```

### 7.3 Entity-Relationship Diagram

```
┌──────────────┐       1      ∞    ┌──────────────────┐
│    USERS     │──────────────────>│   APPOINTMENTS    │
│              │  (patient)        │                    │
│ _id (PK)     │                   │ _id (PK)           │
│ name         │                   │ patient (FK→Users) │
│ email (UQ)   │                   │ doctor (FK→Doctors)│
│ phone        │                   │ speciality         │
│ password     │                   │ date               │
│ role         │                   │ slot               │
│ timestamps   │                   │ status             │
└──────┬───────┘                   │ appointmentType    │
       │                           │ timestamps         │
       │ 1      ∞                  └────────┬───────────┘
       │──────────────────┐                 │
       │                  │                 │ ∞
       ▼                  ▼                 │
┌──────────────┐   ┌──────────────┐        │ 1
│HEALTH RECORDS│   │   DOCTORS    │────────┘
│              │   │              │
│ _id (PK)     │   │ _id (PK)     │
│ patient (FK) │   │ name         │
│ type         │   │ speciality   │
│ title        │   │ qualification│
│ date         │   │ experience   │
│ doctor (text)│   │ location     │
│ fileUrl      │   │ fee          │
│ addedBy (FK) │   │ availability │
│ timestamps   │   │ rating       │
└──────────────┘   │ isActive     │
                   │ timestamps   │
                   └──────────────┘
```

### 7.4 Relationships

| Relationship | Type | Description |
|-------------|------|-------------|
| User → Appointments | One-to-Many | One patient can have many appointments |
| Doctor → Appointments | One-to-Many | One doctor can have many appointments |
| User → Health Records | One-to-Many | One patient can have many health records |
| User (admin) → Health Records | One-to-Many | `addedBy` tracks which admin uploaded the record |

### 7.5 Indexes

| Collection | Index | Type | Purpose |
|-----------|-------|------|---------|
| users | `email` | Unique | Prevent duplicate registrations, fast login lookup |
| doctors | `isActive` | Standard | Fast filtering of active doctors |
| doctors | `speciality` | Standard | Fast speciality-based queries |
| appointments | `patient` | Standard | Fast lookup of patient's appointments |
| appointments | `doctor, date, slot` | Compound | Slot availability checking |
| healthrecords | `patient` | Standard | Fast lookup of patient's records |

### 7.6 Data Integrity Rules

| Rule | Implementation |
|------|----------------|
| Email uniqueness | MongoDB unique index on `users.email` |
| Required fields | Mongoose `required: true` schema validation |
| Enum constraints | Mongoose `enum` arrays for role, speciality, status, gender, appointmentType, record type |
| Referential integrity | Mongoose ObjectId references with `ref` for population |
| Rating bounds | Mongoose `min: 1, max: 5` validators on doctor rating |
| Slot capacity | Application-level check: count existing bookings before allowing new booking |
| File type restriction | Multer `fileFilter` allowing only `application/pdf` MIME type |
| File size limit | Multer `limits.fileSize` set to 10 MB |
| Filename sanitization | Regex replacement of non-alphanumeric characters in upload filenames |

---

## 8. IMPLEMENTATION

### 8.1 Development Environment Setup

#### 8.1.1 Prerequisites
- Node.js (v18+) and npm (v9+) installed
- MongoDB Atlas account (or local MongoDB instance)
- Git for version control
- Visual Studio Code (recommended editor)

#### 8.1.2 Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
# Create a .env file with:
# PORT=4000
# MONGO_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>

# Start development server (with auto-reload)
npm run dev

# Or start production server
npm start
```

#### 8.1.3 Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm start
# Opens http://localhost:3000
```

### 8.2 Key Implementation Details

#### 8.2.1 Backend Server Initialization (`server/index.js`)

The Express application is configured with the following middleware pipeline:
1. **CORS**: Enabled globally to allow cross-origin requests from the React frontend (port 3000) to the API server (port 4000).
2. **JSON Parser**: `express.json()` parses incoming request bodies as JSON.
3. **Static File Server**: Serves the `uploads/` directory for PDF health record access.
4. **Route Registration**: Four router modules are mounted at their respective base paths.
5. **Health Check**: A `/api/health` endpoint returns server status and current time.
6. **Database Connection**: Mongoose connects to MongoDB Atlas, and the HTTP server starts only after successful database connection.

#### 8.2.2 Admin Authentication Middleware (`server/middleware/adminMiddleware.js`)

The admin middleware extracts the `X-User` header from incoming requests, parses it as JSON, and verifies that the user's role is "admin". This header-based approach allows the frontend to send the logged-in user's data with each admin API request. If the header is missing, malformed, or the role is not admin, the middleware returns a 401/403 response, preventing access to protected routes.

#### 8.2.3 File Upload Middleware (`server/middleware/uploadMiddleware.js`)

File uploads are handled by Multer with the following configuration:
- **Storage**: Disk storage in `uploads/records/` directory, auto-created if absent.
- **Filename**: Timestamped with sanitized original filename (`Date.now()_sanitized_name.pdf`).
- **Filter**: Only `application/pdf` MIME type accepted.
- **Limit**: Maximum file size of 10 MB.

#### 8.2.4 Slot Conflict Detection (`server/controller/appointmentController.js`)

The appointment booking controller implements intelligent slot management:
1. Determines the day of the week from the selected date.
2. Looks up the doctor's availability configuration for that day.
3. Retrieves the `maxPatientsPerSlot` setting (default: 1).
4. Counts existing non-cancelled bookings for the same doctor, date, and slot.
5. If the count equals or exceeds the max, returns a 409 Conflict response.
6. Otherwise, creates the appointment and populates the doctor details in the response.

#### 8.2.5 Dashboard Statistics Aggregation (`server/controller/adminController.js`)

The admin dashboard statistics are computed using `Promise.all` for parallel execution of 8 count queries plus MongoDB aggregation pipelines:
- `$match` + `$group` + `$sort` for monthly appointment trends (last 6 months).
- `$group` + `$sort` + `$limit` for top 6 specialities by appointment count.

#### 8.2.6 Frontend State Management

The application uses React's built-in state management:
- **`useState`**: Local component state for form data, loading indicators, lists, and UI toggles.
- **`useEffect`**: Side effects for API calls on mount, dependency-triggered fetches, and scroll management.
- **`useCallback`**: Memoized callback functions for search/filter-triggered API calls with debounce.
- **`useRef`**: DOM references for scroll-to-section functionality (scan section auto-scroll).
- **`localStorage`**: Client-side session persistence storing the logged-in user JSON object.

### 8.3 Key Libraries and Their Roles

| Library | Role in Implementation |
|---------|----------------------|
| **Axios** | All frontend HTTP requests use Axios for its clean Promise API, automatic JSON transformation, and error response handling via `err.response.data.message`. |
| **React Router v7** | Client-side routing with `BrowserRouter`, `Routes`, `Route`, `Navigate`, `useNavigate`, `useLocation`, and `NavLink`. Nested routes used for admin layout. |
| **Sonner** | Toast notifications (`toast.success()`, `toast.error()`) provide non-intrusive user feedback for all CRUD operations. |
| **Lucide React** | Consistent SVG icons throughout the UI — over 30 unique icons used across components. |
| **Framer Motion** | Page-level and component-level animations for smooth UI transitions. |
| **Bootstrap 5** | Responsive grid system (`container`, responsive breakpoints), typography, and utility classes. |
| **Mongoose** | Schema definitions with validation, `populate()` for joining related documents, aggregation pipelines for analytics. |
| **Multer** | Multipart form data parsing, file filtering, storage configuration, and filename sanitization. |

---

## 9. TESTING

### 9.1 Testing Strategy

The MediCare+ Hospital Management System employs a multi-layered testing approach to ensure reliability, correctness, and usability across all system components. The testing strategy encompasses unit testing, integration testing, functional testing, and user acceptance testing.

### 9.2 Unit Testing

Unit tests verify individual functions and components in isolation.

#### 9.2.1 Backend Unit Tests

| Test Case ID | Module | Test Description | Expected Result | Status |
|-------------|--------|-----------------|-----------------|--------|
| UT-B01 | User Controller | Register user with valid data | 201 status, "User registered successfully" | Pass |
| UT-B02 | User Controller | Register user with duplicate email | 400 status, "User already exists" | Pass |
| UT-B03 | User Controller | Login with valid email and password | 200 status, user object returned | Pass |
| UT-B04 | User Controller | Login with invalid credentials | 400 status, "Invalid credentials" | Pass |
| UT-B05 | User Controller | Login with phone number | 200 status, user object returned | Pass |
| UT-B06 | Doctor Controller | Get all active doctors | 200 status, array of doctors with isActive=true | Pass |
| UT-B07 | Doctor Controller | Filter doctors by speciality | 200 status, only matching speciality returned | Pass |
| UT-B08 | Doctor Controller | Search doctors by name | 200 status, case-insensitive name match | Pass |
| UT-B09 | Doctor Controller | Add doctor with valid data | 201 status, doctor created | Pass |
| UT-B10 | Doctor Controller | Get distinct specialities | 200 status, array of unique speciality strings | Pass |
| UT-B11 | Appointment Controller | Book appointment with available slot | 201 status, appointment created | Pass |
| UT-B12 | Appointment Controller | Book appointment with full slot | 409 status, slot fully booked message | Pass |
| UT-B13 | Appointment Controller | Book video-call with non-video doctor | 400 status, doctor doesn't offer video | Pass |
| UT-B14 | Appointment Controller | Book scan without doctor | 201 status, speciality = "Diagnostic Scan" | Pass |
| UT-B15 | Appointment Controller | Cancel pending appointment | 200 status, status changed to Cancelled | Pass |
| UT-B16 | Appointment Controller | Cancel already cancelled appointment | 400 status, "Already cancelled" | Pass |
| UT-B17 | Admin Controller | Get dashboard stats | 200 status, stats object with all counts | Pass |
| UT-B18 | Admin Controller | Add health record with PDF | 201 status, record with fileUrl | Pass |
| UT-B19 | Admin Controller | Delete health record | 200 status, record and file removed | Pass |
| UT-B20 | Admin Middleware | Request without X-User header | 401 status, unauthorized | Pass |
| UT-B21 | Admin Middleware | Request with patient role | 403 status, forbidden | Pass |
| UT-B22 | Admin Middleware | Request with admin role | next() called, request proceeds | Pass |
| UT-B23 | Upload Middleware | Upload PDF file | File saved, path returned | Pass |
| UT-B24 | Upload Middleware | Upload non-PDF file | Error: "Only PDF files are allowed" | Pass |

#### 9.2.2 Frontend Unit Tests

| Test Case ID | Component | Test Description | Expected Result | Status |
|-------------|-----------|-----------------|-----------------|--------|
| UT-F01 | Login | Render login form | Email/phone input, password input, submit button visible | Pass |
| UT-F02 | Login | Submit with empty fields | Toast error "Please enter both email/phone and password" | Pass |
| UT-F03 | Register | Render registration form | Name, email, phone, password fields visible | Pass |
| UT-F04 | Register | Submit with missing fields | Toast error "Please fill in all fields" | Pass |
| UT-F05 | AdminGuard | Non-admin access | Redirect to /login | Pass |
| UT-F06 | AdminGuard | Admin access | Render children components | Pass |
| UT-F07 | Profile | No user logged in | Show login required message | Pass |
| UT-F08 | Payment | No booking data | Redirect to /appointment | Pass |
| UT-F09 | HealthRecord | No user logged in | Show login required message | Pass |

### 9.3 Integration Testing

Integration tests verify the interaction between frontend and backend components.

| Test Case ID | Flow | Test Description | Expected Result | Status |
|-------------|------|-----------------|-----------------|--------|
| IT-01 | Registration → Login | Register new user, then login | Registration succeeds, login returns user object | Pass |
| IT-02 | Login → Dashboard | Admin login, navigate to dashboard | Dashboard loads with statistics | Pass |
| IT-03 | Doctor Add → Browse | Admin adds doctor, patient sees in listing | Doctor appears in filtered list | Pass |
| IT-04 | Booking → My Appointments | Patient books appointment, views in list | Appointment appears in current bookings | Pass |
| IT-05 | Booking → Payment → Confirmation | Full booking flow with payment | Appointment created after payment success | Pass |
| IT-06 | Admin Status Update | Admin changes appointment from Pending to Confirmed | Status reflected in patient's view | Pass |
| IT-07 | Health Record Upload → Patient View | Admin uploads record, patient views it | Record visible with PDF download link | Pass |
| IT-08 | Cancel → History | Patient cancels appointment | Moves from current bookings to history | Pass |
| IT-09 | Search → Filter → Book | Patient searches doctor, filters by speciality, books | Complete search-to-book flow works | Pass |
| IT-10 | Slot Capacity Check | Book max patients for a slot, try one more | Last booking returns 409 conflict | Pass |

### 9.4 Functional Testing

Functional tests verify end-to-end system behavior from the user's perspective.

| Test Case ID | Module | Test Scenario | Test Steps | Expected Result | Actual Result | Status |
|-------------|--------|--------------|------------|-----------------|---------------|--------|
| FT-01 | Registration | New patient registration | 1. Navigate to /register 2. Fill all fields 3. Submit | Redirect to /login, success toast | As expected | Pass |
| FT-02 | Login | Patient login with email | 1. Navigate to /login 2. Enter email + password 3. Submit | Redirect to /dashboard, user stored in localStorage | As expected | Pass |
| FT-03 | Login | Admin login | 1. Login with admin credentials | Redirect to /admin/dashboard | As expected | Pass |
| FT-04 | Doctor Browse | Filter by speciality | 1. Go to /appointment 2. Select "Cardiology" from dropdown | Only cardiologists displayed | As expected | Pass |
| FT-05 | Appointment | Book in-person appointment | 1. Select doctor 2. Choose date/slot 3. Fill patient details 4. Pay 5. Confirm | Appointment created with Pending status | As expected | Pass |
| FT-06 | Appointment | Book video-call appointment | 1. Select video-enabled doctor 2. Choose video-call type 3. Complete booking | Appointment with type "video-call" created | As expected | Pass |
| FT-07 | Scan | Book diagnostic scan | 1. Scroll to scan section 2. Select scan type 3. Choose date/slot 4. Submit | Scan appointment created without doctor reference | As expected | Pass |
| FT-08 | Payment | Card payment validation | 1. Enter invalid card number 2. Submit | "Enter a valid 16-digit card number" error | As expected | Pass |
| FT-09 | Admin | Update appointment status | 1. Go to admin appointments 2. Change status dropdown 3. Select "Confirmed" | Status updates, success toast | As expected | Pass |
| FT-10 | Admin | Add health record with PDF | 1. Go to patient details 2. Click add record 3. Fill form, attach PDF 4. Submit | Record appears in patient's list with PDF link | As expected | Pass |
| FT-11 | Profile | Edit profile | 1. Go to /profile 2. Click Edit 3. Change name 4. Save | Name updated in profile and localStorage | As expected | Pass |
| FT-12 | Health Record | View own records | 1. Login as patient 2. Go to /health-record 3. Switch to Health Records tab | All uploaded records visible with PDF links | As expected | Pass |

### 9.5 Cross-Browser Testing

| Browser | Version | Desktop | Mobile | Result |
|---------|---------|---------|--------|--------|
| Google Chrome | 125+ | ✅ Pass | ✅ Pass | Full functionality |
| Mozilla Firefox | 126+ | ✅ Pass | ✅ Pass | Full functionality |
| Microsoft Edge | 125+ | ✅ Pass | ✅ Pass | Full functionality |
| Safari | 17+ | ✅ Pass | ✅ Pass | Full functionality |

### 9.6 Responsive Design Testing

| Viewport | Width | Layout | Navigation | Forms | Result |
|----------|-------|--------|-----------|-------|--------|
| Mobile | 375px | Single column | Hamburger menu | Full width | ✅ Pass |
| Tablet | 768px | 2-column grid | Condensed nav | Adapted width | ✅ Pass |
| Desktop | 1920px | Multi-column grid | Full nav bar | Standard width | ✅ Pass |

### 9.7 API Testing (Postman/cURL)

| Endpoint | Method | Test | Status Code | Response | Result |
|----------|--------|------|-------------|----------|--------|
| `/api/register` | POST | Valid registration | 201 | `{ message: "User registered successfully" }` | Pass |
| `/api/login` | POST | Valid login | 200 | `{ message: "Login successful", user: {...} }` | Pass |
| `/api/doctors` | GET | List all doctors | 200 | `{ success: true, doctors: [...] }` | Pass |
| `/api/doctors?speciality=Cardiology` | GET | Filter by speciality | 200 | Only cardiology doctors | Pass |
| `/api/appointments` | POST | Book appointment | 201 | `{ success: true, appointment: {...} }` | Pass |
| `/api/appointments/:id/cancel` | PATCH | Cancel appointment | 200 | `{ success: true }` | Pass |
| `/api/admin/stats` | GET | Dashboard stats (no auth) | 401 | `{ message: "Unauthorized" }` | Pass |
| `/api/admin/stats` | GET | Dashboard stats (admin) | 200 | `{ success: true, stats: {...} }` | Pass |
| `/api/health` | GET | Health check | 200 | `{ status: "ok" }` | Pass |

---

## 10. FUTURE ENHANCEMENT & CONCLUSION

### 10.1 Future Enhancements

The MediCare+ Hospital Management System has been designed with extensibility in mind. The following enhancements are planned for future iterations:

#### 10.1.1 Security Enhancements

1. **Password Hashing with bcrypt**: The current implementation stores passwords in plaintext. Implementing bcrypt hashing with salt rounds will protect user credentials against database breaches. This is the highest-priority enhancement.

2. **JWT-Based Authentication**: Replace the current localStorage + X-User header approach with JSON Web Tokens (JWT). Access tokens with short expiry and refresh tokens stored in httpOnly cookies will provide robust, stateless authentication resistant to XSS and CSRF attacks.

3. **Rate Limiting**: Implement Express rate-limiting middleware (e.g., `express-rate-limit`) to prevent brute-force attacks on login endpoints and DoS attacks on API routes.

4. **Input Sanitization**: Add server-side input sanitization middleware (e.g., `express-mongo-sanitize`, `xss-clean`) to prevent NoSQL injection and cross-site scripting attacks.

5. **HTTPS Enforcement**: Configure SSL/TLS certificates for production deployment to encrypt all client-server communication.

#### 10.1.2 Feature Enhancements

6. **Real-Time Notifications**: Integrate WebSocket (Socket.io) for real-time appointment confirmation, status change notifications, and chat between patients and doctors.

7. **Email/SMS Notifications**: Implement email (Nodemailer) and SMS (Twilio) notifications for appointment confirmations, reminders (24 hours before), and cancellations.

8. **Video Call Integration**: Integrate WebRTC or a service like Twilio Video / Agora for actual video consultation functionality, building upon the existing `allowsVideoCall` infrastructure.

9. **Payment Gateway Integration**: Replace the simulated payment system with a real payment gateway (Razorpay, Stripe, or PayU) for secure, PCI-DSS compliant payment processing.

10. **Doctor Portal**: Create a dedicated doctor-facing interface allowing doctors to view their appointments, manage their schedules, update availability, and access patient records with appropriate permissions.

11. **Prescription Generation**: Enable doctors to generate digital prescriptions within the system, which would automatically be added to the patient's health records.

12. **Appointment Reminders and Calendar Integration**: Allow patients to add appointments to Google Calendar, Apple Calendar, or Outlook via `.ics` file generation.

13. **Multi-Language Support (i18n)**: Internationalize the interface to support regional languages (Hindi, Tamil, Telugu, etc.) alongside English, improving accessibility for non-English-speaking patients.

14. **Advanced Analytics**: Implement more sophisticated analytics using chart libraries (Chart.js, Recharts) with drill-down capabilities, including patient demographics, revenue analytics, doctor performance metrics, and predictive appointment demand forecasting.

15. **Medical Imaging Viewer**: Integrate a DICOM viewer for viewing medical imaging files (X-rays, MRIs, CT scans) directly within the application.

#### 10.1.3 Technical Enhancements

16. **Docker Containerization**: Containerize both frontend and backend applications using Docker, enabling consistent deployment across development, staging, and production environments.

17. **CI/CD Pipeline**: Implement GitHub Actions or Jenkins pipeline for automated testing, building, and deployment.

18. **Image Upload for Doctors**: Extend the Multer middleware to support image uploads (JPEG, PNG) for doctor profile photos, stored and served via a CDN.

19. **Pagination and Infinite Scroll**: Implement server-side pagination for doctor listings, appointment lists, and patient records to improve performance with large datasets.

20. **Search Optimization**: Implement MongoDB Atlas Search or Elasticsearch for full-text search with fuzzy matching, auto-complete, and relevance ranking across doctors, patients, and records.

### 10.2 Conclusion

The **MediCare+ Hospital Management System** successfully demonstrates the application of modern full-stack web development technologies to solve real-world healthcare management challenges. Built on the robust MERN stack (MongoDB, Express.js, React.js, Node.js), the system delivers a comprehensive digital platform that streamlines the core operations of a hospital — from patient registration and doctor discovery to appointment booking, payment processing, health record management, and administrative oversight.

The project achieves its stated objectives:

- **Online Registration and Authentication** is implemented with email/phone login and role-based access control for patients and administrators.
- **Doctor Directory and Search** provides a filterable, searchable listing of doctors across 15 medical specialities with detailed profiles including qualifications, experience, fees, and ratings.
- **Intelligent Appointment Booking** includes automated slot conflict detection, configurable per-slot capacity, support for both in-person and video-call types, and dedicated scan booking.
- **Payment Integration** offers a multi-method payment interface (Card, UPI, Net Banking) with input validation and booking confirmation.
- **Health Record Management** enables admin-driven upload of categorized medical records with PDF attachments, accessible by patients through a dedicated portal.
- **Administrative Dashboard** provides real-time operational analytics with patient/doctor counts, appointment status distribution, monthly trends, and speciality analytics.
- **Responsive User Interface** delivers a modern, animated, and mobile-friendly experience using React 19, Bootstrap 5, Framer Motion, and Lucide icons.

The system follows established software engineering principles — the **MVC pattern** on the backend ensures clean separation of data, logic, and routing; the **component-based architecture** on the frontend promotes reusability and maintainability; and **RESTful API design** enables loose coupling between client and server.

While the current implementation serves as a functional prototype suitable for academic demonstration, the architecture is designed to accommodate the future enhancements outlined above, providing a clear pathway toward a production-ready hospital information system. The modular codebase, well-defined API contracts, and MongoDB's horizontal scalability ensure that the system can evolve to meet the growing demands of real-world healthcare operations.

This project reinforces the effectiveness of the MERN stack for building complex, data-driven web applications and highlights the transformative potential of technology in improving healthcare service delivery and patient experience.

---

## 11. BIBLIOGRAPHY

### 11.1 Books and Textbooks

1. Subramanian, V. (2019). *Pro MERN Stack: Full Stack Web App Development with Mongo, Express, React, and Node* (2nd ed.). Apress. ISBN: 978-1484243909.

2. Brown, E. (2019). *Web Development with Node and Express: Leveraging the JavaScript Stack* (2nd ed.). O'Reilly Media. ISBN: 978-1492053514.

3. Flanagan, D. (2020). *JavaScript: The Definitive Guide* (7th ed.). O'Reilly Media. ISBN: 978-1491952023.

4. Banks, A., & Porcello, E. (2020). *Learning React: Modern Patterns for Developing React Apps* (2nd ed.). O'Reilly Media. ISBN: 978-1492051725.

5. Mardan, A. (2018). *Full Stack JavaScript: Learn Backbone.js, Node.js, and MongoDB* (2nd ed.). Apress. ISBN: 978-1484237175.

6. Bradshaw, S., Brazil, E., & Chodorow, K. (2019). *MongoDB: The Definitive Guide* (3rd ed.). O'Reilly Media. ISBN: 978-1491954461.

7. Pressman, R. S., & Maxim, B. R. (2019). *Software Engineering: A Practitioner's Approach* (9th ed.). McGraw-Hill Education. ISBN: 978-1259872990.

8. Sommerville, I. (2015). *Software Engineering* (10th ed.). Pearson. ISBN: 978-0133943030.

### 11.2 Official Documentation

9. React Documentation. (2025). *React — A JavaScript library for building user interfaces*. Retrieved from https://react.dev/

10. Express.js Documentation. (2025). *Express — Node.js web application framework*. Retrieved from https://expressjs.com/

11. MongoDB Documentation. (2025). *MongoDB Manual*. Retrieved from https://www.mongodb.com/docs/manual/

12. Mongoose Documentation. (2025). *Mongoose ODM v9.x*. Retrieved from https://mongoosejs.com/docs/

13. Node.js Documentation. (2025). *Node.js v18+ Documentation*. Retrieved from https://nodejs.org/docs/latest/api/

14. React Router Documentation. (2025). *React Router v7*. Retrieved from https://reactrouter.com/

15. MDN Web Docs. (2025). *JavaScript Reference*. Mozilla Developer Network. Retrieved from https://developer.mozilla.org/en-US/docs/Web/JavaScript

### 11.3 npm Package References

16. Multer. (2025). *Node.js middleware for handling multipart/form-data*. Retrieved from https://www.npmjs.com/package/multer

17. Axios. (2025). *Promise-based HTTP Client for the browser and node.js*. Retrieved from https://www.npmjs.com/package/axios

18. Sonner. (2025). *An opinionated toast component for React*. Retrieved from https://sonner.emilkowal.dev/

19. Lucide React. (2025). *Beautiful & consistent icon toolkit for React*. Retrieved from https://lucide.dev/

20. Framer Motion. (2025). *A production-ready motion library for React*. Retrieved from https://www.framer.com/motion/

21. Bootstrap. (2025). *The most popular HTML, CSS, and JS library in the world*. Retrieved from https://getbootstrap.com/

22. React Bootstrap. (2025). *React-Bootstrap — React components for Bootstrap*. Retrieved from https://react-bootstrap.github.io/

23. dotenv. (2025). *Loads environment variables from .env file*. Retrieved from https://www.npmjs.com/package/dotenv

24. cors. (2025). *Express middleware for enabling CORS*. Retrieved from https://www.npmjs.com/package/cors

### 11.4 Research Papers and Articles

25. Wagh, K. & Thool, R. (2012). *A Comparative Study of SOAP Vs REST Web Services Provisioning Techniques for Mobile Host*. Journal of Information Engineering and Applications.

26. Tilkov, S. & Vinoski, S. (2010). *Node.js: Using JavaScript to Build High-Performance Network Programs*. IEEE Internet Computing.

### 11.5 Online Resources

27. freeCodeCamp. (2025). *The MERN Stack Tutorial*. Retrieved from https://www.freecodecamp.org/

28. MongoDB University. (2025). *Free MongoDB Courses*. Retrieved from https://university.mongodb.com/

---

## 12. APPENDICES

### Appendix A: Complete Project Directory Structure

```
Hospital_management/
│
├── README.md                          # Project documentation (this file)
├── backEnd.txt                        # API endpoint notes
│
├── server/                            # Backend (Express.js + MongoDB)
│   ├── package.json                   # Backend dependencies and scripts
│   ├── index.js                       # Application entry point
│   │
│   ├── model/                         # Mongoose schema definitions
│   │   ├── userModel.js               # User schema (patient/admin)
│   │   ├── doctorModel.js             # Doctor schema with availability
│   │   ├── appointmentModel.js        # Appointment schema
│   │   └── healthRecordModel.js       # Health record schema
│   │
│   ├── controller/                    # Business logic handlers
│   │   ├── userController.js          # User CRUD + auth operations
│   │   ├── doctorController.js        # Doctor CRUD + search/filter
│   │   ├── appointmentController.js   # Booking, cancellation, slot management
│   │   └── adminController.js         # Dashboard stats, patient/record management
│   │
│   ├── router/                        # Express route definitions
│   │   ├── userRouter.js              # /api/* user routes
│   │   ├── doctorRouter.js            # /api/doctors/* routes
│   │   ├── appointmentRouter.js       # /api/appointments/* routes
│   │   └── adminRouter.js             # /api/admin/* routes
│   │
│   ├── middleware/                     # Request processing middleware
│   │   ├── adminMiddleware.js         # Role-based admin verification
│   │   └── uploadMiddleware.js        # Multer PDF upload configuration
│   │
│   └── uploads/                       # File storage directory
│       └── records/                   # Uploaded PDF health records
│
└── client/                            # Frontend (React.js)
    ├── package.json                   # Frontend dependencies and scripts
    ├── public/                        # Static public assets
    │   ├── index.html                 # HTML shell
    │   ├── manifest.json              # PWA manifest
    │   └── robots.txt                 # Search engine directives
    │
    └── src/                           # React source code
        ├── index.js                   # React DOM entry point
        ├── index.css                  # Global styles
        ├── App.js                     # Root component with routing
        ├── App.css                    # App-level styles
        │
        ├── page/                      # Page-level components
        │   ├── Home.jsx               # Landing page
        │   ├── Login.jsx              # Patient/admin login
        │   ├── Register.jsx           # Patient registration
        │   ├── Appointment.jsx        # Doctor search + booking
        │   ├── Appointment.css        # Appointment page styles
        │   ├── HealthRecord.jsx       # Health portal (history + records)
        │   ├── HealthRecord.css       # Health record page styles
        │   ├── Profile.jsx            # User profile management
        │   ├── Payment.jsx            # Payment processing
        │   └── Emergency.jsx          # Emergency information (placeholder)
        │
        ├── components/                # Reusable UI components
        │   ├── Nav_Bar.jsx            # Navigation bar
        │   ├── Footer.jsx             # Page footer
        │   ├── hero.jsx               # Hero banner section
        │   ├── BookService.jsx        # Service booking cards
        │   ├── FindDoctor.jsx         # Doctor search preview
        │   ├── NearestFacility.jsx    # Facility locator (placeholder)
        │   ├── PromoBanner.jsx        # Promotional banner
        │   │
        │   └── appointment/           # Appointment-specific components
        │       ├── ApptHero.jsx       # Appointment page hero
        │       ├── FindDoctorSection.jsx # Doctor search + filter section
        │       ├── DoctorCard.jsx     # Individual doctor card
        │       ├── BookingModal.jsx   # Appointment booking modal dialog
        │       ├── AppointmentCard.jsx # Appointment display card
        │       ├── ScanSection.jsx    # Scan booking section
        │       └── ScanModal.jsx      # Scan booking modal dialog
        │
        └── admin/                     # Admin interface
            ├── AdminGuard.jsx         # Route guard (redirects non-admins)
            ├── AdminLayout.jsx        # Sidebar + outlet layout
            │
            └── pages/                 # Admin page components
                ├── AdminDashboard.jsx # Statistics and analytics
                ├── AdminDoctors.jsx   # Doctor CRUD management
                ├── AdminAppointments.jsx # Appointment status management
                └── AdminPatients.jsx  # Patient + health record management
```

### Appendix B: API Endpoints Complete Reference

#### B.1 User Endpoints

```
POST   /api/register              → registerUser
POST   /api/login                 → loginUser
GET    /api/users                 → getAllUsers
GET    /api/users/:id             → getUserId
PUT    /api/update/users/:id      → updateUser
DELETE /api/delete/users/:id      → deleteUser
```

#### B.2 Doctor Endpoints

```
GET    /api/doctors               → getAllDoctors (?speciality, ?location, ?search)
GET    /api/doctors/specialities  → getSpecialities
GET    /api/doctors/:id           → getDoctorById
POST   /api/doctors               → addDoctor
PUT    /api/doctors/:id           → updateDoctor
DELETE /api/doctors/:id           → deleteDoctor
```

#### B.3 Appointment Endpoints

```
POST   /api/appointments                   → bookAppointment
GET    /api/appointments/my/:patientId     → getMyAppointments
GET    /api/appointments                   → getAllAppointments
GET    /api/appointments/booked-slots      → getBookedSlots (?doctorId, ?date)
PATCH  /api/appointments/:id/cancel        → cancelAppointment
```

#### B.4 Admin Endpoints

```
POST   /api/admin/create-admin                        → createAdmin (no auth)
GET    /api/admin/health-records/:patientId            → getMyHealthRecords (no auth)
GET    /api/admin/stats                                → getDashboardStats (admin)
GET    /api/admin/users                                → getAllPatients (admin)
DELETE /api/admin/users/:id                            → deletePatient (admin)
GET    /api/admin/appointments                         → adminGetAllAppointments (admin)
PATCH  /api/admin/appointments/:id/status              → adminUpdateAppointmentStatus (admin)
GET    /api/admin/users/:patientId/health-records      → getPatientHealthRecords (admin)
POST   /api/admin/users/:patientId/health-records      → addHealthRecord [PDF upload] (admin)
DELETE /api/admin/health-records/:recordId              → deleteHealthRecord (admin)
GET    /api/admin/users/:patientId/appointments        → getPatientAppointments (admin)
```

#### B.5 Utility Endpoints

```
GET    /api/health                → Health check (returns { status: 'ok', time: Date })
```

### Appendix C: Database Schema Definitions (Mongoose)

#### C.1 User Schema

```javascript
const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  phone:    { type: String, required: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ["patient", "admin"], default: "patient" },
}, { timestamps: true });
```

#### C.2 Doctor Schema

```javascript
const doctorSchema = new mongoose.Schema({
  name:           { type: String, required: true, trim: true },
  speciality:     { type: String, required: true, enum: [/* 15 specialities */] },
  qualification:  { type: String, required: true },
  experience:     { type: Number, required: true },
  hospital:       { type: String, default: "" },
  location:       { type: String, required: true },
  photo:          { type: String, default: "" },
  bio:            { type: String, default: "" },
  fee:            { type: Number, required: true, default: 500 },
  availability: [{
    day:                { type: String, enum: [/* 7 days */] },
    slots:              [{ type: String }],
    maxPatientsPerSlot: { type: Number, default: 1, min: 1 },
  }],
  allowsVideoCall: { type: Boolean, default: false },
  rating:          { type: Number, default: 4.5, min: 1, max: 5 },
  reviews:         { type: Number, default: 0 },
  isActive:        { type: Boolean, default: true },
}, { timestamps: true });
```

#### C.3 Appointment Schema

```javascript
const appointmentSchema = new mongoose.Schema({
  patient:         { type: ObjectId, ref: "User", required: true },
  patientName:     { type: String, required: true },
  patientPhone:    { type: String, required: true },
  patientEmail:    { type: String, default: "" },
  age:             { type: Number },
  gender:          { type: String, enum: ["Male", "Female", "Other"] },
  doctor:          { type: ObjectId, ref: "Doctor", default: null },
  speciality:      { type: String, required: true },
  date:            { type: String, required: true },
  slot:            { type: String, required: true },
  reason:          { type: String, default: "" },
  appointmentType: { type: String, enum: ["in-person", "video-call"], default: "in-person" },
  status:          { type: String, enum: ["Pending", "Confirmed", "Cancelled", "Completed"], default: "Pending" },
}, { timestamps: true });
```

#### C.4 Health Record Schema

```javascript
const healthRecordSchema = new mongoose.Schema({
  patient:     { type: ObjectId, ref: "User", required: true },
  type:        { type: String, enum: [/* 6 types */], required: true },
  title:       { type: String, required: true, trim: true },
  date:        { type: String, required: true },
  doctor:      { type: String, default: "" },
  description: { type: String, default: "" },
  notes:       { type: String, default: "" },
  fileUrl:     { type: String, default: "" },
  fileName:    { type: String, default: "" },
  addedBy:     { type: ObjectId, ref: "User" },
}, { timestamps: true });
```

### Appendix D: Environment Configuration

#### D.1 Backend Environment Variables (`.env`)

```env
PORT=4000
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

#### D.2 Frontend Configuration

The React frontend communicates with the backend at `http://localhost:4000/api`. This base URL is configured as a constant (`API_BASE`) in each page component. For production deployment, this should be updated to the deployed backend URL or configured via environment variables.

### Appendix E: npm Scripts Reference

#### E.1 Backend Scripts (`server/package.json`)

| Command | Script | Description |
|---------|--------|-------------|
| `npm start` | `node index.js` | Start production server |
| `npm run dev` | `nodemon index.js` | Start development server with auto-reload |

#### E.2 Frontend Scripts (`client/package.json`)

| Command | Script | Description |
|---------|--------|-------------|
| `npm start` | `react-scripts start` | Start development server (port 3000) |
| `npm run build` | `react-scripts build` | Create production build |
| `npm test` | `react-scripts test` | Run test suite |
| `npm run eject` | `react-scripts eject` | Eject from Create React App (irreversible) |

### Appendix F: Supported Medical Specialities

| # | Speciality | Common Conditions Treated |
|---|-----------|--------------------------|
| 1 | Cardiology | Heart disease, hypertension, arrhythmia |
| 2 | Neurology | Migraine, epilepsy, stroke, Parkinson's |
| 3 | Orthopedics | Fractures, arthritis, joint replacement |
| 4 | Pediatrics | Child illness, vaccinations, growth disorders |
| 5 | Dermatology | Acne, eczema, psoriasis, skin infections |
| 6 | ENT | Sinusitis, hearing loss, tonsillitis |
| 7 | Gynecology | Pregnancy care, PCOS, menstrual disorders |
| 8 | Ophthalmology | Cataracts, glaucoma, vision correction |
| 9 | Psychiatry | Depression, anxiety, bipolar disorder |
| 10 | General Physician | Fever, cold, flu, general health checkups |
| 11 | Endocrinology | Diabetes, thyroid disorders, hormonal imbalance |
| 12 | Gastroenterology | IBS, ulcers, liver disease, acid reflux |
| 13 | Urology | Kidney stones, UTI, prostate disorders |
| 14 | Oncology | Cancer diagnosis, chemotherapy management |
| 15 | Pulmonology | Asthma, COPD, pneumonia, tuberculosis |

### Appendix G: Health Record Types

| Type | Description | Typical Use |
|------|------------|-------------|
| Scan Report | Imaging and diagnostic scan results | MRI, CT, X-Ray, Ultrasound reports |
| Prescription | Medication prescriptions from doctors | Drug prescriptions with dosage instructions |
| Lab Result | Laboratory test results | Blood tests, urine tests, biopsy reports |
| Discharge Summary | Hospital discharge documentation | Post-hospitalization care instructions |
| Vaccination | Vaccination records | COVID-19, flu, hepatitis vaccinations |
| Other | Miscellaneous medical documents | Referral letters, insurance documents |

### Appendix H: Appointment Status Lifecycle

```
                    ┌─────────────┐
  New Booking ─────>│   PENDING   │
                    └──────┬──────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
     ┌──────────────┐         ┌──────────────┐
     │  CONFIRMED   │         │  CANCELLED   │
     └──────┬───────┘         └──────────────┘
            │                     (Terminal)
            │
            ▼
     ┌──────────────┐
     │  COMPLETED   │
     └──────────────┘
        (Terminal)
```

| Transition | Actor | Action |
|-----------|-------|--------|
| → Pending | System | Automatic on appointment creation |
| Pending → Confirmed | Admin | Manual status update via admin panel |
| Pending → Cancelled | Patient/Admin | Patient self-cancel or admin update |
| Confirmed → Completed | Admin | Mark as done after consultation |
| Confirmed → Cancelled | Admin | Admin cancellation |

### Appendix I: Quick Start Guide

```bash
# 1. Clone the repository
git clone https://github.com/<username>/Hospital_management.git
cd Hospital_management

# 2. Set up the backend
cd server
npm install
# Create .env file with PORT and MONGO_URL
npm run dev

# 3. In a new terminal, set up the frontend
cd client
npm install
npm start

# 4. Open browser to http://localhost:3000

# 5. (Optional) Create an admin account
# POST http://localhost:4000/api/admin/create-admin
# Body: { "name": "Admin", "email": "admin@hospital.com", "phone": "1234567890", "password": "admin123" }
```

### Appendix J: Sample API Request/Response

#### J.1 Register User

**Request**:
```http
POST /api/register HTTP/1.1
Host: localhost:4000
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+919876543210",
  "password": "secure123"
}
```

**Response** (201):
```json
{
  "message": "User registered successfully"
}
```

#### J.2 Login User

**Request**:
```http
POST /api/login HTTP/1.1
Host: localhost:4000
Content-Type: application/json

{
  "identifier": "jane@example.com",
  "password": "secure123"
}
```

**Response** (200):
```json
{
  "message": "Login successful",
  "user": {
    "_id": "665a1b2c3d4e5f6a7b8c9d0e",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+919876543210",
    "role": "patient",
    "createdAt": "2025-06-01T10:30:00.000Z",
    "updatedAt": "2025-06-01T10:30:00.000Z"
  }
}
```

#### J.3 Book Appointment

**Request**:
```http
POST /api/appointments HTTP/1.1
Host: localhost:4000
Content-Type: application/json

{
  "patient": "665a1b2c3d4e5f6a7b8c9d0e",
  "patientName": "Jane Smith",
  "patientPhone": "+919876543210",
  "patientEmail": "jane@example.com",
  "age": 28,
  "gender": "Female",
  "doctor": "665b2c3d4e5f6a7b8c9d0e1f",
  "date": "2025-07-20",
  "slot": "10:00 AM",
  "reason": "Regular health checkup",
  "appointmentType": "in-person"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Appointment booked successfully!",
  "appointment": {
    "_id": "665c3d4e5f6a7b8c9d0e1f2a",
    "patient": "665a1b2c3d4e5f6a7b8c9d0e",
    "patientName": "Jane Smith",
    "doctor": {
      "_id": "665b2c3d4e5f6a7b8c9d0e1f",
      "name": "Dr. Priya Sharma",
      "speciality": "Cardiology",
      "hospital": "Apollo Hospital",
      "location": "Chennai"
    },
    "speciality": "Cardiology",
    "date": "2025-07-20",
    "slot": "10:00 AM",
    "status": "Pending",
    "appointmentType": "in-person",
    "createdAt": "2025-07-15T16:45:00.000Z"
  }
}
```

#### J.4 Get Dashboard Stats (Admin)

**Request**:
```http
GET /api/admin/stats HTTP/1.1
Host: localhost:4000
X-User: {"_id":"665f6a7b8c9d0e1f2a3b4c5d","name":"Admin","role":"admin"}
```

**Response** (200):
```json
{
  "success": true,
  "stats": {
    "totalUsers": 150,
    "totalDoctors": 25,
    "activeDoctors": 22,
    "totalAppointments": 487,
    "todayAppts": 12,
    "pendingAppts": 35,
    "confirmedAppts": 28,
    "completedAppts": 390,
    "cancelledAppts": 34,
    "monthlyStats": [
      { "_id": { "year": 2025, "month": 2 }, "count": 65 },
      { "_id": { "year": 2025, "month": 3 }, "count": 78 },
      { "_id": { "year": 2025, "month": 4 }, "count": 92 },
      { "_id": { "year": 2025, "month": 5 }, "count": 85 },
      { "_id": { "year": 2025, "month": 6 }, "count": 98 },
      { "_id": { "year": 2025, "month": 7 }, "count": 69 }
    ],
    "specialityStats": [
      { "_id": "Cardiology", "count": 89 },
      { "_id": "General Physician", "count": 76 },
      { "_id": "Orthopedics", "count": 62 },
      { "_id": "Dermatology", "count": 54 },
      { "_id": "Pediatrics", "count": 48 },
      { "_id": "Neurology", "count": 41 }
    ]
  }
}
```

---

*This document was prepared as part of the academic submission for the MediCare+ Hospital Management System project.*
