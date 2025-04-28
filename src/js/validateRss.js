import * as Yup from 'yup';

const validateRss = Yup.object().shape({
    url: Yup.string()
        .required('Ссылка обязательна')
        .url('введите корректный URL')
});

export default validateRss;
// validationSchema.validate(userInput)
//     .then(() => {
//         console.log('Ввод валиден!');
//     })
//     .catch(err => {
//         console.error(err.errors); // Вывод ошибок валидации
//     });