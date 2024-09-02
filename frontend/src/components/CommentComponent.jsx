/* eslint-disable react/prop-types */
import { Form, Input, Button } from 'antd'  
function CommentComponent(props) {
    const { comments , handleCommentSubmit , newComment , handleCommentChange } = props;
  return (
    <div>
            {comments && comments.length > 0 && (
              <div className="border border-gray-300 rounded-2xl py-2 pl-4">
                <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                  {comments.map((comment) => (
                    <div key={comment._id} className=" flex flex-row items-center bg-white px-4  rounded-lg">
                      <div className=" items-center">
                        <img src={comment.avatarUrl} alt={comment.username} className="w-8 h-8 rounded-full mr-2" />
                      </div>
                      <div className="flex flex-col justify-between ml-2">
                        <span className="font-thin text-xs text-[#828282] ">{comment.username}</span>
                        <span className='font-light text-base border border-gray-300 rounded-lg px-4 py-2 max-w-60 '>{comment.content}</span>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
            )}
            <Form onFinish={handleCommentSubmit} layout="vertical" 
            className="mt-4">
              <Form.Item className='p-4'>
                <Input.TextArea
                  rows={1}
                  value={newComment}
                  onChange={handleCommentChange}
                  placeholder="Nhập bình luận của bạn tại đây..."
                  className='rounded-lg overflow-hidden p-2'
                />
              </Form.Item>
              <Form.Item>
                <div className='flex justify-end mr-4'>
                   <Button className='bg-[#EAF4FF] text-black' type="primary" htmlType="submit">
                  Gửi
                </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
  )
}

export default CommentComponent
