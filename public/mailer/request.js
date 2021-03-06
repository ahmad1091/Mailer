
function request(data, method, url, cb) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(null, xhr.responseText);
      } else {
        const errorMessage = xhr.responseText;
        cb(`Error ${url} ${errorMessage}`);
      }
    }
  };
  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));
}
