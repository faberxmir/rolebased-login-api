const router = require('express').Router();
const {
    authenticate,
    authenticateRefreshToken,
    invalidateTokens,
} = require('../middleware/authorization');

const {
    createuser,
    loginuser,
    logoutuser,
    createtodo,
    removetodo,
    refreshUser
} = require('../controllers/usercontroller');

//Authentication
router.post('/create-user', createuser);
router.post('/loginuser', loginuser);
router.post('/refreshuser', authenticateRefreshToken, refreshUser);
router.post('/logout', invalidateTokens, logoutuser)


//Protected routes
router.post('/create-todo', authenticate, createtodo);
router.delete('/remove-todo', authenticate, removetodo);

module.exports=router;