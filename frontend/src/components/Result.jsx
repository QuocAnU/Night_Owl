/* eslint-disable react/prop-types */
import { Button } from 'antd';
import Header from './Header';
import Footer from './Footer';

function Result({ score, totalQuestions, onDetailClick, sectionKey, title, keys }) {
    const ave = Math.round((score / totalQuestions) * 100);
    console.log(ave);
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <main className="flex-grow">
                <div className='mt-20 px-4 sm:px-8 md:px-16 lg:px-32'>
                    <div className="flex flex-col justify-center items-center px-4 sm:px-8 lg:px-16">
                        <div className='text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl p-4 sm:p-6 lg:p-8'>Kết quả</div>
                        <div className='text-center text-1xl font-bold sm:text-2xl md:text-3xl lg:text-4xl p-4 sm:p-6 lg:p-8'>{score}/{totalQuestions}</div>
                        <div className='mb-2'>{`Chúc mừng bạn đã hoàn thành bài ${keys} ${sectionKey} ${title}.`}</div>
                        {ave >= 50 ? (
                            <div className='mb-4'>Thật tuyệt! Hãy cố gắng duy trì thành tích này nhé!</div>
                        ) : (
                            <div className='mb-4'>Hãy cố gắng xem kỹ lỹ thuyết hơn để đạt được điểm cao hơn ở lần sau bạn nhé!</div>
                        )}
                        <Button 
                            onClick={onDetailClick}
                            className="w-64 sm:w-48 lg:w-56 bg-[#6BDCFF4F] text-[#000] border border-[#0666F6C2] flex items-center justify-center space-x-2 p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300 my-4"
                        >
                            <span>Xem kết quả chi tiết</span>
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Result;
