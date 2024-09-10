import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import GrammarTheoryApi from '@/api/Grammar/Theory';
import { useState , useEffect } from 'react';
import { Spin } from 'antd';


function GrammarTheoryView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionKey } = location.state || {};
  const { getToken } = useAuth();
  const [listValues, setListValues] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleNavigate = (value) => {
    navigate(`/skills/grammar/${sectionKey}/${value}`, { state: { sectionKey: sectionKey, sectionValue: value } });
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        if(sectionKey === 'theory') {
          const res = await GrammarTheoryApi.getGrammarTheory(token)
          if (res && res.data) {
            setListValues(res.data);
            setLoading(false);
          }
        } else if(sectionKey === 'practice') {
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [getToken, sectionKey]);

    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow justify-center mt-16">
          {loading ? (
            <Spin />
          ) : (
            <div className="flex flex-col px-52">
            <button
              onClick={() => navigate('/skills/grammar')}
              className="mt-5 w-4"
            >
              <i className="fa-solid fa-arrow-left fa-xl"></i>
            </button>
            <div className="text-center text-4xl font-bold sm:text-5xl p-8">
              Lý Thuyết Ngữ Pháp
            </div>
            <div className="flex flex-col items-center justify-center mt-5">
              {listValues.map((value, index) => (
                  <Button
                    key={index}
                    onClick={() => handleNavigate(value)}
                    className="w-60 bg-[#EAF4FF] text-[#000] flex items-center justify-center space-x-2 p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300">
                    {`Bài ${value}`}
                  </Button>
              ))}
            </div>
          </div>
          )}
        </div>
        <Footer />
      </div>
    )
}

export default GrammarTheoryView;
