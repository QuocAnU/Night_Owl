/* eslint-disable react/prop-types */
import { Radio } from "antd";
import './styles.css'

function ReadComponent(props) {
  const { data, index } = props;
  const { success, name, translate, questions, translate_question } = data;

  return (
    <div className="flex flex-col bg-[#EAF4FF] py-4 px-10">
      <span className="text-xl font-bold mb-3">{`${index + 1}. ${name}`}</span>
      {success && (<span>{translate}</span>)}
      <Radio.Group key={data._id} name={data._id} className="flex flex-col">
        {questions.map((question, idx) => (
          <div key={idx} className="mb-3">
            <Radio.Button
              value={question.text}
              style={{ borderColor: question.color }}
            >
                <span className="mb-5">{question.text}</span>
            </Radio.Button>
            <span>{success && translate_question[idx]}</span>
          </div>
        ))}
      </Radio.Group>
    </div>
  )
}

export default ReadComponent;
