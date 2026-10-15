/** Click coordinates, in the order required by the task. */
export type CoordinateAnswer = { X: number; Y: number };

/** Results for numeric, grid, text, audio and coordinate recognition modules. */
export type ComplexImageRecognitionResponse = {
  answer: Array<number> | Array<boolean> | Array<CoordinateAnswer> | string;
  metadata?: {
    AnswerType: 'NumericArray' | 'Grid' | 'Text' | 'Coordinate';
  };
};
