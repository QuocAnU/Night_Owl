import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Logo from './../assets/Image/logo.jpg';
import Logo_1 from './../assets/Image/home.jpg';

import { useEffect } from 'react';
import UserApi from '../api/User';
import { useAuth, useUser } from '@clerk/clerk-react';


const sections = [
  {
    title: 'Bài học',
    content: 'Night Owl cung cấp bài học tiếng Nhật theo chủ đề, từ bảng chữ cái và ngữ pháp cơ bản đến các chủ đề phức tạp hơn như kinh doanh và văn hóa Nhật Bản. Bài học được chia thành các phần nhỏ, dễ hiểu và đi kèm với các bài tập thực hành để giúp bạn củng cố kiến thức.'
  },
  {
    title: 'Từ vựng',
    content: 'Night Owl có một bộ từ vựng tiếng Nhật phong phú. Bạn có thể học từ vựng theo chủ đề, theo trình độ hoặc bằng cách sử dụng các thẻ nhớ (flashcard).'
  },
  {
    title: 'Ngữ pháp',
    content: 'Night Owl cung cấp các bài học ngữ pháp tiếng Nhật chi tiết với các ví dụ và lời giải thích rõ ràng. Bạn cũng có thể thực hành ngữ pháp bằng cách làm các bài tập và bài kiểm tra.'
  },
  {
    title: 'Đọc',
    content: 'Night Owl cung cấp nhiều bài đọc tiếng Nhật theo trình độ, từ bài đọc đơn giản cho người mới bắt đầu đến các bài báo và truyện ngắn cho người học trình độ cao hơn.'
  },
  {
    title: 'Nghe',
    content: 'Night Owl cung cấp các bài nghe tiếng Nhật ở các trình độ khác nhau, bao gồm podcast, bài hát và hội thoại.'
  }
];

function Home() {
  const { getToken } = useAuth();
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
    if (user) {
      const markAttendance = async () => {
        try {
          const token = getToken();
          const params = {
            clerkUserId: user?.id,
          }
          if (token) {
            await UserApi.userMark(token, params);
          }
        } catch (error) {
          console.error('Error marking attendance:', error);
          throw error;
        }
      };
      markAttendance();
      }
  }, [user, getToken]);
  const imageStyles = "flex justify-center my-10";
  const textClasses = "text-left text-xl font-normal sm:text-2xl pb-4";
  const textClasses_1 = "text-left text-xl font-normal sm:text-2xl pb-6";

  return (
    <div>
      <Header />
      <div className='mt-20 container'>
        <div className='text-center text-3xl font-bold sm:text-5xl p-8'>
          Học tiếng Nhật cùng Night Owl
        </div>
        <div className={textClasses}>
          Night Owl là một trang web học tiếng Nhật, dành cho người mới bắt đầu và người học trình độ trung cấp. Trang web cung cấp nhiều tài nguyên học tập phong phú, bao gồm bài học, từ vựng, ngữ pháp, bài đọc, bài nghe, chữ viết, bài kiểm tra và diễn đàn.
        </div>
        <div className={textClasses}>
          Night Owl sẽ luôn đồng hành cùng bạn trong suốt quá trình học để giúp bạn có những giây phút học tiếng Nhật trở nên thú vị hơn bao giờ hết.
        </div>
        <div className={imageStyles}>
          <img src={Logo} alt="logo" className="w-3/4 sm:w-1/2" />
        </div>
        <div className={textClasses}>
          Trang web cung cấp nhiều tài nguyên học tập bao gồm:
        </div>
        {sections.map((section, index) => (
          <div key={index} className={textClasses_1}>
            <span className="font-bold">{section.title}:</span> {section.content}
          </div>
        ))}
        <div className={imageStyles}>
          <img src={Logo_1} alt="logo_1" className="w-3/4 sm:w-1/2" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
