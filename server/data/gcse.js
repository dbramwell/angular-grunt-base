var mongoose = require('../src/database/connect');
var GCSE = require('../src/database/objects/gcse');

var rowsToSave = [];
rowsToSave.push({
	subject: 'Maths',
	grade: 'A*'
});
rowsToSave.push({
	subject: 'Biology',
	grade: 'A'
});
rowsToSave.push({
	subject: 'Chemistry',
	grade: 'A'
});
rowsToSave.push({
	subject: 'Physics',
	grade: 'A'
});
rowsToSave.push({
	subject: 'French',
	grade: 'A'
});
rowsToSave.push({
	subject: 'Spanish',
	grade: 'A'
});
rowsToSave.push({
	subject: 'English Language',
	grade: 'B'
});
rowsToSave.push({
	subject: 'English Literature',
	grade: 'B'
});
rowsToSave.push({
	subject: 'Latin',
	grade: 'B'
});
rowsToSave.push({
	subject: 'I.T.',
	grade: 'B'
});
rowsToSave.push({
	subject: 'R.E.',
	grade: 'C'
});

GCSE.create(rowsToSave, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Saved GCSEs');
  }

  console.log('Closing DB');
  mongoose.disconnect();
});