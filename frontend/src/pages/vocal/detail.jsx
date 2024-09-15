import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import KanjiApi from '@/api/Vocal/kanji';
import HiraApi from '@/api/Vocal/hira';
import KataApi from '@/api/Vocal/kata';
import CommentApi from '@/api/Comment';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import { Spin, Button } from 'antd';
import { useAuth, useUser } from '@clerk/clerk-react';
import CommentComponent from '@/components/CommentComponent';
import './styles.css';

function VocabularyTest() {
  const { section } = useParams();
  const location = useLocation();
  const { sectionValue } = location.state || {};
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const sectionParams = { section: sectionValue };
        const fromParams = { from: `vocal_${section}` };

        let resourceResponse;
        if (section === 'Kanji') {
          resourceResponse = await KanjiApi.getKanjiBySection(token, sectionParams);
        } else if (section === 'Hiragana') {
          resourceResponse = await HiraApi.getHiraBySection(token, sectionParams);
        } else if (section === 'Katakana') {
          resourceResponse = await KataApi.getKataBySection(token, sectionParams);
        }

        const commentsResponse = await CommentApi.getComments(token, fromParams);

        if (resourceResponse?.data) {
          setDataList(resourceResponse.data);
        }

        if (commentsResponse?.data) {
          setComments(commentsResponse.data);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [section, sectionValue, getToken]);

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

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const token = await getToken();
      const newCommentData = {
        content: newComment,
        from: `vocal_${section}`,
        clerkUserId: user?.id,
      };
      const res = await CommentApi.createComment(token, newCommentData);
      if (res && res.data) {
        setComments([...comments, res.data]);
        setNewComment('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const item = dataList[currentIndex] || {};

  return (
    <div className="flex flex-col bg-white min-h-screen overflow-auto">
      <Header />
      {loading ? (
        <div className="mt-20 sm:mt-12 lg:mt-16 flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <div className="mt-20 sm:mt-16 lg:mt-20">
          <button
            onClick={() => navigate(`/skills/vocal/${section}`, { state: { sectionKey: section } })}
            className="mt-8 ml-4 sm:ml-8 w-4"
          >
            <i className="fa-solid fa-arrow-left fa-xl"></i>
          </button>
          <div className="flex flex-col lg:flex-row px-8 pt-4 bg-white">
            {/* Vocabulary Section */}
            <div className="flex-auto px-4 sm:px-8">
              <h1 className="text-center text-2xl sm:text-3xl lg:text-5xl font-bold">Từ Vựng</h1>

              {item && (
                <div className="relative bg-[#f8f9fa] p-4 sm:p-6 rounded-xl shadow-lg flex flex-col lg:flex-row items-center space-y-4 lg:space-x-4 lg:space-y-0 w-full">
                  <div className="flex-shrink-0">
                    <img src={item.image} alt="Vocabulary" className="h-32 w-32 sm:h-48 sm:w-48 rounded-lg object-cover" />
                  </div>
                  <hr className="hidden lg:block w-0.5 h-48 bg-gray-300" />
                  <div
                    className="flex-grow text-center text-gray-500"
                    onClick={handleToggle}
                  >
                    {showDetails ? (
                      <div className="flex flex-col justify-center ">
                        <div className="flex justify-center mb-4">
                          <ReactAudioPlayer
                            src={item.sound}
                            controls
                          />
                        </div>
                        {item.Kanji ? (
                          <>
                            <span className="text-xl sm:text-2xl lg:text-4xl font-semibold mb-4">{item.Kanji}</span>
                            <span className="text-xl sm:text-2xl lg:text-4xl mb-4">{`(${item.Hiragana})`} {item.Romaji}</span>
                          </>
                        ) : (
                          <>
                            <span className="text-xl sm:text-2xl lg:text-4xl font-semibold mb-4">
                              {item.Katakana ? item.Katakana : item.Hiragana}
                              {` (${item.Romaji}):`}
                            </span>
                          </>
                        )}
                        <span className="text-xl sm:text-2xl lg:text-4xl mb-4">{item.meaning}</span>
                        <span className="text-xs text-gray-500">{`(${item.type})`}</span>
                      </div>
                    ) : (
                      <p className="text-xl sm:text-2xl lg:text-4xl font-normal text-[#D1D1D1]">Meaning and example</p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-between space-x-4 mt-8">
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
              <div className="flex justify-center items-center mb-4">
                <Button
                  onClick={() => navigate(`/tests/vocal`)}
                  className="bg-[#EAF4FF] text-black"
                  type="primary"
                >
                  <i className="fa-solid fa-arrow-right"></i>
                  <span className="text-lg p-2">Cùng làm test nhé!</span>
                </Button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="flex-1 px-4 sm:px-8">
              <CommentComponent
                comments={comments}
                handleCommentSubmit={handleCommentSubmit}
                newComment={newComment}
                handleCommentChange={handleCommentChange}
              />
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default VocabularyTest;
