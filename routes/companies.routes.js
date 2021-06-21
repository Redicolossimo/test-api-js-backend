const express = require('express');
const multer = require('multer');
const config = require('../config.json');

const fileHandler = multer({ dest: config.uploads_dir });
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const companiesController = require('../controllers/companies.controller');

const filesParamsValidator = require('../middleware/validators/files.params.validator');
const filesController = require('../controllers/files.controller');

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     tags: [Companies]
 *     summary: Get the company by id
 *     description: Get the company by id
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
 */
router.get(
  '/:id',
  auth,
  companiesController.get,
);

/**
 * @swagger
 * /companies:
 *   get:
 *     tags: [Companies]
 *     summary: Get the companies with sort filter and pagination
 *     description: Get the companies with sort filter and pagination
 *     parameters:
 *         - name: status
 *           default: active
 *           in: query
 *           schema:
 *             type: string
 *         - name: type
 *           default: agent
 *           in: query
 *           schema:
 *             type: string
 *         - name: limit
 *           default: 4
 *           in: query
 *           schema:
 *             type: integer
 *         - name: page
 *           default: 1
 *           in: query
 *           schema:
 *             type: integer
 *         - name: order
 *           default: name
 *           in: query
 *           schema:
 *             type: string
 *     responses:
 *       200:
 *         description: success
 *       500:
 *         description: server error
 *
 */
router.get(
  '/',
  auth,
  companiesController.getAll,
);

/**
 * @swagger
 * /companies/{id}:
 *  put:
 *   tags: [Companies]
 *   summary: Update company
 *   description: Update company
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
 *                       name:
 *                           type: string
 *                           default: INC Gilgamesh
 *                       shortname:
 *                           type: string
 *                           default: Gilgamesh
 *                       businessentity:
 *                           type: string
 *                           default: INC
 *                       contract:
 *                           type: json
 *                           default: {"no": "56321", "issue_date": "2015-03-12T00:00:00Z"}
 *                       type:
 *                           type: string
 *                           default: agent
 *                       address:
 *                           type: string
 *                           default: INC
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
  companiesController.update,
);

/**
 * @swagger
 * /companies/{id}:
 *  delete:
 *   tags: [Companies]
 *   summary: Delete company by id
 *   description: Delete company by id
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
  companiesController.del,
);

router.post(
  '/:id/image',
  auth,
  fileHandler.fields([{ name: 'file', maxCount: 1 }]),
  filesParamsValidator.addCompanyImage,
  filesController.saveImage,
);

router.delete(
  '/:id/image/:image_name',
  auth,
  filesParamsValidator.removeCompanyImage,
  filesController.removeImage,
);

module.exports = router;
