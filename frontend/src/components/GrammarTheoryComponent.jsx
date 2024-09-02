/* eslint-disable react/prop-types */
function GrammarTheoryComponent(props) {
    const {dataList} = props;
    const {theories, instructions, examples} = dataList;

    console.log(dataList);

    return (
        <div className="flex flex-col">
            <div className="flex flex-col items-center">
                <div className=" flex flex-col place-items-star p-2">
                <img src={theories} alt="Grammar Theory"  />
            </div>
            </div>
            
           <span className="text-normal text-2xl underline">Cách dùng:</span>
           <div className="flex flex-col">
            <div className="flex flex-col text-normal text-2xl place-items-start p-4">
                {instructions && instructions.map((instruction, index) => (
                    <span key={index}>{instruction}</span>
                ))}
            </div>
           </div>
            <span className="text-normal text-2xl underline">Ví dụ: </span>
            <div className="flex flex-col">
                <div className="flex flex-col text-normal text-2xl place-items-start border-b-2 border-gray-300 p-4" >
                    {examples && examples.map((example, index) => (
                    <span key={index}>{example}</span>
                ))}
                </div>
            </div>
        </div>
    )
}

export default GrammarTheoryComponent