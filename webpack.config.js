const path = require('path'); //Импортирует встроенный модуль Node.js path
const HtmlWebpackPlugin = require('html-webpack-plugin');
// плагин автоматически создает HTML-файл, подключающий ваш собранный JavaScript, и вставляет его в проект

module.exports = {
    entry: './src/js/index.js', // Точка входа
    output: {
        path: path.resolve(__dirname, 'dist'), // Куда класть результат
        filename: 'bundle.js', // Имя итогового JS-файла
        clean: true, // Очищать dist перед сборкой
    },
    module: {
        rules: [
            {
                test: /\.css$/i, // Все CSS-файлы
                use: ['style-loader', 'css-loader'], // Загрузчики для CSS
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // HTML-шаблон
            filename: 'index.html',   // имя итогового файла
            inject: 'body',           // подключать скрипты перед </body>
        }),
    ],
    mode: 'development', // Или 'production' для финальной сборки
};