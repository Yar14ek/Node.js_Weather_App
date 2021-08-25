'use strict';

const form = document.getElementById('form');
const input = document.getElementById('input');
const messageOne = document.getElementById('message-one');
const messageTwo = document.getElementById('message-two');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = input.value;
  messageOne.innerText = `Loading...`;

  fetch(`http://localhost:3000/weather?addres=${location}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const weather = data.weather;
      if (!weather) {
        messageOne.innerText = `${data.error}`;
        messageTwo.innerText = '';
      }
      messageOne.innerText = `City ${weather[0]}`;
      messageTwo.innerText = `have a temperature ${weather[1]} and ${weather[2]}% of rain`;
    })
    .catch((err) => {
      console.log('err :>> ', err);
    });

  input.value = '';
  input.focus();
});
