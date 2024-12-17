import { Request, Response } from "express";

import { repository } from '../database/prisma.connection'
import { Arma } from "../models/arma.model";

export class ArmaController {
    public async index(req:Request, res:Response){
        try {
            const armas = await repository.arma.findMany({})

            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'Armas listadas com sucesso',
                data: armas
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao buscar arma ${error}`
            })
        }
    }

    public async store(req:Request, res:Response){
        try {
            const {tipo, numeroSerie, crimeId} = req.body

            if(!tipo || !numeroSerie || !crimeId){
                return res.status(400).json({
                    success: false,
                    code: res.statusCode,
                    message: 'Preencha todos os campos obrigatórios'
                })
            }

            const newArma = new Arma(tipo, numeroSerie, crimeId)

            const createdArma = await repository.arma.create({
                data:{
                    id: newArma.id,
                    tipo: newArma.tipo,
                    numeroSerie: newArma.numeroSerie,
                    crimeId: newArma.crimeId,
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
                message: `Erro ao buscar arma ${error}`
            })
        }
    }

    public async show(req:Request, res:Response){
        try {
            const { id } = req.params

            const arma = await repository.arma.findUnique({
                where: {id}
            })

            if(!arma){
                return res.status(404).json({
                    success: false,
                    code: res.statusCode,
                    message: `nenhuma arma encontrada ao buscar`
                })
            }

            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'Armas listadas com sucesso',
                data: arma
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao buscar arma ${error}`
            })
        }
    }

    public async update(req:Request, res:Response){
        try {
            const { id } = req.params
            const {tipo, numeroSerie, crimeId} = req.body

            if(!tipo || !numeroSerie || !crimeId){
                return res.status(400).json({
                    success: false,
                    code: res.statusCode,
                    message: 'Preencha todos os campos obrigatórios'
                })
            }

            const updatedArma = await repository.arma.update({where: { id },
            data:{
                tipo: tipo,
                numeroSerie: numeroSerie,
                crimeId: crimeId
            }})

            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'Armas atualizada com sucesso',
                data: updatedArma
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao buscar arma ${error}`
            })
        }
    }

    public async delete(req:Request, res:Response){
        try {
            const { id } = req.params

            const updatedArma = await repository.arma.delete({where: { id }})

            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'Armas deletada com sucesso',
                data: updatedArma
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao buscar arma ${error}`
            })
        }
    }
}