import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import MainHeader from '../../headers/mainHeader/MainHeader'

function MainLayout({
	children,
	pageTitle
}: {
	children: React.ReactNode
	pageTitle?: string
}) {
	const location = useLocation()

	useEffect(() => {
		document.title = `Бизнес волчонок${pageTitle ? ` | ${pageTitle}` : ''}`
	}, [location, pageTitle])

	return (
		<>
			<MainHeader />
			<motion.main
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
			>
				{children}
			</motion.main>
		</>
	)
}

export default MainLayout
