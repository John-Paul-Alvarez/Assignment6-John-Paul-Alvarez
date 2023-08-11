/*********************************************************************************
*  BTI225 – Assignment 6 
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: ____John Paul Alvarez_____ Student ID: __187724216____ Date: ___08/11/2023_______
*
*********************************************************************************/
function formValidation() {
    clearErrors();
    var NamesValid = validateName("firstName");
    NamesValid = validateName("lastName");
    var postalCodeValid = validatePostalCode();
    var phoneValid = validatePhone();

    return NamesValid && postalCodeValid && phoneValid;
}

function validateName(fieldName) {
    var errors = document.querySelector("#namesError");
    var elem = document.getElementById(fieldName);
    var inputValue = elem.value.trim();

    if (inputValue.length === 0) {
        errors.innerHTML += "<p>" + fieldName + ": No input or white space(s) only! Please enter a meaningful name with alphabet letters.</p>";
        return false;
    }

    if (inputValue.length < 5) {
        errors.innerHTML += "<p>" + fieldName + " must be more than 5 character </p>";
        return false;
    }

    inputValue = inputValue.toLowerCase();
    for (var i = 0; i < inputValue.length; i++) {
        var char = inputValue.charAt(i);
        if (!(char >= "a" && char <= "z") && char !== "." && char !== " ") {
            errors.innerHTML += "<p>" + fieldName + ": Please enter a meaningful name with alphabet letters, dots, and spaces.</p>";
            elem.focus();
            return false;
        }
    }
    return true;
}

function validatePostalCode() {
    var errors = document.querySelector("#zipCodeError");
    var countrySelect = document.getElementById("country");
    var postalCodeInput = document.getElementById("zipCode");

    var selectedCountry = countrySelect.value;
    var postalCodeValue = postalCodeInput.value.trim();

    if (selectedCountry === "CA") {

        var postalCodePattern = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
        if (!postalCodePattern.test(postalCodeValue)) {
            errors.innerHTML = "<p>ZIP/Postal Code: Please enter a valid Canadian postal code (e.g., A1A 1A1).</p>";
            postalCodeInput.focus();
            return false;
        }
    }

    return true;
}

function validatePhone() {
    var errors = document.querySelector("#phoneError");
    var phoneInput = document.getElementById("phone");
    var phoneValue = phoneInput.value.trim();
    var phonePattern = /^\d{3}-[0-9]{3}-\d{4}$/;
    if (!phonePattern.test(phoneValue)) {
        errors.innerHTML = "<p>Phone: Please enter a valid phone number in the format (999) 999-9999.</p>";
        phoneInput.focus();
        return false;
    }
    return true;
}

function clearErrors() {
    document.querySelector("#namesError").innerHTML = "";
}
