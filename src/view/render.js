import i18n from "../i18n/init";

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
            const postLi = document.createElement('li');
            postLi.classList.add('list-group-item');

            const postLink = document.createElement('a');
            postLink.href = post.link;
            postLink.textContent = post.title;
            postLink.target = '_blank'; // Открывать в новой вкладке
            postLink.classList.add('text-decoration-none'); // Убираем подчёркивание (опционально)

            const postDescription = document.createElement('p');
            postDescription.textContent = post.description;

            postLi.appendChild(postLink); // Добавляем ссылку вместо заголовка
            postLi.appendChild(postDescription);
            posts.appendChild(postLi);
        })
    });
}

export const updateFeedback = (type, message) => {
    const feedback = document.querySelector('.feedback');
    feedback.textContent = i18n.t(message);
    feedback.classList.remove('text-success', 'text-danger');
    feedback.classList.add(`text-${type}`);
}