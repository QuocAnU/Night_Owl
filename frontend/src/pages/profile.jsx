import { useEffect, useState } from 'react';
import { Avatar, Card, Divider, Button, Input, Row, Col } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import UserApi from '@/api/User';
import { useAuth, useUser } from '@clerk/clerk-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const stylesTitle = "text-xl font-medium p-1";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState({
    lastName: false,
    firstName: false,
    username: false,
  });
  const { getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getToken();
        const params = {
          clerkUserId: user.id,
        };
        const response = await UserApi.getUser(token, params);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [getToken, user]);

  const toggleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (e, field) => {
    setProfile({ ...profile, [field]: e.target.value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Error loading profile</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow mt-20 mb-10 items-center">
        <div className='flex justify-center items-center my-5'>
          <i className="fa-regular fa-circle-question fa-xl mr-2" style={{color: '#000'}} ></i>
          <span className='font-normal text-3xl'>Thông tin chung</span>
        </div>
        <Card className="max-w-3xl mx-auto p-5">
          {/* Avatar */}
          <div className="flex justify-center">
            <Avatar src={profile.imageUrl} size={100} />
          </div>
          <div className="flex justify-center mt-4">
            <Button type="link">
            Thay đổi ảnh đại diện
          </Button>
          </div>
          
          <Divider />

          {/* Profile Info */}
          <Row gutter={[16, 16]}>
            {/* Last Name */}
            <Col span={24}>
              <div className="flex justify-between">
                <span className={stylesTitle} >Họ</span>
                {isEditing.lastName ? (
                  <Input
                    value={profile.lastName}
                    onChange={(e) => handleInputChange(e, 'lastName')}
                    onBlur={() => toggleEdit('lastName')}
                  />
                ) : (
                  <span onClick={() => toggleEdit('lastName')}>
                    {profile.lastName} <EditOutlined />
                  </span>
                )}
              </div>
            </Col>

            {/* First Name */}
            <Col span={24}>
              <div className="flex justify-between">
                <span className={stylesTitle}>Tên</span>
                {isEditing.firstName ? (
                  <Input
                    value={profile.firstName}
                    onChange={(e) => handleInputChange(e, 'firstName')}
                    onBlur={() => toggleEdit('firstName')}
                  />
                ) : (
                  <span onClick={() => toggleEdit('firstName')}>
                    {profile.firstName} <EditOutlined />
                  </span>
                )}
              </div>
            </Col>

            {/* Email */}
            <Col span={24}>
              <div className="flex justify-between">
                <span className={stylesTitle}>Email</span>
                <span>{profile.email}</span>
              </div>
            </Col>

            {/* Username */}
            {/* <Col span={24}>
              <div className="flex justify-between">
                <span className={stylesTitle}>Username</span>
                {isEditing.username ? (
                  <Input
                    value={profile.username}
                    onChange={(e) => handleInputChange(e, 'username')}
                    onBlur={() => toggleEdit('username')}
                  />
                ) : (
                  <span onClick={() => toggleEdit('username')}>
                    {profile.username} <EditOutlined />
                  </span>
                )}
              </div>
            </Col> */}

            {/* Account Status */}
            <Col span={24}>
              <div className="flex justify-between">
                <span className={stylesTitle} >Thông tin tài khoản</span>
                <span className=" font-bold py-1 px-2">
                  {profile.premium ? (
                    <Button type="default" shape="round" icon="⭐">
                      <span className="text-sm font-bold">Premium</span>
                    </Button>
                  ) : (
                    'Free'
                  )}
                </span>
              </div>
            </Col>
          </Row>
        </Card>
        {!profile.premium && (
          <div className="flex justify-center my-10">
          <Button 
              onClick={() => navigate('/premium')} 
              className="sm:w-56 md:w-60 bg-[#6BDCFF4F] text-[#000] border border-[#0666F6C2] flex items-center justify-center space-x-2 p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300">
              <span>Đăng kí Premium</span>
            </Button>
        </div>
        )}
        
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
