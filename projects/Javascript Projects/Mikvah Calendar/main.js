const form = document.querySelector('.form');
let calendar;

class Event {
  static eventObj = {};
  static id = 0;

  constructor(title, start, end){
      this.id = id++;
      this.title = title;
      this.start = start;
      this.end = end;

      Event.eventObj[this.id] = this;
      localStorage.setItem('events', this)
    };
  
  toFullCalEvent(){
    return {
      title: this.title,
      start: this.start,
      end: this.end
    };
  }
}

const createCalendar = () =>{
  let calendarEl = document.getElementById('calendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    selectable: true,
    editable: true,
    // dayCellDidMount: async function(info) {
    //   const gregorianDate = info.date.toISOString().split('T')[0]; // Format YYYY-MM-DD

    //   // Fetch Hebrew date from Hebcal API
    //   let response = await fetch(`https://www.hebcal.com/converter?cfg=json&gy=${gregorianDate.split('-')[0]}&gm=${gregorianDate.split('-')[1]}&gd=${gregorianDate.split('-')[2]}&g2h=1`);
    //   let data = await response.json();

    //   // Extract Hebrew day, month, and year in English
    //   let hebrewDay = data.hd;  // Hebrew day number
    //   let hebrewMonth = data.hm; // Hebrew month in English
    //   let hebrewYear = data.hy;  // Hebrew year

    //   // Format the Hebrew date in English
    //   let hebrewDateEnglish = `${hebrewDay} ${hebrewMonth} ${hebrewYear}`;
    //   // Get Hebrew date and insert it into the calendar
    //   let hebrewDate = data.hebrew;
    //   let hebrewDateDiv = document.createElement('div');
    //   hebrewDateDiv.style.fontSize = '14px';
    //   hebrewDateDiv.style.color = 'black';
    //   hebrewDateDiv.style.textAlign = 'start';
    //   hebrewDateDiv.style.padding = '5px'
    //   hebrewDateDiv.innerText = hebrewDateEnglish;

    //   info.el.appendChild(hebrewDateDiv);
    // },
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
