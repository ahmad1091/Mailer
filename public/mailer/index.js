const email = document.getElementById('email');
const message = document.getElementById('message');
const sendButton = document.getElementById('button');
const attachment = document.getElementById('attachment');
const company = document.getElementById('company');
const name = document.getElementById('name');
const phone = document.getElementById('phone');

sendButton.addEventListener('click', () => {
  const formData = new FormData();
  const file = attachment.files[0];
  console.log('attachment.files[0]...', file);
  formData.append('file', attachment.files[0]);
  console.log('formData....', formData);
  const data = {
    message: message.value, email: email.value, company: company.value, name: name.value, phone: phone.value, attachment: formData,
  };
  request(data, 'POST', '/mailer', (error, response) => {
    if (error) {
      console.log('ERROR:', error);
    }
    const { msg } = JSON.parse(response);
    alert(msg);
  });
});
