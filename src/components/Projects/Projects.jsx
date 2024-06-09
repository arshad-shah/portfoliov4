import { Projects as ProjectsData } from '../../data';
import Project from './components/project';

const Projects = () => {
	return (
		<div className="mx-auto max-w-3xl">
			<h2 className="mb-4 text-center text-3xl font-bold">Projects</h2>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				{ProjectsData.map((project, index) => (
					<Project key={index} project={project} />
				))}
			</div>
		</div>
	);
};

export default Projects;
