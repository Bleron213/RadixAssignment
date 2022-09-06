import { injectable } from 'inversify';
import { User } from '../../persistence/entities/UserEntity';
import { IInitializerService } from '../interfaces/IInitializerService';

@injectable()
class InitializerService implements IInitializerService {

    MigrateTables = async () => 
    {
        try
        {
            // Syncs table with new changes
            await User.sync();
    
    
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    };
    
    SeedUserData = async () => {
    
        try {
            await User.sync({force: true});
            // Seed data
            const usersWrite = [
                ["John", "Hancock"],
                ["Liz", "Smith"],
                ["Ahmed", "Khan"]
            ];
        
            // Bulk creates users
            await User.bulkCreate(
                usersWrite.map(([firstName, lastName]) => ({firstName, lastName})),
                {returning: true}
              );
        }
        catch (err) {
            console.log(err);
            return false;
        }
    
    }
}

export default InitializerService;
