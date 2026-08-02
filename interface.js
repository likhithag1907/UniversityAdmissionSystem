/* ═══════════════════════════════════════════════
   interface.js — University Admission Management
   ═══════════════════════════════════════════════ */

const API = {
  fetch:   'fetch_students.php',
  add:     'add_student.php',
  update:  'update_student.php',
  delete:  'delete_student.php',
};

let allStudents = [];     // cache for filtering/search

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  loadStudents();
  bindNav();
  bindSearch();
  bindFilter();
  bindMenuToggle();
});

/* ─── NAVIGATION ─── */
function bindNav() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      showSection(item.dataset.section);
    });
  });
}

function showSection(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('section-' + name).classList.add('active');
  document.querySelector(`.nav-item[data-section="${name}"]`).classList.add('active');

  const titles = { dashboard: 'Dashboard', students: 'All Students', add: 'Add Student' };
  document.getElementById('pageTitle').textContent = titles[name] || name;

  if (name === 'students') renderStudentsTable(allStudents);
  if (name === 'dashboard') updateDashboard();

  // Close mobile sidebar
  document.querySelector('.sidebar').classList.remove('open');
}

/* ─── MENU TOGGLE (mobile) ─── */
function bindMenuToggle() {
  document.getElementById('menuToggle').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('open');
  });
}

/* ─── LOAD DATA ─── */
async function loadStudents() {
  try {
    const res = await fetch(API.fetch);
    if (!res.ok) throw new Error('Network error');
    allStudents = await res.json();
    updateDashboard();
    renderStudentsTable(allStudents);
  } catch (err) {
    allStudents = [];
    showToast('Could not load students: ' + err.message, 'error');
    document.getElementById('studentsBody').innerHTML = `<tr><td colspan="7" class="loading">Failed to load data.</td></tr>`;
    document.getElementById('recentBody').innerHTML   = `<tr><td colspan="5" class="loading">Failed to load data.</td></tr>`;
  }
}

/* ─── DASHBOARD ─── */
function updateDashboard() {
  const total    = allStudents.length;
  const paid     = allStudents.filter(s => s.payment_status === 'Paid').length;
  const pending  = allStudents.filter(s => s.payment_status === 'Pending').length;
  const grad     = allStudents.filter(s => s.payment_status === 'Graduated').length;

  animateCount('totalCount', total);
  animateCount('paidCount', paid);
  animateCount('pendingCount', pending);
  animateCount('gradCount', grad);

  // Recent 5
  const recent = [...allStudents].slice(-5).reverse();
  const tbody = document.getElementById('recentBody');
  if (!recent.length) {
    tbody.innerHTML = `<tr><td colspan="5" class="loading">No records found.</td></tr>`;
    return;
  }
  tbody.innerHTML = recent.map(s => `
    <tr>
      <td>${esc(s.student_id)}</td>
      <td>${esc(s.full_name)}</td>
      <td>${esc(s.department)}</td>
      <td>${esc(s.course)}</td>
      <td>${badge(s.payment_status)}</td>
    </tr>
  `).join('');
}

function animateCount(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let curr = 0;
  const step = Math.ceil(target / 20) || 1;
  const timer = setInterval(() => {
    curr = Math.min(curr + step, target);
    el.textContent = curr;
    if (curr >= target) clearInterval(timer);
  }, 40);
}

