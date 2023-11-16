import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import "./modulePage.css"
import Lessons from "../../components/modulePage/lessons/Lessons";
import Tests from "../../components/modulePage/tests/Tests";
import {motion} from 'framer-motion';

type ModuleParams = {
    id: string
}

enum States {
    lessons,
    tests
}

function ModulePage() {
    const {id} = useParams<ModuleParams>()
    const location = useLocation()
    const navigate = useNavigate()
    const [currentState, setCurrentState] = useState(States.lessons);

    useEffect(() => {
        const stateStr = location.pathname.split('/')[3]
        if(stateStr !== 'tests' && stateStr !== 'lessons') {
            navigate(`/module/${id}/lessons`)
        }
        setCurrentState(stateStr === 'tests' ? States.tests : States.lessons)
    }, [location.pathname]);

    return (
        <div className='module-page'>
            <div className={"module-page__change-btn change-btn"}>
                <motion.div
                    className="change-btn__slider"
                    initial={(currentState === States.lessons ? {right: "1%"} : {right: "49%"})}
                    animate={(currentState === States.lessons ? {right: "49%"} : {right: "1%"})}
                    transition={{duration: "0.2", ease: "easeIn"}}
                />
                <Link to={`/module/${id}/lessons`}
                      className={`change-btn__lessons ${currentState === States.lessons ? 'change-btn_active' : ''}`}>
                    Конспекты
                </Link>
                <Link to={`/module/${id}/tests`}
                      className={`change-btn__tests ${currentState === States.tests ? 'change-btn_active' : ''}`}>
                    Тесты
                </Link>
            </div>
            <motion.div
                className="module__content"
                initial={{opacity: 0.1}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.1}}
            >
                {currentState === States.lessons && <Lessons moduleID={Number(id)}/>}
                {currentState === States.tests && <Tests moduleID={Number(id)}/>}
            </motion.div>
        </div>
    );
}

export default ModulePage;