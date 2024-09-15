import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const sections = [
  "Hiragana",
  "Katakana",
  "Kanji",
];

function SkillsLayout() {
  const navigate = useNavigate();

  const handleClick = (section) => {
    navigate(`/skills/vocal/${section}`, { state: { sectionKey: section } });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow mt-20 px-4">
        <div className="flex flex-col max-w-screen-lg mx-auto">
          <button
            onClick={() => navigate('/skills')}
            className="mt-5 w-10">
            <i className="fa-solid fa-arrow-left fa-xl"></i>
          </button>

          <div className="text-center text-3xl font-bold sm:text-4xl p-8">
            Flashcard
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
            {sections.map((section, index) => (
              <div className="flex justify-center" key={index}>
                <Button
                  onClick={() => handleClick(section)}
                  className="w-60 bg-[#EAF4FF] text-[#000] flex items-center justify-center space-x-2 p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300 mb-5"
                  >
                  {section}
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

export default SkillsLayout;
