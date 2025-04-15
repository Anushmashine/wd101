document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const entriesTable = document.getElementById('entriesTable').getElementsByTagName('tbody')[0];
    const dobInput = document.getElementById('dob');
    const dobError = document.getElementById('dobError');


    loadSavedData();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateAge()) {
            return;
        }
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const acceptedTerms = document.getElementById('acceptTerms').checked;
        
        const entry = {
            name,
            email,
            password,
            dob: formatDate(dob),
            acceptedTerms
        };
        
        addEntryToTable(entry);
        
        saveEntry(entry);
        
        form.reset();
    });
    
    function validateAge() {
        const dob = new Date(dobInput.value);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        
        if (age < 18 || age > 55) {
            dobError.textContent = 'Age must be between 18 and 55 years.';
            return false;
        } else {
            dobError.textContent = '';
            return true;
        }
    }
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    function addEntryToTable(entry) {
        const row = entriesTable.insertRow();
        
        const nameCell = row.insertCell(0);
        const emailCell = row.insertCell(1);
        const passwordCell = row.insertCell(2);
        const dobCell = row.insertCell(3);
        const termsCell = row.insertCell(4);
        
        nameCell.textContent = entry.name;
        emailCell.textContent = entry.email;
        passwordCell.textContent = entry.password.replace(/./g, '•');
        dobCell.textContent = entry.dob;
        termsCell.textContent = entry.acceptedTerms ? 'true' : 'false';
    }
    
    function saveEntry(entry) {
        let entries = JSON.parse(localStorage.getItem('formEntries')) || [];
        entries.push(entry);
        localStorage.setItem('formEntries', JSON.stringify(entries));
    }
    
    function loadSavedData() {
        const entries = JSON.parse(localStorage.getItem('formEntries')) || [];
        entries.forEach(entry => addEntryToTable(entry));
    }
});
