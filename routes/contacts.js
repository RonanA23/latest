const express = require('express');
const router = express.Router();

// get api/contacts- get all users contacts- private
router.get('/', (req, res) => {
  res.send('get all contacts');
});

// add new contacts
router.post('/', (req, res) => {
  res.send('Add contact');
});

//update api/contacts/;id
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

router.delete('/:id', (req, res) => {
  res.send('delete contact');
});

module.exports = router;