/* ─── STUDENTS TABLE ─── */
function renderStudentsTable(list) {
  const tbody = document.getElementById('studentsBody');
  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="loading">No students found.</td></tr>`;
    return;
  }
  tbody.innerHTML = list.map((s, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${esc(s.student_id)}</td>
      <td>${esc(s.full_name)}</td>
      <td>${esc(s.department)}</td>
      <td>${esc(s.course)}</td>
      <td>${badge(s.payment_status)}</td>
      <td>
        <div class="action-btns">
          <button class="btn-icon btn-edit"   onclick="openEdit(${s.id})"   title="Edit"><i class="fas fa-pen"></i></button>
          <button class="btn-icon btn-delete" onclick="deleteStudent(${s.id})" title="Delete"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

/* ─── SEARCH ─── */
function bindSearch() {
  document.getElementById('globalSearch').addEventListener('input', function () {
    const q = this.value.toLowerCase().trim();
    if (!q) { renderStudentsTable(allStudents); return; }
    const filtered = allStudents.filter(s =>
      s.full_name.toLowerCase().includes(q) ||
      s.student_id.toLowerCase().includes(q)
    );
    renderStudentsTable(filtered);
    // Switch to students section if not already there
    if (!document.getElementById('section-students').classList.contains('active')) {
      showSection('students');
    }
  });
}

/* ─── FILTER ─── */
function bindFilter() {
  document.getElementById('filterPayment').addEventListener('change', function () {
    const val = this.value;
    if (!val) { renderStudentsTable(allStudents); return; }
    renderStudentsTable(allStudents.filter(s => s.payment_status === val));
  });
}
/* ─────────────────────────────────────────────
   VALIDATION HELPERS
───────────────────────────────────────────── */

/*
  Valid Student ID format:
  STU-2024-001
  STU-2025-125
  STU-2026-999

  The year may be any four digits.
  The final section must contain exactly three digits.
*/
const STUDENT_ID_PATTERN = /^STU-\d{4}-\d{3}$/;

/*
  Allows:
  - Letters
  - Spaces
  - Apostrophes
  - Hyphens
  - Common accented letters

  Examples:
  Jane Smith
  Anne-Marie Jones
  O'Connor
*/
const FULL_NAME_PATTERN = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;


/*
  Converts:
  jane smith
  into:
  Jane Smith
*/
function formatFullName(name) {
  return name
    .toLowerCase()
    .split(/\s+/)
    .filter(part => part.length > 0)
    .map(part =>
      part
        .split('-')
        .map(word =>
          word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join('-')
    )
    .join(' ');
}


/*
  Checks whether a Student ID already exists.

  ignoredDatabaseId is used while editing so that the current
  student's own ID is not treated as a duplicate.
*/
function studentIdExists(studentId, ignoredDatabaseId = null) {
  return allStudents.some(student => {
    const sameStudentId =
      String(student.student_id).toUpperCase() ===
      String(studentId).toUpperCase();

    const differentDatabaseRecord =
      ignoredDatabaseId === null ||
      String(student.id) !== String(ignoredDatabaseId);

    return sameStudentId && differentDatabaseRecord;
  });
}


/*
  Shared validation for both Add and Edit forms.
*/
function validateStudentData(data, ignoredDatabaseId = null) {

  if (
    !data.student_id ||
    !data.full_name ||
    !data.department ||
    !data.course ||
    !data.payment_status
  ) {
    showToast('Please complete all required fields.', 'error');
    return false;
  }

  if (!STUDENT_ID_PATTERN.test(data.student_id)) {
    showToast(
      'Student ID must follow the format STU-2024-001.',
      'error'
    );
    return false;
  }

  if (data.full_name.length < 2) {
    showToast(
      'Please enter a valid full name.',
      'error'
    );
    return false;
  }

  if (!FULL_NAME_PATTERN.test(data.full_name)) {
    showToast(
      'Full Name may contain only letters, spaces, apostrophes and hyphens.',
      'error'
    );
    return false;
  }

  if (studentIdExists(data.student_id, ignoredDatabaseId)) {
    showToast(
      'This Student ID already exists. Please enter a unique Student ID.',
      'error'
    );
    return false;
  }

  return true;
}


/* ─────────────────────────────────────────────
   ADD STUDENT
───────────────────────────────────────────── */

async function submitStudent() {

  const rawFullName =
    document.getElementById('f_full_name').value.trim();

  const data = {
    student_id:
      document
        .getElementById('f_student_id')
        .value
        .trim()
        .toUpperCase(),

    full_name:
      formatFullName(rawFullName),

    department:
      document.getElementById('f_department').value,

    course:
      document.getElementById('f_course').value,

    payment_status:
      document.getElementById('f_payment_status').value
  };


  /*
    Validate the form before sending anything to PHP.
  */
  if (!validateStudentData(data)) {
    return;
  }


  try {

    const res = await fetch(API.add, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(data)
    });


    /*
      Read the response as text first.

      This prevents unclear JSON errors when PHP accidentally
      returns a warning or HTML error message.
    */
    const responseText = await res.text();

    let json;

    try {
      json = JSON.parse(responseText);
    } catch (parseError) {

      console.error(
        'Invalid response from add_student.php:',
        responseText
      );

      showToast(
        'The server returned an invalid response. Check the browser console.',
        'error'
      );

      return;
    }


    if (res.ok && json.success) {

      showToast(
        json.message || 'Student added successfully!',
        'success'
      );

      resetForm();

      await loadStudents();

      showSection('students');

    } else {

      showToast(
        json.message || 'Failed to add student.',
        'error'
      );
    }

  } catch (err) {

    console.error('Add student error:', err);

    showToast(
      'Server error: ' + err.message,
      'error'
    );
  }
}


/* ─────────────────────────────────────────────
   RESET ADD FORM
───────────────────────────────────────────── */

function resetForm() {

  document.getElementById('f_student_id').value = '';
  document.getElementById('f_full_name').value = '';
  document.getElementById('f_department').value = '';
  document.getElementById('f_course').value = '';
  document.getElementById('f_payment_status').value = '';
}


/* ─────────────────────────────────────────────
   DELETE STUDENT
───────────────────────────────────────────── */

async function deleteStudent(id) {

  const confirmed = confirm(
    'Are you sure you want to remove this student?'
  );

  if (!confirmed) {
    return;
  }


  try {

    const res = await fetch(API.delete, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ id: id })
    });


    const responseText = await res.text();

    let json;

    try {
      json = JSON.parse(responseText);
    } catch (parseError) {

      console.error(
        'Invalid response from delete_student.php:',
        responseText
      );

      showToast(
        'The server returned an invalid response.',
        'error'
      );

      return;
    }


    if (res.ok && json.success) {

      showToast(
        json.message || 'Student removed.',
        'success'
      );

      await loadStudents();

      renderStudentsTable(allStudents);

    } else {

      showToast(
        json.message || 'Failed to delete student.',
        'error'
      );
    }

  } catch (err) {

    console.error('Delete student error:', err);

    showToast(
      'Server error: ' + err.message,
      'error'
    );
  }
}


/* ─────────────────────────────────────────────
   OPEN EDIT MODAL
───────────────────────────────────────────── */

function openEdit(id) {

  const student = allStudents.find(
    student => String(student.id) === String(id)
  );

  if (!student) {
    showToast('Student record could not be found.', 'error');
    return;
  }


  document.getElementById('edit_id').value =
    student.id;

  document.getElementById('edit_student_id').value =
    student.student_id;

  document.getElementById('edit_full_name').value =
    student.full_name;

  document.getElementById('edit_department').value =
    student.department;

  document.getElementById('edit_course').value =
    student.course;

  document.getElementById('edit_payment_status').value =
    student.payment_status;


  document
    .getElementById('editModal')
    .classList
    .add('open');
}


/* ─────────────────────────────────────────────
   CLOSE EDIT MODAL
───────────────────────────────────────────── */

function closeModal() {

  document
    .getElementById('editModal')
    .classList
    .remove('open');
}


/* ─────────────────────────────────────────────
   UPDATE STUDENT
───────────────────────────────────────────── */

async function saveEdit() {

  const databaseId =
    document.getElementById('edit_id').value;

  const rawFullName =
    document.getElementById('edit_full_name').value.trim();


  const data = {

    id: databaseId,

    student_id:
      document
        .getElementById('edit_student_id')
        .value
        .trim()
        .toUpperCase(),

    full_name:
      formatFullName(rawFullName),

    department:
      document.getElementById('edit_department').value,

    course:
      document.getElementById('edit_course').value,

    payment_status:
      document.getElementById('edit_payment_status').value
  };


  /*
    Pass databaseId so the current record's own Student ID
    is not incorrectly treated as a duplicate.
  */
  if (!validateStudentData(data, databaseId)) {
    return;
  }


  try {

    const res = await fetch(API.update, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(data)
    });


    const responseText = await res.text();

    let json;

    try {
      json = JSON.parse(responseText);
    } catch (parseError) {

      console.error(
        'Invalid response from update_student.php:',
        responseText
      );

      showToast(
        'The server returned an invalid response.',
        'error'
      );

      return;
    }


    if (res.ok && json.success) {

      showToast(
        json.message || 'Student updated successfully!',
        'success'
      );

      closeModal();

      await loadStudents();

      renderStudentsTable(allStudents);

    } else {

      showToast(
        json.message || 'Failed to update student.',
        'error'
      );
    }

  } catch (err) {

    console.error('Update student error:', err);

    showToast(
      'Server error: ' + err.message,
      'error'
    );
  }
}


/* ─────────────────────────────────────────────
   CLOSE MODAL WHEN OVERLAY IS CLICKED
───────────────────────────────────────────── */

document
  .getElementById('editModal')
  .addEventListener('click', function (event) {

    if (event.target === this) {
      closeModal();
    }

  });


/* ─────────────────────────────────────────────
   DISPLAY PAYMENT-STATUS BADGES
───────────────────────────────────────────── */

function badge(status) {

  const badgeClasses = {
    Paid: 'badge-paid',
    Pending: 'badge-pending',
    Graduated: 'badge-graduated'
  };

  const badgeClass = badgeClasses[status] || '';

  return `
    <span class="badge ${badgeClass}">
      ${esc(status)}
    </span>
  `;
}


/* ─────────────────────────────────────────────
   ESCAPE HTML
───────────────────────────────────────────── */

function esc(value) {

  if (!value) {
    return '';
  }

  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


/* ─────────────────────────────────────────────
   TOAST NOTIFICATION
───────────────────────────────────────────── */

function showToast(message, type = 'success') {

  const toast =
    document.getElementById('toast');

  const icon =
    type === 'success' ? '✓  ' : '✕  ';

  toast.textContent =
    icon + message;

  toast.className =
    'toast show ' + type;


  setTimeout(() => {

    toast.className = 'toast';

  }, 3500);
}