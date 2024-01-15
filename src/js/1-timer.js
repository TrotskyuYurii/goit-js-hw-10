let userSelectedDate = undefined;
const startButton = document.querySelector('[data-start]');
const timerDisplay = document.querySelector('.timer .value');


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
      timerDisplay.textContent = '00:00:00:00';
      clearInterval(timerInterval);
      return;
    }
  
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
  
    // Форматування та вивід значень у форматі xx:xx:xx:xx
    const formattedTime = `${addLeadingZero(days)}:${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
    timerDisplay.textContent = formattedTime;
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
