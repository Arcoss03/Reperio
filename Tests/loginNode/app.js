const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

const app = express();
const PORT = '3002';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
