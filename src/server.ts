import Application from './adapters/api/Application';
import Route from './adapters/api/routes/Route';
import SecretsRoute from './adapters/api/routes/SecretsRoute';
import SecretsController from './adapters/api/controllers/SecretsController';
import OneTimeSecretStorer from './domain/useCases/OneTimeSecretStorer';
import UniqIdTokenGenerator from './adapters/externalServices/UniqIdTokenGenerator';
import MongoRepository from './adapters/repositories/MongoRepository';
import SecretsByIdRoute from './adapters/api/routes/SecretsByIdRoute';
import SecretsByIdController from './adapters/api/controllers/SecretsByIdController';
import OneTimeSecretRetriever from './domain/useCases/OneTimeSecretRetriever';

const secretRepository = new MongoRepository();

const secretRetriever = new OneTimeSecretRetriever(secretRepository);
const secretsByIdController = new SecretsByIdController(secretRetriever);
const secretByIdRoute = new SecretsByIdRoute(secretsByIdController);

const tokenGenerator = new UniqIdTokenGenerator();
const secretStorer = new OneTimeSecretStorer(secretRepository, tokenGenerator);
const secretsController = new SecretsController(secretStorer);
const secretsRoute = new SecretsRoute(secretsController);

const routesList: Route[] = [];
routesList.push(secretsRoute);
routesList.push(secretByIdRoute);

const application = new Application(routesList);
application.startServerOnPort(parseInt(process.argv[1]) || 3000);

export default application;