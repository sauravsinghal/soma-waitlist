
export enum PersonnelClass {
  ANALYST = 'THE_ANALYST',
  BUILDER = 'THE_BUILDER',
  EXEC = 'THE_EXEC',
  VISIONARY = 'THE_VISIONARY'
}

export interface LogEntry {
  id: string;
  type: 'ERROR' | 'OK' | 'INFO';
  module: string;
  message: string;
  timestamp: string;
}

export interface MetabolicState {
  coreTemp: number;
  glucoseLevel: number;
  heartRate: number;
  neuralLoad: number;
}
