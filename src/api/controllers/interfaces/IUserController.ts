export interface IUserController{
   // Route: users/{id}
    // Gets a user by id
    getUser(req: any, res: any): Promise<any>;

    // Route: users
    // Gets all users
    // In case we have a many users, we need to implement a pagination policy.
    getUsers(req: any, res: any) : Promise<any>;
    // Route: users/{id}
    // Hard deletes a user entity.
    deleteUser(req: any, res: any) : Promise<any>;

    // Route: users
    // Creates a new user
    createUser(req: any, res: any) : Promise<any>;

    // Route: users/{id}
    // Updates an existing user.
    updateUser(req: any, res: any) : Promise<any>;
};