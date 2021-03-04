import { request, response, Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';

import ensureAunthenticated from '../middlewares/ensureAuthenticated';


const usersRouter = Router();
const upload = multer(uploadConfig);


usersRouter.post('/', async (request, response) => {
    try{
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        delete user.password;

        return response.json(user);

    }catch (err){
        return response.status(400).json({ error: err.message });
    }
});


usersRouter.patch('/avatar', ensureAunthenticated, upload.single('avatar'), async (request, response) => {
    console.log(request.file);
    return response.json({ ok:true });
});

export default usersRouter;
