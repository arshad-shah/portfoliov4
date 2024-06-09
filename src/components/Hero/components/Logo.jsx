import logo from '../../../assets/portfolio_logo_v2.png';

function Logo() {
	return (
		<a href="#" className="-m-1.5 p-1.5">
			<span className="sr-only">Arshad Shah Portfolio</span>
			<img
				className="h-8 w-auto"
				src={logo}
				alt="Arshad Shah Portfolio Logo"
			/>
		</a>
	);
}

export default Logo;
