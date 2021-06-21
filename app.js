const cron = require('node-cron');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const httpContext = require('express-http-context');
const marked = require('marked');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const config = require('./config.json');
const logger = require('./services/logger')(module);
const authRouter = require('./routes/auth.routes');
const companiesRouter = require('./routes/companies.routes');
const contactsRouter = require('./routes/contacts.routes');

const app = express();

app.use(httpContext.middleware);
app.use((req, res, next) => {
  httpContext.ns.bindEmitter(req);
  httpContext.ns.bindEmitter(res);
  httpContext.set('method', req?.method);
  httpContext.set('url', req?.url);
  next();
});

app.use(cors());

app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'My apis in swagger',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:2114',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['routes/*.routes.js', 'app.js'],
};

/**
 * @swagger
 * definitions:
 *  Company:
 *   type: object
 *   required:
 *      - name
 *   properties:
 *    name:
 *     type: string
 *     description: name of the company
 *     example: 'INC Best company'
 *    shortname:
 *     type: string
 *     description: short name of the company
 *     example: 'Best'
 *    businessentity:
 *     type: string
 *     description: name of the company's business entity
 *     example: 'INC'
 *    contract:
 *     type: json
 *     description: contract info
 *     example: {"no":"54321","issue_date":"2015-03-12T00:00:00Z"}
 *    type:
 *     type: array
 *     description: type of company
 *     example: 'agent,  contractor'
 *    status:
 *     type: string
 *     description: status of company
 *     example: 'active'
 *    address:
 *     type: string
 *     description: address of company
 *     example: '5th Avenue'
 *  Contact:
 *   type: object
 *   properties:
 *    lastname:
 *     type: string
 *     description: lastname
 *     example: 'Moran'
 *    firstname:
 *     type: string
 *     description: firstname
 *     example: 'Adam'
 *    patronymic:
 *     type: string
 *     description: patronymic
 *     example: 'Tomas'
 *  User:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *     description: name of user
 *     example: 'Adam'
 *    email:
 *     type: string
 *     description: email
 *     example: atm@gmail.com
 *    password:
 *     type: string
 *     description: password
 *     example: 'secret'
 */

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.static(`${__dirname}/public`));

app.use('/auth', authRouter);
app.use('/companies', companiesRouter);
app.use('/contacts', contactsRouter);

/**
 * @swagger
 * /:
 *   post:
 *     tags: [Readme]
 *     description: Readme page
 *     responses:
 *       200:
 *         description: Success
 *
 */
app.get('/', (req, res) => {
  const path = `${__dirname}/README.md`;
  const file = fs.readFileSync(path, 'utf8');
  const pageContent = marked(file.toString());

  res.send(
    `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="github-markdown.css">
      </head>
      <body>
        <article class="markdown-body">${pageContent}</article>
      </body>
    </html>
    `,
  );
});

cron.schedule('0 * * * *', () => {
  fs.rm('./public/images/', { recursive: true, force: true }, (err) => {
    if (err) logger(err);
  });
});

async function start() {
  try {
    app.listen(config.port, () => {
      logger.info(`App has been started on port ${config.port}...`);
    });
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
}

start();

module.exports = app;
