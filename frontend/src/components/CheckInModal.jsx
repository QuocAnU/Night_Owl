/* eslint-disable react/prop-types */
import { Modal, Button } from 'antd';

const VoucherModal = ({ isModalVisible, handleOk, handleCancel, title }) => {

  // Tạo điều kiện để kiểm tra và hiển thị loại voucher phù hợp
  const getVoucherContent = () => {
    switch (title) {
      case '7 Days':
        return {
          amount: '7',
          description: 'Chúc mừng bạn đã đạt được chuỗi học 7 ngày.',
          description_1: 'Phần thưởng là 1 voucher giảm 10% cho gói 1 tháng tiếp theo.',
          voucherCode: 'VOUCHER10%FORMONTH',
          color: '#F5BB2C'
        };
      case '14 Days':
        return {
          amount: '14',
          description: 'Chúc mừng bạn đã đạt được chuỗi học 14 ngày.',
          description_1: 'Phần thưởng là 1 voucher giảm 10% cho gói 6 tháng tiếp theo.',
          voucherCode: 'VOUCHER10%FOR6MONTH',
          color: '#61D4D2'
        };
      case '30 Days':
        return {
          amount: '30',
          description: 'Chúc mừng bạn đã đạt được chuỗi học 30 ngày.',
          description_1: 'Phần thưởng là 1 voucher giảm 10% cho gói 1 năm tiếp theo.',
          voucherCode: 'VOUCHER10%FORYEAR',
          color: '#85ADFA'
        };
      default:
        return null;
    }
  };

  const voucher = getVoucherContent();

  return (
    <Modal
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      closable={false}
      maskClosable={false}
      footer={[
        <Button key="ok" type='primary' className='bg-[#000]' onClick={handleOk}>OK</Button>
      ]}
      className='rounded-lg p-4'
      width={700}
    >
      {voucher && (
        <div className='flex flex-col md:flex-row items-center justify-center md:h-full bg-cover rounded-lg' style={{ backgroundColor: voucher.color }}>
          <div className='flex flex-col justify-center items-center w-full h-full px-4 md:px-0'>
            <span className='font-bold text-white text-3xl md:text-5xl'>Voucher</span>
            <span className='font-bold text-white text-6xl md:text-9xl'>{voucher.amount}</span>
            <div className='mt-2 md:mt-4'>
              <span className='text-white font-bold text-2xl md:text-4xl'>Days</span>
              <i className="fa-solid fa-tags fa-xl md:fa-2xl ml-2" style={{ color: '#fff' }}></i>
            </div>
          </div>
          <div className='text-center flex flex-col justify-center items-center px-4 py-6 md:py-0 bg-white w-full md:w-auto'>
            <span className='text-lg md:text-xl font-semibold' style={{ color: voucher.color }}>{voucher.description}</span>
            <span className='text-sm md:text-base font-normal mt-2 md:mt-4'>{voucher.description_1}</span>
            <div className='px-4'>
              <div className="border-2 rounded-xl mt-4 py-2 md:py-4" style={{borderColor: voucher.color}}>
                <span className="text-xl md:text-2xl font-bold tracking-wide px-4" style={{color: voucher.color}}>
                  {voucher.voucherCode}
                </span>
              </div>
            </div>
            <span className="mt-4 text-gray-500 text-xs md:text-sm">
              Nhấn vào <strong>OK</strong> để nhận voucher.
            </span>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default VoucherModal;
