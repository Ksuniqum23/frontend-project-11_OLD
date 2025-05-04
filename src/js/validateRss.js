import * as Yup from 'yup';
import i18n from "./i18next";

const validateRss = Yup.object().shape({
    url: Yup.string()
        .required(i18n.t('required'))
        .url(i18n.t('errors.invalidUrl'))
        .test(
            'rss-already-exists',
            i18n.t('addRSS'),
            function (value) {
                const { feeds } = this.options.context;
                return !feeds.includes(value);
            }
        )
        .test(
            'is-valid-rss',
            i18n.t('errors.invalidRss'), // например: "Ссылка не указывает на валидный RSS"
            async function (value) {
                if (!value) return true;

                try {
                    const response = await fetch(value);
                    console.log('Content-Type!!!:', contentType);
                    const contentType = response.headers.get('content-type') || '';

                    const isRssContentType =
                        contentType.includes('application/rss+xml') ||
                        contentType.includes('application/xml') ||
                        contentType.includes('text/xml');

                    return response.ok && isRssContentType;
                } catch (err) {
                    return false;
                }
            }
        )
});

export default validateRss;
