import { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import UserApi from '../api/User';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from 'antd';
import VoucherModal from '@/components/CheckInModal';

import Carbs from '../assets/Image/Carbs_light.png';
import Trophy from '../assets/Image/Trophy_light.png';

function CheckIn() {

    const { getToken } = useAuth();
    const { user } = useUser();
    const [userData, setUserData] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [title, setTitle] = useState('');

    const showModal = (title) => {
        setIsModalVisible(true);
        setTitle(title);
    };

    const handleOk = async () => {
        let data = {};
        if (title === '7 Days') {
            data = {
                name: "VOUCHER10%FORMONTH",
                type: 1,
                discount: 10
            };
        } else if (title === '14 Days') {
            data = {
                name: "VOUCHER10%FOR6MONTH",
                type: 2,
                discount: 10
            };
        } else if (title === '30 Days') {
            data = {
                name: "VOUCHER10%FORYEAR",
                type: 3,
                discount: 10
            };
        }

        data.clerkUserId = user?.id;

        const token = getToken();

        if (token && user) {
            try {
                const res = await UserApi.receiveDiscount(token, data);
                if (res && res.error_code === 1) {
                    alert(res.message);
                } else if (res && res.error_code === 0) {
                    alert("Voucher đã được nhận");
                } else if (res && res.error_code === 11) {
                    alert(res.message);
                } else if (res && res.error_code === 12) {
                    alert(res.message);
                } else if (res && res.error_code === 13) {
                    alert(res.message);
                }
            } catch (error) {
                console.error(error);
            }
        }
        setIsModalVisible(false);
        setTitle('');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setTitle('');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getToken();
                if (token && user) {
                    const params = {
                        clerkUserId: user.id,
                    };
                    const response = await UserApi.getUser(token, params);
                    setUserData(response.data);
                }
            } catch (error) {
                console.error('Error fetching check-in status:', error);
            }
        };
        fetchData();
    }, [getToken, user]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow mt-20 mb-10 items-center">

                <div className='fixed inset-0 flex justify-end mt-24 sm:mt-44 z-10 px-4 sm:px-0' >
                    <div className='flex flex-col space-y-4'>
        
                            <Button
                                type="primary"
                                className="bg-[#EAF4FF] text-[#000] flex items-center justify-center space-x-2 p-1 sm:p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300"
                                onClick={() => showModal('7 Days')}
                            >
                                <i className="fa-regular fa-gem fa-lg"></i>
                                {/* <span className='text-sm sm:text-lg'>VOUCHERFORMONTH</span> */}
                            </Button>
                  

        
                            <Button
                                type="primary"
                                className="bg-[#EAF4FF] text-[#000] flex items-center justify-center space-x-2 p-1 sm:p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300"
                                onClick={() => showModal('14 Days')}
                            >
                                <img src={Trophy} alt="trophy" className='w-6 h-6'/>
                                {/* <span className='text-sm sm:text-lg'>VOUCHER FOR 6 MONTH</span> */}
                            </Button>
                  

                       
                            <Button
                                type="primary"
                                className="bg-[#EAF4FF] text-[#000] flex items-center justify-center space-x-2 p-1 sm:p-2 rounded-lg hover:border-[#0666F6D0] hover:bg-[#5AB9E7] hover:text-[#fff] transition-colors duration-300"
                                onClick={() => showModal('30 Days')}
                            >
                                <img src={Carbs} alt="carbs" className='w-6 h-6'/>
                                {/* <span className='text-sm sm:text-lg'>VOUCHER FOR YEAR</span> */}
                            </Button>
                   
                    </div>
                </div>

                <div className="text-center text-3xl md:text-5xl font-bold sm:text-5xl px-4 sm:px-8 pt-8 pb-4">
                    Điểm danh
                </div>
                <div className="text-center text-base sm:text-xl font-normal mt-4 mb-8 ">
                    Hãy cùng nhau xem chuỗi ngày học tập của mình nhé!
                </div>
                <div className='container px-4 md:px-40'>
                    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-4 md:gap-10 bg-[#EAF4FF] px-4 sm:px-8 pt-12 pb-6 border-2 rounded-xl">
                        {Array.from({ length: 30 }).map((_, index) => (
                            <div key={index} className='mb-4'>
                                {userData && userData.totalCheckInDays >= (index + 1) ? (
                                    <div className="flex flex-col items-center justify-center">
                                        <i className="fa-regular fa-square-check fa-2xl mb-6"></i>
                                        <span>{`Day ${index + 1}`}</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center">
                                        <i className="fa-regular fa-square fa-2xl mb-6"></i>
                                        <span>{`Day ${index + 1}`}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />

            <VoucherModal
                isModalVisible={isModalVisible}
                handleOk={handleOk}
                handleCancel={handleCancel}
                title={title}
            />
        </div>
    );
}

export default CheckIn;
