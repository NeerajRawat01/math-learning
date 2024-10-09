import { all, call, put, takeLatest } from 'redux-saga/effects';
import { QuestionSetActionType } from 'store/actions/actions.constants';
import { StoreAction } from 'models/StoreAction';
import {
  questionSetFetchCompletedAction,
  questionSetFetchErrorAction,
} from 'store/actions/questionSet.actions';
import { questionSetService } from 'services/api-services/QuestionSetService';
import { problemResponseLocalStorageService } from 'services/ProblemResponseLocalStorageService';

function* QuestionSetFetchSaga({
  payload: { question_set_id: string },
}: StoreAction<QuestionSetActionType>): any {
  try {
    const response = yield call(questionSetService.fetchQuestionSet, {
      question_set_id: 'hello',
    });
    yield put(questionSetFetchCompletedAction(response.questionSet));
  } catch (e: any) {
    yield put(
      questionSetFetchErrorAction(
        (e?.errors && e.errors[0]?.message) || e?.message
      )
    );
  }
}

function* syncQuestionResponseSaga(): any {
  const problemResponse = problemResponseLocalStorageService.getResponse();
  console.log('problemRes', problemResponse);
  try {
    const response = yield call(questionSetService.syncProblemData, {
      questions_data: problemResponse,
    });
    console.log('sync', response);
    problemResponseLocalStorageService.removeResponse();
  } catch (e: any) {
    console.log(e);
  }
}

function* QuestionSetSaga() {
  yield all([
    takeLatest(QuestionSetActionType.FETCH_QUESTION_SET, QuestionSetFetchSaga),
    takeLatest(
      QuestionSetActionType.SYNC_QUESTION_RESPONSE,
      syncQuestionResponseSaga
    ),
  ]);
}

export default QuestionSetSaga;
