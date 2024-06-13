const router = require('express').Router()

const {
    deleteuser,
    upgradeuser
} = require('../controllers/usercontroller')

const {
    authenticate,
    authorizeAdmin
} = require('../middleware/authorization')

router.delete('/delete-user', authenticate, authorizeAdmin, deleteuser);
router.patch('/create-admin', authenticate, authorizeAdmin, upgradeuser);

module.exports=router