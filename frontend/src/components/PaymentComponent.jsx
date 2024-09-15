/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { useAuth, useUser } from "@clerk/clerk-react";
import PaymentApi from "@/api/Payment";

const SubscriptionModal = ({ visible, onClose, plan }) => {
    const [showDiscount, setShowDiscount] = useState(false);
    const { getToken } = useAuth();
    const { user } = useUser();
    const [listDiscount, setListDiscount] = useState();
    useEffect(() => {
        const getDiscount = async () => {
            try {
                const token = await getToken();
                const params = {
                    clerkUserId: user?.id,
                    type: plan?.type,
                };
                const discount = await PaymentApi.getDiscount(token, params);
                if (discount && discount.data) {
                    console.log("discount", discount.data);
                    setListDiscount(discount.data);
                }
            } catch (error) {
                console.error('Error fetching discount:', error);
            }
        }

        getDiscount()
    } , [getToken, user, plan]);

    const handleContinue = async () => {
        try {
            const data = {
                amount : showDiscount ? (plan.priceN - (plan.priceN * listDiscount.discount / 100)) : plan.priceN,
                orderCode: Math.floor(Math.random() * 10000000),
                clerkUserId: user?.id,
            }
            if(showDiscount) {
                data.type = plan?.type;
            }
            const response = await PaymentApi.createPayment(data);
            if (response && response.checkoutUrl) {
                window.location.href = response.checkoutUrl;
            }
        } catch (error) {
            console.error('Error creating payment:', error);
        }
    }


  return (
    <Modal
    //   title="Your details > payment"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <div className="mb-4 flex flex-col">
        <div className="flex justify-between mt-6">
            <span>Night owl Premium account - {plan?.type === 1 ? "30 Days" : (plan?.type === 2 ? "6 Months" : "Years")}</span>
            <span className="font-bold">{plan?.price}</span>
        </div>

        <hr className="my-4"/>
        {listDiscount && (
          <div>
            {showDiscount ? (
                <div className="flex justify-between items-center">
                <span className="font-normal text-xl border rounded-lg px-2 ">{listDiscount.name}</span>
                <i className="fa-solid fa-xmark" onClick={() => setShowDiscount(false)}></i>
                </div>
            ) : (
                <span className="font-bold text-[#0037C5]" onClick={() => setShowDiscount(true)} >
                    Add discount
                </span>
            )}
            <hr className="my-4"/>
          </div>
        )}
        {showDiscount && (
            <div>
            <div className="flex justify-between items-center">
                <span className="font-normal">Discount</span>
                <span className="font-bold text-[#878787]">
                    - {((plan.priceN * listDiscount.discount / 100)).toLocaleString()} VNĐ
                </span>
            </div>
            <hr className="my-4"/>
            </div>
            
        )}
        <div className="flex justify-between items-center">
            <span className="font-normal">Due today</span>
            {showDiscount ? (
            <span className="font-bold ml-4">{(plan.priceN - (plan.priceN * listDiscount.discount / 100)).toLocaleString()} VNĐ</span>
                
            ): (
                <span className="font-bold ml-4">{plan?.price}</span>
            )}
        </div>
      </div>
      <Form onFinish={handleContinue} layout="vertical">   
        <Form.Item >
            <div className="flex items-center ">
                <Input style={{width: '1rem', height: '1rem'}} type="checkbox" /> 
                <span className="ml-2">Night Owl may send me product updates and
                offers via email.</span>
            </div>
        </Form.Item>   
        <Form.Item>
            <div className="flex justify-center">
                <Button type="primary" htmlType="submit" 
              className="w-48 sm:w-56 md:w-60 bg-[#6BDCFF4F] text-[#000] border border-[#0666F6C2] flex items-center justify-center space-x-2 p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300">
          Continue
        </Button>
            </div>
        
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SubscriptionModal;
