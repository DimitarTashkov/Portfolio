<p align="center">
  <img src="StageNova/Resources/StageNova_logo.png" alt="StageNova Logo" width="180" />
</p>

<h1 align="center"> StageNova</h1>

<p align="center">
  <strong>A Theater Management System built with .NET 8 and Windows Forms</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/.NET-8.0-purple" alt=".NET 8" />
  <img src="https://img.shields.io/badge/UI-Windows%20Forms-blue" alt="WinForms" />
  <img src="https://img.shields.io/badge/ORM-Entity%20Framework%20Core%208-green" alt="EF Core" />
  <img src="https://img.shields.io/badge/Database-SQL%20Server-red" alt="SQL Server" />
</p>

---

## Overview

**StageNova** is a desktop theater management application that allows users to browse a repertoire of plays, book tickets for performances, purchase theater merchandise, and manage their bookings. Administrators can manage plays, performances, merchandise inventory, and user accounts.

---

## Features

### For Theatergoers
- **Browse Repertoire** — Explore plays with poster art, genre, duration, and ticket pricing
- **Book Tickets** — Select a performance date/time, choose seat count, and see live total pricing
- **My Bookings** — View all ticket bookings and merchandise orders with cancellation support
- **Merchandise Shop** — Purchase theater merchandise with image previews and stock availability
- **Profile Management** — Edit username, password, email, age, and avatar

### For Administrators
- **Manage Plays** — Full CRUD for plays including title, director, genre, duration, ticket price, poster image, and description
- **Manage Performances** — Add/remove show dates with seat capacity per play
- **Manage Merchandise** — Add, edit, and delete merchandise items with pricing, stock, and images
- **User Management** — View all registered users and toggle admin roles

---

## Screenshots

<div align="center">
  <img src="images/Index%20form.png" alt="Home Screen" width="400"/>
  <img src="images/Plays%20form.png" alt="Play Repertoire" width="400"/>
  <img src="images/BookVisit%20form.png" alt="Book a Visit" width="400"/>
  <img src="images/Shop%20form.png" alt="Merchandise Shop" width="400"/>
  <img src="images/Login%20form.png" alt="Login" width="400"/>
  <img src="images/Profile%20form.png" alt="User Profile" width="400"/>
  <img src="images/My%20bookins-%20tickets%20form.png" alt="My Bookings" width="400"/>
  <img src="images/Manage%20plays%20form.png" alt="Admin - Manage Plays" width="400"/>
  <img src="images/AddEdit%20play%20form.png" alt="Admin - Add/Edit Play" width="400"/>
  <img src="images/Manage%20merch%20form.png" alt="Admin - Manage Merchandise" width="400"/>
  <img src="images/Users%20form.png" alt="Admin - Manage Users" width="400"/>
  <img src="images/db%20diagram.png" alt="Database Diagram" width="400"/>
</div>

---

