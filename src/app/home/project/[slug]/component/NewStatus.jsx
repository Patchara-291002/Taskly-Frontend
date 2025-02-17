import { BlurBackground } from '@/app/home/component/GlobalComponent'
import { Input } from 'rsuite';
import "rsuite/dist/rsuite-no-reset.min.css";

export default function NewStatus({ statusName, setStatusName, setStatusColor, setIsOpenNewStatus, onSubmit, isOpenNewStatus }) {
    return (
        <BlurBackground isOpen={isOpenNewStatus} onClose={() => setIsOpenNewStatus(false)}>
            <div
                className='flex flex-col justify-between w-[420px] h-[270px] bg-white rounded-[15px] shadow-lg p-[15px]'
            >
                <Input
                    placeholder="Status name"
                    value={statusName}
                    onChange={(value) => setStatusName(value)}
                />
                <button className="btn btn-primary mt-4" onClick={onSubmit}>
                    Create
                </button>
            </div>
        </BlurBackground>
    )
}
