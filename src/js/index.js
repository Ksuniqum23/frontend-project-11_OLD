import '../css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // стили Bootstrap

function helloWorld() {
    const element = document.createElement('div');
    element.className = 'hello';
    element.textContent = 'Hello, Webpack!';
    document.body.appendChild(element);
}

helloWorld();