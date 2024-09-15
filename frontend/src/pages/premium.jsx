import { useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import SubscriptionModal from "@/components/PaymentComponent";

const premiumFeatures = [
  "Nhiều bài học về từ vựng, ngữ pháp.",
  "Nhiều bài luyện đọc, luyện nghe được sắp xếp phù hợp với các bài đã học.",
  "Nhiều bài tập và bài kiểm tra được sắp xếp phù hợp với bài học.",
  "Trao đổi, giao lưu với những người dùng khác thông qua bình luận ở mỗi bài học.",
  "Đổi nhiều voucher hơn người dùng thường bằng chuỗi ngày học thông qua điểm danh."
];

const subscriptionPlans = [
  {
    type: 1,
    plan: "Gói 1 tháng",
    price: "50.000 VNĐ",
    priceN: 50000,
    savings: null
  },
  {
    type: 2,
    plan: "Gói 6 tháng",
    price: "280.000 VNĐ",
    priceN: 280000,
    savings: "Tiết kiệm 20.000 VNĐ"
  },
  {
    type: 3,
    plan: "Gói năm",
    price: "550.000 VNĐ",
    priceN: 550000,
    savings: "Tiết kiệm 50.000 VNĐ"
  }
];

function Premium() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const showModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Header />
      <div className='mt-20 container px-4 mx-auto'>
        <div className='flex flex-col'>
          <div className="text-center text-3xl font-bold sm:text-5xl p-8">
            Premium
          </div>
          <div className='flex flex-col justify-center items-center bg-[#EAF4FF] rounded-lg pt-8 pb-16 px-4 mb-4'>
            <div className="text-center text-xl font-normal sm:text-3xl pb-8">
              Các tính năng dành riêng cho gói <span className="font-bold">Premium:</span>
            </div>
            <div className='flex flex-col justify-center border-[1px] border-[#000] rounded-lg p-6 w-full md:w-3/4'>
              {premiumFeatures.map((feature, index) => (
                <div key={index} className='flex flex-row items-start pb-5'>
                  <i className="fa-solid fa-circle fa-2xs mt-1"></i>
                  <div key={index} className="ml-6 text-left text-base font-normal sm:text-2xl">
                    {feature}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='flex flex-col md:flex-row justify-center items-center md:space-x-32 px-8 pt-8 pb-20 space-y-6 md:space-y-0'>
            {subscriptionPlans.map((plan, index) => (
              <div
                key={index}
                className="flex flex-col justify-between items-center rounded-xl pb-6 w-full md:w-1/3 bg-[#EAF4FF] shadow-md cursor-pointer"
                onClick={() => showModal(plan)}
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
                  ) : (
                    <div className="h-7"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Modal */}
      <SubscriptionModal
        visible={isModalVisible}
        onClose={handleModalClose}
        plan={selectedPlan}
      />
      <Footer />
    </div>
  );
}

export default Premium;
