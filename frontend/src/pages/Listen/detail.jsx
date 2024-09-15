import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionApi from '@/api/Question';
import { useAuth } from '@clerk/clerk-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Spin, Form, Button, Input, Row, Col } from 'antd';
import CommentApi from '@/api/Comment';
import CommentComponent from '@/components/CommentComponent';
import './styles.css'
import Result from '@/components/Result';
import ReactAudioPlayer from 'react-audio-player';

function ListenDetail() {
    const location = useLocation();
    const { sectionKey } = location.state || {};
    const { getToken } = useAuth();
    const navigate = useNavigate();
    const [dataList, setDataList] = useState();
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const [detailCheck, setDetailCheck] = useState(false);
    const [score, setScore] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [success, setSuccess] = useState(false);

    const [userAnswer, setUserAnswer] = useState();



    const handleSubmit = async (values) => {
        const extractedValues = Object.values(values);
        try {
            const data = {
                values: extractedValues,
                section: sectionKey
            };

            const token = await getToken();
            const res = await QuestionApi.submitAnswerListen(data, token);
            if (res) {
                setScore(res.score);
                setTotalQuestions(res.totalQuestions);
                setSuccess(true);
                setUserAnswer(extractedValues);
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
                    group: 'listen',
                    section: sectionKey 
                };
                const resourceResponse = await QuestionApi.getReads(token, sectionParams);

                const fromParams = {
                    from: `listen_${sectionKey}`,
                };

                const commentsResponse = await CommentApi.getComments(token, fromParams);
                if (resourceResponse?.data) {
                    setDataList(resourceResponse.data[0]);
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
            keys={"nghe"}
            title={"của phần luyện nghe"}
            />
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
                        onClick={() => navigate('/skills/listen')}
                        className="mt-10 w-4"
                    >
                        <i className="fa-solid fa-arrow-left fa-xl"></i>
                    </button>
                    <div className="text-center text-4xl font-bold sm:text-5xl">
                        Luyện nghe
                    </div>

                    <div className='text-center text-3xl font-bold sm:text-4xl pt-6'>
                        Bài {sectionKey}
                    </div>

                    <div className='text-left text-2xl font-normal sm:text-2xl py-4'>
                        Hãy nghe đoạn văn bên dưới và điền vào chỗ trống những từ còn thiếu:
                    </div>

                    <div className='flex flex-col justify-center items-center border rounded-lg mt-4'>
                        <div className='flex justify-center py-4'>
                            <img src={dataList.name} alt={dataList.name} />
                        </div>
                        {detailCheck && (
                            <div className='flex justify-center'>
                                <img src={dataList.translate} alt={dataList.translate} />
                            </div>
                        )}
                        <div className='flex justify-center mb-6'>
                            <ReactAudioPlayer
                            src={dataList.sound}
                            controls
                            />
                        </div>
                    </div>
                    <Form
                        className='mt-6'
                        layout="vertical"
                        name='listen'
                        onFinish={handleSubmit}>
                            <div className='flex flex-col justify-center'>
                            {dataList.questions.map((question, index) => (
                                <Form.Item
                                    key={index}
                                    name={question}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng trả lời câu hỏi!',
                                        },
                                    ]}
                                >
                                    <>
                                    <Row gutter={[16, 16]}>
                                        <Col xs={24} sm={12} md={8}>
                                        <div className="flex flex-row items-center justify-center p-2">
                                            <span className="text-lg font-semibold">{question}</span>
                                            <i className="fa-solid fa-arrow-right fa-lg mx-4"></i>
                                            {detailCheck ? (
                                                <span className="text-lg font-semibold">{userAnswer[index]}</span>
                                            ): (
                                                <Input
                                                placeholder="..."
                                                className="w-1/3"
                                                />
                                            )}
                                            
                                        </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={8}>
                                        </Col>
                                        {detailCheck && (
                                            <Col xs={24} sm={12} md={8}>
                                            <div className="flex flex-row items-center justify-center">
                                                <span className="text-lg font-semibold bg-[#EAF4FF] p-2">{dataList.answer[index]}</span>
                                            </div>
                                            </Col>
                                            )}
                                    </Row>
                                    </>                                    
                                </Form.Item>
                            ))}
                            {!detailCheck && (
                              <div className='flex justify-center'>
                                <Button 
                                    htmlType="submit"
                                    className="w-64 sm:w-48 lg:w-56 bg-[#6BDCFF4F] text-[#000] border border-[#0666F6C2] flex items-center justify-center space-x-2 p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300"
                                >
                                    <span>Hoàn thành</span>
                                    <i className="fa-solid fa-arrow-right"></i>
                                </Button>
                            </div>  
                            )}
                            </div>
                    </Form>
                </div>
            )}
            {detailCheck && (   
                <div className='flex justify-center m-8'>
                              <Button
                                onClick={() => navigate(`/skills/listen`)}
                                className="w-64 sm:w-48 lg:w-56 bg-[#6BDCFF4F] text-[#000] border border-[#0666F6C2] flex items-center justify-center space-x-2 p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300"
                              >
                                <span>Luyện nghe</span>
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

export default ListenDetail;
