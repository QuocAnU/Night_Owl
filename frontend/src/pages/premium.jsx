import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const premiumFeatures = [
  "Nhiều bài học về từ vựng, ngữ pháp.",
  "Nhiều bài luyện đọc, luyện nghe được sắp xếp phù hợp với các bài đã học.",
  "Nhiều bài tập và bài kiểm tra được sắp xếp phù hợp với bài học.",
  "Trao đổi, giao lưu với những người dùng khác thông qua bình luận ở mỗi bài học.",
  "Đổi nhiều voucher hơn người dùng thường bằng chuỗi ngày học thông qua điểm danh."
];

const subscriptionPlans = [
  {
    plan: "Gói 1 tháng",
    price: "50.000 VNĐ",
    savings: null
  },
  {
    plan: "Gói 6 tháng",
    price: "280.000 VNĐ",
    savings: "Tiết kiệm 20.000 VNĐ"
  },
  {
    plan: "Gói năm",
    price: "550.000 VNĐ",
    savings: "Tiết kiệm 50.000 VNĐ"
  }
];


function Premium() {
  return (
    <div>
      <Header />
      <div className='mt-16'>
        <div className='flex flex-col px-20'>
          <div className="text-center text-4xl font-bold sm:text-5xl p-8">
            Premium
          </div>
          <div className='flex flex-col justify-center items-center bg-[#EAF4FF] rounded-lg pt-8 pb-16 px-4 mb-4' >
            <div className="text-center text-xl2 font-normal sm:text-3xl pb-8">
                 Các tính năng dành riêng cho gói <span className="font-bold">Premium:</span>
            </div>
            <div className='flex flex-col justify-center border-[1px] border-[#000] rounded-lg p-6'>
                {premiumFeatures.map((feature, index) => (
                    <div key={index} className='flex flex-row items-center pb-5'>
                        <i className="fa-solid fa-circle fa-2xs"></i>
                        <div key={index} className="ml-6 text-left text-xl font-normal sm:text-2xl">
                            {feature}
                        </div>
                    </div>
            ))}
            </div>
          </div>

          <div className='flex flex-row justify-center items-start space-x-32 px-8 pt-8 pb-20'>
            {subscriptionPlans.map((plan, index) => (
                <div
                key={index}
                className="flex flex-col justify-between items-center rounded-xl pb-6 w-1/3 bg-[#EAF4FF] shadow-md"
                >
                <div className="text-center text-xl font-bold bg-[#B5DBFF] sm:text-2xl py-4 w-full">
                    {plan.plan}
                </div>
                <div className='flex flex-col justify-center bg-[#EAF4FF] p-6 flex-1'>
                    <div className="text-center text-xl font-normal sm:text-2xl pb-4">
                    {plan.price}
                    </div>
                    {plan.savings ? (
                    <div className="text-center text-lg font-normal text-red-600">
                        {plan.savings}
                    </div>
                    ): (
                        <div className="h-7" ></div>
                    )}
                </div>
                </div>
            ))}
            </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Premium
