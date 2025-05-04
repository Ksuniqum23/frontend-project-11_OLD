import validateRss from "./validateRss";
import {state} from "./index";
import i18n from './i18next.js';

const form = document.getElementById('rss-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const rssInput = document.getElementById('rss-input');
    const rssValue = rssInput.value;
    const feedback = document.querySelector('.feedback');
    const feeds = document.getElementById('ulFeeds')

    validateRss
        .validate({url: rssValue}, { context: {feeds: state.feeds} })
        .then(result => {
            feedback.textContent = i18n.t('success.addRSS');
            feedback.classList.remove('text-danger');
            feedback.classList.add('text-success');
            state.feeds.push(rssValue);
            const li = document.createElement('li');
            li.classList.add('rss-list-item');
            li.textContent = rssValue;
            feeds.appendChild(li);
        })
        .catch(error => {
            feedback.textContent = i18n.t(`${error.message}`);  // Получаем локализованное сообщение ошибки
            feedback.classList.remove('text-success');  // Убираем класс успеха
            feedback.classList.add('text-danger');  // Добавляем класс ошибки
        });
});

// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const rssInput = document.getElementById('rss-input');
//     const rssValue = rssInput.value;
//     const ulFeeds = document.getElementById('ulFeeds');
//
//     if (state.feeds.includes(rssValue)) {
//         errorFeedback();
//     } else {
//         state.feeds.push(rssValue);
//         validateRss.validate({url: rssValue})
//             .then(result => {
//                 successFeedback();
//                 const li = document.createElement('li');
//                 li.classList.add('list-group-item');
//                 li.textContent = rssValue;
//                 ulFeeds.appendChild(li);
//             })
//             .catch(error => {
//                 console.log(error.errors);
//                 errorFeedback(error.errors.join('\n'));
//             });
//     }
// });


// const successFeedback = () => {
//     const rssInput = document.getElementById('rss-input');
//
//
//     rssInput.style.borderColor = '';
//     feedback.textContent = i18n.t('success.addRSS');
//     feedback.classList.remove('text-danger');
//     feedback.classList.add('text-success');
// }
//
// const errorFeedback = () => {
//     const rssInput = document.getElementById('rss-input');
//     const feedback = document.querySelector('.feedback');
//     rssInput.style.borderColor = 'red';
//     feedback.textContent = i18n.t('errors.addRSS');
//     feedback.classList.remove('text-success');
//     feedback.classList.add('text-danger');
// }