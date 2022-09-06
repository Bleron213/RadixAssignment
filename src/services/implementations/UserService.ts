import { IUserService } from "../interfaces/IUserService";
import { injectable } from "inversify";
import { User } from "../../persistence/entities/UserEntity";
import { IUser } from "../../models/User";

@injectable()
class UserService implements IUserService{
    async getById (id: number){
        try 
        {
            const user = await User.findOne({ where:{ id: id } });
    
            if(!user)
            {
                console.log(`Failed to retrieve user with Id = ${id} from db`)
                return null
            }
                
            return user;
        }
         catch (err) {
            console.log(err);
            return null;
        }
    }
    
     async getUsers()  {
        try
        {
            const users = (await User.findAll() as any);
    
            if(!users)
            {
                console.log(`Something went wrong while retrieving users from database.`)
                return null
            }
    
            return users;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
    
    async deleteUser(id: number) {
        try
        {
            var result = await User.destroy({
                where:{
                    id: id
                }
            })
    
            return result;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
    
    async createUser(user: IUser) {
        try
        {
            const createdUser = await User.create({
                firstName: user.firstName,
                lastName: user.lastName
            });
            return createdUser;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    };
    
    async updateUser(user: IUser, id: number) {
        try {
            var existingUser: any = await User.findOne({
                where: {
                    id: id
                }
            });
        
            if(!existingUser)
            {
                console.log(`No Customer found with Id = ${id} `)
                return null;
            }
    
            existingUser.firstName = user.firstName;
            existingUser.lastName = user.lastName   
        
            var updatedResult: any = await User.update
            (
                {
                    firstName: user.firstName,
                    lastName: user.lastName
                },
                {
                    where: {id : id}
                }
            )
        
            return updatedResult;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    
    }
}

export default UserService;

