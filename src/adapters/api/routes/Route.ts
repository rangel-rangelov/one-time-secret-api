import { Application } from 'express';

export default interface Route {
  mountRoute(application: Application): void;
}