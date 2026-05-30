export type LessonId = 'lesson1' | 'lesson2' | 'lesson3' | 'workbook';

export interface LessonProgress {
  id: LessonId;
  completed: boolean;
  score?: number;
}

export interface WorkbookState {
  koreanStudent: string;
  japaneseStudent: string;
  unitTitle: string;
  jointText: string;
  evaluatorFeedback: string;
  evaluatorName: string;
  discussionAnswers: {
    q1: string;
    q2: string;
    q3: string;
  };
}
