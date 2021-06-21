const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth.middleware');
const contactsController = require('../controllers/contacts.controller');

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     tags: [Contact]
 *     summary: Get the contact by id
 *     description: Get the contact by id
 *     parameters:
 *         - in: path
 *           name: id
 *           default: 1
 *           required: true
 *           schema:
 *             type: integer
 *     responses:
 *       200:
 *         description: success
 *       500:
 *         description: server error
 *
 */
router.get(
  '/:id',
  auth,
  contactsController.get,
);

/**
 * @swagger
 * /contacts/{id}:
 *  put:
 *   tags: [Contact]
 *   summary: Update contact
 *   description: Update contact
 *   parameters:
 *       - in: path
 *         name: id
 *         default: 1
 *         required: true
 *         schema:
 *           type: integer
 *   requestBody:
 *       required: true
 *       content:
 *           application/json:
 *               schema:
 *                   type: object
 *                   properties:
 *                       lastname:
 *                           type: string
 *                           default: Simpson
 *                       firstname:
 *                           type: string
 *                           default: Bartholomew
 *                       patronymic:
 *                           type: string
 *                           default: Junior
 *                       phone:
 *                           type: string
 *                           default: 79162165588
 *                       email:
 *                           type: string
 *                           default: bart@bk.list
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: server error
 *
 */
router.put(
  '/:id',
  auth,
  contactsController.update,
);

/**
 * @swagger
 * /contacts/{id}:
 *  delete:
 *   tags: [Contact]
 *   summary: Delete contact by id
 *   description: Delete contact by id
 *   parameters:
 *       - in: path
 *         name: id
 *         default: 1
 *         required: true
 *         schema:
 *           type: integer
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: server error
 *
 */
router.delete(
  '/:id',
  auth,
  contactsController.del,
);

module.exports = router;
