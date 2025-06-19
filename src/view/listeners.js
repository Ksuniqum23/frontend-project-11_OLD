import {previewBtnHandler, submitHandler} from "../controller/handlers";
import state from "../state/state";

export const initListeners = () => {
    //Add RSS Button:
    const form = document.getElementById('rss-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('кнопка нажата!');
        const rssInput = document.getElementById('rss-input');
        const rssValue = rssInput.value;
        submitHandler(rssValue);
    });

    //Preview post Buttons:
    const postList = document.getElementById('ulPosts');
    postList.addEventListener('click', (event) => {
        console.log('кнопка просмотр!!!');
        const buttonPostPreview = event.target.closest('button');
        if (!buttonPostPreview) return;
        const postLink = buttonPostPreview.dataset.postLink;
        console.log('state in listener:', state);
        const currentPost = state.data[postLink];
        console.log(postLink, currentPost);
        previewBtnHandler(currentPost);
    });
}












// const feedback = document.querySelector('.feedback');
// const feeds = document.getElementById('ulFeeds');
// const posts = document.getElementById('ulPosts');


//
// validateURL
//     .validate({url: rssValue}, { context: {feeds: state.feeds} })
//     .then(() => fetchRSS(rssValue))
//     .then((xmlString) => {
//         const xmlDoc = parseXML(xmlString);
//         validateRss_old(xmlDoc);
//
//
//
//
//         //даем фидбек, что всё успешно
//         feedback.textContent = i18n.t('success.addRSS');
//         feedback.classList.remove('text-danger');
//         feedback.classList.add('text-success');
//
//         state.feeds.push(rssValue);
//
//         //add FEEDS view
//         const channelTitle = xmlDoc.querySelector('channel > title')?.textContent || 'Без заголовка';
//         const channelDescription = xmlDoc.querySelector('channel > description')?.textContent || 'Без описания';
//         const feedTitle = document.createElement('h4');
//         feedTitle.textContent = channelTitle;  // Заголовок фида
//         feeds.appendChild(feedTitle);
//
//         const feedDescription = document.createElement('p');
//         feedDescription.textContent = channelDescription;  // Описание фида
//         feeds.appendChild(feedDescription);
//
//         //add POSTS view
//         items.forEach(item => {
//             const title = item.querySelector('title')?.textContent || 'Нет заголовка';
//             const description = item.querySelector('description').textContent || 'Нет описания';
//
//             const postLi = document.createElement('li');
//             postLi.classList.add('list-group-item');
//             postLi.innerHTML = `<h4>${title}</h4><p>${description}</p>`;
//             posts.appendChild(postLi);
//         })
//     })
//     .catch(error => {
//         feedback.textContent = i18n.t(`${error.message}`);  // Получаем локализованное сообщение ошибки
//         feedback.classList.remove('text-success');  // Убираем класс успеха
//         feedback.classList.add('text-danger');  // Добавляем класс ошибки
//     });