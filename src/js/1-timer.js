import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
let timerInterval;
const startButton = document.querySelector('[data-start]');
const inputArea = document.querySelector('#datetime-picker');

const timerDay = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

// Додання події на кнопку Start
startButton.addEventListener('click', function () {
  if (userSelectedDate) {
    timerInterval = setInterval(updateTimer, 1000);
  }
});

//ініціалізація flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: handleDateSelection, 
};

//Функция для форматування часу
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
    timerDay.textContent = '00';
    timerHours.textContent = '00';
    timerMinutes.textContent = '00';
    timerSeconds.textContent = '00';
    startButton.disabled = false;
    return;
  } else {
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    timerDay.textContent = addLeadingZero(days);
    timerHours.textContent = addLeadingZero(hours);
    timerMinutes.textContent = addLeadingZero(minutes);
    timerSeconds.textContent = addLeadingZero(seconds);
    startButton.disabled = true;
  }



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
});



function handleDateSelection(selectedDates) {
  if (selectedDates[0] <= new Date()) {
    startButton.disabled = true;
    iziToast.error({
      message: 'Please choose a date in the future',
      position: 'topRight',
      backgroundColor: 'red',
    });
  } else {
    startButton.disabled = false;
    clearInterval(timerInterval);
    userSelectedDate = selectedDates[0];
    // updateTimer();
  }
}
