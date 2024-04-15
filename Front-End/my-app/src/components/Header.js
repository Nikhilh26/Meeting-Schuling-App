import { UserButton, auth } from '@clerk/nextjs';
import Link from 'next/link';

export default function Header() {
    const { userId } = auth();
    return (
        <>
            <nav className='bg-blue-700 py-4 px-6 flex items-center justify-between mb-5'>

                <div className='flex items-center'>
                    <Link href='/'>
                        <div className='text-lg font-bold text-white'>
                            App
                        </div>
                    </Link>
                </div>

                <div className='text-lg font-bold text-white'>
                    {
                        !userId ?
                            <div>
                                <Link prefetch={false} href='/sign-in' className='pr-5'>LogIn</Link>
                                <Link prefetch={false} href='/sign-up'>SignUp</Link>
                            </div>
                            :
                            <div className='flex'>
                                <Link prefetch={false} href='/availability' className='mr-3'>Availability</Link>
                                <Link prefetch={false} href='/events' className='mr-3'>Events</Link>
                                <UserButton afterSignOutUrl='/' />
                            </div>
                    }
                </div>

            </nav>
        </>
    )
}