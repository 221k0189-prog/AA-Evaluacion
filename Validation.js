document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar el formulario y todos los campos
    const form = document.querySelector('.contact-form');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const queryTypeInputs = document.querySelectorAll('input[name="queryType"]');
    const message = document.getElementById('message');
    const consent = document.querySelector('input[name="consent"]');

    // ========== FUNCIONES AUXILIARES ==========
    
    // Función para mostrar mensaje de error
    function showError(input) {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        // Agregar clase de error al input
        input.classList.add('error');
        
        // Mostrar mensaje de error
        if (errorMessage) {
            errorMessage.classList.add('show');
        }
    }

    // Función para ocultar mensaje de error
    function hideError(input) {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        // Quitar clase de error del input
        input.classList.remove('error');
        
        // Ocultar mensaje de error
        if (errorMessage) {
            errorMessage.classList.remove('show');
        }
    }

    // Función para validar formato de email
    function isValidEmail(emailValue) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailValue);
    }

    // ========== VALIDACIÓN EN TIEMPO REAL - FIRST NAME ==========
    
    // Validar cuando el usuario sale del campo (blur)
    firstName.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError(this);
        } else {
            hideError(this);
        }
    });

    // Validar mientras el usuario escribe (input)
    firstName.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            hideError(this);
        }
    });

    // ========== VALIDACIÓN EN TIEMPO REAL - LAST NAME ==========
    
    lastName.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError(this);
        } else {
            hideError(this);
        }
    });

    lastName.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            hideError(this);
        }
    });

    // ========== VALIDACIÓN EN TIEMPO REAL - EMAIL ==========
    
    email.addEventListener('blur', function() {
        const emailValue = this.value.trim();
        
        if (emailValue === '' || !isValidEmail(emailValue)) {
            showError(this);
        } else {
            hideError(this);
        }
    });

    email.addEventListener('input', function() {
        const emailValue = this.value.trim();
        
        if (emailValue !== '' && isValidEmail(emailValue)) {
            hideError(this);
        }
    });

    // ========== VALIDACIÓN EN TIEMPO REAL - QUERY TYPE (RADIO BUTTONS) ==========
    
    queryTypeInputs.forEach(function(input) {
        input.addEventListener('change', function() {
            // Buscar el form-group padre
            const formGroup = this.closest('.form-group');
            const errorMessage = formGroup.querySelector('.error-message');
            
            // Si algún radio está seleccionado, ocultar el error
            if (errorMessage) {
                errorMessage.classList.remove('show');
            }
        });
    });

    // ========== VALIDACIÓN EN TIEMPO REAL - MESSAGE ==========
    
    message.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError(this);
        } else {
            hideError(this);
        }
    });

    message.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            hideError(this);
        }
    });

    // ========== VALIDACIÓN EN TIEMPO REAL - CONSENT (CHECKBOX) ==========
    
    consent.addEventListener('change', function() {
        const formGroup = this.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        if (this.checked && errorMessage) {
            errorMessage.classList.remove('show');
        }
    });

    // ========== VALIDACIÓN AL ENVIAR EL FORMULARIO ==========
    
    form.addEventListener('submit', function(e) {
        // Prevenir el envío por defecto
        e.preventDefault();
        
        // Variable para rastrear si el formulario es válido
        let isValid = true;
        
        // ===== Validar First Name =====
        if (firstName.value.trim() === '') {
            showError(firstName);
            isValid = false;
        }
        
        // ===== Validar Last Name =====
        if (lastName.value.trim() === '') {
            showError(lastName);
            isValid = false;
        }
        
        // ===== Validar Email =====
        const emailValue = email.value.trim();
        if (emailValue === '' || !isValidEmail(emailValue)) {
            showError(email);
            isValid = false;
        }
        
        // ===== Validar Query Type (Radio Buttons) =====
        const queryTypeChecked = Array.from(queryTypeInputs).some(function(input) {
            return input.checked;
        });
        
        if (!queryTypeChecked) {
            // Encontrar el contenedor del grupo de radios
            const queryTypeGroup = queryTypeInputs[0].closest('.form-group');
            const errorMessage = queryTypeGroup.querySelector('.error-message');
            
            if (errorMessage) {
                errorMessage.classList.add('show');
            }
            isValid = false;
        }
        
        // ===== Validar Message =====
        if (message.value.trim() === '') {
            showError(message);
            isValid = false;
        }
        
        // ===== Validar Consent Checkbox =====
        if (!consent.checked) {
            const consentGroup = consent.closest('.form-group');
            const errorMessage = consentGroup.querySelector('.error-message');
            
            if (errorMessage) {
                errorMessage.classList.add('show');
            }
            isValid = false;
        }
        
        // ===== Si todo es válido, enviar el formulario =====
        if (isValid) {
            console.log('Formulario válido - Enviando...');
            // Enviar el formulario
            this.submit();
        } else {
            console.log('Formulario inválido - Por favor corrige los errores');
            
            // Hacer scroll al primer campo con error
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                // Dar foco al primer campo con error
                firstError.focus();
            }
        }
    });
    
    // ========== MENSAJE DE CONSOLA PARA DEBUGGING ==========
    console.log('Sistema de validación cargado correctamente ✓');
});