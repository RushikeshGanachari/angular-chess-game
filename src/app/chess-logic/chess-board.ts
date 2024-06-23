import { map } from "rxjs";
import { Color, Coords, FENCHAR, SafeSquares } from "./models";
import { Bishop } from "./pieces/bishop";
import { King } from "./pieces/king";
import { Knight } from "./pieces/knight";
import { Pawn } from "./pieces/pawn";
import { piece } from "./pieces/piece";
import { Queen } from "./pieces/queen";
import { Rook } from "./pieces/rook";

export class ChessBoard {
    private chessboard: (piece | null)[][];
    private readonly chessBoardSize: number = 8
    private __playerColor = Color.White;

    constructor() {
        this.chessboard = [
            [
                new Rook(Color.White), new Knight(Color.White), new Bishop(Color.White), new Queen(Color.White), new King(Color.White), new Bishop(Color.White), new Knight(Color.White), new Rook(Color.White),
            ],
            [
                new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White), new Pawn(Color.White)
            ],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [
                new Pawn(Color.Black), new Pawn(Color.Black), new Pawn(Color.Black), new Pawn(Color.Black), new Pawn(Color.Black), new Pawn(Color.Black), new Pawn(Color.Black), new Pawn(Color.Black)
            ],
            [
                new Rook(Color.Black), new Knight(Color.Black), new Bishop(Color.Black), new Queen(Color.Black), new King(Color.Black), new Bishop(Color.Black), new Knight(Color.Black), new Rook(Color.Black),
            ],

        ]
    }

    public get playerColor(): Color {
        return this.__playerColor;
    }

    public get chessBoardView(): (FENCHAR | null)[][] {
        return this.chessboard.map(row => {
            return row.map(pc => pc instanceof piece ? pc.FENCHAR : null)
        })
    }

    public static isSquareDark(x: number, y: number): boolean {
        return x % 2 === 0 && y % 2 === 0 || x % 2 === 1 && y % 2 === 1
    }

    private areCoordinatesValid(x: number, y: number): boolean {
        return x >= 0 && y >= 0 && x < this.chessBoardSize && y < this.chessBoardSize
    }

    public isInCheck(playerColor: Color): boolean {
        for (let x = 0; x < this.chessBoardSize; x++) {
            for (let y = 0; y < this.chessBoardSize; y++) {
                const piece: piece | null = this.chessboard[x][y];
                if (!piece || piece.color == playerColor) continue;

                for (const { x: dx, y: dy } of piece.direction) {
                    let newx: number = x + dx;
                    let newy: number = y + dy;
                    if (!this.areCoordinatesValid(newx, newy)) continue

                    if (piece instanceof Pawn || piece instanceof Knight || piece instanceof King) {

                        //pawns attacks only diagonally 
                        if (piece instanceof Pawn && dy == 0) continue

                        const attackedPiece: piece | null = this.chessboard[newx][newy];
                        if (attackedPiece instanceof King && attackedPiece?.color == playerColor) return true;
                    } else {
                        while (this.areCoordinatesValid(newx, newy)) {
                            const attackedPiece: piece | null = this.chessboard[newx][newy];
                            if (attackedPiece instanceof King && attackedPiece?.color == playerColor) return true;

                            if (attackedPiece !== null) break;
                            newx += dx;
                            newy += dy;
                        }
                    }
                }
            }
        }
        return false;
    }

    private isPositionSafeAfterMove(piece: piece, prevx: number, prevy: number, newx: number, newy: number): boolean {
        const newPiece: piece | null = this.chessboard[newx][newy];

        //we cant put piece on a square that already contains piece of the same square
        if (newPiece && newPiece.color === piece.color) return false;


        //semulate position
        this.chessboard[prevx][prevy] = null;
        this.chessboard[newx][newy] = piece;

        const isPositionSafe: boolean = !this.isInCheck(piece.color);

        //return position back
        this.chessboard[prevx][prevy] = piece;
        this.chessboard[newx][newy] = newPiece;

        return isPositionSafe;
    }

    private findSafeSquares(): SafeSquares {
        const safeSquares: SafeSquares = new Map<string, Coords[]>();

        for (let x = 0; x < this.chessBoardSize; x++) {
            for (let y = 0; y < this.chessBoardSize; y++) {
                const piece: piece | null = this.chessboard[x][y];

                if (!piece || piece.color !== this.__playerColor) continue;

                const pieceSafeSquares: Coords[] = [];

                for (const { x: dx, y: dy } of piece.direction) {
                    let newX: number = x + dx;
                    let newY: number = y + dy;

                    if (!this.areCoordinatesValid(newX, newY)) continue;

                    let newPiece: piece | null = this.chessboard[newX][newY];

                    if (newPiece && newPiece.color === piece.color) continue;

                    if (piece instanceof Pawn || piece instanceof Knight || piece instanceof King) {
                        if (this.isPositionSafeAfterMove(piece, x, y, newX, newY))
                            pieceSafeSquares.push({ x: newX, y: newY });

                    } else {
                        while (this.areCoordinatesValid(newX, newY)) {
                            newPiece = this.chessboard[newX][newY];
                            if (newPiece && newPiece?.color === piece.color) break

                            if (this.isPositionSafeAfterMove(piece, x, y, newX, newY))
                                pieceSafeSquares.push({ x: newX, y: newY });
                        }
                    }

                }
            }
        }
        return safeSquares;
    }
}