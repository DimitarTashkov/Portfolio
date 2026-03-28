# Hotel Oazis – Desktop Management System

A Windows Forms desktop application for managing hotel operations at Hotel "Oazis". Built as a diploma project by Dimitar Stoyanov Tashkov at PMG "Yane Sandanski".

## Features

- **User Roles**: Administrator & Client
- **Authentication**: Login, Registration, Profile Management
- **Room Management**: Add, edit, delete, view rooms
- **Service Management**: Manage hotel services
- **Reservations**: Book, cancel, view personal bookings
- **Review System**: Write, edit, delete, and moderate reviews
- **Admin Panel**: Manage users, approve content, adjust pricing
- **Multilingual Support**: Bulgarian & English

## Tech Stack

- **Frontend**: C# with WinForms
- **Backend**: .NET Framework
- **Database**: Microsoft SQL Server
- **ORM**: Entity Framework
- **Data Access**: LINQ

## Database Structure

- `Users`, `Roles`, `UsersRoles`
- `Rooms`, `Reservations`, `Services`, `Reviews`

Relationships:
- Users ↔ Roles (many-to-many)
- Users → Reservations, Reviews (one-to-many)
- Rooms → Reservations (one-to-many)

## Usage

1. Clone the repo:
   ```bash
   gh repo clone DimitarTashkov/Hotel-Oazis
   ```

## Application Previews

Here is a full showcase of the application's user interface and capabilities.

<p align="center">
  <img src="images/image5.png" width="48%">
  <img src="images/image6.png" width="48%">
  <img src="images/image7.png" width="48%">
  <img src="images/image8.png" width="48%">
  <img src="images/image9.png" width="48%">
  <img src="images/image10.png" width="48%">
  <img src="images/image11.png" width="48%">
  <img src="images/image12.png" width="48%">
  <img src="images/image13.png" width="48%">
  <img src="images/image14.png" width="48%">
  <img src="images/image15.png" width="48%">
  <img src="images/image16.png" width="48%">
  <img src="images/image17.png" width="48%">
  <img src="images/image18.png" width="48%">
  <img src="images/image19.png" width="48%">
  <img src="images/image20.png" width="48%">
  <img src="images/image21.png" width="48%">
  <img src="images/image22.png" width="48%">
  <img src="images/image23.png" width="48%">
</p>

