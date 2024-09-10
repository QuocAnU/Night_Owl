/* eslint-disable react/prop-types */
import { Form, Select, Button } from 'antd';

function QuestionBlock({ value, index, userSelect, detailCheck }) {
   
    let selected =  null;
    if(userSelect) {
        selected = userSelect[value._id];
    }
     console.log("check",selected);
    return (
        <div key={index} className="pt-4 px-10 flex justify-center items-center">
            <div className="flex items-center">
                <div className="px-10 pt-4">
                    <div>
                        <img src={value.image} alt={value.name} />
                    </div>
                </div>
                {!detailCheck && (
                    <Form.Item
                    key={value._id}
                    name={value._id}
                    rules={[{ required: true, message: 'Please select an answer!' }]}
                >
                    <Select placeholder="Please select">
                        {value.select?.map((option, index) => (
                            <Select.Option key={index} value={option}>
                                {option}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                )}
                
                {detailCheck && (
                    <div className='flex flex-row'>
                        <div className='text-lg font-medium mx-5 border-2 rounded-lg p-2'
                        style={{ color: value.score === 1 ? '#34A853' : '#E94444' , borderColor: value.score === 1 ? '#34A853' : '#E94444' }}
                        >
                            {selected}
                        </div>
                        <div className='text-lg font-medium mx-5 border-2 border-[#34A853] rounded-lg p-2 text-[#34A853]'>
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
        <div className='mt-5 flex flex-col justify-center'>
            <div className='mt-10 mb-4 px-4 flex justify-center'>
                <span className='text-xl font-normal'>Dựa hình ảnh hãy chọn từ Hiragana tương ứng: </span>
            </div>
            <Form onFinish={onSubmit}>
                {dataList.map((value, index) => (
                    <QuestionBlock key={index} value={value} index={index} userSelect={userSelect} detailCheck={detailCheck} />
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

export default TestVocalComponent;