import { User } from '../../../persistence/entities/UserEntity';
import path from 'path'
import { ResponseObject, KeyValuePair } from '../../../models/ResponseObject';
import { injectable } from 'inversify';
import { IInitController } from '../interfaces/IInitController';


@injectable()
class InitController implements IInitController {
    constructor() {}

    indexPage = async (req: any, res: any) => {
        try {
            res.status(200).sendFile(path.join(__dirname, '../../../public/index.html'));
        }
        catch (err) {
            console.log(err);
            res.status(500).json(
                {
                    message: "Something went wrong while sending file",
                    errors: [{key: "error", value: err}] as KeyValuePair[],
                } as ResponseObject
            );
        }
    }
}

export default InitController;
