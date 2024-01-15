let userSelectedDate = undefined;
const startButton = document.querySelector('[data-start]');

//ініціалізація flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      startButton.disabled = true;
    //   window.alert('Please choose a date in the future');
    iziToast.show({
        title: 'Hey',
        message: 'What would you like to add?'
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


document.addEventListener('DOMContentLoaded', function () {
  //запуск flatpickr
  flatpickr('#datetime-picker', options);

  // Обробка кнопки Start
  startButton.disabled = true;

  startButton.addEventListener('click', function () {
    console.log(userSelectedDate);
  });
});
