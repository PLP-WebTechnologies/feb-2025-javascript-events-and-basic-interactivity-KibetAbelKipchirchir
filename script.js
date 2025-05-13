// Event Handling Section
document.addEventListener('DOMContentLoaded', function() {
    // Button click event
    const clickButton = document.getElementById('click-button');
    const clickOutput = document.getElementById('click-output');
    
    clickButton.addEventListener('click', function() {
        clickOutput.textContent = "Button was clicked! 🎉";
        clickOutput.classList.add('bounce');
        setTimeout(() => clickOutput.classList.remove('bounce'), 500);
    });

    // Hover effects
    const hoverBox = document.querySelector('.hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = "You're hovering! 🚀";
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = "Waiting for hover...";
    });

    // Keypress detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keyup', function(e) {
        keypressOutput.textContent = `You pressed: ${e.key} (Key code: ${e.keyCode})`;
    });

    // Secret action (double click or long press)
    const secretBox = document.querySelector('.secret-box');
    const secretOutput = document.getElementById('secret-output');
    let pressTimer;
    
    // Double click
    secretBox.addEventListener('dblclick', function() {
        secretOutput.textContent = "You discovered the double-click secret! 🎊";
        this.style.backgroundColor = "#ffeb3b";
        setTimeout(() => {
            this.style.backgroundColor = "";
            secretOutput.textContent = "🤫";
        }, 2000);
    });
    
    // Long press
    secretBox.addEventListener('mousedown', function() {
        pressTimer = setTimeout(function() {
            secretOutput.textContent = "Long press secret revealed! 🕵️‍♂️";
            secretBox.style.backgroundColor = "#4caf50";
            setTimeout(() => {
                secretBox.style.backgroundColor = "";
                secretOutput.textContent = "🤫";
            }, 2000);
        }, 1000);
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });

    // Interactive Elements Section
    // Color changer button
    const colorButton = document.getElementById('color-button');
    const colorBox = document.getElementById('color-box');
    
    colorButton.addEventListener('click', function() {
        const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        colorBox.style.backgroundColor = randomColor;
        colorBox.classList.add('bounce');
        setTimeout(() => colorBox.classList.remove('bounce'), 500);
    });

    // Image gallery
    const galleryImages = document.querySelectorAll('.gallery-container img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
        currentIndex = index;
    }
    
    prevBtn.addEventListener('click', function() {
        let newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(newIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        let newIndex = (currentIndex + 1) % galleryImages.length;
        showImage(newIndex);
    });
    
    // Auto-advance gallery every 3 seconds
    setInterval(() => {
        let newIndex = (currentIndex + 1) % galleryImages.length;
        showImage(newIndex);
    }, 3000);

    // Accordion functionality
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open current one if it wasn't active
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });

    // Form Validation Section
    const userForm = document.getElementById('user-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const strengthMeter = document.querySelector('.strength-meter');
    const strengthText = document.querySelector('.strength-text');
    const formSuccess = document.getElementById('form-success');

    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);

    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameInput.classList.add('shake');
            setTimeout(() => nameInput.classList.remove('shake'), 500);
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email';
            emailInput.classList.add('shake');
            setTimeout(() => emailInput.classList.remove('shake'), 500);
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }

    function validatePassword() {
        // Password strength calculation
        let strength = 0;
        const password = passwordInput.value;
        
        if (password.length >= 8) strength += 1;
        if (password.match(/[a-z]/)) strength += 1;
        if (password.match(/[A-Z]/)) strength += 1;
        if (password.match(/[0-9]/)) strength += 1;
        if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
        
        // Update strength meter
        const width = (strength / 5) * 100;
        strengthMeter.style.width = `${width}%`;
        
        // Update strength text and color
        let color = '#e74c3c'; // red
        let text = 'Weak';
        
        if (strength > 3) {
            color = '#f39c12'; // orange
            text = 'Medium';
        }
        if (strength > 4) {
            color = '#2ecc71'; // green
            text = 'Strong';
        }
        
        strengthMeter.style.backgroundColor = color;
        strengthText.textContent = text;
        strengthText.style.color = color;
        
        if (password.length > 0 && password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            return false;
        } else {
            passwordError.textContent = '';
            return true;
        }
    }

    // Form submission
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            // In a real app, you would send the form data to a server here
            formSuccess.classList.remove('hidden');
            userForm.reset();
            strengthMeter.style.width = '0';
            strengthText.textContent = '';
            
            setTimeout(() => {
                formSuccess.classList.add('hidden');
            }, 3000);
        } else {
            // Scroll to the first error
            if (!isNameValid) {
                nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (!isEmailValid) {
                emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (!isPasswordValid) {
                passwordInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
});