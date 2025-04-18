import { useSearchParams } from 'next/navigation';
import { CrossIcon } from '@/app/home/component/icon/GlobalIcon'
import SignIn from './SignIn';
import SignUp from './SignUp';
import SignUpEmail from './SignUpEmail';
import SignUpSent from './SignUpSent';
import VerifyEmail from './VerifyEmail';
import { useEffect, useState } from 'react';
import SignInEmail from './SignInEmail';
import useWindowSize from '@/hooks/useWindow';

export default function PopUp({ type, closePopUp, setType }) {
    const searchParams = useSearchParams();
    const [verifytToken, setVerifyToken] = useState("");

    const { width } = useWindowSize();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            setVerifyToken(token);
            setType('verifyEmail');
            console.log(token)
        }
    }, [searchParams, setType])

    const RenderContent = () => {
        switch (type) {
            case 'signUp':
                return <SignUp setType={setType} />
            case 'signIn':
                return <SignIn setType={setType} />
            case 'signUpEmail':
                return <SignUpEmail setType={setType} />
            case 'signUpSent':
                return <SignUpSent setType={setType} closePopUp={closePopUp} />
            case 'verifyEmail':
                return <VerifyEmail setType={setType} closePopUp={closePopUp} verifytToken={verifytToken} />
            case 'signInEmail':
                return <SignInEmail setType={setType} />
            default:
                return <></>
        }

    }
    return (
        <div
            className='fixed inset-0 bg-black/60 backdrop-blur-[2px] z-10 w-full h-full flex justify-center items-center'
        >
            <div
                className='relative w-full h-full bg-white'
                style={{ maxHeight: width > 768 ? '600px' : '100vh', maxWidth: width > 768 ? '560px' : '100vw' }}
            >
                <button
                    className='absolute right-[20px] top-[20px]'
                    onClick={closePopUp}
                >
                    <CrossIcon w='15' h='15' color='black' />
                </button>
                {/* ////////////  CONTENT HERE ////////////    */}
                <RenderContent />
            </div>
        </div>
    )
}
