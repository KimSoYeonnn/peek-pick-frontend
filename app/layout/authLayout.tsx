import React, { useState } from 'react';
import { Outlet } from 'react-router';

function AuthLayout() {
    const [isLangOpen, setIsLangOpen] = useState(false);
    const languages = ['한국어', 'English', '日本語', '中文'];

    const toggleLangMenu = () => setIsLangOpen((prev) => !prev);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* 헤더 */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-screen-md mx-auto px-4 py-3 flex justify-between items-center">
                    <h1 className="text-lg font-bold text-blue-600">로고</h1>
                    <div className="relative">
                        <button
                            onClick={toggleLangMenu}
                            className="text-sm text-gray-700 hover:text-blue-600"
                        >
                            언어 설정 ▾
                        </button>

                        {isLangOpen && (
                            <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-200 rounded-md shadow-md z-20">
                                {languages.map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => {
                                            console.log(`선택된 언어: ${lang}`);
                                            setIsLangOpen(false);
                                        }}
                                        className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 text-gray-800"
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* 본문 */}
            <main className="flex-grow w-full max-w-screen-md mx-auto px-4 pt-6 pb-10">
                <Outlet />
            </main>
        </div>
    );
}

export default AuthLayout;
