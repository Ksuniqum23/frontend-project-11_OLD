import i18n from "../i18n/init";
import {Modal} from 'bootstrap';

export const updateUI = (state) => {
    const feeds = document.getElementById('ulFeeds');
    const posts = document.getElementById('ulPosts');
    feeds.innerHTML = '';
    posts.innerHTML = '';

    state.ui.rssLinksOrder.forEach(rssLink => {
        const feedTitle = document.createElement('h4');
        const feedDescription = document.createElement('p');
        feedTitle.textContent = state.data.feeds[rssLink].title;
        feedDescription.textContent = state.data.feeds[rssLink].description;
        feeds.appendChild(feedTitle);
        feeds.appendChild(feedDescription);

        state.ui.postsOrder[rssLink].forEach(postItemLink => {
            const postData = state.data.posts[postItemLink];
            const postItem = document.createElement('li');
            postItem.classList.add('list-group-item', 'd-flex', 'justify-content-between');

            const postLink = document.createElement('a');
            postLink.href = postData.link;
            postLink.textContent = postData.title;
            postLink.target = '_blank'; // Открывать в новой вкладке
            postLink.classList.add('text-decoration-none'); // Убираем подчёркивание (опционально)

            const postButton = document.createElement('button');
            postButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
            postButton.setAttribute('data-post-link', postData.link);
            postButton.textContent = 'Просмотр';

            // if (state.ui.readPosts.includes(postData.link)) {
            //     postLink.classList.add('text-muted');
            //     postButton.classList.add('disabled');
            // }

            postItem.appendChild(postLink); // Добавляем ссылку вместо заголовка
            postItem.appendChild(postButton);
            posts.appendChild(postItem);
        })
    });
}

export const updateFeedback = (type, message) => {
    const feedback = document.querySelector('.feedback');
    feedback.textContent = i18n.t(message);
    feedback.classList.remove('text-success', 'text-danger');
    feedback.classList.add(`text-${type}`);
}

export const modalPreviewPost = (post) => {
    const modalElement = document.getElementById('modalPreviewPost');
    if (!modalElement || !post) {
        return;
    }

    const modal = new Modal(modalElement); // Явное обращение к глобальному объекту

    modalElement.querySelector('#modal-title').textContent = post.title;
    modalElement.querySelector('#modal-description').textContent = post.description;

    const readMoreBtn = modalElement.querySelector('#btn-read-more');
    if (readMoreBtn) readMoreBtn.href = post.link;

    modal.show();
};

// setTimeout(() => {
//     const modalElement = document.getElementById('modalPreviewPost');
//     const modal = new Modal(modalElement); // Явное обращение к глобальному объекту
//
//     modalElement.querySelector('#modal-title').textContent = '123';
//     modalElement.querySelector('#modal-description').textContent = 'qweqwewqewqe';
//
//     modal.show();
// }, 2000);