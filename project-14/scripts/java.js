
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
}

// Get all the necessary DOM elements
const form = document.getElementById('exampleForm');
const submitButton = document.querySelector('.submit');
const successMessage = document.getElementById('form-submitted-msg');

// Store all form elements in an array by spreading the elements property of the form
const formElements = [...form.elements];

// Create function to check if all form elements are valid
const allInputsValid = () => {
    const valid = formElements.every((element) => {
        if (element.nodeName === 'SELECT') {
            return element.value !== 'Please select an option';
        } else {
            return element.checkValidity();
        }
    });

    return valid;
};

// Create function to handle the change event on a form element,
// enabling/disabling the submit button based on form validity
const handleChange = () => {
    submitButton.disabled = !allInputsValid();
};

// Create function to handle the submit event on the form
const handleSubmit = (e) => {
    e.preventDefault();

    formElements.forEach((element) => {
        const isRadioOrCheckbox = element.type === 'checkbox' || element.type === 'radio';

        if (!element.checkValidity() && !isRadioOrCheckbox) {
            element.style.borderColor = 'red';
            element.nextElementSibling.style.color = 'red';
            element.nextElementSibling.style.display = 'block';
            element.previousElementSibling.style.color = 'red';
        } else {
            element.style.borderColor = isRadioOrCheckbox ? '#CED4DA' : '#212529';
            element.nextElementSibling.style.color = '#CED4DA';
            element.nextElementSibling.style.display = 'none';
            element.previousElementSibling.style.color = '#212529';
        }

        if (element.nodeName === 'SELECT' && element.value === 'Please select an option') {
            element.style.borderColor = 'red';
            element.nextElementSibling.style.color = 'red';
            element.nextElementSibling.style.display = 'block';
            element.previousElementSibling.style.color = 'red';
        } else {
            element.style.borderColor = element.nodeName === 'SELECT' ? '#CED4DA' : '#212529';
            element.nextElementSibling.style.color = '#CED4DA';
            element.nextElementSibling.style.display = 'none';
            element.previousElementSibling.style.color = '#212529';
        }
    });

    if (allInputsValid()) {
        successMessage.style.display = 'block';
        form.reset();
        submitButton.disabled = true;
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
};

// Add event listener to each form element
formElements.forEach((element) => {
    element.addEventListener('change', handleChange);
});

// Add submit listener to the form
form.addEventListener('submit', (e) => handleSubmit(e));

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  storageBucket: '[gs://project-11-4a147.appspot.com]'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = firebase.storage();
