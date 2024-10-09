import { all, fork } from 'redux-saga/effects';
import authSaga from './auth.saga';
import QuestionSetSaga from './QuestionSet.saga';

export default function* rootSaga() {
  yield all([fork(authSaga), fork(QuestionSetSaga)]);
}
