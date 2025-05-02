import i18next from 'i18next';

const resources = {
    ru: {
        translation: {
            success: {
                addRSS: 'RSS успешно добавлен игигггггогооо',
            },
            errors: {
                required: 'Ссылка обязательна',
                addRSS: 'Этот RSS уже добавлен 1231231231',
                invalidUrl: 'Ссылка должна быть валидным URL',
                // network: 'Ошибка сети. Попробуйте позже.',
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