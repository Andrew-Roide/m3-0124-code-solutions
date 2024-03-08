const myRequest = 'https://jsonplaceholder.typicode.com/users';

async function getUsers() {
  fetch(myRequest)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

getUsers();
