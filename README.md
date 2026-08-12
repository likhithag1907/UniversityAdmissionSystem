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
  <img width="1891" height="952" alt="Dashboard" src="https://github.com/user-attachments/assets/a811652d-d311-403b-a801-98ed05989727" />

- Student Records
  <img width="1910" height="952" alt="Student Records" src="https://github.com/user-attachments/assets/da929852-d12a-409d-85cf-89e54964533a" />

- Add Student Form
  <img width="1910" height="958" alt="Add Student" src="https://github.com/user-attachments/assets/1e17b1d1-568f-446d-b4c8-e82c2fbd0222" />

- Edit Student Form
  <img width="1917" height="887" alt="Edit Student" src="https://github.com/user-attachments/assets/29fa8001-17cc-48fb-bb1a-d5b7e54a450f" />

- Responsive Mobile View
  <img width="342" height="767" alt="Mobile View 1" src="https://github.com/user-attachments/assets/ef687267-dc80-442c-b111-c4972df00700" />
<img width="346" height="765" alt="Mobile View 2" src="https://github.com/user-attachments/assets/ff3e0ca4-cf4f-4b3b-9cc2-a60739a4cc46" />


---
