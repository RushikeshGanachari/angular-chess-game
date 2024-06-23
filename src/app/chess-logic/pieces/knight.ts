import { Color, Coords, FENCHAR } from "../models";
import { piece } from "./piece";

export class Knight extends piece{
    protected override _FENCHAR: FENCHAR;
    protected override _direction: Coords[] = [
        { x: 1, y:2},
        { x: 1, y:-2},
        { x: -1, y:2},
        { x: -1, y:-2},
        { x: 2, y:1},
        { x: 2, y:-1},
        { x: -2, y:1},
        { x: -2, y:-1},
    ];

    constructor(pieceColor: Color){
        super(pieceColor);
        this._FENCHAR= pieceColor === Color.White ? FENCHAR.WhiteKnight : FENCHAR.BlackKnight;
    }

}