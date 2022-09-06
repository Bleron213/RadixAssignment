import { Container } from "inversify";
import InitController from "./api/controllers/implementations/InitController";
import UserController from "./api/controllers/implementations/UserController";
import { IInitController } from "./api/controllers/interfaces/IInitController";
import { IUserController } from "./api/controllers/interfaces/IUserController";
import InitializerService from "./services/implementations/InitializerService";
import UserService from "./services/implementations/UserService";
import { IInitializerService } from "./services/interfaces/IInitializerService";
import { IUserService } from "./services/interfaces/IUserService";
import TYPES from "./util/TYPES";

const container = new Container();

// Controllers
container.bind<IInitController>(TYPES.InitController).to(InitController);
container.bind<IUserController>(TYPES.UserController).to(UserController);

// Services
container.bind<IInitializerService>(TYPES.InitializerService).to(InitializerService);
container.bind<IUserService>(TYPES.UserService).to(UserService);

export default container;