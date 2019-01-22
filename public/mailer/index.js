const email = document.getElementById('email');
const message = document.getElementById('message');
const sendButton = dociment.getElementById('button');

sendButton.addEventListener('click', () => {
  request('POST', '/mailer');
});
