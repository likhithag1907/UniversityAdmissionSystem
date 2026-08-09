🎓 University Admission Management System

A responsive web-based **University Admission Management System** developed using **HTML, CSS, JavaScript, PHP, and PostgreSQL**. The system enables university admission staff to efficiently manage student admission records through a modern web interface with complete CRUD (Create, Read, Update, Delete) functionality.

---

📖 Project Overview

The University Admission Management System was developed to simplify the management of student admission records within a university environment. Instead of relying on manual paperwork or spreadsheets, admission staff can securely manage student information through an easy-to-use web application.

The system allows administrators to:

- Add new student records
- View all registered students
- Update student information
- Delete student records
- Search students by Student ID or Name
- Monitor payment status
- View admission statistics on a dashboard

The application also includes client-side validation to improve data accuracy before information is stored in the database.

---

✨ Features

- 📋 Dashboard with admission statistics
- ➕ Add new students
- ✏ Edit existing student records
- 🗑 Delete student records
- 🔍 Search students instantly
- 📊 Filter students by payment status
- ✅ Student ID format validation
- ✅ Duplicate Student ID prevention
- ✅ Full Name validation
- 📱 Responsive design for desktop and mobile devices
- 🔔 User-friendly notification messages (Toast alerts)

---

🛠 Technologies Used

| Technology |____________________| Purpose 

| HTML5 |_________________________| Structure of the website 
| CSS3 |__________________________| User interface styling 
| JavaScript (ES6) |______________| Client-side functionality 
| PHP |___________________________| Backend processing 
| PostgreSQL |____________________| Database management 
| XAMPP (Apache) |________________| Local web server 
| GitHub |________________________| Version control and project hosting 

---

📁 Project Structure

```text
UniversityAdmissionSystem/
│
├── index.html
├── style.css
├── interface.js
│
├── connect.php
├── fetch_students.php
├── add_student.php
├── update_student.php
├── delete_student.php
│
├── database.sql
└── README.md
```

---

💾 Database

**Database Name**

```text
UniversityAdmissionsSystem
```

**Main Table**

```text
students
```

The database stores:

- Student ID
- Full Name
- Department
- Course
- Payment Status

---

⚙ Installation Guide

## 1. Install Required Software

- XAMPP
- PostgreSQL
- pgAdmin
- Visual Studio Code

---

## 2. Copy Project

Copy the project folder into:

```text
C:\xampp\htdocs\
```

---

## 3. Import Database

Open **pgAdmin**

Create the database:

```text
UniversityAdmissionsSystem
```

Run the provided:

```text
database.sql
```

script to create the required table.

---

## 4. Configure Database Connection

Open:

```text
connect.php
```

Update the following details if required:

```php
$host
$port
$dbname
$user
$password
```

according to your PostgreSQL installation.

---

## 5. Start Apache

Open XAMPP Control Panel

Start:

- Apache

---

## 6. Launch the Website

Open your browser and navigate to:

```text
http://localhost/UniversityAdmissionSystem/index.html
```

---

📱 Application Modules

### Dashboard

Displays:

- Total Students
- Paid Students
- Pending Payments
- Graduated Students
- Recent Admissions

---

### Student Management

Provides complete CRUD operations:

- Create
- Read
- Update
- Delete

---

### Search

Allows searching by:

- Student ID
- Student Name

---

### Validation

The system validates:

- Student ID format

Example:

```text
STU-2024-001
```

- Duplicate Student IDs
- Full Name input
- Required fields

---

🧪 Testing

The following functionality has been successfully tested:

- Add Student
- View Students
- Update Student
- Delete Student
- Search Student
- Payment Filter
- Student ID Validation
- Full Name Validation

---

📸 Screenshots

Screenshots of the application interface will be added here.

- Dashboard
- Student Records
- Add Student Form
- Edit Student Form
- Responsive Mobile View

---
