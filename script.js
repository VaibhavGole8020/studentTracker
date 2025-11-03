document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('student-form');
    const studentList = document.getElementById('student-list');
    const searchForm = document.getElementById('search-form');
    const sortBtn = document.getElementById('sort-btn');
    const sortGradeBtn = document.getElementById('sort-grade-btn');
    const topperBtn = document.getElementById('topper-btn');
    const displayAllBtn = document.getElementById('display-all-btn');

    let students = [];

    // --- StudentManager Logic ---

    function findIndexByRoll(roll) {
        return students.findIndex(student => student.roll.toLowerCase() === roll.toLowerCase());
    }

    function insertInfo(roll, name, cls, subject, grade) {
        if (findIndexByRoll(roll) !== -1) {
            alert('The entered roll already exists.');
            return;
        }
        students.push({ roll, name, cls, subject, grade });
        displayAll();
        alert(`Data successfully inserted for Roll No: ${roll}`);
    }

    function displayAll() {
        renderStudentList(students);
    }

    function displayByRoll(roll) {
        const index = findIndexByRoll(roll);
        if (index !== -1) {
            renderStudentList([students[index]]);
        } else {
            alert(`Record with Roll No '${roll}' not found.`);
        }
    }

    function deleteByRoll(roll) {
        const index = findIndexByRoll(roll);
        if (index !== -1) {
            students.splice(index, 1);
            displayAll();
            alert(`Information for Roll No '${roll}' successfully deleted.`);
        } else {
            alert(`Information for Roll No '${roll}' doesn't exist.`);
        }
    }

    function sortInfo() {
        students.sort((a, b) => a.roll.localeCompare(b.roll));
        displayAll();
        alert('Student Data sorted by Roll Number!');
    }

    function sortInfoByGrade() {
        students.sort((a, b) => a.grade.localeCompare(b.grade));
        displayAll();
        alert('Student Data sorted by Grade!');
    }

    function showTopper() {
        const toppers = students.filter(student => student.grade.toLowerCase() === 'a');
        if (toppers.length > 0) {
            renderStudentList(toppers);
        } else {
            alert('No students found with grade A.');
        }
    }

    // --- DOM Manipulation ---

    function renderStudentList(studentArray) {
        studentList.innerHTML = '';
        if (studentArray.length === 0) {
            studentList.innerHTML = '<p>No student records available.</p>';
            return;
        }
        studentArray.forEach(student => {
            const record = document.createElement('div');
            record.className = 'student-record';
            record.innerHTML = `
                <div>
                    <p><strong>Roll No:</strong> ${student.roll}</p>
                    <p><strong>Name:</strong> ${student.name}</p>
                    <p><strong>Class:</strong> ${student.cls}</p>
                    <p><strong>Subject:</strong> ${student.subject}</p>
                    <p><strong>Grade:</strong> ${student.grade}</p>
                </div>
                <button class="delete-btn" data-roll="${student.roll}">Delete</button>
            `;
            studentList.appendChild(record);
        });
    }

    // --- Event Listeners ---

    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const roll = document.getElementById('roll').value;
        const name = document.getElementById('name').value;
        const cls = document.getElementById('cls').value;
        const subject = document.getElementById('subject').value;
        const grade = document.getElementById('grade').value;
        insertInfo(roll, name, cls, subject, grade);
        studentForm.reset();
    });

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const roll = document.getElementById('search-roll').value;
        displayByRoll(roll);
    });

    studentList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const rollToDelete = e.target.dataset.roll;
            deleteByRoll(rollToDelete);
        }
    });

    sortBtn.addEventListener('click', sortInfo);
    sortGradeBtn.addEventListener('click', sortInfoByGrade);
    topperBtn.addEventListener('click', showTopper);
    displayAllBtn.addEventListener('click', displayAll);

    // Initial display
    displayAll();
});
