const form = document.querySelector('.form');

document.addEventListener('DOMContentLoaded', function() {
  let calendarEl = document.getElementById('calendar');
  let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth'
  });
 


  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const machzorDate = document.querySelector('#machzorDate').value;
    const onah = document.querySelector('#onah').value;
    const machzor = `${machzorDate} ${onah}`;
    console.log(machzor);

    if (machzorDate) {
      let onahStart = onah === 'onah1' ? 'T00:00:00' : 'T12:00:00';
      let onahEnd = onah === 'onah1' ? machzorDate + 'T12:00:00' : machzorDate + 'T23:59:59';

      let dateObj = new Date(machzorDate);
      dateObj.setDate(dateObj.getDate() + 30);
      let averageOnah = dateObj.toISOString().split('T')[0];

      calendar.addEvent({
          title: 'Average Onah',
          start: averageOnah + onahStart,
          end: averageOnah + onahEnd
      });
    }
  });

 calendar.render();
});