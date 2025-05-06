import i18next from 'i18next';

const resources = {
    ru: {
        translation: {
            success: {
                addRSS: 'RSS успешно добавлен',
            },
            errors: {
                required: 'Ссылка обязательна',
                addRSS: 'Этот RSS уже добавлен',
                invalidUrl: 'Ссылка должна быть валидным URL',
                invalidRss: 'Ресурс не содержит валидный RSS',
                invalidXml: 'Не могу разобрать XML',
                network: 'Ошибка сети. Попробуйте позже.',
                // parsing: 'Ресурс не содержит валидный RSS',
            },
        },
    },
};

i18next.init({
    lng: 'ru', // язык по умолчанию
    debug: false,
    resources,
});

export default i18next;