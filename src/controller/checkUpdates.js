import state from "../state/state";
import fetchRSS from "./fetchRss";
import parseXML from "./parseRSS";
import {updatePosts} from "../state/updateState";
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
        await Promise.all(state.links.map(async (link) => {
            try {
                const xmlString = await fetchRSS(link); // Запрос к RSS
                const xmlDoc = await parseXML(xmlString); // Парсинг XML
                const items = Array.from(xmlDoc.querySelectorAll('item')); // Все посты

                // Фильтруем новые посты (тех, которых нет в state.data[link].posts)
                const newPosts = items.filter(item => {
                    const postLink = item.querySelector('link')?.textContent;
                    return postLink && !state.data[link]?.posts.some(post => post.link === postLink);
                });

                if (newPosts.length > 0) {
                    updatePosts(link, xmlDoc); // Обновляем состояние
                }
            } catch (error) {
                console.error(`Ошибка для ${link}:`, error); // Логируем и игнорируем
            }
        }));
    } finally {
        isUpdating = false; // Снимаем блокировку
        console.log('Обновление завершено');
        setTimeout(checkUpdates, 5000); // Следующий запуск через 5 сек
    }
};