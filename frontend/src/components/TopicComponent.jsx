/* eslint-disable react/prop-types */

function TopicComponent({ topics, detailCheck }) {
    const { title, contents, translate_tittle, translate } = topics;
    
    return (
        <div className="p-4 sm:p-8 md:p-12 border-2 border-gray-300 rounded-3xl max-w-screen-md mx-auto mt-4">
            <div className="flex flex-col justify-center mb-4 sm:mb-6">
                <span className="flex justify-center font-bold text-2xl sm:text-3xl md:text-4xl">{title}</span>
            </div>
            <div className="px-4 sm:px-8 md:px-12">
                {contents.map((content, index) => (
                    <div key={index} className="mb-2 sm:mb-3 font-normal text-lg sm:text-xl md:text-2xl">
                        <span>{content}</span>
                    </div>
                ))}
            </div>
            {detailCheck && (
                <div className="mt-6 sm:mt-8">
                    <div className="flex flex-col justify-center mb-4 sm:mb-6">
                        <span className="flex justify-center font-bold text-2xl sm:text-3xl md:text-4xl">{translate_tittle}</span>
                    </div>
                    <div className="px-4 sm:px-8 md:px-12">
                        {translate.map((item, index) => (
                            <div key={index} className="mb-2 sm:mb-3 font-normal text-lg sm:text-xl md:text-2xl">
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default TopicComponent;
