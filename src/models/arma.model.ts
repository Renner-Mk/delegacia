import { randomUUID } from "crypto"

export class Arma {
    private _id: string
    constructor(
        private _tipo: string,
        private _numeroSerie: string,
        private _crimeId: string,
    ) {
        this._id = randomUUID()
    }

    get id(): string{
        return this._id
    }

    get tipo(): string{
        return this._tipo
    }

    get numeroSerie(): string{
        return this._numeroSerie
    }

    get crimeId(): string{
        return this._crimeId
    }
}