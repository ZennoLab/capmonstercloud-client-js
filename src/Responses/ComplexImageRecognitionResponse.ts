type RotateAnswer = Array<number>;
type DoubleAnswer = Array<number>;
type BetpunchAnswer = Array<number>;
type BlsAnswer = Array<boolean>;

export type ComplexImageRecognitionResponse = {
  answer: RotateAnswer | DoubleAnswer | BetpunchAnswer | BlsAnswer;
};
