import { Component } from '@angular/core';
import { PuzzleDataService } from './service/puzzle-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'digioutsource-puzzle';
  puzzleData: BlockAttributes [];
  movingBlockX = null;
  movingBlockY = null;
  primaryBlockPosition = null;

  landingBlockX = null;
  landingBlockY = null;
  landingBlockPosition = null;
  hasUserWon: boolean;
  btnTextDisplay = 'RESTART';

  constructor(private puzzleService: PuzzleDataService){}

    ngOnInit(): void {
     this.puzzleService.loadPuzzleData().then(data => {
      this.puzzleData = this.shuffle(data);
    });
  }

  restartGame(): void {
    this.puzzleData = this.shuffle(this.puzzleData);
    this.hasUserWon = false;
    this.btnTextDisplay = 'RESTART';
  }

  blockItemClicked(blockItem: BlockAttributes, e): void{
    if (this.movingBlockX === null || this.movingBlockY === null){
      this.movingBlockX = this.getAbsoluteCoOridinates(e.x);
      this.movingBlockY = this.getAbsoluteCoOridinates(e.y);
      this.primaryBlockPosition = this.puzzleData.findIndex(item => item.id === blockItem.id);

    } else if (this.landingBlockX === null || this.landingBlockX === null) {
      this.landingBlockX = this.getAbsoluteCoOridinates(e.x);
      this.landingBlockY = this.getAbsoluteCoOridinates(e.y);
      this.landingBlockPosition = this.puzzleData.findIndex(item => item.id === blockItem.id);
    }


    if (this.movingBlockX && this.landingBlockX) {
      if(blockItem.id === 16){
        this.validateMovingBlocks();
      }
      this.reset();
    }
  }

  validateMovingBlocks(): void {
    if (this.movingBlockX === this.landingBlockX
      ) {
        const difference = +(this.landingBlockY - this.movingBlockY).toString().replace('-', '');
        if (!(difference > 2)){
          this.shiftBlcokElements();
        } 
      } else if (this.movingBlockY === this.landingBlockY) {
        const difference = +(this.landingBlockX - this.movingBlockX).toString().replace('-', '');
        if (!(difference > 2)){
          this.shiftBlcokElements();
        }
      }
  }

  shiftBlcokElements(): void {
    const temp = this.puzzleData[this.primaryBlockPosition];
    this.puzzleData[this.primaryBlockPosition] = this.puzzleData[this.landingBlockPosition];
    this.puzzleData[this.landingBlockPosition] = temp;

    let counter = 1;
    for (let x = 0; this.puzzleData.length > x; x++){
      if(this.puzzleData[x].id === counter) {
        if (x === 15 && counter === 16) {
          this.hasUserWon = true;
          this.btnTextDisplay = 'PLAY AGAIN';
          return;
        }
        counter++;
        continue;
      }
      else if (this.puzzleData[x].id !== counter) {
        counter++;
        break;
      }
    }
  }

  getAbsoluteCoOridinates(coOrdinate: number): number | any{
    return (Math.ceil(coOrdinate / 100) * 100 - 100).toString().charAt(0);
  }

  reset(): void{
    this.movingBlockX = null;
    this.movingBlockY = null;
    this.landingBlockX = null;
    this.landingBlockY = null;
    this.landingBlockPosition = null;
    this.primaryBlockPosition = null;
  }


   shuffle(blockAttributes: BlockAttributes | any) {
    var currentIndex = blockAttributes.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = blockAttributes[currentIndex];
      blockAttributes[currentIndex] = blockAttributes[randomIndex];
      blockAttributes[randomIndex] = temporaryValue;
    }
    return blockAttributes;
  }
}

export interface BlockAttributes {
  id: number;
  gridX?: number;
  gridY?: number;
}

