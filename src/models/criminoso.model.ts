import { randomUUID } from "crypto"

export class Criminoso {
    private _id: string

    constructor(
        private _nome: string,
        private _dataNascimento: Date,
    ) {
        this._id = randomUUID()
    }

    get id(): string{
        return this._id
    }

    get nome(): string{
        return this._nome
    }

    get dataNascimento(): Date{
        return this._dataNascimento
    }
}