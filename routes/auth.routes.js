const { Router } = require('express');
const validInfo = require('../middleware/validInfo.middleware');
const authController = require('../controllers/auth.controller');

const router = Router();

router.get('/', authController.auth);

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth route
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registration
 *     description: Registration
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     properties:
 *                         name:
 *                             type: string
 *                             default: Peter
 *                         email:
 *                             type: string
 *                             default: coder@gmail.com
 *                         password:
 *                             type: string
 *                             default: coder123
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: user already exist
 *       500:
 *         description: server error
 *
 */
router.post('/register', validInfo, authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login
 *     description: Login by email and password
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     properties:
 *                         email:
 *                             type: string
 *                             default: coder@gmail.com
 *                         password:
 *                             type: string
 *                             default: coder123
 *     responses:
 *       200:
 *         description: login successfully
 *       401:
 *         description: password or email is incorrect
 *       500:
 *         description: server error
 *
 */
router.post('/login', validInfo, authController.login);

module.exports = router;
