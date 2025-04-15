document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const entriesTable = document.getElementById('entriesTable').getElementsByTagName('tbody')[0];
    const dobInput = document.getElementById('dob');
    const dobError = document.getElementById('dobError');

    // Load saved data from localStorage
    loadSavedData();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate age (18-55 years)
        if (!validateAge()) {
            return;
        }
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const acceptedTerms = document.getElementById('acceptTerms').checked;
        
        // Create entry object
        const entry = {
            name,
            email,
            password,
            dob: formatDate(dob),
            acceptedTerms
        };
        
        // Add to table
        addEntryToTable(entry);
        
        // Save to localStorage
        saveEntry(entry);
        
        // Reset form
        form.reset();
    });
    
    function validateAge() {
        if (!dobInput.value) return false;
        
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
        
        row.insertCell(0).textContent = entry.name;
        row.insertCell(1).textContent = entry.email;
        row.insertCell(2).textContent = '•'.repeat(entry.password.length); // Show bullets for password
        row.insertCell(3).textContent = entry.dob;
        row.insertCell(4).textContent = entry.acceptedTerms ? 'true' : 'false';
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
        

