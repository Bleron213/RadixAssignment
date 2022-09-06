import { IUser } from "../../models/User";

export interface IUserService {
    getById (id: number): Promise<any>;
    
    getUsers(): Promise<any>;
    
    deleteUser(id: number): Promise<any>;
    
    createUser(user: IUser) : Promise<any>;
    
    updateUser(user: IUser, id: number): Promise<any>;
}