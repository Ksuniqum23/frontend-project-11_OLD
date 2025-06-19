import state from "../state/state";
import fetchRSS from "./fetchRss";
import parseXML from "./parseRSS";
import {addNewPostsInState} from "../state/updateState";
import {globalIgnores} from "eslint/config";

// const checkUpdates = () => {
//     state.links.forEach(link => {
//         fetchRSS(link)
//             .then(xmlString => {
//                 return parseXML(xmlString);
//             })
//             .then(xmlDoc => {
//                 const newPostsLength = xmlDoc.querySelectorAll('item').length;
//                 const statePostsLength = state.data[link].posts.length;
//                 if (newPostsLength > statePostsLength) {
//                     updatePosts(link, xmlDoc);
//                 }
//             })
//             .catch(error => {
//                 console.log(`Ошибка при проверке ${link}:`, error);
//             });
//     });
// }

let isUpdating = false;

export const checkUpdates = async () => {
    if (isUpdating) return; // Если уже обновляется — выходим
    isUpdating = true;

    try {
        // Параллельно обрабатываем все RSS-ленты
        await Promise.all(state.ui.rssLinksOrder.map(async (rssLink) => {
            try {
                const xmlString = await fetchRSS(rssLink);
                const xmlDoc = await parseXML(xmlString);
                const newPostLinksArr = [];
                xmlDoc.querySelectorAll('item').forEach(item => {
                    const postLink = item.querySelector('link')?.textContent;
                    if (!(state.data.posts[postLink]?.link === postLink)) {
                        newPostLinksArr.push(postLink);
                    }
                })

                // const itemsXmlArr = Array.from(xmlDoc.querySelectorAll('item')); // Все посты
                // console.log('itemsXmlArr', itemsXmlArr);
                // // Фильтруем новые посты (тех, которых нет в state.data.posts)
                // const newPostsXmlArr = itemsXmlArr.filter(item => {
                //     const postLink = item.querySelector('link')?.textContent;
                //     return item && !state.data.posts[postLink]?.link === postLink;
                // });
                // // console.log('newPostsXmlArr', newPostsXmlArr.length,  newPostsXmlArr);

                if (newPostLinksArr.length > 0) {
                    addNewPostsInState(rssLink, newPostLinksArr, xmlDoc); // Обновляем состояние
                    console.log('Добавили новые посты!!!');
                }
            } catch (error) {
                console.error(`Fuck! Ошибка для ${rssLink}:`, error); // Логируем и игнорируем
            }
        }));
    } finally {
        isUpdating = false; // Снимаем блокировку
        console.log('checkUpdate!');
        setTimeout(checkUpdates, 5000); // Следующий запуск через 5 сек
    }
};