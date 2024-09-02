/* eslint-disable react/prop-types */

function TopicComponent(props) {
    const { topics, detailCheck } = props;
    const { title, contents, translate_tittle, translate } = topics;
  return (
    <div className="p-12 border-2 border-gray-300 rounded-3xl">
      <div className="flex flex-col justify-center mb-5">
        <span className="flex justify-center font-bold text-4xl " >{title}</span>
      </div>
      <div className="px-12">
        {contents.map((content, index) => (
            <div key={index} className="mb-3 font-normal text-2xl">
                <span>{content}</span>
            </div>
        ))}
      </div>
      {detailCheck && (
        <div className="mt-8">
          <div className="flex flex-col justify-center mb-5">
            <span className="flex justify-center font-bold text-4xl ">{translate_tittle}</span>
          </div><div className="px-12">
              {translate.map((item, index) => (
                <div key={index} className="mb-3 font-normal text-2xl">
                  <span>{item}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TopicComponent
