import { ChessBoard } from './../../chess-logic/chess-board';
import { Component } from '@angular/core';
import { Color, FENCHAR, pieceImagePaths } from '../../chess-logic/models';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-chess-board',
  standalone: true,
  imports: [CommonModule, FormsModule, NgClass],
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.css'
})
export class ChessBoardComponent {

  public pieceImagePaths = pieceImagePaths;
  private ChessBoard = new ChessBoard();
  public chessBoardView : (FENCHAR|null)[][] = this.ChessBoard.chessBoardView;
  public get playerColor(): Color{
    return this.ChessBoard.playerColor;
  }
  public isSquareDark(x: number, y: number): boolean{
    return ChessBoard.isSquareDark(x,y);
  }
  
}
