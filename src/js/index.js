import '../css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // стили Bootstrap

function helloWorld() {
    document.getElementById('app').innerHTML = '<h1>йцуйцуйцу</h1>';
    const element = document.createElement('div');
    element.className = 'hello';
    element.textContent = 'Hello, Webpack!';
    document.body.appendChild(element);
    console.log('Hello from Webpack!');
}

helloWorld();