import express from 'express';
import Route from './routes/Route';
import errorHandler from './middlewares/ErrorHandler';

export default class Application {
  public app: express.Application = express();

  constructor(private routesList: Route[]) {
    this.appConfig();
    this.mountRoutes(routesList);
  }

  private mountRoutes(routesList: Route[]) {
    routesList.forEach(route => route.mountRoute(this.app));
    this.app.use(errorHandler);
  }

  private appConfig() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  startServerOnPort(port: number) : void {
    if (process.env.NODE_ENV !== 'test') {
      this.app.listen(port, () => {
        console.log(`Listening on port: ${port}`);
      });
    }
    
  }
}
