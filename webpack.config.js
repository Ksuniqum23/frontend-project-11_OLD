const path = require('path'); //Импортирует встроенный модуль Node.js path
const HtmlWebpackPlugin = require('html-webpack-plugin');
// плагин автоматически создает HTML-файл, подключающий ваш собранный JavaScript, и вставляет его в проект

module.exports = {
    entry: './src/index.js', // Точка входа
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
            // template: 'index.html', // HTML-шаблон
            template: path.resolve(__dirname, 'index.html'),
            filename: 'index.html',   // имя итогового файла
            inject: 'body',           // подключать скрипты перед </body>
        }),
    ],
    mode: 'development', // Или 'production' для финальной сборки
    devServer: {
        allowedHosts: 'auto',
        static: {
            directory: path.resolve(__dirname), // пусть следит за всем проектом
            watch: true,
        },
        compress: true,      // сжатие
        port: 3000,           // любой свободный порт
        open: true,           // откроет браузер автоматически
        hot: true,            // обновляет только изменённые модули
        liveReload: true,
        watchFiles: {
            paths: [path.resolve(__dirname, 'index.html')],
            options: {
                usePolling: true,
            },
        }
    },
};