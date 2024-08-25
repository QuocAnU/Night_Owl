import Header from '@/components/Header'
import Footer from '@/components/Footer'

import Alphabet from '../assets/Image/Figma/FL1/type_alphabet.jpg'
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';

const sections = [
  "Bảng chữ cái tiếng Nhật, bao gồm Hiragana, Katakana và Kanji, đóng vai trò vô cùng quan trọng trong việc học và sử dụng ngôn ngữ này.",
  "Hiragana và Katakana là các chữ tượng âm còn chữ Hán là chữ tượng hình, vừa biểu thị âm đồng thời vừa biểu thị nghĩa.",
  "Câu trong tiếng Nhật thông thường được viết bằng chữ Hiragana, Katakana, chữ Hán. Tên người, địa danh nước ngoài hoặc các từ ngoại lai được viết bằng chữ Katakana.",
  "Chữ Latinh (Romaji) cũng được dùng khi viết dành cho đối tượng là người nước ngoài.",
  "Đối với người mới bắt đầu học tiếng Nhật, bảng chữ cái Hiragana và Katakana là rất quan trọng. Do đó, trong phần Free Lesons này hãy cùng Night Owl làm quen với 2 bảng chữ cái này nhé!"
];

const tips = [
  "Mẹo học thuộc bảng chữ cái nhanh và nhớ lâu",
  "Mẹo 1: Học bảng chữ cái tiếng Nhật bằng Flashcard",
  "Mẹo 2: Học bảng chữ cái tiếng Nhật song song nhau",
  "Mẹo 3: Học bảng chữ cái tiếng Nhật qua hình ảnh minh họa",
  "Mẹo 4: Học mọi lúc mọi nơi",
  "Mẹo 5: Tập viết các chữ cái"
];

function FreeLessons() {
   const navigate = useNavigate();
  const imageStyles = "flex flex-col items-center";
  const textClasses = "text-left text-xl font-normal sm:text-2xl pb-2 px-16";
  const textTips = "text-left text-xl font-semibold sm:text-2xl pb-2 text-red-800 px-16";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleNavigate = () => {
    navigate('/freeLessons/Hiragana&Katakana');
  };
  return (
    <div>
      <Header/>
      <div className='mt-16'>
        <div className='flex flex-col px-20'>
          <div className="text-center text-4xl font-bold sm:text-5xl p-8  ">
            Bảng chữ cái tiếng Nhật
          </div>
           {sections.map((text, index) => (
              <section key={index} className={textClasses}>
                {text}
              </section>
            ))}
          <div className={imageStyles}>
            <img src={Alphabet} alt="alphabet" className="mb-10 mt-10" />
          </div>

          {tips.map((tip, index) => (
            <section key={index} className={textTips}>
              {tip}
            </section>
          ))}

          <div className='text-left text-xl font-medium sm:text-2xl pt-8 pb-10 px-16'>
            Tiếp theo, hãy cùng Night Owl học 2 bảng chữ cái Hiragana và Katakana và sau đó sẽ làm 1 bài test nho nhỏ để kiểm tra kiến thức một chút nhé!
          </div>

          <div className="flex justify-center mb-10">
            <Button 
              onClick={handleNavigate} 
              className="w-60 bg-[#6BDCFF4F] text-[#000] border border-[#0666F6C2] flex items-center justify-center space-x-2 p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300">
              <i className="fa-solid fa-arrow-right"></i>
              <span>Hiragana & Katakana</span>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default FreeLessons
