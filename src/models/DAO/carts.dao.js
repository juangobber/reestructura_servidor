import { HTTP_STATUS, httpError } from "../../utils/api.utils.js";
import cartModel from "../schemas/cart.model.js";

export class CartDao {

    async createCart() {
        const createdCart = await cartModel.create({})
        return createdCart
    }

    async getCart(cid){
        const cart = await cartModel.findById(cid).populate('products.productId').lean()
        return cart
    }

    async updateProduct(cid, payload){
        const request = await cartModel.findOneAndUpdate({_id: cid}, payload, {new: true}).populate('products.productId').lean()
        return request
    }

    async cartVerification (cid) {
        const cartVerification = await cartModel.findById(cid).lean()
        return cartVerification       
    }
}