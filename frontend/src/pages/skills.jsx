import React from 'react'
import Header from '../components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom';

const sections = [
  "Từ vựng",
  "Ngữ pháp",
  "Đọc",
  "Nghe",
]

function Skills() {
  const navigate = useNavigate();

  const handleClick = (section) => {
    switch (section) {
      case "Từ vựng":
        navigate('/skills/vocal');
        break;
      case "Ngữ pháp":
        navigate('/free-test');
        break;
      case "Đọc":
        navigate('/free-test');
        break;
      case "Nghe":
        navigate('/free-test');
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow mt-16">
        <div className="flex flex-col px-52">
          <div className="text-center text-4xl font-bold sm:text-5xl p-8">
            Các khóa học tiếng Nhật cùng Night Owl
          </div>
          {sections.map((section, index) => (
            <div className="flex justify-center mb-10" key={index}>
              <Button 
                onClick={() => handleClick(section)} className="w-60 bg-[#EAF4FF] text-[#000] flex items-center justify-center space-x-2 p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300">
                {section}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Skills
