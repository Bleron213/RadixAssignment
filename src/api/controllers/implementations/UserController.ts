import { inject, injectable } from "inversify";
import { KeyValuePair, ResponseObject } from "../../../models/ResponseObject";
import { IUser } from "../../../models/User";
import { User } from "../../../persistence/entities/UserEntity";
import UserService from "../../../services/implementations/UserService";
import logger from "../../../util/logger";
import TYPES from "../../../util/TYPES";
import { IUserController } from "../interfaces/IUserController";



@injectable()
class UserController implements IUserController{
    private userService: UserService;

    // constructor(@inject(TYPES.AddressService) addressService: AddressService) {

    constructor(@inject(TYPES.UserService) _userService: UserService)
    {
        this.userService = _userService;
    }

    // Route: users/{id}
    // Gets a user by id
    getUser = async (req: any, res: any) => {
        try
        {
            const id = req.params.id;
            if(!id)
            {
                return res.status(400).json(
                    {
                        message: "Failed to parse User Body or Parameters.",
                        errors: [{key: "ParseError", value: "Failed to parse request body or request parameters"}] as KeyValuePair[],
                    } as ResponseObject
                )
            }

            var existingUser: any = await User.findOne({
                where: {
                    id: id
                }
            });

            if(!existingUser) {
                return res.status(400).json(
                    {
                        message: `Could not find user with Id = ${id}`,
                    } as ResponseObject
                )
            }

            return res.status(200).json(
                {
                    message: 'Success',
                    data: existingUser
                } as ResponseObject
            )
        } catch (err) 
        {
            console.log(err);
            logger.error("Something went badly, err" , err);
            return res.status(500).json
            (
                {
                    message: "Something went wrong while getting users", 
                    errors: [{key: "error", value: err}] as KeyValuePair[],
                } as ResponseObject
            );
        }
    };

// Route: users
// Gets all users
// In case we have a many users, we need to implement a pagination policy.
     getUsers = async (req: any, res: any) => {
        try 
        {
            const users = await this.userService.getUsers();

            if(!users)
            {
                return res.status(400).json(
                    {
                        message: "Failed to retrieve users",
                        errors: [{key: "DbError", value: "Failed to retrieve users"}] as KeyValuePair[],
                    } as ResponseObject
                )
            }

            return res.status(200).json
            (
                {
                    message: "Successfully retrieved users",
                    data: users
                } as ResponseObject
            )

        } catch (err) 
        {
            console.log(err);
            logger.error("Something went badly, err", err);
            return res.status(500).json
            (
                {
                    message: "Something went wrong while getting users", 
                    errors: [{key: "error", value: err}] as KeyValuePair[],
                } as ResponseObject
            );
        }
    };

    // Route: users/{id}
    // Hard deletes a user entity.
      deleteUser = async (req: any, res: any) => {
        try
        {
            const id = req.params.id;

            if(!id)
            {
                return res.status(400).json(
                    {
                        message: "Failed to delete user",
                        errors: [{key: "idCouldNotBeParsed", value: "Failed to parse Id parameter"}] as KeyValuePair[],
                    } as ResponseObject
                )
            }

            var deleteUserResult = await this.userService.deleteUser(id);

            if(!deleteUserResult)
            {
                return res.status(400).json
                (
                    {
                        message: 'Failed to delete user'
                    } as ResponseObject   
                )
            }

            return res.status(200).json
            (
                {
                    message: "User deleted successfully",
                } as ResponseObject
            )
        } 
        catch (err) 
        {
            console.log(err);
            logger.error("Something went badly, err", err);
            return res.status(500).json
            (
                {
                    message: "Something went wrong while getting users", 
                    errors: [{key: "error", value: err}] as KeyValuePair[],
                } as ResponseObject
            );
        }
    };

    // Route: users
    // Creates a new user
    createUser = async (req: any, res: any) => {
        try
        {
            const user = req.body as IUser;

            if(!user)
            {
                return res.status(400).json(
                    {
                        message: "Failed to parse User Body.",
                        errors: [{key: "ParseError", value: "Failed to parse request body"}] as KeyValuePair[],
                    } as ResponseObject
                )
            }

            const createdUser = await this.userService.createUser(user);

            return res.status(200).json
            (
                {
                    message: "User deleted successfully",
                    data: createdUser
                } as ResponseObject
            )
        }
        catch (err) 
        {
            console.log(err);
            logger.error("Something went badly, err", err);
            return res.status(500).json
            (
                {
                    message: "Something went wrong while creating user", 
                    errors: [{key: "error", value: err}] as KeyValuePair[],
                } as ResponseObject
            );
        }
    };

    // Route: users/{id}
    // Updates an existing user.
    updateUser = async (req: any, res: any) => {
        try
        {
            const id = req.params.id;
            const user = req.body as IUser;

            if(!id || !user)
            {
                return res.status(400).json(
                    {
                        message: "Failed to parse User Body or Parameters.",
                        errors: [{key: "ParseError", value: "Failed to parse request body or request parameters"}] as KeyValuePair[],
                    } as ResponseObject
                )
            }

            var updatedResult = await this.userService.updateUser(user, id);
            
            if(!updatedResult && updatedResult.affectedCount > 0){
                return res.status(400).json(
                    {
                        message: "Failed to update user.",
                        errors: [{key: "DbError", value: "Failed to update user in Db"}] as KeyValuePair[],
                    } as ResponseObject
                )
            }

            return res.status(200).json
            (
                {
                    message: "User updated successfully",
                    data: updatedResult
                } as ResponseObject
            )

        }
        catch (err) 
        {
            console.log(err);
            logger.error("Something went badly, err", err);
            return res.status(500).json
            (
                {
                    message: "Something went wrong while updating user", 
                    errors: [{key: "error", value: err}] as KeyValuePair[],
                } as ResponseObject
            );
        }
    };
}

export default UserController;