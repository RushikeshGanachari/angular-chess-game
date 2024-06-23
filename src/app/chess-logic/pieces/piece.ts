import { Color, Coords, FENCHAR } from "../models";

export abstract class piece{
    protected abstract _FENCHAR: FENCHAR;
    protected abstract _direction: Coords[];
    constructor(private _color:Color){

    }

    public get FENCHAR(): FENCHAR{
        return this._FENCHAR;
    }

    public get direction(): Coords[]{
        return this._direction;
    }

    public get color(): Color{
        return this._color;
    }
}