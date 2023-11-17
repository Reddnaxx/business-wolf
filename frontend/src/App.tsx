import React, {useEffect} from 'react';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import StartPage from "./pages/startPage/StartPage";
import AuthorizationPage from "./pages/authPage/AuthorizationPage";
import {AnimatePresence} from "framer-motion";
import MainPage from "./pages/mainPage/MainPage";
import MainHeader from "./components/headers/mainHeader/MainHeader";
import './index.css';
import ProfilePage from "./pages/profilePage/ProfilePage";
import {useActions} from "./hooks/useActions";
import {useTypedSelector} from "./hooks/useTypedSelector";
import CoursePage from "./pages/coursePage/coursePage";
import ModulePage from "./pages/modulePage/ModulePage";
import ModuleHeader from "./components/headers/moduleHeader/ModuleHeader";
import TestPage from "./pages/testPage/TestPage";
import TestResultPage from "./pages/testResultPage/TestResultPage";
import LessonPage from "./pages/lessonPage/LessonPage";


function App() {
    const location = useLocation()
    const navigate = useNavigate()
    const {checkAuth, logout} = useActions()
    const {error} = useTypedSelector(state => state.auth)

    useEffect(() => {
        if (location.pathname !== '/authorization') {
            checkAuth()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (error) {
            navigate('/authorization')
            logout()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    useEffect(() => {
        if (!localStorage.getItem('refresh_token')) {
            navigate('/authorization');
        }
    }, [navigate]);

    const pagesWithMainHeader = [
        '/main',
        '/profile',
        '/course'
    ]

    return (
        <>
            {(pagesWithMainHeader.some(page => location.pathname.includes(page)) && !location.pathname.includes('/module'))
                && <MainHeader
                    isGreetingVisible={location.pathname !== '/profile' && !location.pathname.includes('/course')}/>}
            {(location.pathname.includes('/module'))
                && <ModuleHeader/>}
            <main>
                <AnimatePresence mode='wait'>
                    <Routes location={location} key={location.pathname}>
                        <Route path='/' element={<StartPage/>}/>
                        <Route path='/authorization' element={<AuthorizationPage/>}/>
                        <Route path='/main' element={<MainPage/>}/>
                        <Route path='/profile' element={<ProfilePage/>}/>
                        <Route path='/course/:id' element={<CoursePage/>}/>
                        <Route path='/course/:courseID/module/:id/*' element={<ModulePage/>}/>
                        <Route path='/course/:courseID/module/:moduleID/lessons/:id' element={<LessonPage/>}/>
                        <Route path='/course/:courseID/module/:moduleID/tests/:id' element={<TestPage/>}/>
                        <Route path='/course/:courseID/module/:moduleID/tests/:id/result' element={<TestResultPage/>}/>
                    </Routes>
                </AnimatePresence>
            </main>
        </>
    );
}

export default App;
