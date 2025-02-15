const htmlSection = document.getElementById('htmlProjects');
const jsSection = document.getElementById('jsProjects');

const htmlButton = document.getElementById('htmlProjectsBtn');
const jsButton = document.getElementById('jsProjectsBtn');

htmlSection.style.display = 'none';
jsSection.style.display = 'flex';

htmlButton.addEventListener('click', () =>{
    htmlSection.style.display = 'flex';
    jsSection.style.display = 'none';
})

jsButton.addEventListener('click', () =>{
    htmlSection.style.display = 'none';
    jsSection.style.display = 'flex';
})

