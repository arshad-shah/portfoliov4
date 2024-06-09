import PropTypes from 'prop-types';
import { AiOutlineShop, AiOutlineGithub, AiOutlineLink } from 'react-icons/ai';
import { BUTTON_SIZES, BUTTON_VARIANTS, IconButton } from '../../common';

const Project = ({
	project: {
		heading,
		description,
		languages,
		linkAriaLabel,
		shopLink,
		repoLink,
		siteLink,
	},
}) => {
	return (
		<div className="mb-4 grid-cols-2 gap-4 rounded-md border border-gray-200 p-4">
			<h3 className="col-span-2 text-xl font-bold">{heading}</h3>
			<p className="col-span-2 text-sm text-gray-700">{description}</p>
			<div className="col-span-2 mt-2 flex flex-wrap gap-2">
				{languages.map((language, index) => (
					<span
						key={index}
						className="rounded-md bg-gray-200 p-2 text-xs"
					>
						{language}
					</span>
				))}
			</div>
			<div className="mt-2 flex gap-4">
				{shopLink && (
					<IconButton
						icon={() => <AiOutlineShop />}
						label={linkAriaLabel}
						onClick={() => window.open(shopLink, '_blank')}
						variant={BUTTON_VARIANTS.TERTIARY}
						size={BUTTON_SIZES.SMALL}
					/>
				)}
				{repoLink && (
					<IconButton
						icon={() => <AiOutlineGithub />}
						label={`link to ${heading} Github repo`}
						onClick={() => window.open(repoLink, '_blank')}
						variant={BUTTON_VARIANTS.TERTIARY}
						size={BUTTON_SIZES.SMALL}
					/>
				)}
				{siteLink && (
					<IconButton
						icon={() => <AiOutlineLink />}
						label={`link to ${heading} site`}
						onClick={() => window.open(siteLink, '_blank')}
						variant={BUTTON_VARIANTS.TERTIARY}
						size={BUTTON_SIZES.SMALL}
					/>
				)}
			</div>
		</div>
	);
};

Project.propTypes = {
	project: PropTypes.shape({
		heading: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		languages: PropTypes.arrayOf(PropTypes.string).isRequired,
		linkAriaLabel: PropTypes.string.isRequired,
		shopLink: PropTypes.string,
		repoLink: PropTypes.string,
		siteLink: PropTypes.string,
	}).isRequired,
};

export default Project;
