import { FENCHAR, Coords, Color } from "../models";
import { piece } from "./piece";

export class Bishop extends piece{
    protected override _FENCHAR: FENCHAR;
    protected override _direction: Coords[]=[
        {x:1, y:1},
        {x:1, y:-1},
        {x:-1, y:1},
        {x:-1, y:-1}
    ];

    constructor(private pieceColor: Color){
        super(pieceColor);
        this._FENCHAR = pieceColor === Color.White ? FENCHAR.WhiteBishop :FENCHAR.BlackBishop;
    }
    
}