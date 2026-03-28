# Dentora 🦷

A desktop dental practice management system built with C# and Windows Forms. Dentora helps dental clinics manage patients, appointments, treatments, inventory, and patient reviews — all in one place.

---

## Features

- **User Authentication** — Secure login and registration with role-based access (Admin and Client)
- **Patient Management** — View and edit patient profiles including contact info and avatars
- **Appointment Scheduling** — Book appointments with conflict detection to prevent double-booking
- **Treatment Catalog** — Full CRUD for dental treatments with categories, pricing, and duration
- **Inventory Management** — Track medical supplies and equipment with stock levels and supplier info
- **Reviews & Feedback** — Patients can submit 1–5 star reviews with comments
- **Admin Dashboard** — Central hub for managing all clinic operations
- **Patient Dashboard** — Personal view for patients to manage their own appointments

---

## Screenshots

![Dentora Logo](images/dentora_logo.png)

### Portals
**Doctor / Admin Dashboard**  
![Doctor Dashboard](images/home-doctor%20form.png)

**Patient Dashboard**  
![Patient Dashboard](images/home-patient%20form.png)

### Authentication
**Login & Register**  
![Login Form](images/login%20form.png)  
![Register Form](images/register%20form.png)

### Key Features
**Managing Patients & Appointments**  
![Patients Form](images/patients%20form.png)  
![Patient Appointments](images/patient%20appointments.png)  
![Book Appointment](images/book%20appointment%20form.png)

**Schedules & Reports**  
![Schedules Form](images/schedules%20form.png)  
![Daily Report](images/daily%20report.png)

**Treatment & Inventory Management**  
![Treatments Form](images/treatments%20form.png)  
![Inventory Form](images/inventory%20form.png)

### Database Architecture
![Database Diagram](images/db%20diagram.png)

---

## Tech Stack

| Category       | Technology                        |
|----------------|-----------------------------------|
| Language       | C# (.NET 8.0)                     |
| UI Framework   | Windows Forms (WinForms)          |
| Database       | SQL Server                        |
| ORM            | Entity Framework Core 8.0.11      |
| Architecture   | Service Layer + Dependency Injection |

---

## Prerequisites

- Windows OS
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- SQL Server (local or remote instance)
- Visual Studio 2022 (recommended) or any compatible IDE

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/DimitarTashkov/Dentora.git
cd Dentora
```

### 2. Configure the database connection

Open `Models/DbConfiguration/Configuration.cs` and update the connection string to match your SQL Server instance:

```csharp
public static string ConnectionString =
    "Data Source=YOUR_SERVER;Initial Catalog=DentoraDb;Integrated Security=True;" +
    "Connect Timeout=30;Encrypt=True;Trust Server Certificate=True;";
```

### 3. Apply database migrations

Open the **Package Manager Console** in Visual Studio and run:

```
Update-Database
```

This will create the database schema and seed a default admin user.

### 4. Build and run

Open `Dentora.sln` in Visual Studio, build the solution (`Ctrl+Shift+B`), and run (`F5`).

---

## Default Credentials

| Role  | Username | Password    |
|-------|----------|-------------|
| Admin | `admin`  | `password123` |

> ⚠️ **Security:** The default password is weak and intended for initial setup only. Change it immediately after your first login.

---

## Project Structure

```
Dentora/
├── Forms/          # Windows Forms UI (Login, Dashboards, Management screens)
├── Models/         # EF Core entities and DbContext
│   └── DbConfiguration/   # Database context, connection string, and seed data
├── Services/       # Business logic layer with interfaces
├── DTOs/           # Data Transfer Objects for input/view models
├── Extensions/     # Dependency injection and service locator setup
├── Utilities/      # UI helpers, validation, authorization, layout utilities
├── Common/         # Constants, validation rules, and error messages
├── Migrations/     # Entity Framework Core migrations
└── Resources/      # Application icon and assets
```

---

## Database Schema

| Table            | Description                              |
|------------------|------------------------------------------|
| `Users`          | Patient and doctor accounts              |
| `Roles`          | Role definitions (Admin, Client)         |
| `UserRoles`      | Many-to-many mapping of users to roles   |
| `Treatments`     | Available dental treatments/services     |
| `Appointments`   | Booked appointments with status tracking |
| `InventoryItems` | Medical supplies and equipment           |
| `Reviews`        | Patient ratings and comments             |

---

## License

This project is open source. See the repository for licensing details.
