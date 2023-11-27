import React from 'react'
import type ILesson from '../../../models/ILesson'
import type ITest from '../../../models/ITest'
import TestItem from './test/TestItem'

function TestsList({
	moduleID,
	tests,
	lessons
}: {
	moduleID: number
	tests: ITest[]
	lessons: ILesson[]
}) {
	return (
		<ul className='tests'>
			{tests.length > 0 &&
				tests.map(test => {
					if (!test.test_id) return null

					return (
						<TestItem
							key={test.test_id}
							lessonNames={lessons.map(lesson => {
								return lesson.module === moduleID &&
									lesson.lesson_id === test.lesson
									? lesson.name
									: ''
							})}
							test={test}
						/>
					)
				})}
		</ul>
	)
}

export default TestsList
