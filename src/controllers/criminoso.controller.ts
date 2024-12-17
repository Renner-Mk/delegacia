import { Request, Response } from "express";

import { repository } from '../database/prisma.connection'
import { Criminoso } from "../models/criminoso.model";

export class ArmaController {
    public async index(req:Request, res:Response){
        try {
            const criminoso = await repository.criminoso.findMany({})

            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'Criminosos listados com sucesso',
                data: criminoso
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao buscar criminosos ${error}`
            })
        }
    }

    public async store(req:Request, res:Response){
        try {
            const {nome, dataNascimento} = req.body

            if(!nome || !dataNascimento){
                return res.status(400).json({
                    success: false,
                    code: res.statusCode,
                    message: 'Preencha todos os campos obrigatórios'
                })
            }

            const newCrimonoso = new Criminoso(nome, dataNascimento)

            const createdArma = await repository.criminoso.create({
                data:{
                    id: newCrimonoso.id,
                    nome: newCrimonoso.nome,
                    dataNascimento: newCrimonoso.dataNascimento
                }
            })

            return res.status(201).json({
                success: true,
                code: res.statusCode,
                message: 'Arma cadastrada com sucesso',
                data: createdArma
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao buscar criminoso ${error}`
            })
        }
    }

    public async show(req:Request, res:Response){
        try {
            const { id } = req.params

            const criminoso = await repository.criminoso.findUnique({
                where: {id}
            })

            if(!criminoso){
                return res.status(404).json({
                    success: false,
                    code: res.statusCode,
                    message: `Nenhum criminoso encontrada ao buscar`
                })
            }

            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'Criminosos listados com sucesso',
                data: criminoso
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao buscar criminoso ${error}`
            })
        }
    }

    public async update(req:Request, res:Response){
        try {
            const { id } = req.params
            const {nome, dataNascimento} = req.body

            if(!nome || !dataNascimento){
                return res.status(400).json({
                    success: false,
                    code: res.statusCode,
                    message: 'Preencha todos os campos obrigatórios'
                })
            }

            const updatedCriminoso = await repository.criminoso.update({where: { id },
            data:{
                nome,
                dataNascimento
            }})

            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'Criminoso atualizado com sucesso',
                data: updatedCriminoso
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao atualizar criminoso ${error}`
            })
        }
    }

    public async delete(req:Request, res:Response){
        try {
            const { id } = req.params

            const deleteCriminoso = await repository.criminoso.delete({where: { id }})

            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'Criminoso deletado com sucesso',
                data: deleteCriminoso
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao buscar criminoso ${error}`
            })
        }
    }
}