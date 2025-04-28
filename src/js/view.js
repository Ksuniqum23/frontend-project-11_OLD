import validateRss from "./validateRss";
import {state} from "./index";

const successFeedback = (text) => {
    const rssInput = document.getElementById('rss-input');
    const feedback = document.querySelector('.feedback');

    rssInput.style.borderColor = '';
    feedback.textContent = text;
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
}

const errorFeedback = (text) => {
    const rssInput = document.getElementById('rss-input');
    const feedback = document.querySelector('.feedback');
    rssInput.style.borderColor = 'red';
    feedback.textContent = text;
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');

}

const form = document.getElementById('rss-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const rssInput = document.getElementById('rss-input');
    const rssValue = rssInput.value;
    const ulFeeds = document.getElementById('ulFeeds');

    if (state.feeds.includes(rssValue)) {
        errorFeedback('Этот RSS уже добавлен');
    } else {
        state.feeds.push(rssValue);
        validateRss.validate({url: rssValue})
            .then(result => {
                successFeedback('RSS успешно добавлен');
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.textContent = rssValue;
                ulFeeds.appendChild(li);
            })
            .catch(error => {
                console.log(error.errors);
                errorFeedback(error.errors.join('\n'));
            });
    }
});