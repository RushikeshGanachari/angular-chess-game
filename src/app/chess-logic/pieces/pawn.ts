import { Color, Coords, FENCHAR } from "../models";
import { piece } from "./piece";

export class Pawn extends piece{
    private _hasMoved : boolean = false;
    protected override _FENCHAR: FENCHAR;
    protected override _direction: Coords[] = [
        { x: 1, y:0},
        { x: 2, y:0},
        { x: 1, y:1},
        { x: 1, y:-1},
    ];

    constructor(private pieceColor:Color){
        super(pieceColor);
        if(pieceColor == Color.Black){
            this.setBlackPawnDirctions();
        }
        this._FENCHAR = pieceColor === Color.White ? FENCHAR.WhitePawn : FENCHAR.BlackPawn;
    }

    private setBlackPawnDirctions(): void {
        this._direction = this._direction.map(({x,y})=>({x:-1*x, y}))
    }
    public get hasMoved(): boolean { return this._hasMoved; }

    public set hasMoved(_) { 
        this._hasMoved = true; 
        this._direction = [
            { x: 1, y:0},
            { x: 1, y:1},
            { x: 1, y:-1},
        ];
        if(this.pieceColor === Color.Black) this.setBlackPawnDirctions();
    }
}