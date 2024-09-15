import Header from '../components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom';
import UserApi from '@/api/User';
import { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Spin } from 'antd';

const sections = [
  "Từ vựng",
  "Ngữ pháp",
  "Đọc",
  "Nghe",
]

function Skills() {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to control the popup visibility

  const handleClick = (section) => {
    if (profile && profile.premium) {
      // Navigate to the appropriate section if the user is premium
      switch (section) {
        case "Từ vựng":
          navigate('/skills/vocal');
          break;
        case "Ngữ pháp":
          navigate('/skills/grammar');
          break;
        case "Đọc":
          navigate('/skills/read');
          break;
        case "Nghe":
          navigate('/skills/listen');
          break;
        default:
          break;
      }
    } else {
      // Show the popup if the user is not premium
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const params = {
          clerkUserId: user?.id,
        }
        if (token && user) {
          const response = await UserApi.getUser(token, params);
          if (response && response.data) {
            setProfile(response.data);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [getToken, user]);

  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow mt-20">
        {loading ? (
          <div className="flex justify-center mt-20 sm:mt-12 lg:mt-16">
            <Spin />
          </div>
        ) : (
          <div className="flex flex-col">
          <div className="text-center text-4xl font-bold sm:text-5xl p-8">
            Các khóa học tiếng Nhật cùng Night Owl
          </div>
          {sections.map((section, index) => (
            <div className="flex justify-center mb-10" key={index}>
              <Button 
                onClick={() => handleClick(section)} 
                className="w-60 bg-[#EAF4FF] text-[#000] flex items-center justify-center space-x-2 p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300">
                {section}
              </Button>
            </div>
          ))}
        </div>
        )}
      </div>
      <Footer />

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Tính năng chỉ dành cho thành viên Premium</h2>
            <p className="mb-4">Bạn cần nâng cấp lên Premium để truy cập tính năng này.</p>
            <div className="flex justify-end space-x-4">
              <Button onClick={closePopup} className="bg-gray-300 text-black p-2 rounded-lg">Đóng</Button>
              <Button onClick={() => navigate('/premium')} className="bg-black text-white p-2 rounded-lg">Nâng cấp ngay</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Skills;
