import React from 'react'
import { CrossIcon } from '@/app/home/component/icon/GlobalIcon'
import { LeftArrowIcon } from '@/app/home/component/icon/DashboardIcon';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SignUpEmail from './SignUpEmail';
import SignUpSent from './SignUpSent';

export default function PopUp({ type, closePopUp, setType }) {

    const renderContent = () => {
        switch (type) {
            case 'signUp':
                return <SignUp setType={setType} />
            case 'signIn':
                return <SignIn setType={setType} />
            case 'signUpEmail':
                return <SignUpEmail setType={setType} />
            case 'signUpSent':
                return <SignUpSent setType={setType} closePopUp={closePopUp} />
            default:
                return <></>
        }
        
    }
    setType('signUpSent');
    return (
        <div
            className='fixed inset-0 bg-black/60 backdrop-blur-[2px] z-10'
        >
            <div
                className='w-full h-full flex justify-center items-center'
            >
                <div
                    className='relative w-[560px] h-[600px] bg-white'
                >
                    <button
                        className='absolute right-[20px] top-[20px]'
                        onClick={closePopUp}
                    >
                        <CrossIcon w='15' h='15' color='black' />
                    </button>
                    {/* ////////////  CONTENT HERE ////////////    */}
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}
