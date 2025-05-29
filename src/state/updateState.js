import state from "./state";
import {watchedState} from "../index";

const addFeed = (rss, xmlDoc) => {
    const channelTitle = xmlDoc.querySelector('channel > title')?.textContent || 'Без заголовка';
    const channelDescription = xmlDoc.querySelector('channel > description')?.textContent || 'Без описания';
    rss.feed = {
        title: channelTitle,
        description: channelDescription
    };
}

// const addPosts = (rss, xmlDoc) => {
//     const posts = xmlDoc.querySelectorAll('item');
//     posts.forEach(item => {
//         const postTitle = item.querySelector('title')?.textContent || 'Нет заголовка';
//         const postDescription = item.querySelector('description').textContent || 'Нет описания';
//         const postLink = item.querySelector('link').textContent || 'Нет link';
//         rss.posts.push({
//             title: postTitle,
//             description: postDescription,
//             link: postLink,
//         });
//     });
// }

const addPosts = (rss, xmlDoc) => {
    const existingPosts = new Set(rss.posts.map(post => post.link)); //это объект с уникальными значениями
    const newPosts = [];
    xmlDoc.querySelectorAll('item').forEach(item => {
        const postLink = item.querySelector('link')?.textContent;
        if (!postLink || existingPosts.has(postLink)) {
            return;
        }
        const postTitle = item.querySelector('title')?.textContent || 'Нет заголовка';
        const postDescription = item.querySelector('description').textContent || 'Нет описания';
        newPosts.push({
            title: postTitle,
            description: postDescription,
            link: postLink,
        });
        }
    )
    rss.posts = [...rss.posts, ...newPosts];
}

export const updatePosts= (rssLink, xmlDoc) => {
    const rss = state.data[rssLink] || { feed: 'unknown', posts: [] };
    addPosts(rss, xmlDoc);
    watchedState.data[rssLink] = rss;
}

export const addNewRssInState = (xmlDoc, rssLink) => {
    state.links.push(rssLink);
    const rss = {
        feed: {},
        posts: [],
    };
    addFeed(rss, xmlDoc);
    addPosts(rss, xmlDoc);
    state.data[rssLink] = rss;
};