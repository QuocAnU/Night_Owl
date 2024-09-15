import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { Spin } from "antd";
import { useState, useEffect } from "react";
import ReadApi from "@/api/Question";

function ListenView() {
  const navigate = useNavigate();
  const {  getToken } = useAuth(); // Check if the user is signed in
  const [loading, setLoading] = useState(false);
  const [listValues, setListValues] = useState([]);

  const handleNavigate = (value) => {
    navigate(`/skills/listen/${value}`, { state: { sectionKey: value } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        const params = { group: 'listen' };
        const res = await ReadApi.getReads(token, params);

        if (res && res.data) {
          setListValues(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getToken]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow justify-center mt-20">
        {loading ? (
          <Spin className="mt-5 justify-center" />
        ) : (
          <div className="flex flex-col container">
            <button onClick={() => navigate('/skills')} className="mt-5 w-4">
              <i className="fa-solid fa-arrow-left fa-xl"></i>
            </button>
            <div className="text-center text-4xl font-bold sm:text-5xl p-8">
              Luyện nghe
            </div>
            <div className="flex flex-col items-center justify-center mt-5">
              {listValues.map((value) => (
                <Button
                  key={value}
                  onClick={() => handleNavigate(value)}
                  className="w-60 bg-[#EAF4FF] text-[#000] flex items-center justify-center space-x-2 p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300 mb-5"
                >
                  {`Bài ${value}`}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ListenView;
