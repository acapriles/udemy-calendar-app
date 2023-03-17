import { useAuthStore } from "../../hooks";

export const Navbar = () => {

	const { startLogout, user: { name } } = useAuthStore();

	return (
		<div className="navbar navbar-dark bg-dark mb-4 px-4">
			<span className="navbar-brand">
				<i className="fas fa-calendar-alt"></i>
				&nbsp;
				{ name }
			</span>

			<button
				onClick={ startLogout }
				className="btn btn-outline-danger"
			>
				<i className="fas fa-sign-out-alt"></i>
				&nbsp;
				<span>Exit</span>
			</button>
		</div>
	)
}
