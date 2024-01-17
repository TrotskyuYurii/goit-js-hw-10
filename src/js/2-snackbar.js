const createNotification = document.querySelector('button[type="submit"]');

createNotification.addEventListener('click', function (event) {
  event.preventDefault();
  //   console.log('click');
  const delayInput = document.querySelector('input[name="delay"]');
  const stateInput = document.querySelector('input[name="state"]:checked');

  if (!delayInput || !stateInput || delayInput.value.trim() === '') {

    iziToast.error({
        message: 'No selected state or delay',
        position: 'topRight',
        color: 'red',
      });
    return;
  }

  const delay = parseInt(delayInput.value);

  const notificationPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result =
        stateInput.value === 'fulfilled' ? 'fulfilled' : 'rejected';
      result === 'fulfilled'
        ? resolve(delay)
        : reject(delay);
    }, delay);
  });

  notificationPromise
    .then(delay => {
        iziToast.error({
            message: `Fulfilled promise in ${delay} ms`,
            position: 'topRight',
            color: 'green',
          });
    })
    .catch(error => {
        iziToast.error({
            message: `Reject promise in ${error} ms`,
            position: 'topRight',
            color: 'red',
          });
    });


});
