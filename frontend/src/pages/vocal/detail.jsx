import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import KanjiApi from '@/api/Vocal/kanji';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';

function VocabularyTest() {
  const { section } = useParams();
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (section === 'Kanji') {
          const res = await KanjiApi.getKanji();
          if (res && res.data) {
            setDataList(res.data);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [section]);

  const handleToggle = () => {
    setShowDetails(!showDetails);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dataList.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? dataList.length - 1 : prevIndex - 1
    );
  };

  const item = dataList[currentIndex] || {};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <div className="flex flex-col bg-white">
      <Header />
      <div className='mt-8 sm:mt-12 lg:mt-16'>
        <button
            onClick={() => navigate('/skills/vocal')}
            className="mt-8 ml-20 w-4"
          >
            <i className="fa-solid fa-arrow-left fa-xl"></i>
          </button>
        <div className="flex flex-col items-center bg-white">
          {/* Title */}
          <h1 className="text-center text-3xl font-bold sm:text-5xl p-8">Từ Vựng</h1>

          {/* Main Content */}
          {item && (
            <div className="relative bg-[#f8f9fa] p-6 rounded-xl shadow-lg flex items-center space-x-4 max-w-4xl w-full">
              {/* Image Section */}
              <div className="flex-shrink-0">
                <img src={item.image} alt="Vocabulary" className="h-48 w-48 rounded-lg object-cover" />
              </div>
              <hr className="w-0.5 h-48 bg-gray-300 transform !mx-8" />
              <div
                className="flex-grow text-center text-gray-500"
                onClick={handleToggle}
              >
                {showDetails ? (
                  <div className="flex flex-row justify-around">
                    <div className="flex flex-col mt-6">
                      <p className="font-semibold">{item.Kanji}</p>
                      <p className="text-sm mb-8">{`(${item.Hiragana})`} {item.Romaji}</p>
                      <p className="text-sm">{item.meaning}</p>
                      <p className="text-xs text-gray-500">{`(${item.type})`}</p>
                    </div>
                    <div>
                      <ReactAudioPlayer
                        src={item.sound} // URL to your audio file
                        controls
                      />
                    </div>
                  </div>
                ) : (
                  <p className="font-semibold">Meaning and example</p>
                )}
              </div>
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-end space-x-4 mt-8">
            <button
              className="py-2 px-4 rounded-lg"
              onClick={handlePrevious}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button
              className="py-2 px-4 rounded-lg"
              onClick={handleNext}
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          {/* CTA Button */}
          <button className="mt-8 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            → Cùng làm test nhé!
          </button>
        </div>
      </div>
      <Footer />
    </div>

  );
}

export default VocabularyTest;
