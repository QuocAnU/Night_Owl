import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate} from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

import hira from '@/assets/Image/Figma/FL2/hira.jpg';
import hira1 from '@/assets/Image/Figma/FL2/hiragana_anh.jpg';
import hira2 from '@/assets/Image/Figma/FL2/hiragana_anh2.jpg';
import hira3 from '@/assets/Image/Figma/FL2/hiragana_anh3.jpg';
import hira4 from '@/assets/Image/Figma/FL2/hiragana_anh4.jpg';
import hira5 from '@/assets/Image/Figma/FL2/hiragana_anh5.jpg';
import hira6 from '@/assets/Image/Figma/FL2/hiragana_anh6.jpg';
import hira7 from '@/assets/Image/Figma/FL2/hiragana_anh7.jpg';
import hira8 from '@/assets/Image/Figma/FL2/hiragana_anh8.jpg';
import hira9 from '@/assets/Image/Figma/FL2/hiragana_anh9.jpg';

import kata from '@/assets/Image/Figma/FL2/kata2.jpg';
import kata1 from '@/assets/Image/Figma/FL2/kata_anh.jpg';
import kata2 from '@/assets/Image/Figma/FL2/kata_anh2.jpg';
import kata3 from '@/assets/Image/Figma/FL2/kata_anh3.jpg';
import kata4 from '@/assets/Image/Figma/FL2/kata_anh4.jpg';
import kata5 from '@/assets/Image/Figma/FL2/kata_anh5.jpg';
import kata6 from '@/assets/Image/Figma/FL2/kata_anh6.jpg';
import kata7 from '@/assets/Image/Figma/FL2/kata_anh7.jpg';
import kata8 from '@/assets/Image/Figma/FL2/kata_anh8.jpg';
import kata9 from '@/assets/Image/Figma/FL2/kata_anh9.jpg';

const hiraganaSections = [
  "Hiragana:",
  "Bảng chữ cái Hiragana là bảng chữ cái mềm cơ bản nhất mà bất kỳ ai học tiếng Nhật cũng đều phải biết.",
  "Bảng chữ cái Hiragana gồm có 71 chữ và có 5 nguyên âm あ(a) – い(i) – う(u) – え(e) – お(o). Các nguyên âm này đứng sau phụ âm, và bán nguyên âm để thạo thành đơn vị âm."
];

const katakanaSections = [
  "Katakana:",
  "Katakana là một trong hai bảng chữ cái của người Nhật, nó sẽ là cột mốc đầu tiên cho hành trình học Tiếng Nhật về sau của bạn.",
  "Chữ Katakana được tạo thành từ các nét thẳng, nét cong và nét gấp khúc có phần giống với các nét trong chữ Hán. Do vậy chữ Katakana còn được gọi là “chữ cứng” trong Tiếng Việt.",
  "Bảng chữ cái Katakana gồm 46 âm cơ bản và các dạng biến thể của nó bao gồm: Âm đục, Âm ghép, Âm ngắt và Trường âm."
];

function FreeLessonsB() {
  const navigate = useNavigate();
  const {  isSignedIn } = useUser();
  const [showPopup, setShowPopup] = useState(false); 

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const imageStyles = "flex flex-col items-center";
  const textClasses = "text-left text-base font-normal sm:text-lg md:text-xl lg:text-2xl pb-4 px-4 sm:px-8 lg:px-16";
  const textClasses_1 = "text-left text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl pb-4 px-4 sm:px-8 lg:px-16";
  const imagesHira = [hira, hira1, hira2, hira3, hira4, hira5, hira6, hira7, hira8, hira9];
  const imagesKata = [kata, kata1, kata2, kata3, kata4, kata5, kata6, kata7, kata8, kata9];

  const handleBackClick = () => {
    navigate('/freeLessons');
  };

  const handleTestClick = () => {
    if (isSignedIn) {
      navigate('/freeTest');
    } else {
      setShowPopup(true);
    }
  };

  const handleConfirmLogin = (confirm) => {
    setShowPopup(false);
    if (confirm) {
      navigate('/login', { state: { redirectTo: "/freeTest" } });
    }
  };

  return (
    <div>
      <Header />
      <div className='mt-20 container'>
        <div className='flex flex-col'>
          <div className="text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl p-4 sm:p-6 lg:p-8">
            Bảng chữ cái tiếng Nhật
          </div>
          {hiraganaSections.map((text, index) => (
            <section key={index} className={index === 0 ? textClasses_1 : textClasses}>
              {text}
            </section>
          ))}
          <div className={imageStyles}>
            {imagesHira.map((img, index) => (
              <img key={index} src={img} alt={`Hiragana Image ${index + 1}`} className="mb-8 mt-8 w-full max-w-md sm:max-w-lg md:max-w-xl" />
            ))}
          </div>

          {katakanaSections.map((text, index) => (
            <section key={index} className={index === 0 ? textClasses_1 : textClasses}>
              {text}
            </section>
          ))}

          <div className={imageStyles}>
            {imagesKata.map((img, index) => (
              <img key={index} src={img} alt={`Katakana Image ${index + 1}`} className="mb-8 mt-8 w-full max-w-md sm:max-w-lg md:max-w-xl" />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button 
              onClick={handleBackClick}
              className="w-full sm:w-48 lg:w-56 bg-[#6BDCFF4F] text-[#000] border border-[#0666F6C2] flex items-center justify-center space-x-2 p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300">
              <i className="fa-solid fa-arrow-left"></i>
              <span>Quay lại</span>
            </Button>

            <Button 
              onClick={handleTestClick}
              className="w-full sm:w-48 lg:w-56 bg-[#6BDCFF4F] text-[#000] border border-[#0666F6C2] flex items-center justify-center space-x-2 p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300">
              <span>Cùng làm Test nhé!</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4">Bạn cần đăng nhập để làm bài test nhé.</p>
            <div className="flex justify-end space-x-4">
              <Button onClick={closePopup} className="bg-gray-300 text-black p-2 rounded-lg">Đóng</Button>
              <Button onClick={() => handleConfirmLogin(true)} className="bg-black text-white p-2 rounded-lg">Đăng nhập</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FreeLessonsB;
