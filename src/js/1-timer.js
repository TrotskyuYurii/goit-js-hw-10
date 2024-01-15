let userSelectedDate = undefined;
const startButton = document.querySelector('[data-start]');
const inputArea = document.querySelector('#datetime-picker');

const timerDay = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');


//ініціалізація flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      startButton.disabled = true;
    iziToast.error({
        // title: 'Hey',
        message: 'Please choose a date in the future',
        position: 'topRight',
        color: 'red',
    });
      return;
    } else {
      startButton.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};

//Функция для подсчета времени
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

// Функція для підрахунку часу та оновлення таймера
function updateTimer() {
    const currentTime = new Date().getTime();
    const timeDifference = userSelectedDate.getTime() - currentTime;
  
    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      inputArea.value = "00:00:00:00";
      startButton.disabled = false;
      return;
      
    }
    
    startButton.disabled = true;
    
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
  
    timerDay.textContent = addLeadingZero(days);
    timerHours.textContent = addLeadingZero(hours);
    timerMinutes.textContent = addLeadingZero(minutes);
    timerSeconds.textContent = addLeadingZero(seconds);
  }
  
  // Функція для додавання ведучого нуля
  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }




document.addEventListener('DOMContentLoaded', function () {
  //запуск flatpickr
  flatpickr('#datetime-picker', options);

  // Обробка кнопки Start
  startButton.disabled = true;

  startButton.addEventListener('click', function () { 
        if (userSelectedDate) {
            updateTimer();
            timerInterval = setInterval(updateTimer, 1000);
          }
  });
});
