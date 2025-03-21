/* eslint-disable @typescript-eslint/no-unused-vars */
// Removed the carriage return character
const doc: PropertyDecorator = (target: any, key: string | symbol) => {
  console.log(target, key);
};

class Eric {
  @doc
  public name: string;
  constructor() {
    this.name = 'Eric';
  }
}
