/* eslint-disable react/prop-types */
import { Form, Radio, Button } from 'antd';

function QuestionForm({ dataList, detailCheck, onSubmit }) {
    return (
        <div className='mt-5'>
            <div className='mt-10 mb-4 px-4'>
                <span className='text-xl font-normal'>Dựa vào thông tin của đoạn văn trên, trả lời các câu hỏi bên dưới bằng cách chọn đáp án đúng: </span>
            </div>
            <Form onFinish={onSubmit}>
                {dataList.map((value, index) => (
                    <div key={index} className="flex flex-col pt-4 px-10">
                        <div className="flex flex-col bg-[#EAF4FF]">
                            <div className="flex flex-col px-10 pt-4">
                                <span className="text-xl font-bold mb-3">{`${index + 1}. ${value.name}`}</span>
                                {detailCheck && (
                                    <span className="text-xl font-bold mb-3">{value.translate}</span>
                                )}
                            </div>
                            <Form.Item
                                key={value._id}
                                name={value._id}
                                rules={[{ required: true, message: 'Please select an answer!' }]}
                            >
                                <div className="flex flex-col pt-4 px-10">
                                    <Radio.Group>
                                        {value.questions &&
                                            value.questions.map((question, index) => (
                                                <div key={index} className="flex flex-col mb-4">
                                                    <div className='mb-3'>
                                                        <Radio.Button 
                                                            value={question.text}
                                                            style={{ 
                                                                borderColor: question.color, 
                                                                borderWidth: question.color === '#34A853' || question.color === '#E94444'  ? '2px' : '',
                                                            }}>
                                                            <span className="mb-2 font-normal text-xl">
                                                                {question.text}
                                                            </span>
                                                        </Radio.Button>
                                                    </div>
                                                    {detailCheck && (
                                                        <span className="text-xl font-normal mb-3 p-1" style= {{color: ['#34A853', '#E94444'].includes(question.color) ? question.color : '#000'}}>{value.translate_question[index]}</span>
                                                    )}
                                                </div>
                                            ))}
                                    </Radio.Group>
                                </div>
                            </Form.Item>
                        </div>
                    </div>
                ))}
                <div className='flex justify-center my-10'>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full sm:w-48 lg:w-56 bg-[#EAF4FF] text-black"
                    >
                        Nộp bài
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default QuestionForm;
