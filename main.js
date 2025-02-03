document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    emailjs.sendForm("service_n1e2i8m", "template_cxmt4ie", this, "a6IxywqmqlHjFDfxD")
        .then(response => {
            alert("Message sent successfully!");
        })
        .catch(error => {
            alert("Failed to send message. Try again!");
        });
});
