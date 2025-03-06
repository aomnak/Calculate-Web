import { FC } from "react";

interface SectionProps {
    counters: (number | string) [];
    onRemove: (index: number) => void;
}

const Section: FC<SectionProps> = ({ counters, onRemove }) => {
    const handleClick = (index: number) => {
        onRemove(index);
    };

    return (
        <div>
            {counters.map((item, index) => (
                <div key={item}>
                    {item}
                    <button onClick={() => handleClick(index)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default Section;