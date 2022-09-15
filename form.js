import { API_KEY, SEND_EMAIL, RECEIVE_EMAIL } from "./config.js";

const textInput = document.getElementById("form-text");
const nameInput = document.getElementById("form-name");
const emailInput = document.getElementById("form-email")
const submitButton = document.querySelector('button[type="submit"]');

submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (textInput.textContent.trim() === "" || nameInput.textContent.trim() === "" || emailInput.textContent.trim() === "") {
        console.log("hello")
        return;
    }

    submitButton.textContent = "Sending ...";

    const emailBody = `Name: ${nameInput.value}<br/>Email: ${emailInput.value}<br/>Message: ${textInput.value}`;

    var myHeaders = new Headers();
    myHeaders.append("api-key", `${API_KEY}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "sender": {
        "name": "Amys Wish with Wings",
        "email": SEND_EMAIL
    },
    "to": [
        {
        "email": RECEIVE_EMAIL,
        "name": "Rory James"
        }
    ],
    "subject": "New Contact Form Submission",
    "htmlContent": `<html><head></head><body><p>${emailBody}<p></body></html>`,
    "headers": {
        "X-Mailin-custom": "custom_header_1:custom_value_1|custom_header_2:custom_value_2|custom_header_3:custom_value_3",
        "charset": "iso-8859-1"
    }
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://api.sendinblue.com/v3/smtp/email", requestOptions)
    .then(response => response.text())
    .then(result => {
        console.log(result);
        submitButton.style.backgroundColor = "green";
        submitButton.textContent = "Sent✔️";
    })
    .catch(error => {
        console.log('error', error);
        submitButton.style.backgroundColor = "red";
        submitButton.textContent = "Failed❌";
    });
});