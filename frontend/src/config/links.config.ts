export default class Links {
	static start = `/`
	static auth = '/authorization'
	static main = `/main`
	static profile = '/profile'
	static course = (id?: string | number) => `/course/${id}`
	static module = (courseID?: string | number, id?: string | number) =>
		`${this.course(courseID)}/module/${id}`
	static test = (
		courseID?: string | number,
		moduleID?: string | number,
		id?: string | number
	) => `${this.module(courseID, moduleID)}/tests/${id}`
	static lesson = (
		courseID?: string | number,
		moduleID?: string | number,
		id?: string | number
	) => `${this.module(courseID, moduleID)}/lessons/${id}`
}
