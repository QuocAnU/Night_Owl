/* eslint-disable react/prop-types */
import { Form, Select, Button } from 'antd';

function QuestionBlock({ value, index, userSelect, detailCheck }) {
    let selected = null;
    if (userSelect) {
        selected = userSelect[value._id];
    }

    return (
        <div key={index} className="pt-4 px-4 sm:px-8 lg:px-10 flex flex-col sm:flex-row justify-center items-center">
            <div className="flex items-center flex-col sm:flex-row">
                <div className="px-4 pt-4 w-full sm:w-auto">
                    <img src={value.image} alt={value.name} className="max-w-full h-auto" />
                </div>
                
                {!detailCheck && (
                    <Form.Item
                        key={value._id}
                        name={value._id}
                        rules={[{ required: true, message: 'Please select an answer!' }]}
                        className="w-full sm:w-auto"
                    >
                        <Select placeholder="Please select" className="w-full sm:w-64">
                            {value.select?.map((option, index) => (
                                <Select.Option key={index} value={option}>
                                    {option}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}

                {detailCheck && (
                    <div className="flex flex-col sm:flex-row mt-4 sm:mt-0">
                        <div
                            className="text-lg font-medium mx-2 my-2 sm:my-0 p-2 border-2 rounded-lg"
                            style={{
                                color: value.score === 1 ? '#34A853' : '#E94444',
                                borderColor: value.score === 1 ? '#34A853' : '#E94444'
                            }}
                        >
                            {selected}
                        </div>
                        <div className="text-lg font-medium mx-2 my-2 sm:my-0 p-2 border-2 border-[#34A853] rounded-lg text-[#34A853]">
                            {value.answer}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function TestVocalComponent({ dataList, detailCheck, userSelect, onSubmit }) {
    return (
        <div className="mt-5 flex flex-col justify-center">
            <div className="mt-10 mb-4 px-4 flex justify-center">
                <span className="text-xl sm:text-2xl font-normal text-center">Dựa vào hình ảnh, hãy chọn từ Hiragana tương ứng:</span>
            </div>
            
            <Form onFinish={onSubmit}>
                {dataList.map((value, index) => (
                    <QuestionBlock key={index} value={value} index={index} userSelect={userSelect} detailCheck={detailCheck} />
                ))}

                {!detailCheck && (
                    <div className="flex justify-center my-10">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-48 sm:w-64 lg:w-56 bg-[#EAF4FF] text-black"
                        >
                            Nộp bài
                        </Button>
                    </div>
                )}
            </Form>
        </div>
    );
}

export default TestVocalComponent;
