import React , { useState } from 'react';
import Yama from '@/assets/Image/yama.png';

function VocabularyTest() {
    const [showDetails, setShowDetails] = useState(false);

  const handleToggle = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-8">Từ Vựng</h1>

      {/* Main Content */}
      <div className="relative bg-[#f8f9fa] p-6 rounded-xl shadow-lg flex items-center space-x-4 max-w-xl w-full">
        {/* Image Section */}
        <div className="flex-shrink-0">
          <img src={Yama} alt="Mount Fuji" className="h-48 w-48 rounded-lg object-cover" />
        </div>
        <hr className="w-0.5 h-48 bg-gray-300 transform !mx-8 " /> 
        <div 
            className="flex-grow text-center text-gray-500"
            onClick={handleToggle}
        >
            {showDetails ? (
                <div className="flex flex-row justify-around">   
                    <div className="flex flex-col mt-6">
                        <p className="font-semibold">山</p>
                        <p className="text-sm mb-8">(やま) yama</p>
                        <p className="text-sm">Núi</p>
                        <p className="text-xs text-gray-500">(danh từ)</p>
                    </div>
                    <div>
                        <button className="">
                        <i className="fa-solid fa-volume-high"></i>
                        </button>
                    </div>
                </div>
            ): (
                 <p className="font-semibold">Meaning and example</p>
            )}
        </div>
      </div>

      {/* CTA Button */}
      <button className="mt-8 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
        → Cùng làm test nhé!
      </button>
    </div>
  );
}

export default VocabularyTest;
