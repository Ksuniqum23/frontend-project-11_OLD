import i18n from "../i18n/init";

export const updateUI = (state) => {
    const feeds = document.getElementById('ulFeeds');
    const posts = document.getElementById('ulPosts');
    feeds.innerHTML = '';
    posts.innerHTML = '';

    state.feeds.forEach(feed => {
        const feedTitle = document.createElement('h4');
        const feedDescription = document.createElement('p');
        feedTitle.textContent = feed.channelTitle;
        feedDescription.textContent = feed.channelDescription;
        feeds.appendChild(feedTitle);
    });

    state.posts.forEach(post => {
        const postLi = document.createElement('li');
        postLi.classList.add('list-group-item');

        const postLink = document.createElement('a');
        postLink.href = post.postLink;
        postLink.textContent = post.postTitle;
        postLink.target = '_blank'; // Открывать в новой вкладке
        postLink.classList.add('text-decoration-none'); // Убираем подчёркивание (опционально)

        const postDescription = document.createElement('p');
        postDescription.textContent = post.postDescription;

        postLi.appendChild(postLink); // Добавляем ссылку вместо заголовка
        postLi.appendChild(postDescription);
        posts.appendChild(postLi);
    })

}

export const updateFeedback = (type, message) => {
    const feedback = document.querySelector('.feedback');
    feedback.textContent = i18n.t(message);
    feedback.classList.remove('text-success', 'text-danger');
    feedback.classList.add(`text-${type}`);
}