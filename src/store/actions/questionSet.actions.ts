import { QuestionSet } from 'models/entities/QuestionSet';
import { QuestionSetActionType } from './actions.constants';

export interface QuestionType {
  question_id: string;
  learner_response: number;
}

export interface QuestionResponseType {
  questions_data: QuestionType[];
}

export const questionSetFetchAction = (payload: {
  question_set_id: string;
}) => ({
  type: QuestionSetActionType.FETCH_QUESTION_SET,
  payload,
});

export const questionSetFetchCompletedAction = (payload: {
  questionSet: QuestionSet;
}) => ({
  type: QuestionSetActionType.FETCH_QUESTION_SET_COMPLETED,
  payload,
});

export const questionSetFetchErrorAction = (payload: {
  errorMessage: string;
}) => ({
  type: QuestionSetActionType.FETCH_QUESTION_SET_ERROR,
  payload,
});

export const syncQuestionResponseAction = () => ({
  type: QuestionSetActionType.SYNC_QUESTION_RESPONSE,
});
