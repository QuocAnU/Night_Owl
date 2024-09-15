import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionApi from '@/api/Question';
import { useAuth } from '@clerk/clerk-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Spin, Button } from 'antd';
import CommentApi from '@/api/Comment';
import TopicComponent from '@/components/TopicComponent';
import CommentComponent from '@/components/CommentComponent';
import './styles.css'
import Result from '@/components/Result';
import QuestionForm from '@/components/QuestionForm';
import ImageSelection from '@/components/ImageSelection';

function ReadDetail() {
    const location = useLocation();
    const { sectionKey } = location.state || {};
    const { getToken } = useAuth();
    const navigate = useNavigate();
    const [dataList, setDataList] = useState([]);
    const [topics, setTopics] = useState();
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const [detailCheck, setDetailCheck] = useState(false);
    const [score, setScore] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [success, setSuccess] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (url) => {
    setSelectedImage(url);
  };

    const handleSubmit = async (values) => {
        try {
            const data = {
                values: values
            };
            const token = await getToken();
            const res = await QuestionApi.submitAnswer(data, token);
            if (res) {
                setScore(res.score);
                setTotalQuestions(res.totalScore);
                const results = res.results;
                const updateList = dataList.map((item) => {
                    const result = results.find((r) => r.questionId === item._id);
                    return {...item, questions: result.updatedQuestions};
                })
                setDataList(updateList);
                setSuccess(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleClickSubmit = async () => {
        console.log('Selected image:', selectedImage)
        const data = {
            questionId: dataList[0]._id,
            image: selectedImage
        };

        try {
            const res = await QuestionApi.submitAnswerImage(data);
            if (res) {
                setScore(res.score);
                setTotalQuestions(res.totalQuestions);
                setSuccess(true);
            }
        } catch (error) {
            console.error(error);
        }

    }

    const handleClickDetail = () => {
        setDetailCheck(!detailCheck);
        setSuccess(false);
    }

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        try {
            const token = await getToken();
            const newCommentData = {
                content: newComment,
                from: `read_${sectionKey}`,
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getToken();
                const sectionParams = { 
                    group: 'read',
                    section: sectionKey 
                };
                const resourceResponse = await QuestionApi.getReads(token, sectionParams);

                const fromParams = {
                    from: `read_${sectionKey}`,
                };

                const commentsResponse = await CommentApi.getComments(token, fromParams);
                if (resourceResponse?.data) {
                    setDataList(resourceResponse.data.questions);
                    setTopics(resourceResponse.data.topics);
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
    }, [getToken, sectionKey]);

    if(success) {
        return (
            <Result score={score} totalQuestions={totalQuestions} onDetailClick={handleClickDetail} sectionKey={sectionKey} keys={"đọc"} title={"của phần đọc hiểu"} />
        );
    }

    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            {loading ? (
                <div className='flex justify-center mt-20 sm:mt-12 lg:mt-16'>
                    <Spin />
                </div>
            ) : (
                <div className='container mx-auto mt-16 sm:mt-16 lg:mt-20'>
                    <button
                        onClick={() => navigate('/skills/read')}
                        className="mt-10 w-4"
                    >
                        <i className="fa-solid fa-arrow-left fa-xl"></i>
                    </button>
                    <div className="text-center text-4xl font-bold sm:text-5xl">
                        Luyện đọc
                    </div>

                    <div className='text-center text-3xl font-bold sm:text-4xl pt-6'>
                        Bài {sectionKey}
                    </div>
                    {topics ? (
                        <>
                            <TopicComponent topics={topics} detailCheck={detailCheck}   />
                            <QuestionForm dataList={dataList} detailCheck={detailCheck} onSubmit={handleSubmit} />
                        </>
                    ) : (
                        <>
                        <ImageSelection 
                            dataList={dataList} 
                            detailCheck={detailCheck} 
                            onImageClick={handleImageClick} 
                            selectedImage={selectedImage}
                            onSubmit={handleClickSubmit}
                        />
                        </>
                       
                    )}
                </div>
            )}
            {detailCheck && (   
                <div className='flex justify-center m-8'>
                              <Button
                                onClick={() => navigate(`/skills/read`)}
                                className="w-64 sm:w-48 lg:w-56 bg-[#6BDCFF4F] text-[#000] border border-[#0666F6C2] flex items-center justify-center space-x-2 p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300"
                              >
                                <span>Luyện đọc</span>
                                <i className="fa-solid fa-arrow-right"></i>
                              </Button>
                            </div>
            )}
            <div className='container flex flex-col'>
                <CommentComponent comments={comments} handleCommentSubmit={handleCommentSubmit} newComment={newComment} handleCommentChange={handleCommentChange} />
            </div>
            <Footer />
        </div>
    )
}

export default ReadDetail;
