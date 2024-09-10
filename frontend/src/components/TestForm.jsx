/* eslint-disable react/prop-types */
import { Form, Radio, Button } from 'antd';

function Question({ question, detailCheck, translate_question }) {
    return (
        <div className="flex flex-row justify-between mt-6 mb-10 mx-10">
            <div className='flex flex-col'>
            <Radio.Button 
                value={question.text}
                style={{ 
                    borderColor: question.color, 
                    borderWidth: ['#34A853', '#E94444'].includes(question.color) ? '2px' : '',
                }}
                className="mr-4"
            >
                <span className="mb-2 font-normal text-xl">
                    {question.text}
                </span>
            </Radio.Button>
            <div className='justify-center items-center mt-2'>
                {detailCheck && (
                <span className="text-xl font-normal p-1" style={{color: ['#34A853', '#E94444'].includes(question.color) ? question.color : '#000' }}>{translate_question}</span>
            )}
            </div>
            </div>
        </div>
    );
}
function QuestionBlock({ value, index, detailCheck }) {
    const translate_question = value.translate_question;
    console.log("check",translate_question);
    return (
        <div key={index} className="pt-4 px-10">
            <div className="bg-[#EAF4FF] rounded-xl">
                <div className="px-10 pt-4">
                    <div>
                        <span className="text-xl font-bold mb-3">{`${index + 1}. `}</span>
                        {Array.isArray(value.name) ? (
                            <div className="flex flex-col">
                                {value.name.map((item, idx) => (
                                    <span key={idx} className="text-lg font-bold">{item}</span>
                                ))}
                            </div>
                        ) : (
                            <span className="text-lg font-bold">{value.name}</span>
                        )}
                    </div>

                    {detailCheck && (
                        <div>
                            {Array.isArray(value.translate) ? (
                                <div className="flex flex-col">
                                    {value.translate.map((item, idx) => (
                                        <span key={idx} className="text-lg font-bold">{item}</span>
                                    ))}
                                </div>
                            ) : (
                                <span className="text-xl font-bold mb-3">{value.translate}</span>
                            )}
                        </div>
                    )}
                </div>
                <Form.Item
                    key={index}
                    name={value._id}
                    rules={[{ required: true, message: 'Please select an answer!' }]}
                >
                    <div className="flex pt-4 px-10">
                        <Radio.Group>
                            <div className='flex flex-row justify-between'>
                                {value.questions?.map((question, index) => (
                                <Question key={index} question={question} detailCheck={detailCheck} translate_question={translate_question[index]} />
                            ))}
                            </div>
                        </Radio.Group>
                    </div>
                </Form.Item>
            </div>
        </div>
    );
}

function TestFormComponent({ dataList, detailCheck, onSubmit }) {
    return (
        <div className='mt-5'>
            <div className='mt-10 mb-4 px-4'>
                <span className='text-xl font-normal'>Chọn đáp án tương ứng với câu đề cho: </span>
            </div>
            <Form onFinish={onSubmit}>
                {dataList.map((value, index) => (
                    <QuestionBlock key={index} value={value} index={index} detailCheck={detailCheck} />
                ))}
                {!detailCheck && (
                  <div className='flex justify-center my-10'>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full sm:w-48 lg:w-56 bg-[#EAF4FF] text-black"
                    >
                        Nộp bài
                    </Button>
                </div>  
                )}
            </Form>
        </div>
    );
}

export default TestFormComponent;
