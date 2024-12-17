import { randomUUID } from "crypto"

export class Crime {
    private _id: string
    constructor(
        private _descricao: string,
        private _dataCrime: Date,
        private _criminosoId: string,
    ) {
        this._id = randomUUID()
    }

    get id(): string{
        return this._id
    }

    get descricao(): string{
        return this._descricao
    }

    get dataCrime(): Date{
        return this._dataCrime
    }

    get criminosoId(): string{
        return this._criminosoId
    }
}