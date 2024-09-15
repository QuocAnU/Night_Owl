/* eslint-disable react/prop-types */
import { Form, Radio, Button, Tooltip } from 'antd';

function QuestionForm({ dataList, detailCheck, onSubmit }) {
    return (
        <div className='mt-5'>
            <div className='mt-10 mb-4 px-4'>
                <span className='text-xl font-normal'>
                    Dựa vào thông tin của đoạn văn trên, trả lời các câu hỏi bên dưới bằng cách chọn đáp án đúng:
                </span>
            </div>
            <Form onFinish={onSubmit}>
                {dataList.map((value, index) => (
                    <div key={index} className="flex flex-col pt-4 px-2 sm:px-4 md:px-6 lg:px-10">
                        <div className="flex flex-col bg-[#EAF4FF] rounded-lg shadow-md">
                            <div className="flex flex-col px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 lg:px-8 lg:py-6">
                                <span className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{`${index + 1}. ${value.name}`}</span>
                                {detailCheck && (
                                    <span className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{value.translate}</span>
                                )}
                            </div>
                            <Form.Item
                                key={value._id}
                                name={value._id}
                                rules={[{ required: true, message: 'Please select an answer!' }]}
                            >
                                <div className="flex flex-col pt-2 px-2 sm:px-4 md:px-6 lg:px-8">
                                    <Radio.Group>
                                        {value.questions &&
                                            value.questions.map((question, qIndex) => (
                                                <div key={qIndex} className="flex flex-col mb-3 sm:mb-4">
                                                    <div className='mb-2 sm:mb-3'>
                                                        <Tooltip title={question.text} placement="top">
                                                            <Radio.Button 
                                                                value={question.text}
                                                                style={{ 
                                                                    borderColor: question.color, 
                                                                    borderWidth: ['#34A853', '#E94444'].includes(question.color) ? '2px' : '',
                                                                }}>
                                                                <span className="text-sm sm:text-base md:text-lg lg:text-xl">
                                                                    {question.text}
                                                                </span>
                                                            </Radio.Button>
                                                        </Tooltip>
                                                    </div>
                                                    {detailCheck && (
                                                        <span className="text-xs sm:text-sm md:text-base lg:text-lg font-normal mb-2 p-1" style={{ color: ['#34A853', '#E94444'].includes(question.color) ? question.color : '#000' }}>
                                                            {value.translate_question[qIndex]}
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                    </Radio.Group>
                                </div>
                            </Form.Item>
                        </div>
                    </div>
                ))}
                {!detailCheck && (
                <div className='flex justify-center my-5 sm:my-8'>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-64 sm:w-48 md:w-56 lg:w-64 bg-[#EAF4FF] text-black"
                    >
                        Nộp bài
                    </Button>
                </div>
                )}
            </Form>
        </div>
    );
}

export default QuestionForm;
