import throttle from 'lodash.throttle';

const form = document.querySelector(".feedback-form")
const input = document.querySelector("input")
const textarea = document.querySelector("textarea")

function saveMessage(evt) {
    evt.preventDefault();

    const formEl = {
        message: form.elements.message.value,
        email: form.elements.email.value
    }    
    localStorage.setItem("feedback-form-state", JSON.stringify(formEl));
}

const saveMessageThrottle = throttle(saveMessage, 500);
form.addEventListener("input", saveMessageThrottle);

const saveFormData = localStorage.getItem("feedback-form-state");
if (saveFormData) {
   const parseSaveFormData =  JSON.parse(saveFormData)
   input.value = parseSaveFormData.email;
   textarea.value = parseSaveFormData.message;
}

form.addEventListener("submit", submitMessage);

function submitMessage(evt) {
    evt.preventDefault();
    
    const formEl = {
        message: form.elements.message.value,
        email: form.elements.email.value
    }

    localStorage.removeItem("feedback-form-state");
    form.reset();
}