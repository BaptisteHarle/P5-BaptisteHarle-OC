const NetworkInterface = {
  get: (url) => {
    return new Promise((fnResolve, fnReject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            fnResolve(JSON.parse(xhr.responseText));
          } else {
            fnReject(xhr.statusText);
          }
        }
      };
      xhr.open('GET', url);
      xhr.send();
    });
  },
  post: (url, data) => {
    return new Promise((fnResolve, fnReject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || xhr.status === 201) {
            fnResolve(JSON.parse(xhr.responseText));
          } else {
            fnReject(xhr.statusText);
          }
        }
      };
      xhr.open("POST", url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(data));
    })
  }
};