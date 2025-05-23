const throwIfInvalidRSS = (xml) => {
    //проверка на валидность XML "Не могу разобрать XML"
    const parseError = xml.querySelector('parsererror');
    if (parseError) {
        throw new Error('errors.invalidXml');
    }

    //проверка на RSS ленту
    const items = xml.querySelectorAll('item');
    if (items.length === 0) {
        throw new Error('errors.invalidRss');
    }
}
export default throwIfInvalidRSS;

//тут только выбрасывается error с ключом
//А вот перевод этих ключей в человекочитаемый текст (i18next.t('errors.invalidXml'))
// происходит в другом месте — там, где ты обрабатываешь .catch() и вызываешь renderFeedback.