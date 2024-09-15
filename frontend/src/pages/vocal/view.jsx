import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import KanjiApi from '@/api/Vocal/kanji';
import HiraApi from '@/api/Vocal/hira';
import KataApi from '@/api/Vocal/kata';
import { useState, useEffect } from 'react';
import { Spin } from 'antd';

function Skills() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionKey } = location.state || {};
  const { getToken } = useAuth();
  const [listValues, setListValues] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleNavigate = (value) => {
    navigate(`/skills/vocal/${sectionKey}/${value}`, {
      state: { sectionKey: sectionKey, sectionValue: value },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = await getToken();

        if (sectionKey === 'Kanji') {
          const res = await KanjiApi.getKanji(token);
          if (res && res.data) {
            setListValues(res.data);
          }
        } else if (sectionKey === 'Hiragana') {
          const res = await HiraApi.getHira(token);
          if (res && res.data) {
            setListValues(res.data);
          }
        } else if (sectionKey === 'Katakana') {
          const res = await KataApi.getKata(token);
          if (res && res.data) {
            setListValues(res.data);
          }
        }
      } catch (error) {
        console.error(error);
        alert("Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getToken, sectionKey]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow mt-20">
        {loading ? (
          <Spin className="flex items-center justify-center" />
        ) : (
          <div className="flex flex-col px-4 md:px-52">
            <button
              onClick={() => navigate('/skills/vocal')}
              className="mt-5 w-10 h-10 text-2xl"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <div className="text-center text-4xl font-bold sm:text-5xl p-8">
              Chọn bài học
            </div>
            <div className="flex flex-col items-center justify-center mt-5 space-y-4">
              {listValues.map((value, index) => (
                <Button
                  key={index}
                  onClick={() => handleNavigate(value)}
                  className="w-60 bg-[#EAF4FF] text-[#000] flex items-center justify-center space-x-2 p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300 mb-5"
                >
                  {`Bài ${value}`}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Skills;
