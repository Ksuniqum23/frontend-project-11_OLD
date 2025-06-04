import i18n from "../i18n/init";
import {Modal} from 'bootstrap';

export const updateUI = (state) => {
    const feeds = document.getElementById('ulFeeds');
    const posts = document.getElementById('ulPosts');
    feeds.innerHTML = '';
    posts.innerHTML = '';

    state.links.forEach(link => {
        const feedTitle = document.createElement('h4');
        const feedDescription = document.createElement('p');
        feedTitle.textContent = state.data[link].feed.title;
        feedDescription.textContent = state.data[link].feed.description;
        feeds.appendChild(feedTitle);

        state.data[link].posts.forEach(post => {
            const postList = document.createElement('li');
            postList.classList.add('list-group-item', 'd-flex', 'justify-content-between');

            const postLink = document.createElement('a');
            postLink.href = post.link;
            postLink.textContent = post.title;
            postLink.target = '_blank'; // Открывать в новой вкладке
            postLink.classList.add('text-decoration-none'); // Убираем подчёркивание (опционально)

            const postButton = document.createElement('button');
            postButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
            postButton.setAttribute('data-post-link', post.link);
            postButton.textContent = 'Просмотр';

            if (state.readPosts.includes(post.link)) {
                postLink.classList.add('text-muted');
                postButton.classList.add('disabled');
            }

            postList.appendChild(postLink); // Добавляем ссылку вместо заголовка
            postList.appendChild(postButton);
            posts.appendChild(postList);
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