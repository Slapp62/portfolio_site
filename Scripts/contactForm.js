emailjs.init("a6IxywqmqlHjFDfxD");

const contactForm = document.getElementById('contact_form');

let regex = {
    fullname: /^[a-zA-Z]+ [a-zA-Z]+$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^\+?\(?\d{1,4}\)?\d{3}\d{3}\d{4}$/,
    message: /^.{10,500}$/ 
}

let valid = {
    fullname: false,
    email: false,
    phone: false,
    message: false
}

contactForm.addEventListener('input', (e) => {
    let formData = {
        fullname: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message:  document.getElementById('message').value,
    }

    if (formData[e.target.id] === ''){
        document.querySelector(`#${e.target.id}Tooltip`).classList.remove('error');
        document.querySelector(`#${e.target.id}Tooltip`).classList.remove('success');
        valid[e.target.id] = false;
    } else{
        if (regex[e.target.id].test(formData[e.target.id])){
            console.log(`${e.target.id} validation success`);
            document.querySelector(`#${e.target.id}Tooltip`).classList.remove('error');
            document.querySelector(`#${e.target.id}Tooltip`).classList.add('success');
            valid[e.target.id] = true;
        } else {
            document.querySelector(`#${e.target.id}Tooltip`).classList.remove('success');
            document.querySelector(`#${e.target.id}Tooltip`).classList.add('error');
            valid[e.target.id] = false;
        }
    }
});

contactForm.addEventListener("submit", function(e) {
    console.log(valid);
    e.preventDefault();
    if (valid["fullname"] === true && valid["email"] === true && valid["message"] === true){
        emailjs.sendForm("service_n1e2i8m", "template_cxmt4ie", this, "a6IxywqmqlHjFDfxD")
            .then(response => {
                alert("Message sent successfully!");
                document.querySelectorAll('.Tooltip').forEach((tooltip)=>{
                    tooltip.classList.remove('success');
                    tooltip.classList.remove('error');
                })
                this.reset();
            })
            .catch(error => {
                alert("Failed to send message. Try again!");
            });
        return
    } else{
        alert('Please enter the required fields correctly.')
    }
});
