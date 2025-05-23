import state from "./state";

export const addNewRssInState = (xmlDoc, rssValue) => {
    state.links.push(rssValue);
    //add FEEDS
    const channelTitle = xmlDoc.querySelector('channel > title')?.textContent || 'Без заголовка';
    const channelDescription = xmlDoc.querySelector('channel > description')?.textContent || 'Без описания';
    state.feeds.push({channelTitle: channelTitle, channelDescription: channelDescription});

    //add POSTS
    const posts = xmlDoc.querySelectorAll('item');
    posts.forEach(item => {
        const postTitle = item.querySelector('title')?.textContent || 'Нет заголовка';
        const postDescription = item.querySelector('description').textContent || 'Нет описания';
        const postLink = item.querySelector('link').textContent || 'Нет link';
        state.posts.push({
            postTitle: postTitle,
            postDescription: postDescription,
            postLink: postLink,
        });
    });
    console.log('addNewRssInState, state:', state);
};