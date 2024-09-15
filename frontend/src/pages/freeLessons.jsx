import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Alphabet from '../assets/Image/Figma/FL1/type_alphabet.jpg';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const sections = [
  "Bảng chữ cái tiếng Nhật, bao gồm Hiragana, Katakana và Kanji, đóng vai trò vô cùng quan trọng trong việc học và sử dụng ngôn ngữ này.",
  "Hiragana và Katakana là các chữ tượng âm còn chữ Hán là chữ tượng hình, vừa biểu thị âm đồng thời vừa biểu thị nghĩa.",
  "Câu trong tiếng Nhật thông thường được viết bằng chữ Hiragana, Katakana, chữ Hán. Tên người, địa danh nước ngoài hoặc các từ ngoại lai được viết bằng chữ Katakana.",
  "Chữ Latinh (Romaji) cũng được dùng khi viết dành cho đối tượng là người nước ngoài.",
  "Đối với người mới bắt đầu học tiếng Nhật, bảng chữ cái Hiragana và Katakana là rất quan trọng. Do đó, trong phần Free Lessons này hãy cùng Night Owl làm quen với 2 bảng chữ cái này nhé!"
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
  const textClasses = "text-left text-lg font-normal sm:text-xl md:text-2xl pb-4 px-4 sm:px-8 md:px-16";
  const textTips = "text-left text-lg font-semibold sm:text-xl md:text-2xl pb-4 text-red-800 px-4 sm:px-8 md:px-16";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigate = () => {
    navigate('/freeLessons/Hiragana&Katakana');
  };

  return (
    <div>
      <Header />
      <div className='mt-20 container'>
        <div className='flex flex-col'>
          <div className="text-center text-3xl font-bold sm:text-4xl md:text-5xl p-6 sm:p-8">
            Bảng chữ cái tiếng Nhật
          </div>
          {sections.map((text, index) => (
            <section key={index} className={textClasses}>
              {text}
            </section>
          ))}
          <div className={imageStyles}>
            <img src={Alphabet} alt="alphabet" className="mb-8 mt-8 w-full max-w-md sm:max-w-lg md:max-w-xl" />
          </div>
          {tips.map((tip, index) => (
            <section key={index} className={textTips}>
              {tip}
            </section>
          ))}
          <div className='text-left text-lg font-medium sm:text-xl md:text-2xl pt-6 pb-8 px-4 sm:px-8 md:px-16'>
            Tiếp theo, hãy cùng Night Owl học 2 bảng chữ cái Hiragana và Katakana và sau đó sẽ làm 1 bài test nho nhỏ để kiểm tra kiến thức một chút nhé!
          </div>
          <div className="flex justify-center mb-8">
            <Button 
              onClick={handleNavigate} 
              className="w-48 sm:w-56 md:w-60 bg-[#6BDCFF4F] text-[#000] border border-[#0666F6C2] flex items-center justify-center space-x-2 p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300">
              <i className="fa-solid fa-arrow-right"></i>
              <span>Hiragana & Katakana</span>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FreeLessons;
