import { Color, Coords, FENCHAR } from "../models";
import { piece } from "./piece";

export class King extends piece{
    private _hasMoved: boolean = false;
    protected override _FENCHAR: FENCHAR;
    protected override _direction: Coords[] =  [
        { x: 0, y:1},
        { x: 0, y:-1},
        { x: 1, y:0},
        { x: 1, y:-1},
        { x: -1, y:0},
        { x: -1, y:1},
        { x: -1, y:-1},
    ];

    constructor(private pieceColor:Color){
        super(pieceColor);
        this._FENCHAR= pieceColor == Color.White ? FENCHAR.WhiteKing:FENCHAR.BlackKing;

    }

    public get hasMoved(): boolean { return this._hasMoved; }

    public set hasMoved(_) { this._hasMoved = true; }
}