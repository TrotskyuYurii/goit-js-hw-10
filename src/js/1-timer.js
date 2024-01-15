let userSelectedDate = undefined;
const startButton = document.querySelector('[data-start]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      window.alert('Please choose a date in the future');
      return;
    } else {
      startButton.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};

document.addEventListener('DOMContentLoaded', function () {
  //запуск flatpickr
  flatpickr('#datetime-picker', options);

  // Обробка кнопки Start
  startButton.disabled = true;

  startButton.addEventListener('click', function () {
    console.log(userSelectedDate);
  });
});
