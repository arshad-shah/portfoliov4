const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-800 py-4 text-white">
			<div className="container mx-auto flex items-center justify-between">
				<div>&copy; {currentYear} Arshad Shah</div>
				<div>Powered by React and Tailwind CSS</div>
			</div>
		</footer>
	);
};

export default Footer;
