import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth, useClerk } from '@clerk/clerk-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Spin, Button } from 'antd';
import CommentApi from '@/api/Comment';
import CommentComponent from '@/components/CommentComponent';
import './styles.css'
import Result from '@/components/Result';
import TestApi from '@/api/Test';
import TestVocalComponent from '@/components/TestVocal';

function TestVocalDetail() {
    const location = useLocation();
    const { sectionKey } = location.state || {};
    const { getToken } = useAuth();
    const {user} = useClerk();
    const navigate = useNavigate();
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const [detailCheck, setDetailCheck] = useState(false);
    const [score, setScore] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [success, setSuccess] = useState(false);

    const [userSelect, setUserSelect] = useState();
    const handleSubmit = async (values) => {
        console.log(values);
        setUserSelect(values);
        try {
            const data = {
                values: values
            };
            const token = await getToken();
            const res = await TestApi.submitVocalAnswer(data, token);
            if (res) {
                setScore(res.score);
                setTotalQuestions(res.totalQuestions);
                setDataList(res.questions);
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
                from: `test_vocal_${sectionKey}`,
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getToken();
                const sectionParams = { 
                    section: sectionKey 
                };
                const resourceResponse = await TestApi.getTestVocal(token, sectionParams);

                const fromParams = {
                    from: `test_vocal_${sectionKey}`,
                };

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
    }, [getToken, sectionKey]);

    if(success) {
        return (
            <Result score={score} totalQuestions={totalQuestions} onDetailClick={handleClickDetail} sectionKey={sectionKey}
            keys={"kiểm tra"}
            title={"của phần kiểm tra từ vựng"} />
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
                <div className='container mx-auto mt-20 sm:mt-12 lg:mt-16'>
                    <button
                        onClick={() => navigate('/tests/vocal')}
                        className="mt-10 w-4"
                    >
                        <i className="fa-solid fa-arrow-left fa-xl"></i>
                    </button>
                    <div className='text-center text-3xl font-bold sm:text-4xl pt-6'>
                        Bài {sectionKey}
                    </div>
                    <div>
                        <TestVocalComponent dataList={dataList} detailCheck={detailCheck} userSelect={userSelect} onSubmit={handleSubmit} />
                    </div>
                </div>
            )}
            {detailCheck && (   
                <div className='flex justify-center m-8'>
                              <Button
                                onClick={() => navigate(`/tests/vocal`)}
                                className="w-60 sm:w-48 lg:w-56 bg-[#6BDCFF4F] text-[#000] border border-[#0666F6C2] flex items-center justify-center space-x-2 p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300"
                              >
                                <span>Quay lại test</span>
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

export default TestVocalDetail;
