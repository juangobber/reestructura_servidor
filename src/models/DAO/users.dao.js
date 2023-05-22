import UserModel from "../schemas/user.model.js"

export class UsersDAO {
    async getUsers(){
        const users = await UserModel.find().lean()
        return users
    }

    async getUserById(id){
        const user = await UserModel.findOne({_id: id}).lean()
        return user
    }

    async createUser(payload){
        const newUser = (await UserModel.create(payload)).populate('cart');
        return newUser;
    }

    async updateUserById(id, payload){
        const updatedUser = await UserModel.updateOne({_id: id}, {
            $set: payload
        });
        return updatedUser
    }

    async findOne(filter){
        const user = await UserModel.findOne(filter).lean()
        return user
    }
}