```
StageNova/
├── Common/                  # Constants, validation rules, fonts
│   ├── Constants/           # ValidationConstants, FontsPicker
│   └── Messages/            # ErrorMessages
├── DTOs/                    # Data Transfer Objects
│   └── User/                # LoginUserInputModel, RegisterUserInputModel, EditProfileInputModel
├── Extensions/              # ServiceLocator, ServiceRegistration (DI)
├── Forms/                   # WinForms UI (16 forms)
│   ├── Index                # Home page
│   ├── Login / Register     # Authentication
│   ├── Profile              # User profile management
│   ├── Catalog              # Play repertoire browser
│   ├── BookVisit            # Ticket booking
│   ├── Shop / Checkout      # Merchandise store
│   ├── Orders               # My Bookings view
│   ├── ManageExhibits       # Admin: manage plays
│   ├── AddEditExhibit       # Admin: add/edit play + performances
│   ├── ManageSouvenirs      # Admin: manage merchandise
│   ├── AddEditSouvenir      # Admin: add/edit merchandise
│   ├── Users                # Admin: user management
│   ├── AboutUs / ContactUs  # Info pages
│   └── ...Designer.cs       # Auto-generated designer files
├── Models/                  # EF Core entities
│   ├── Play, Performance, Ticket
│   ├── User, Role, UserRole
│   ├── Souvenir, Order, OrderItem
│   └── DbConfiguration/    # StageNovaDbContext, Configuration, SeedAdmin
├── Services/                # Business logic layer
│   ├── Interfaces/          # IPlayService, ITicketService, IUserService, ISouvenirService
│   ├── PlayService, TicketService, UserService, SouvenirService
│   └── BaseService          # Shared validation logic
├── Utilities/               # Helpers
│   ├── MenuHelper           # Centralized navigation labels & styling
│   ├── AuthorizationHelper  # Admin role checks
│   ├── InvoiceHelper        # Receipt/invoice generation
│   ├── ValidationHelper     # Input validation
│   ├── EventsEffects        # UI hover/click effects
│   ├── LayoutHelper         # Gradient backgrounds
│   ├── RoundPictureBox      # Custom circular PictureBox control
│   └── DynamicContentTranslator  # UI string constants
├── Migrations/              # EF Core migrations
├── Properties/              # Embedded resources (images, icons)
└── Program.cs               # Entry point with DI setup
```

---

## Data Model

![Database Diagram](images/db%20diagram.png)

```
User ──┬── Ticket ──> Performance ──> Play
       └── Order ──> OrderItem ──> Souvenir

User ──> UserRole ──> Role
```

| Entity | Key Fields |
|---|---|
| **Play** | Title, Director, Genre, DurationMinutes, TicketPrice, PosterImage, Description, IsActive |
| **Performance** | PlayId, Date, TotalSeats, AvailableSeats |
| **Ticket** | UserId, PerformanceId, TicketsCount, TotalPrice |
| **Souvenir** | Name, Price, StockQuantity, ImagePath |
| **Order** | UserId, TotalAmount, DeliveryAddress, PhoneNumber, OrderDate |
| **OrderItem** | OrderId, SouvenirId, Quantity, UnitPrice |
| **User** | Username, Password, Email, Age, AvatarUrl |
| **Role** | Name (Admin) |

---

## Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (Express or Developer edition)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) (with .NET desktop development workload)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/DimitarTashkov/StageNova.git
   cd StageNova
   ```

2. **Configure the database connection**

   Open `StageNova/Models/DbConfiguration/Configuration.cs` and update the connection string to match your SQL Server instance:
   ```csharp
   public static string ConnectionString = 
       "Data Source=YOUR_SERVER;Initial Catalog=StageNova;Integrated Security=True;Connect Timeout=30;Encrypt=True;Trust Server Certificate=True;";
   ```

3. **Create the database**

   Open the **Package Manager Console** in Visual Studio and run:
   ```
   Add-Migration InitialCreate
   Update-Database
   ```
   
   Or via CLI:
   ```bash
   cd StageNova
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

4. **Run the application**
   
   Press `F5` in Visual Studio or:
   ```bash
   dotnet run --project StageNova
   ```

### Default Admin Account

An admin user is automatically seeded on first launch:

| Field | Value |
|---|---|
| Username | `admin` |
| Password | `admin123` |
| Email | `admin@stagenova.com` |


---

## Tech Stack

| Layer | Technology |
|---|---|
| **UI** | Windows Forms (.NET 8) |
| **Business Logic** | Service layer with DI via `Microsoft.Extensions.DependencyInjection` |
| **ORM** | Entity Framework Core 8.0.11 |
| **Database** | SQL Server |
| **Pattern** | Service Locator + Scoped DI, Code-First migrations |

---

## License

This project is developed for educational purposes.

---

<p align="center">
  <em> StageNova — Where stories come alive on stage.</em>
</p>
