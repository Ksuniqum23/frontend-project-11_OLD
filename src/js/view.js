import validateRss from "./validateRss";

const form = document.getElementById('rss-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('что добавить? кого добавить?');
    const rssInput = document.getElementById('rss-input');
    const rssValue = rssInput.value;
    const feedback = document.querySelector('.feedback');

    validateRss.validate({url: rssValue})
        .then(result => {
            console.log('провалидировал!');
            rssInput.style.borderColor = '';
            feedback.textContent = 'RSS успешно добавлен';
            feedback.classList.remove('text-danger');
            feedback.classList.add('text-success');
        })
        .catch(error => {
            console.log(error.errors);
            rssInput.style.borderColor = 'red';
            feedback.textContent = 'ошибочка вышла';
            feedback.classList.remove('text-success');
            feedback.classList.add('text-danger');
        });
});