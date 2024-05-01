const router = require('express').Router();
const {
    authenticate,
    authorizeAdmin
} = require('../middleware/authorization');

const {
    createuser,
    authenticateuser,
    createtodo,
    deleteuser,
    upgradeuser
} = require('../controllers/usercontroller');

//Authentication
router.post('/create-user', createuser);
router.post('/authenticate', authenticateuser);

//Protected routes
router.post('/create-todo',authenticate, createtodo);
router.delete('/delete-user', authenticate, authorizeAdmin, deleteuser);
router.patch('/create-admin', authenticate, authorizeAdmin, upgradeuser);

module.exports=router;