import { QuestionType } from 'store/actions/questionSet.actions';

export class ProblemResponseLocalStorageService {
  private static _instance: ProblemResponseLocalStorageService;

  static getInstance(): ProblemResponseLocalStorageService {
    if (!this._instance) {
      this._instance = new ProblemResponseLocalStorageService();
    }

    return this._instance;
  }

  setResponse(data: QuestionType): void {
    if (typeof localStorage !== 'undefined') {
      const problemResponse = JSON.parse(
        localStorage.getItem('problem_response') || '[]'
      );
      const updatedResponse = [...problemResponse, data];
      localStorage.setItem('problem_response', JSON.stringify(updatedResponse));
    }
  }

  getResponse(): string | null {
    if (typeof localStorage !== 'undefined') {
      return JSON.parse(localStorage.getItem('problem_response') || '[]');
    }
    return null;
  }

  removeResponse(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage?.removeItem('problem_response');
    }
  }
}

export const problemResponseLocalStorageService =
  ProblemResponseLocalStorageService.getInstance();
