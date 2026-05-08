# Transitly - Seamless Ticket Booking & Management

This repository contains the clientside source code and documentation for the Transitly web project.

**Serverside Repository: [https://github.com/AhmadZubayer/Transitly-Serverside](https://github.com/AhmadZubayer/Transitly-Serverside)**


# [Live Link: https://transitly-b857b.web.app](https://transitly-b857b.web.app)

**Transitly** is a robust web application designed to simplify the process of browsing, managing, and booking tickets online. Whether you are a traveler looking for a ride or a vendor managing a fleet, Transitly provides a seamless experience for everyone.

---

## Entities & User Roles

Transitly supports three primary user roles, each with a tailored experience:
1.  **Customers (General Users)**
2.  **Vendors**
3.  **Admins**

---

## Key Features

### Universal Features
*   **Simple Authentication**: Easy Sign-In and Sign-Up using traditional forms or **Google One-Tap**.
*   **Theme Switching**: Modern **Dark Mode** and **Light Mode** based on user preference.

### Customer Features
*   **Advanced Ticket Browsing**:
    *   Find tickets based on departure/destination and journey date.
    *   Explore **Featured** and **Recently Added** tickets.
    *   Fast-loading ticket lists for a smooth experience.
*   **Custom Filtering & Sorting**: Sort by departure/destination district, date, transport brand, type, features, vendor, and price range (sent as jQuery to the serverside).
*   **Search**: Real-time keyword search for any ticket. (sent as jQuery to the serverside).
*   **Booking System**:
    *   Book tickets with desired quantities.
    *   **Real-time Countdown** for upcoming journeys.
    *   **Secure Payment**: Integrated with **Stripe** for safe transactions.
    *   **Ticket Status**: Track status (Pending | Accepted | Rejected | Paid).
    *   **PDF Generation**: Download detailed ticket summaries in PDF format.
*   **User Dashboard**: Manage bookings, view transaction history, and update profile details.
*   **Contact Form**: Direct communication channel with the platform.

### Vendor Features
*   **Inventory Management**:
    *   Add new tickets via a detailed multi-step form.
    *   Edit tickets before they are published.
*   **Booking Management**: Approve or reject customer booking requests.
*   **Vendor Analytics**: Track total earnings, tickets sold, and performance trends via interactive graphs.

### Admin Features
*   **User Management**:
    *   Manage all users and assign roles (Vendor/Admin).
    *   **Fraud Protection**: Mark users as "Fraud" to restrict site access and ticket publishing.
*   **Ticket Moderation**: Approve or reject tickets submitted by vendors.
*   **Featured Content**: Select and advertise up to 6 tickets in the featured section.
*   **Platform Analytics**: Dashboard showing total users, tickets, earnings, and vendor performance.

---

## General Workflow

1.  **Form Validation**: Robust client-side and server-side validation for all inputs.
2.  **Persistent Routing**: Users are redirected back to their intended route after signing in.
3.  **Private Routes**: Critical sections like Ticket Details and Dashboards require authentication.
4.  **Booking Lifecycle**:
    *   Customer requests a booking -> Vendor accepts/rejects -> Customer pays -> Booking Confirmed. 
    *   Payment is disabled if the departure time has already passed.
5.  **Ticket Approval**: Vendor Add Ticket -> Admin Approve/Reject -> Published in site/ 

## Business Logic

The platform operates on a revenue-sharing model for every successful booking (Validated by the serverside):
*   **Platform Share**: 30% of the customer's payment.
*   **Vendor Share**: 70% of the customer's payment.

## Preview

### Platform Overview

![Preview 1](screenshots/1.png)
![Preview 2](screenshots/2.png)
![Preview 3](screenshots/3.png)
![Preview 4](screenshots/4.png)
![Preview 5](screenshots/5.png)
![Preview 6](screenshots/6.png)
![Preview 7](screenshots/7.png)
![Preview 8](screenshots/8.png)
![Preview 9](screenshots/9.png)
![Preview 10](screenshots/10.png)
![Preview 12](screenshots/12.png)
Stripe Gateway
![Preview 13](screenshots/13.png)
Ticket PDF
![Preview 14](screenshots/14.png)
![Preview 15](screenshots/15.png)
Vendor Dashboard
![Preview 16](screenshots/16.png)
![Preview 17](screenshots/17.png)
![Preview 11](screenshots/11.png)
![Preview 18](screenshots/18.png)
Admin Dashboard
![Preview 19](screenshots/19.png)
![Preview 20](screenshots/20.png)
![Preview 21](screenshots/21.png)
![Preview 22](screenshots/22.png)
![Preview 23](screenshots/23.png)
![Preview 24](screenshots/24.png)
![Preview 25](screenshots/25.png)
Policies
![Preview 26](screenshots/26.png)
Footer
![Preview 27](screenshots/27.png)


---

## Tech Stack

### Frontend
*   **ReactJS** (Vite)
*   **Tailwind CSS** & **DaisyUI** (Styling)
*   **Material UI (MUI)** (Date pickers, drawers, charts, and countdowns)

### Backend
*   **ExpressJS** (Node.js)
*   **MongoDB** (Database)

### Hosting
*   **Frontend**: Firebase Hosting
*   **Server**: Vercel

---

## Dependencies & Libraries

| Package | Purpose |
| :--- | :--- |
| **Firebase** | Authentication and hosting. |
| **Axios** | Handling API requests to the server. |
| **Tanstack Query** | Efficient data fetching and caching. |
| **React Hook Form** | Managing complex form states and validation. |
| **Stripe** | Secure payment processing. |
| **SwiperJS** | Interactive sliders for featured content. |
| **SweetAlert2** | Beautiful and responsive alert notifications. |
| **ImgBB** | Image hosting for ticket and profile uploads. |
| **jsPDF** | Generating downloadable ticket PDFs. |

---

## Security

*   **Protected Routes**: Ensuring unauthorized users cannot access sensitive areas. Different entities are restricted from accessing other entities' data, and users cannot view data belonging to others.
*   **Token Verification**: User roles and IDs are verified via **Axios interceptors** and **Firebase verify token middleware**.
*   **Firebase Authentication**: Secure user identity management.
*   **Environment Variables**: Sensitive keys (Firebase, Stripe, ImgBB) are managed securely.

---

## Reusability

This project is built with a focus on clean code and maximum reusability:

*   **Global State with Context API**:
    *   **Auth Context**: Manages user session and authentication state globally, so any component can access user data without prop-drilling.
    *   **Theme Context**: Handles the site-wide Dark Mode/Light Mode toggle. 
*   **Custom React Hooks**:
    *   Logic for API calls (`useAxiosSecure`), role-based access (`useRole`), and theme management (`useThemeMode`) are extracted into custom hooks to keep components lean and readable.
*   **Shared Form Components**:
    *   Common inputs, buttons, and error messages are modularized. For example, the same atomic **Input** and **ModernBtn** components are used in Sign-In, Sign-Up, and the Add-Ticket forms.
    *   **React Hook Form** logic is centralized to handle validation consistently across different user inputs.
*   **Versatile Card Designs**:
    *   A single, flexible **Card** component architecture is used to display tickets in various contexts.
    *   The same base card logic is adapted for **Featured Tickets** on the home page, **User Bookings** in the customer dashboard, and **Ticket Management** in the vendor/admin panels.
*   **Reusable UI Elements**:
    *   Modals for confirmations and quantity selections are built as generic components.

---

## Acknowledgements

*   **UI Components**: Inspired by [uiverse.io](https://uiverse.io).
    *   **Modern Button**: [Gentle Robin by mishary_5473](https://uiverse.io/mishary_5473/gentle-robin-87)
    *   **Ticket Card**: [Giant Squid by SouravBandyopadhyay](https://uiverse.io/SouravBandyopadhyay/giant-squid-24)
*   **Stock Images**: Sourced from [Magnific](https://www.magnific.com/).
*   **Community**: Special thanks to the open-source community for the libraries used.

---

## Use of AI

This project utilized AI tools for development and optimization under student subscription plans:
*   **GitHub Copilot (Claude)**
*   **Gemini CLI**

AI was utilized responsibly in the following scenarios:
*   **Theme Optimization**: Refining dark and light mode transitions.
*   **UI & Component Layout**: Fixing structural and layout issues.
*   **Payment Integration**: Troubleshooting and resolving payment route errors.
*   **Feature Implementation**: Developing the ticket PDF generation functionality.
*   **Component Integration**: Adapting components from uiverse.io to fit the project's architecture.
*   **Form Management**: Resolving React Hook Form errors and validation bugs.
*   **Data Generation**: Generating 1,000+ testing tickets for initial development and performance testing.
*   **General Debugging**: Identifying and resolving various software bugs.
