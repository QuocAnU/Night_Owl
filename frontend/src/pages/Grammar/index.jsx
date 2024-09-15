import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const sections = [
  {id: 1, value: "Lý thuyết", link: "theory"},
  {id: 2, value: "Bài tập", link: "practice"},
];

function GrammarLayout() {
  const navigate = useNavigate();

  const handleClick = (section) => {
    navigate(`/skills/grammar/${section}`, { state: { sectionKey: section } });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow  mt-20">
        <div className="flex flex-col container">
          <button
            onClick={() => navigate('/skills')}
            className="mt-5 w-4"
            >
            <i className="fa-solid fa-arrow-left fa-xl"></i>
          </button>

          <div className="text-center text-4xl font-bold sm:text-5xl p-8">
            Ngữ pháp
          </div>
          
          <div className='flex flex-col justify-center mt-5'>
            {sections.map((section) => (
              <div className="flex justify-center mb-10" key={section.id}>
                <Button
                  onClick={() => handleClick(section.link)}
                  className="w-60 bg-[#EAF4FF] text-[#000] flex items-center justify-center space-x-2 p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300">
                  {section.value}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GrammarLayout;
