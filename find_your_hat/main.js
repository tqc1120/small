const prompt = require('prompt-sync')({sigint: true});

// The Markers
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.locationX = 0;
    this.locationY = 0;
    this.field[0][0] = pathCharacter;
  }

  print() {
    for (let row of this.field) {
      console.log(row.join(''))
    }
  } 

  wheretogo() {
    const answer = prompt('Where you want to go?').toUpperCase();
    switch (answer) {
      case 'U':
        this.locationY -= 1;
        break
      case 'D':
        this.locationY += 1;
        break
      case 'L':
        this.locationX -= 1;
        break
      case 'R':
        this.locationX += 1;
        break;
      default:
        console.log('Enter U, D, L or R!');
        this.wheretogo();
        break;
    }
  }

  isinbound() {
    return (
      this.locationY >= 0 &&
      this.locationX >= 0 &&
      this.locationY < this.field.length &&
      this.locationX < this.field[0].length
    );
  }

  isinhole() {
    return this.field[this.locationY][this.locationX] === hole;
  }

  ishat() {
    return this.field[this.locationY][this.locationX] === hat;
  }

  RunGame() {
    let playing = true;
    while (playing){
      this.print();
      this.wheretogo();
      if (!this.isinbound()) {
        console.log('You move out of the boundary!');
        playing = false;
        break;
      } else if (this.isinhole()) {
        console.log('You drop in the hole!')
        playing = false;
        break;
      } else if (this.ishat()) {
        console.log("CONG! you find your hat!")
        playing = false;
        break;
      }
      this.field[this.locationY][this.locationX] = pathCharacter;
    }
  }

  // Build The Playfield
  static generateField(height, width, percentage) {
    let newField = [];
    for (let i = 0; i < height; i++) {
      newField.push([]);
      for (let j = 0; j < width; j++) {
        newField[i].push(fieldCharacter);
      }
    }
    newField[0][0] = pathCharacter;
    // Locate The Hat
    let hatX = Math.floor(Math.random() * width);
    let hatY = Math.floor(Math.random() * height);
    newField[hatY][hatX] = hat;
    // Random Holes Locations
    let holescount = percentage * height * width;
    let holeposition = [];
    for (let k = 0; k < holescount; k++) {
      let holeX = hatX;
      let holeY = hatY;
      while ((holeX === hatX && holeY === hatY) || [[holeY][holeX]] in holeposition) {
        holeX = Math.floor(Math.random() * width);
        holeY = Math.floor(Math.random() * height);
      }
      newField[holeY][holeX] = hole;
      holeposition.push([[holeY][holeX]]);
    }
    return newField;
  }    
}

const newgame = new Field(Field.generateField(10, 10, 0.2));
newgame.RunGame();
