const form = document.querySelector('.form');
let calendar;

class Event {
  static id = JSON.parse(localStorage.getItem("IDtracker") ) || 0;
  static eventArr = JSON.parse(localStorage.getItem(Event.id)) || [];

  constructor(title, start, end){
      this.title = title;
      this.start = start;
      this.end = end;
      
      Event.eventArr.push(this);
      
    };

  toFullCalEvent(){
    return {
      title: this.title,
      start: this.start,
      end: this.end
    };
  }

  static saveOnahs(){
    Event.id++;
    localStorage.setItem("IDtracker", JSON.stringify(Event.id));
    localStorage.setItem(Event.id, JSON.stringify(Event.eventArr))
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

const periodStart = (machzorDate, onahEnd) => {
  let dateObj = new Date(machzorDate);
  let periodDate = dateObj.toISOString().split('T')[0];

  calendar.addEvent({
    title: 'Period Start',
    start: periodDate,
    end: onahEnd,
  });

  let newPeriodDate = new Event('Period Start', periodDate, onahEnd );
}

const haflagah = (machzorDate, onahStart, onahEnd) => {
  const periods = Event.eventArr.filter(event => event.title === "Period Start");

  periods.sort((a,b) => new Date(a.start) - new Date(b.start));

  if (periods.length < 2){
    alert('Haflagah cannot be calculate until there are two periods');
    return;
  }

  const lastPeriod = new Date(periods[periods.length - 2].start);
  const newPeriod = new Date(machzorDate);

  const diffInMS = newPeriod - lastPeriod;
  const diffInDays = diffInMS / (1000 * 60 * 60 * 24);

  console.log(lastPeriod);
  console.log(newPeriod);
  console.log(diffInDays);
  
  let dateObj = new Date(machzorDate);
  dateObj.setDate(dateObj.getDate() + diffInDays);
  let haflagah = dateObj.toISOString().split('T')[0];

  calendar.addEvent({
      title: 'Haflagah',
      start: haflagah + onahStart,
      end: haflagah + onahEnd,
  });

  let newHaflagah = new Event('Haflagah', haflagah + onahStart, haflagah + onahEnd );
  
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

  let newAverageOnah = new Event('Average Onah', averageOnah + onahStart, averageOnah + onahEnd );

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

  let newDayOnah = new Event('Day Onah', dayOnah + onahStart, dayOnah + onahEnd ) 
}



document.addEventListener('DOMContentLoaded', () =>{
  createCalendar();

  for (let event of Event.eventArr){
    calendar.addEvent(event);
  }

});

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
    
    periodStart(machzorDate, onahEnd);
    averageOnah(machzorDate, onahStart, onahEnd);
    dayOnah(machzorDate, onahStart, onahEnd);
    haflagah(machzorDate, onahStart, onahEnd);
  }
});

const saveBtn = document.querySelector('#save');

saveBtn.addEventListener('click', () => {
  Event.saveOnahs();
});