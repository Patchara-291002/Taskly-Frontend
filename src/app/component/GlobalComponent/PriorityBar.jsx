export default function PriorityBar({ priority}) {
    return (
        <>
            <div
                className="flex items-baseline gap-[2px]"
            >
                <div 
                    className="w-[3px] h-[5px]"
                    style={{ background: priority >= 1 ? "#FF6200" : "#C8C8C8" }}
                />
                <div 
                    className="w-[3px] h-[9px]"
                    style={{ background: priority >= 2 ? "#FF6200" : "#C8C8C8" }}
                />
                <div 
                    className="w-[3px] h-[13px]"
                    style={{ background: priority >= 3 ? "#FF6200" : "#C8C8C8" }}
                />
            </div>
        </>
    )
}