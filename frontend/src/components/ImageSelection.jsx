/* eslint-disable react/prop-types */
import { Button } from 'antd';

function ImageSelection({ dataList, detailCheck, onImageClick, selectedImage, onSubmit }) {
    return (
        <div>
            <div className='flex flex-col text-center mt-12'>
                <div className='flex flex-col border-2 border-gray-300 rounded-3xl'>
                    <span className='px-20 py-10 font-normal text-2xl'>
                        {dataList[0].name}
                    </span>
                    {detailCheck && (
                        <span className='px-20 pb-10 font-normal text-2xl'>
                            {dataList[0].translate}
                        </span>
                    )}
                </div>
                <div className='mt-10 px-8 flex justify-start'>
                    {detailCheck ? (
                    <span className='text-xl font-bold'>
                        Đáp án:
                    </span>
                ) : (
                    <span className='text-xl font-normal'>Dựa vào thông tin của đoạn văn trên, hãy chọn hình ảnh mô tả đúng:</span>
                )}
                </div>
                {detailCheck ? (
                    <div className='mt-10 mb-4 px-4 flex justify-center'>
                        <img src={dataList[0].answer} alt="image" width="50%" height="auto" />
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center mt-10 px-10'>
                        {dataList[0].questions.map((value, index) => (
                            <div 
                                key={index} 
                                className={`border-4 ${selectedImage === value ? 'border-green-500' : ''}`} 
                                onClick={() => onImageClick(value)}
                            >
                                <img
                                    src={value}
                                    alt={`Option ${index + 1}`}
                                    className="w-full h-full object-contain cursor-pointer"
                                />
                            </div>
                        ))}
                    </div>
                )}
                {!detailCheck && (
                  <div className='flex justify-center my-10'>
                    <Button
                        type="primary"
                        onClick={onSubmit}
                        className="w-64 sm:w-48 lg:w-56 bg-[#EAF4FF] text-black"
                    >
                        Nộp bài
                    </Button>
                </div>  
                )}
            </div>
        </div>
    );
}

export default ImageSelection;
