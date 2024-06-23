import { type } from "node:os";

export enum Color{
    White,
    Black
}

export type Coords = {
    x: number;
    y: number;
}

export enum FENCHAR {
    WhitePawn = "P",
    WhiteKnight = "N",
    WhiteBishop = "B",
    WhiteRook = "R",
    WhiteQueen = "Q",
    WhiteKing = "K",
    BlackPawn = "p",
    BlackKnight = "n",
    BlackBishop = "b",
    BlackRook = "r",
    BlackQueen = "q",
    BlackKing = "k",
}

export const pieceImagePaths: Readonly<Record<FENCHAR, string>> = {
    [FENCHAR.WhitePawn]: "assets/pieces/white pawn.svg",
    [FENCHAR.WhiteKnight]: "assets/pieces/white knight.svg",
    [FENCHAR.WhiteBishop]: "assets/pieces/white bishop.svg",
    [FENCHAR.WhiteRook]: "assets/pieces/white rook.svg",
    [FENCHAR.WhiteQueen]: "assets/pieces/white queen.svg",
    [FENCHAR.WhiteKing]: "assets/pieces/white king.svg",
    [FENCHAR.BlackPawn]: "assets/pieces/black pawn.svg",
    [FENCHAR.BlackKnight]: "assets/pieces/black knight.svg",
    [FENCHAR.BlackBishop]: "assets/pieces/black bishop.svg",
    [FENCHAR.BlackRook]: "assets/pieces/black rook.svg",
    [FENCHAR.BlackQueen]: "assets/pieces/black queen.svg",
    [FENCHAR.BlackKing]: "assets/pieces/black king.svg"
}

export type SafeSquares = Map<string, Coords[]>;