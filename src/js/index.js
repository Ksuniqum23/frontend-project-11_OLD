import '../css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // стили Bootstrap
import './view';

function helloWorld() {
    const ul = document.getElementById('result');
    const newLi = document.createElement('li');
    newLi.className = 'list-group-item';
    newLi.textContent = 'Hello, Webpack!';
    ul.appendChild(newLi);
    console.log('Hello from Webpack!');
}

helloWorld();