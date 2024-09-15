/* eslint-disable react/prop-types */
import { Form, Radio, Button } from 'antd';

function Question({ question, detailCheck, translate_question }) {
    return (
        <div className="flex flex-col sm:flex-row justify-between mt-6 mb-8 mx-4 sm:mx-10">
            <Radio.Button 
                value={question.text}
                style={{ 
                    borderColor: question.color, 
                    borderWidth: ['#34A853', '#E94444'].includes(question.color) ? '2px' : '1px',
                }}
                className="mb-2 sm:mb-0 sm:mr-4"
            >
                <span className="text-lg sm:text-xl font-normal">
                    {question.text}
                </span>
            </Radio.Button>
            {detailCheck && (
                <div className='mt-2'>
                    <span className="text-lg sm:text-xl font-normal" style={{ color: ['#34A853', '#E94444'].includes(question.color) ? question.color : '#000' }}>
                        {translate_question}
                    </span>
                </div>
            )}
        </div>
    );
}

function QuestionBlock({ value, index, detailCheck }) {
    const translate_question = value.translate_question;

    return (
        <div key={index} className="pt-4 px-4 sm:px-10 mb-8">
            <div className="bg-[#EAF4FF] rounded-xl shadow-md">
                <div className="px-4 sm:px-10 pt-4">
                    <div>
                        <span className="text-lg sm:text-xl font-bold mb-3">{`${index + 1}. `}</span>
                        {Array.isArray(value.name) ? (
                            <div className="flex flex-col">
                                {value.name.map((item, idx) => (
                                    <span key={idx} className="text-md sm:text-lg font-bold">{item}</span>
                                ))}
                            </div>
                        ) : (
                            <span className="text-md sm:text-lg font-bold">{value.name}</span>
                        )}
                    </div>

                    {detailCheck && (
                        <div className="mt-2">
                            {Array.isArray(value.translate) ? (
                                <div className="flex flex-col">
                                    {value.translate.map((item, idx) => (
                                        <span key={idx} className="text-md sm:text-lg font-bold">{item}</span>
                                    ))}
                                </div>
                            ) : (
                                <span className="text-lg sm:text-xl font-bold mb-3">{value.translate}</span>
                            )}
                        </div>
                    )}
                </div>
                <Form.Item
                    key={index}
                    name={value._id}
                    rules={[{ required: true, message: 'Please select an answer!' }]}
                >
                    <div className="px-4 sm:px-10 pt-4">
                        <Radio.Group>
                            <div className='flex flex-col sm:flex-row'>
                                {value.questions?.map((question, qIndex) => (
                                    <Question 
                                        key={qIndex} 
                                        question={question} 
                                        detailCheck={detailCheck} 
                                        translate_question={translate_question[qIndex]} 
                                    />
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
        <div className='mt-4 sm:mt-8'>
            <div className='mb-4 px-4'>
                <span className='text-lg sm:text-xl font-normal'>Chọn đáp án tương ứng với câu đề cho: </span>
            </div>
            <Form onFinish={onSubmit}>
                {dataList.map((value, index) => (
                    <QuestionBlock key={index} value={value} index={index} detailCheck={detailCheck} />
                ))}
                {!detailCheck && (
                    <div className='flex justify-center my-8'>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-64 sm:w-48 lg:w-56 bg-[#EAF4FF] text-black"
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
