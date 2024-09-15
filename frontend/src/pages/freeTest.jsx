import { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import FreeTestApi from '../api/freeTest';
import Header from '../components/Header';
import Footer from '@/components/Footer';
import { Row, Col, Spin, Form, Input } from 'antd';
import { Button } from '@/components/ui/button';
import UserApi from '../api/User';

function FreeTest() {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [hiraganas, setHiraganas] = useState([]);
  const [katakanas, setKatakanas] = useState([]);

  const { user } = useUser();

  useEffect(() => {
    const handleLoginSuccess = async () => {
    try {
      const token = getToken();
      if (token && user) {
        const userInfo = {
                clerkUserId: user.id,
                email: user.primaryEmailAddress?.emailAddress,
                firstName: user.firstName,
                lastName: user.lastName,
                imageUrl: user.imageUrl,
            };
        await UserApi.create(userInfo, token);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  handleLoginSuccess();
}, [getToken, user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const res = await FreeTestApi.getData(token);
        if (res && res.data) {
          setHiraganas(res.data.Hiragana);
          setKatakanas(res.data.Katakana);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [getToken]);

  const renderQuestions = (item) => {
    const { type, name } = item;
    return (
      <Form.Item
        key={item._id}
        name={`${item._id}`}
        // rules={[{ required: true, message: 'Please input your answer!' }]}
        className="mb-4"
      >
        <div className="flex flex-col items-center justify-center">
          {type === 'text' ? (
            <div className="flex flex-row items-center justify-center">
              <span className="text-lg font-semibold">{name}</span>
              <i className="fa-solid fa-arrow-right fa-lg mx-4"></i>
              <Input
                placeholder="..."
                className="w-1/3"
              />
            </div>
          ) : (
            <div className='flex flex-row items-center justify-center'>
              <img
                src={name}
                alt="Example"
                className="w-1/3 md:w-1/2 lg:w-1/3 h-auto object-cover"
              />
              <i className="fa-solid fa-arrow-right fa-lg mx-4"></i>
              <Input
                placeholder="..."
                className="w-1/3"
              />
            </div>
          )}
        </div>
      </Form.Item>
    );
  };

  const renderColumns = (data, type) => {
    const dataText = data.filter((item) => item.type === 'text');
    const dataImage = data.filter((item) => item.type !== 'text');

    return (
      <>
        <Row gutter={[16, 16]}>
          {dataText.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={8} className='flex justify-center mb-8'>
              {renderQuestions(item)}
            </Col>
          ))}
        </Row>
        <div className="text-center text-2xl sm:text-3xl font-bold mb-8">Từ vựng {type}</div>
        <Row gutter={[16, 16]}>
          {dataImage.map((item) => (
            <Col key={item.id} xs={24} sm={12} lg={8}>
              {renderQuestions(item)}
            </Col>
          ))}
        </Row>
      </>
    );
  };

  const handleOnSubmit = async (values) => {
    try {
      const data = {
        values: values
      };
      const token = await getToken();
      const res = await FreeTestApi.submitAnswers(data, token); 
      if(res) {
        setScore(res.score);
        setTotalQuestions(res.totalQuestions);
        setSuccess(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleNavigate = () => {
    navigate('/premium');
  };

  if(success) {
    return (
      <div className='flex flex-col min-h-screen'>
        <Header />
        <main className="flex-grow">
        <div className='mt-20 px-4 sm:px-8 md:px-16 lg:px-32'>
          <div className="flex flex-col justify-center items-center px-4 sm:px-8 lg:px-16">
          <div className='text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl p-4 sm:p-6 lg:p-8'>Kết quả</div>
        <div className='text-center text-1xl font-bold sm:text-2xl md:text-3xl lg:text-4xl p-4 sm:p-6 lg:p-8'>{score}/{totalQuestions}</div>
        <div className='mb-2'>Chúc mừng bạn đã hoàn thành phần học Free của Night Owl.</div>
        <div className='mb-4'>Hãy tiếp tục đăng ký khóa học Premium của chúng mình để cùng nhau học tiếng Nhật nhé!</div>

        <Button 
              onClick={handleNavigate}
              className="w-full  sm:w-48 lg:w-56 bg-[#6BDCFF4F] text-[#000] border border-[#0666F6C2] flex items-center justify-center space-x-2 p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300 my-4">
              <span>Đăng Ký Premium</span>
            </Button>
      </div>
        </div>
        </main>
        <Footer />
      </div>

      
    );
  }


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className='mt-20 container mx-auto'>
        <div className="max-w-4xl mx-auto p-4">
          <div className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8">Test Hiragana & Katakana</div>

          <Form
            name="free-test"
            layout="vertical"
            onFinish={handleOnSubmit} // Use handleOnSubmit here
          >
            <div className="mb-12">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">Chữ cái Hiragana</h2>
              <p className="mb-8 text-sm sm:text-base md:text-lg">Ở phần này, đề sẽ đưa ra các chữ cái trong bảng Hiragana và các bạn sẽ nhập vào chữ cái Latinh tương ứng nhé!</p>
              {renderColumns(hiraganas, 'Hiragana')}
            </div>

            <div className="mb-12">
              <div className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8">Từ vựng Katakana</div>
              {renderColumns(katakanas, 'Katakana')}
            </div>

            <div className='flex justify-center'>
              <Button 
                htmlType="submit"
                className="w-full sm:w-48 lg:w-56 bg-[#6BDCFF4F] text-[#000] border border-[#0666F6C2] flex items-center justify-center space-x-2 p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300"
              >
                <span>Hoàn thành</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FreeTest;
