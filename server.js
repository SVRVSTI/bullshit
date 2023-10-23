const express = require('express');

const app = express();
const path = require('path');
const morgan = require('morgan');


const PORT = 3000;

app.set('view engine', 'ejs');

const createPath = (page) => path.resolve(__dirname, 'ejs-folder', `${page}.ejs`);

app.listen(3000, (error) => {
    error ? console.log(error) : console.log(`Listening to port ${PORT}`);
});

app.use(express.static('styles'));

app.use(express.urlencoded({ extended: false}));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.get('/', (req, res) => {
    res.render(createPath('home'));
});

app.post('/add-post', (req, res) => {
    const { author, title, text } = req.body;
    const post = {
        author,
        title,
        text,
    };
    res.render(createPath('post'), { post });
});  

app.get('/contacts', (req, res) => {
    const contacts = [
        { name: 'Davides', link: 'https://vk.com/cartianfrei' },
        { name: 'Jukes', link: 'https://vk.com/vanto3' },
        { name: 'Olegus', link: 'https://vk.com/zneverxmorec' },
    ];
    res.render(createPath('contacts'), { contacts });
});

app.get('/eblans', (req, res) => {
    res.redirect('/contacts');
});

app.get('/posts', (req, res) => {
    const posts = [
        {
            id: '1',
            text: 'что-то написано хз',
            title: 'Загъаловок',
            date: '05.05.2021',
            author: 'Oleges',
        }
    ];
    res.render(createPath('posts'), { posts });
});

app.get('/posts/:id', (req, res) => {
    const post = {
        id: '1',
        text: 'что-то написано хз',
        title: 'Загъаловок',
        date: '05.05.2021',
        author: 'Oleges',
    };
    res.render(createPath('post'), { post });
});

app.get('/add-post', (req, res) => {
    res.render(createPath('add-post'));
});

app.use((req, res) => {
    res
        .status(404)
        .render(createPath('error'));
});