const form = document.querySelector('.form');
let calendar;

const createCalendar = () =>{
  let calendarEl = document.getElementById('calendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    selectable: true,
    editable: true,
  });
  calendar.render();
}

const averageOnah = (machzorDate, onahStart, onahEnd)=>{
  let dateObj = new Date(machzorDate);
  dateObj.setDate(dateObj.getDate() + 29);
  let averageOnah = dateObj.toISOString().split('T')[0];

  calendar.addEvent({
      title: 'Average Onah',
      start: averageOnah + onahStart,
      end: averageOnah + onahEnd,
  });
}

const dayOnah = (machzorDate, onahStart, onahEnd) =>{
  let dateObj = new Date(machzorDate);
  dateObj.setMonth(dateObj.getMonth() + 1);
  let dayOnah = dateObj.toISOString().split('T')[0];   
  console.log(dayOnah);
  

  calendar.addEvent({
    title: 'Day Onah',
    start: dayOnah + onahStart,
    end: dayOnah + onahEnd,
  });
}

document.addEventListener('DOMContentLoaded', () =>{
  createCalendar();
 
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const machzorDate = document.querySelector('#machzorDate').value;
    const onah = document.querySelector('#onah').value;
    const machzor = `${machzorDate} ${onah}`;
    console.log('got period: ' + machzor);

    if (!machzorDate){
      alert('please choose a date');
      return
    }

    if (machzorDate) {
      if (onah === ''){
        alert('please choose an onah');
        return
      }

      let onahStart = onah === 'onahAM' ? 'T00:00:00' : 'T12:00:00';
      let onahEnd = onah === 'onahPM' ? 'T23:59:59' :  'T12:00:00';
            
      averageOnah(machzorDate, onahStart, onahEnd);
      dayOnah(machzorDate, onahStart, onahEnd);
      
    }
  });
});
