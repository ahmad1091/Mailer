const email = document.getElementById('email');
const message = document.getElementById('message');
const sendButton = document.getElementById('button');

sendButton.addEventListener('click', () => {
  const data = { message: message.value, email: email.value };
  request(data, 'POST', '/mailer', (error, response) => {
    if (error) {
      console.log('ERROR:', error);
    }
    const { msg } = JSON.parse(response);
    alert(msg);
  });
});
