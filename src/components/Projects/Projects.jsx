import { Projects as ProjectsData } from '../../data';
import Project from './components/project';
import { Code } from 'lucide-react';

const Projects = () => {
	return (
		<div className="mx-auto max-w-6xl px-4 py-16">
			<div className="mb-12 text-center">
				<div className="mb-6 flex items-center justify-center space-x-3">
					<div className="relative rounded-xl p-0.5 shadow-lg">
						<div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
						<div className="relative rounded-xl bg-white p-3">
							<Code className="h-8 w-8 text-indigo-600" />
						</div>
					</div>
					<h2 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">
						Projects
					</h2>
				</div>
				<div className="mx-auto h-1 w-20 rounded-full bg-purple-500" />
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{ProjectsData.map((project, index) => (
					<Project key={index} project={project} index={index} />
				))}
			</div>
		</div>
	);
};

export default Projects;
