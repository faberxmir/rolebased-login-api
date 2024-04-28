const router = require('express').Router();
const {
    requireAuth
} = require('../middleware/requireauth');
const {
    createuser,
    authenticateuser,
    createtodo,
    deleteuser
} = require('../controllers/usercontroller');

//Authentication
router.post('/create-user', createuser);
router.post('/authenticate', authenticateuser);

//Protected routes
router.post('/create-todo',requireAuth, createtodo);
router.delete('/delete-user', requireAuth, deleteuser); //should require authorization too

module.exports=router;