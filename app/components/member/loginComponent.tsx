import React, { useEffect } from 'react';

const GOOGLE_CLIENT_ID = '437911674528-fjjj26o3oe1o6m704rq97giu9u3mi01u.apps.googleusercontent.com';

declare global {
    interface Window {
        google?: any;
    }
}

const LoginComponent = () => {
    useEffect(() => {
        if (window.google?.accounts?.id) {
            window.google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse,
            });

            window.google.accounts.id.renderButton(
                document.getElementById('googleSignInDiv'),
                {
                    theme: 'outline',
                    size: 'large',
                    width: '100%',
                }
            );
        }
    }, []);

    const handleCredentialResponse = (response: any) => {
        const token = response.credential;
        console.log('Google 로그인 성공:', token);
    };

    return (
        <div className="flex justify-center items-center w-full h-full px-4 py-8">
            <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6 space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">로그인</h2>

                {/* 일반 로그인 폼 */}
                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            이메일
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            비밀번호
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        로그인
                    </button>
                </form>

                {/* 회원가입 링크 */}
                <div className="text-center text-sm text-gray-600">
                    계정이 없으신가요?{' '}
                    <a href="/signup" className="text-blue-500 hover:underline font-medium">
                        회원가입
                    </a>
                </div>

                {/* 또는 SNS 로그인 */}
                <div className="relative text-center text-sm text-gray-400">
                    <span className="bg-white px-2 relative z-10">또는</span>
                    <div className="absolute top-1/2 left-0 w-full border-t border-gray-200 z-0" />
                </div>

                {/* Google 로그인 버튼 */}
                <div id="googleSignInDiv" className="flex justify-center" />
            </div>
        </div>
    );
};

export default LoginComponent;
