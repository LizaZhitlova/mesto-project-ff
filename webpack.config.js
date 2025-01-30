// webpack.config.js
const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключаем HTML плагин
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин, который будет каждый раз при сборке проекта удалять содержимое папки dist.
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключаем к проекту плагин  mini-css-extract-plugin, с помощью которого webpack берёт много CSS-файлов и объединяет их в один.

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),// переписали точку выхода, используя утилиту path
        filename: 'main.js',
                publicPath: ''
    },
    mode: 'development', // добавили режим разработчика
    devServer: {
        static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
        compress: true, // это ускорит загрузку в режиме разработки
        port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    
        open: true // сайт будет открываться сам при запуске npm run dev
      },
      module: {
        rules: [ // rules — это массив правил
          // добавим в него объект правил для бабеля
          {
            // регулярное выражение, которое ищет все js файлы
            test: /\.js$/,
            // при обработке этих файлов нужно использовать babel-loader
            use: 'babel-loader',
            // исключает папку node_modules, файлы в ней обрабатывать не нужно
            exclude: '/node_modules/'
          },
         //добавили правило для обработки файлов разных типов
  {
    // регулярное выражение, которое ищет все файлы с такими расширениями
    test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
    type: 'asset/resource'
  },

  {
    // применять это правило только к CSS-файлам
    test: /\.css$/,
    // при обработке этих файлов нужно использовать
    // MiniCssExtractPlugin.loader и css-loader
    use: [MiniCssExtractPlugin.loader, {
      loader: 'css-loader'
    }]
  }
          ]
      },

      plugins: [ //plugins это массив, в который мы передаём объекты опций 
        new HtmlWebpackPlugin({
          template: './src/index.html' // путь к файлу index.html -объект опций 
        }),
        new CleanWebpackPlugin(), // вызываем опцию CleanWebpackPlugin 
        new MiniCssExtractPlugin(),// подклюсаем опцию для объединения CSS файлов,
      ]
    
}

