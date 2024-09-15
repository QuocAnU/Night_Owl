import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import GrammarTheoryApi from '@/api/Grammar/Theory';
import { useAuth } from '@clerk/clerk-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GrammarTheoryComponent from '@/components/GrammarTheoryComponent';
import { Spin } from 'antd';
import CommentApi from '@/api/Comment';
import CommentComponent from '@/components/CommentComponent';

function GrammarTheoryDetail() {
    const { section } = useParams();
    const location = useLocation();
    const { sectionValue } = location.state || {};
    const { getToken } = useAuth();
    const navigate = useNavigate();
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        try {
            const token = await getToken();
            const newCommentData = {
                content: newComment,
                from: 'grammar_theories',
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
                const sectionParams = { section: sectionValue };
                const fromParams = { from: 'grammar_theories' };
                const [resourceResponse, commentsResponse] = await Promise.all([
                    GrammarTheoryApi.getGrammarTheoryBySection(token, sectionParams),
                    CommentApi.getComments(token, fromParams),
                ]);
                
                if (resourceResponse?.data) {
                    setDataList(resourceResponse.data);
                }
                if (commentsResponse?.data) {
                    setComments(commentsResponse.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [section, sectionValue, getToken]);

    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            {loading ? (
                <div className='flex justify-center items-center min-h-screen'>
                    <Spin />
                </div>
            ) : (
                <div className='flex-grow px-4 sm:px-8 lg:px-16 mt-20 container'>
                    <button
                        onClick={() => navigate(`/skills/grammar/theory`)}
                        className="mt-8 ml-4 sm:ml-8 w-4"
                    >
                        <i className="fa-solid fa-arrow-left fa-xl"></i>
                    </button>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-center text-2xl sm:text-3xl font-bold mb-4'>
                            {`Bài ${sectionValue}`}
                        </h1>
                        <GrammarTheoryComponent dataList={dataList} />
                    </div>
                    <div className='mt-8'>
                        <CommentComponent
                            comments={comments}
                            handleCommentSubmit={handleCommentSubmit}
                            newComment={newComment}
                            handleCommentChange={handleCommentChange}
                        />
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    );
}

export default GrammarTheoryDetail;
