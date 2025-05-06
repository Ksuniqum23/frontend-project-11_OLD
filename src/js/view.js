import validateRss from "./validateRss";
import {state} from "./index";
import i18n from './i18next.js';
import fetchRSS from "./parserRss";

const form = document.getElementById('rss-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const rssInput = document.getElementById('rss-input');
    const rssValue = rssInput.value;
    const feedback = document.querySelector('.feedback');
    const feeds = document.getElementById('ulFeeds');
    const posts = document.getElementById('ulPosts');

    validateRss
        .validate({url: rssValue}, { context: {feeds: state.feeds} })
        .then(() => fetchRSS(rssValue))
        .then((xmlString) => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            //проверка на валидность XML "Не могу разобрать XML"
            const parseError = xmlDoc.querySelector('parsererror');
            if (parseError) {
                throw new Error('errors.invalidXml');
            }

            //проверка на RSS ленту
            const items = xmlDoc.querySelectorAll('item');
            if (items.length === 0) {
                throw new Error('errors.invalidRss');
            }

            //даем фидбек, что всё успешно
            feedback.textContent = i18n.t('success.addRSS');
            feedback.classList.remove('text-danger');
            feedback.classList.add('text-success');

            state.feeds.push(rssValue);

            //add FEEDS
            const channelTitle = xmlDoc.querySelector('channel > title')?.textContent || 'Без заголовка';
            const channelDescription = xmlDoc.querySelector('channel > description')?.textContent || 'Без описания';
            const feedTitle = document.createElement('h4');
            feedTitle.textContent = channelTitle;  // Заголовок фида
            feeds.appendChild(feedTitle);

            const feedDescription = document.createElement('p');
            feedDescription.textContent = channelDescription;  // Описание фида
            feeds.appendChild(feedDescription);

            //add POSTS
            items.forEach(item => {
                const title = item.querySelector('title')?.textContent || 'Нет заголовка';
                const description = item.querySelector('description').textContent || 'Нет описания';

                const postLi = document.createElement('li');
                postLi.classList.add('list-group-item');
                postLi.innerHTML = `<h4>${title}</h4><p>${description}</p>`;
                posts.appendChild(postLi);
            })
        })
        .catch(error => {
            feedback.textContent = i18n.t(`${error.message}`);  // Получаем локализованное сообщение ошибки
            feedback.classList.remove('text-success');  // Убираем класс успеха
            feedback.classList.add('text-danger');  // Добавляем класс ошибки
        });
});

