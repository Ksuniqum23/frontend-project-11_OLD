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
});

export default validateRss;
