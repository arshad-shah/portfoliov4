import PropTypes from 'prop-types';
import { Building2, Clock, MapPin } from 'lucide-react';

const TimeLineItem = ({
	position,
	company,
	duration,
	location,
	responsibilities,
	isLast,
}) => {
	return (
		<li className={`ml-8 ${!isLast ? 'mb-12' : ''}`}>
			{/* Timeline dot */}
			<div className="group relative">
				<span className="absolute -left-11 flex h-6 w-6 items-center justify-center">
					<span className="h-3 w-3 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 ring-4 ring-white transition-all duration-300 group-hover:h-4 group-hover:w-4" />
				</span>

				{/* Content card */}
				<div className="relative overflow-hidden rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl">
					{/* Gradient border effect */}
					<div className="absolute inset-0 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-10 transition-opacity duration-300 group-hover:opacity-20" />

					{/* Duration */}
					<div className="mb-4 flex items-center">
						<div className="rounded-lg bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-2">
							<Clock className="h-4 w-4 text-indigo-600" />
						</div>
						<time className="ml-2 text-sm font-medium text-indigo-600">
							{duration}
						</time>
					</div>

					{/* Position */}
					<h3 className="mb-2 text-xl font-bold text-gray-900">
						{position}
					</h3>

					{/* Company and Location */}
					<div className="mb-4 space-y-2">
						<div className="flex items-center text-gray-600">
							<div className="rounded-lg bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-2">
								<Building2 className="h-4 w-4 text-indigo-600" />
							</div>
							<span className="ml-2">{company}</span>
						</div>
						<div className="flex items-center text-gray-600">
							<div className="rounded-lg bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-2">
								<MapPin className="h-4 w-4 text-indigo-600" />
							</div>
							<span className="ml-2">{location}</span>
						</div>
					</div>

					{/* Responsibilities */}
					<ul className="grid gap-4 sm:gap-3">
						{responsibilities &&
							responsibilities.map((responsibility, index) => (
								<li
									key={index}
									className="flex break-inside-avoid items-start text-gray-600"
								>
									<div className="mr-2 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />
									<span className="text-sm leading-relaxed">
										{responsibility}
									</span>
								</li>
							))}
					</ul>
				</div>
			</div>

			<style>{`
				@keyframes fadeInSlide {
					from {
						opacity: 0;
						transform: translateX(-20px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}

				li {
					animation: fadeInSlide 0.6s ease-out forwards;
					opacity: 0;
				}

				li:nth-child(1) {
					animation-delay: 0.1s;
				}
				li:nth-child(2) {
					animation-delay: 0.2s;
				}
				li:nth-child(3) {
					animation-delay: 0.3s;
				}
				li:nth-child(4) {
					animation-delay: 0.4s;
				}
				li:nth-child(5) {
					animation-delay: 0.5s;
				}

				.border-gradient-to-b {
					border-image: linear-gradient(
							to bottom,
							#6366f1,
							#a855f7,
							#ec4899
						)
						1;
				}
			`}</style>
		</li>
	);
};
TimeLineItem.propTypes = {
	position: PropTypes.string.isRequired,
	company: PropTypes.string.isRequired,
	duration: PropTypes.string.isRequired,
	location: PropTypes.string.isRequired,
	responsibilities: PropTypes.arrayOf(PropTypes.string).isRequired,
	isLast: PropTypes.bool,
};

export default TimeLineItem;
