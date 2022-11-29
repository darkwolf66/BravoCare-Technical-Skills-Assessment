const express = require('express');
const app = express();


//CORS
let cors = require('cors');
app.use(cors());


//Starting db
const Database = require("./db");
global.Database = Database
global.Database.connect()

//Route imports
const questionOneShifts = require('./routes/question-one-shifts');
const questionOneShiftsCheckOverlap = require('./routes/question-one-shifts/check-overlap');
const nurses = require('./routes/nurses');
const facilities = require('./routes/facilities');
const jobs = require('./routes/jobs')
const nursesJobs = require('./routes/nurses/jobs')
const queryFour = require('./routes/queries/query-4')
const queryFive = require('./routes/queries/query-5')
const querySix = require('./routes/queries/query-6')


//Routes
app.get('/question-one-shifts', questionOneShifts);
app.get('/question-one-shifts/:shiftIdOne/:shiftIdTwo/check-overlap', questionOneShiftsCheckOverlap);
app.get('/nurses', nurses);
app.get('/facilities', facilities);
app.get('/jobs', jobs);
app.get('/nurses/jobs', nursesJobs);

app.get('/query/four', queryFour);
app.get('/query/five', queryFive);
app.get('/query/six', querySix);


const port = 3000;
app.listen(port, () => {
    console.log(`Express listening on port ${port}`)
})