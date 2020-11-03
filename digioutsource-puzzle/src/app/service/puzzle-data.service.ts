import { Injectable } from '@angular/core';
import { BlockAttributes } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class PuzzleDataService {
  data: BlockAttributes [];
  constructor() { }

   loadPuzzleData(): Promise<BlockAttributes[]> {
    this.data = [
      {id: 1, gridX: 0, gridY: 0},
      {id: 2, gridX: 1, gridY: 0},
      {id: 3, gridX: 3, gridY: 0},
      {id: 4, gridX: 4, gridY: 0},


      {id: 5, gridX: 0, gridY: 1},
      {id: 6, gridX: 1, gridY: 1},
      {id: 7, gridX: 3, gridY: 1},
      {id: 8, gridX: 4, gridY: 1},


      {id: 9, gridX: 0, gridY: 3},
      {id: 10, gridX: 1, gridY: 3},
      {id: 11, gridX: 3, gridY: 3},
      {id: 12, gridX: 4, gridY: 3},


      {id: 13, gridX: 0, gridY: 4},
      {id: 14, gridX: 2, gridY: 4},
      {id: 15, gridX: 3, gridY: 4},
      {id: 16, gridX: 4, gridY: 4}
    ];

    return new Promise(resolve => {
      resolve(this.data);
  });
  }
}
