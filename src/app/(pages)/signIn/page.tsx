import SignInPage from '@/app/components/SignInPage/page';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login'
}
export default function SignIn() {
    return (
        <SignInPage />
    )
}
