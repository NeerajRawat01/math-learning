import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '../Button/Button';
import { syncQuestionResponseAction } from 'store/actions/questionSet.actions';
import { problemResponseLocalStorageService } from 'services/ProblemResponseLocalStorageService';

interface Props {
  columns?: number; // Number of columns
}

const MultiDigitGrid: React.FC<Props> = ({ columns = 6 }) => {
  const headers = Array.from(
    { length: columns - 1 },
    (_, index) => `${index + 1}`
  );

  // Dummy data for questionType
  // const dummyData: QuestionType[] = [
  //   {
  //     question_id: 'q1',
  //     learner_response: 756,
  //   },
  //   {
  //     question_id: 'q2',
  //     learner_response: 53552,
  //   },
  //   {
  //     question_id: 'q3',
  //     learner_response: 4000,
  //   },
  //   {
  //     question_id: 'q4',
  //     learner_response: 12345,
  //   },
  //   {
  //     question_id: 'q5',
  //     learner_response: 6789,
  //   },
  // ];

  const dispatch = useDispatch();

  return (
    <>
      <Button
        onClick={() => {
          dispatch(syncQuestionResponseAction());
        }}
        className='!w-44  !text-base !h-10'
      >
        Sync Data
      </Button>
      <Button
        onClick={() => {
          console.log(problemResponseLocalStorageService.getResponse());
          // problemResponseLocalStorageService.setResponse(dummyData[2]);
        }}
        className='!w-44  !text-base !h-10'
      >
        Add to local
      </Button>

      <div
        className='grid border border-black'
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }} // Use inline style for dynamic column count
      >
        {Array.from({ length: columns }).map((_, index) => (
          <div
            key={`input1-${index}`} // eslint-disable-line react/no-array-index-key
            className='border border-black h-16 p-1 flex items-center justify-center'
          >
            {index === 0 ? null : headers[index - 1]}
          </div>
        ))}

        {Array.from({ length: columns }).map((_, index) => (
          <div
            key={`input2-${index}`} // eslint-disable-line react/no-array-index-key
            className='border border-black h-16 flex items-center justify-center p-4'
          >
            {index === 0 ? null : (
              <input
                value={index}
                type='text'
                className='outline-none w-9 h-11 text-xl font-semibold text-center border-2 border-gray-700 rounded-md'
              />
            )}
          </div>
        ))}

        {Array.from({ length: columns }).map((_, index) => (
          <div
            key={`input3-${index}`} // eslint-disable-line react/no-array-index-key
            className='border border-black h-16 flex items-center justify-center'
          >
            {index === 0 ? (
              <button className='!text-xl font-semibold flex items-center justify-center'>
                +
              </button>
            ) : (
              <input
                value={index}
                type='text'
                className='outline-none w-9 h-11 text-xl font-semibold text-center border-2 border-gray-700 rounded-md'
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default React.memo(MultiDigitGrid);
