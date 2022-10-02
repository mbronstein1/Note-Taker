//When note is entered and saved, an object of "note title" and "note content" is saved to db.json
  //First, we must read the db.json file (and parse)
  //Then we have to push the new object into the db array
  //Then we have to stringify and write it to the db.json
//When the note is saved, send it as a response to the front end
//

const express = require('express');
const path = require('path');
const {readFromFile, readAndAppend} = require('./helpers/fsUtils')
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.post('/api/notes', (req, res) => {
  // console.info(req.body);
  // res.json(req.body);
  const {title, text} = req.body
  if(title && text){
    const newNote = {
      title,
      text,
      id: uuidv4()
    };
    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting feedback');
  }
  }
)

app.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);