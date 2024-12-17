import { Request, Response } from "express";

import { repository } from '../database/prisma.connection'
import { Crime } from "../models/crime.model";

export class ArmaController {
    public async index(req:Request, res:Response){
        try {
            const crimes = await repository.crime.findMany({})

            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'Crimes listadas com sucesso',
                data: crimes
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao buscar crimes ${error}`
            })
        }
    }

    public async store(req:Request, res:Response){
        try {
            const {descricao, dataCrime, criminosoId} = req.body

            if(!descricao || !dataCrime || !criminosoId){
                return res.status(400).json({
                    success: false,
                    code: res.statusCode,
                    message: 'Preencha todos os campos obrigatórios'
                })
            }

            const newCrime = new Crime(descricao, dataCrime, criminosoId)

            const createdCrime = await repository.crime.create({
                data:{
                    id: newCrime.id,
                    descricao: newCrime.descricao,
                    dataCrime: newCrime.dataCrime,
                    criminosoId: newCrime.criminosoId,
                }
            })

            return res.status(201).json({
                success: true,
                code: res.statusCode,
                message: 'Crime cadastrada com sucesso',
                data: createdCrime
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao buscar crime ${error}`
            })
        }
    }

    public async show(req:Request, res:Response){
        try {
            const { id } = req.params

            const crime = await repository.crime.findUnique({
                where: {id}
            })

            if(!crime){
                return res.status(404).json({
                    success: false,
                    code: res.statusCode,
                    message: `nenhum crime encontrado ao buscar`
                })
            }

            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'Crime listado com sucesso',
                data: crime
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
            const {descricao, dataCrime, criminosoId} = req.body

            if(!descricao || !dataCrime || !criminosoId){
                return res.status(400).json({
                    success: false,
                    code: res.statusCode,
                    message: 'Preencha todos os campos obrigatórios'
                })
            }

            const updatedCrime = await repository.crime.update({where: { id },
            data:{
                descricao,
                dataCrime,
                criminosoId
            }})

            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'Crime atualizado com sucesso',
                data: updatedCrime
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao buscar crime ${error}`
            })
        }
    }

    public async delete(req:Request, res:Response){
        try {
            const { id } = req.params

            const deleteCrime = await repository.crime.delete({where: { id }})

            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'Crime deletado com sucesso',
                data: deleteCrime
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao deletar crime ${error}`
            })
        }
    }
}