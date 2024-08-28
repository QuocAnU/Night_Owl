/* eslint-disable react/prop-types */
function GrammarTheoryComponent(props) {
    const {theories,instructions, examples} = props;

    return (
        <div>
            <div>

                {theories && theories.map((theory, index) => (
                    <span key={index}>{theory}</span>
                ))}
            </div>
            <span>Cách dùng: </span>
            <div>

                {instructions && instructions.map((instruction, index) => (
                    <span key={index}>{instruction}</span>
                ))}
            </div>
            <span>Ví dụ: </span>
            <div>

                {examples && examples.map((example, index) => (
                    <span key={index}>{example}</span>
                ))}
            </div>
        </div>
    )
}

export default GrammarTheoryComponent