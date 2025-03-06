import { FC } from "react";

interface TrashProps {
    trashItems: (number | string)[];
    onRestore: (index: number) => void;
}

const Trash: FC<TrashProps> = ({ trashItems, onRestore }) => {
    return (
        <div>
            {trashItems.length === 0 ? (
                <p>No deleted items</p>
            ) : (
                trashItems.map((item, index) => (
                    <div key={`${item}-${index}`}>
                        {item}
                        <button onClick={() => onRestore(index)}>Restore</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Trash;
