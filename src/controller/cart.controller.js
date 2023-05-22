import { CartService } from "../services/cart.service.js"
import { successResponse } from "../utils/api.utils.js"
import { HTTP_STATUS } from "../utils/api.utils.js"


const cartService = new CartService()

export class CartController {

    static async createCart(req, res, next){
        try {
            const createdCart = await cartService.createCart()
            const response = successResponse(createdCart)
            res.status(HTTP_STATUS.CREATED).json(response)
        }
        catch(error){
            next(error)
        }
    }

    static async getCart(req, res, next){
        const {cid} = req.params

        try {
            const cart = await cartService.getCart(cid)
            const response = successResponse(cart)
            res.status(HTTP_STATUS.OK).json(response)
        }
        catch(error){
            next(error)
        }
    }

    static async addProductToCart(req, res, next){
        const {cid, pid} = req.params
        
        try {
            const request = await cartService.addProduct(cid, pid)
            const response = successResponse(request)
            res.status(HTTP_STATUS.OK).json(response)
        }
        catch(error){
            next(error)
        }
    }

    static async deleteProduct(req, res, next){
        const {cid, pid} = req.params

        try {
            const request = await cartService.deleteProduct(cid, pid)
            const response = successResponse(request)
            res.status(HTTP_STATUS.OK).json(response)
        }
        catch(error){
            next(error)
        }
    }

    static async updateQuantity(req, res, next){
        const {cid, pid } = req.params
        const{quantity} = req.query

        try {
            const request = await cartService.updateQuantity(cid, pid, quantity)
            const response = successResponse(request)
            res.status(HTTP_STATUS.OK).json(response)
        }
        catch(error){
            next(error)
        }
    }
}