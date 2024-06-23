import { Color, Coords, FENCHAR } from "../models";
import { piece } from "./piece";

export class Rook extends piece{
    private _hasMoved: boolean = false;
    protected override _FENCHAR: FENCHAR;
    protected override _direction: Coords[] = [
        { x: 1, y:0},
        { x: -1, y:0},
        { x: 0, y:1},
        { x: 0, y:-1},
    ];

    constructor(pieceColor: Color){
        super(pieceColor);
        this._FENCHAR= pieceColor === Color.White ? FENCHAR.WhiteRook : FENCHAR.BlackRook;
    }

    public get hasMoved(): boolean { return this._hasMoved; }

    public set hasMoved(_) { this._hasMoved = true; }
}