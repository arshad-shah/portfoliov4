import { describe, it, expect, vi } from 'vitest';

// Test data imports and exports
describe('Data Module Exports', () => {
	describe('Index Exports', () => {
		it('exports all expected data modules', async () => {
			// Test the main data index exports
			const dataIndex = await import('./index.js');

			// Check that exports exist (will vary based on actual exports)
			expect(dataIndex).toBeDefined();
		});

		it('exports experienceObject', async () => {
			const { experienceData } = await import('./index.js');
			expect(experienceData).toBeDefined();
		});

		it('exports content object and projects', async () => {
			const dataIndex = await import('./index.js');

			// Check for wildcard exports from contentObject and Projects
			expect(Object.keys(dataIndex).length).toBeGreaterThan(0);
		});
	});

	describe('JSON Data Files', () => {
		it('HeroData.json contains valid structure', async () => {
			const heroData = await import('./HeroData.json');
			const data = heroData.default;

			expect(data).toBeDefined();
			expect(typeof data).toBe('object');

			// Test expected structure
			expect(data).toHaveProperty('name');
			expect(data.name).toHaveProperty('first');
			expect(data.name).toHaveProperty('last');

			if (data.navigationLinks) {
				expect(Array.isArray(data.navigationLinks)).toBe(true);
			}

			if (data.socialLinks) {
				expect(Array.isArray(data.socialLinks)).toBe(true);
				data.socialLinks.forEach((link) => {
					expect(link).toHaveProperty('platform');
					expect(link).toHaveProperty('url');
					expect(link).toHaveProperty('icon');
				});
			}
		});

		it('Experience.json contains valid job data', async () => {
			const experienceData = await import('./Experience.json');
			const data = experienceData.default;

			expect(data).toBeDefined();
			expect(data).toHaveProperty('jobs');
			expect(Array.isArray(data.jobs)).toBe(true);

			if (data.jobs.length > 0) {
				const job = data.jobs[0];
				expect(job).toHaveProperty('position');
				expect(job).toHaveProperty('company');
				expect(job).toHaveProperty('duration');
				expect(job).toHaveProperty('location');

				if (job.responsibilities) {
					expect(Array.isArray(job.responsibilities)).toBe(true);
				}

				if (job.technologies) {
					expect(Array.isArray(job.technologies)).toBe(true);
					job.technologies.forEach((tech) => {
						expect(tech).toHaveProperty('name');
						expect(tech).toHaveProperty('icon');
					});
				}
			}
		});

		it('Projects.json contains valid project data', async () => {
			const projectsData = await import('./Projects.json');
			const data = projectsData.default;

			expect(data).toBeDefined();
			expect(Array.isArray(data)).toBe(true);

			if (data.length > 0) {
				const project = data[0];
				expect(project).toHaveProperty('heading');
				expect(project).toHaveProperty('description');
				expect(project).toHaveProperty('colorScheme');

				if (project.technologies) {
					expect(Array.isArray(project.technologies)).toBe(true);
				}

				// Optional properties should be strings if present
				if (project.repoLink) {
					expect(typeof project.repoLink).toBe('string');
					expect(project.repoLink).toMatch(/^https?:\/\//);
				}

				if (project.siteLink) {
					expect(typeof project.siteLink).toBe('string');
					expect(project.siteLink).toMatch(/^https?:\/\//);
				}
			}
		});

		it('Contact.json contains valid contact data', async () => {
			const contactData = await import('./Contact.json');
			const data = contactData.default;

			expect(data).toBeDefined();
			expect(data).toHaveProperty('title');

			if (data.intro) {
				expect(data.intro).toHaveProperty('heading');
				expect(data.intro).toHaveProperty('description');
			}

			if (data.contactInfo) {
				expect(Array.isArray(data.contactInfo)).toBe(true);
				data.contactInfo.forEach((info) => {
					expect(info).toHaveProperty('label');
					expect(info).toHaveProperty('value');
					expect(info).toHaveProperty('icon');
				});
			}

			if (data.socialProfiles) {
				expect(data.socialProfiles).toHaveProperty('heading');
				expect(Array.isArray(data.socialProfiles.profiles)).toBe(true);

				data.socialProfiles.profiles.forEach((profile) => {
					expect(profile).toHaveProperty('label');
					expect(profile).toHaveProperty('url');
					expect(profile).toHaveProperty('icon');
					expect(profile.url).toMatch(/^(https?:\/\/|mailto:)/);
				});
			}

			if (data.expertise) {
				expect(data.expertise).toHaveProperty('heading');
				expect(Array.isArray(data.expertise.skills)).toBe(true);
			}
		});
	});

	describe('Data Validation', () => {
		it('all JSON files are valid JSON', async () => {
			const files = [
				'./HeroData.json',
				'./Experience.json',
				'./Projects.json',
				'./Contact.json',
			];

			for (const file of files) {
				const data = await import(file);
				expect(data.default).toBeDefined();
				expect(typeof data.default).toBe('object');
			}
		});

		it('hero data has required fields', async () => {
			const heroData = await import('./HeroData.json');
			const data = heroData.default;

			// Required fields
			expect(data.name).toBeDefined();
			expect(data.name.first).toBeDefined();
			expect(data.name.last).toBeDefined();
			expect(typeof data.name.first).toBe('string');
			expect(typeof data.name.last).toBe('string');
		});

		it('experience data has consistent structure', async () => {
			const experienceData = await import('./Experience.json');
			const data = experienceData.default;

			expect(data.jobs).toBeDefined();
			expect(Array.isArray(data.jobs)).toBe(true);

			// All jobs should have consistent structure
			data.jobs.forEach((job, index) => {
				expect(
					job.position,
					`Job ${index} missing position`,
				).toBeDefined();
				expect(
					job.company,
					`Job ${index} missing company`,
				).toBeDefined();
				expect(
					job.duration,
					`Job ${index} missing duration`,
				).toBeDefined();
				expect(
					job.location,
					`Job ${index} missing location`,
				).toBeDefined();

				expect(typeof job.position).toBe('string');
				expect(typeof job.company).toBe('string');
				expect(typeof job.duration).toBe('string');
				expect(typeof job.location).toBe('string');
			});
		});

		it('projects data has valid color schemes', async () => {
			const projectsData = await import('./Projects.json');
			const data = projectsData.default;

			const validColorSchemes = ['web', 'mobile'];

			data.forEach((project, index) => {
				expect(
					validColorSchemes.includes(project.colorScheme),
					`Project ${index} has invalid colorScheme: ${project.colorScheme}`,
				).toBe(true);
			});
		});

		it('contact data has valid URLs', async () => {
			const contactData = await import('./Contact.json');
			const data = contactData.default;

			// Check social profile URLs
			if (data.socialProfiles && data.socialProfiles.profiles) {
				data.socialProfiles.profiles.forEach((profile, index) => {
					const urlPattern = /^(https?:\/\/|mailto:)/;
					expect(
						urlPattern.test(profile.url),
						`Social profile ${index} has invalid URL: ${profile.url}`,
					).toBe(true);
				});
			}

			// Check contact info links
			if (data.contactInfo) {
				data.contactInfo.forEach((info, index) => {
					if (info.link) {
						const linkPattern = /^(https?:\/\/|mailto:|tel:)/;
						expect(
							linkPattern.test(info.link),
							`Contact info ${index} has invalid link: ${info.link}`,
						).toBe(true);
					}
				});
			}
		});
	});

	describe('Data Consistency', () => {
		it('hero and contact data have matching names', async () => {
			const heroData = await import('./HeroData.json');
			const contactData = await import('./Contact.json');

			const heroName = heroData.default.name;
			const contactName = contactData.default.footer?.name;

			if (heroName && contactName) {
				// Names should be consistent across files
				expect(heroName.first).toBe(contactName.first);
				expect(heroName.last).toBe(contactName.last);
			}
		});

		it('all icon references use valid icon names', async () => {
			// Valid Lucide React icon names used in the project
			const validIcons = [
				'Github',
				'Linkedin',
				'Mail',
				'MapPin',
				'Award',
				'ArrowRight',
				'Download',
				'Code',
				'Server',
				'Database',
				'Briefcase',
				'Layers',
				'GitBranch',
				'GitMerge',
				'BarChart',
				'GitPullRequest',
				'Clock',
				'Phone',
				'Calendar',
				'Filter',
				'ExternalLink',
				'ChevronRight',
				'ShoppingBag',
				'X',
			];

			const files = [
				'./HeroData.json',
				'./Experience.json',
				'./Contact.json',
			];

			for (const file of files) {
				const data = await import(file);
				const fileData = data.default;

				// Check icons in different data structures
				if (fileData.socialLinks) {
					fileData.socialLinks.forEach((link) => {
						if (link.icon) {
							expect(
								validIcons.includes(link.icon),
								`Invalid icon '${link.icon}' in ${file}`,
							).toBe(true);
						}
					});
				}

				if (fileData.jobs) {
					fileData.jobs.forEach((job) => {
						if (job.technologies) {
							job.technologies.forEach((tech) => {
								if (tech.icon) {
									expect(
										validIcons.includes(tech.icon),
										`Invalid icon '${tech.icon}' in job technologies`,
									).toBe(true);
								}
							});
						}
					});
				}

				if (fileData.contactInfo) {
					fileData.contactInfo.forEach((info) => {
						if (info.icon) {
							expect(
								validIcons.includes(info.icon),
								`Invalid icon '${info.icon}' in contact info`,
							).toBe(true);
						}
					});
				}

				if (
					fileData.socialProfiles &&
					fileData.socialProfiles.profiles
				) {
					fileData.socialProfiles.profiles.forEach((profile) => {
						if (profile.icon) {
							expect(
								validIcons.includes(profile.icon),
								`Invalid icon '${profile.icon}' in social profiles`,
							).toBe(true);
						}
					});
				}

				if (fileData.workingHours && fileData.workingHours.items) {
					fileData.workingHours.items.forEach((item) => {
						if (item.icon) {
							expect(
								validIcons.includes(item.icon),
								`Invalid icon '${item.icon}' in working hours`,
							).toBe(true);
						}
					});
				}
			}
		});

		it('experience technologies have proper structure', async () => {
			const experienceData = await import('./Experience.json');
			const data = experienceData.default;

			data.jobs.forEach((job, jobIndex) => {
				if (job.technologies) {
					job.technologies.forEach((tech, techIndex) => {
						expect(
							tech.name,
							`Job ${jobIndex}, tech ${techIndex} missing name`,
						).toBeDefined();
						expect(
							tech.icon,
							`Job ${jobIndex}, tech ${techIndex} missing icon`,
						).toBeDefined();

						expect(typeof tech.name).toBe('string');
						expect(typeof tech.icon).toBe('string');
						expect(tech.name.length).toBeGreaterThan(0);
					});
				}
			});
		});
	});

	describe('Data Performance', () => {
		it('JSON files are not excessively large', async () => {
			const files = [
				'./HeroData.json',
				'./Experience.json',
				'./Projects.json',
				'./Contact.json',
			];

			for (const file of files) {
				const startTime = performance.now();
				const data = await import(file);
				const endTime = performance.now();

				// Import should be fast
				expect(endTime - startTime).toBeLessThan(50);

				// Data should be reasonable size (serialized)
				const jsonString = JSON.stringify(data.default);
				expect(jsonString.length).toBeLessThan(50000); // 50KB limit
			}
		});

		it('data structures are efficiently organized', async () => {
			const experienceData = await import('./Experience.json');
			const projectsData = await import('./Projects.json');

			// Experience jobs should be reasonable in number
			expect(experienceData.default.jobs.length).toBeLessThan(20);

			// Projects should be reasonable in number
			expect(projectsData.default.length).toBeLessThan(50);

			// Each project shouldn't have excessive description
			projectsData.default.forEach((project) => {
				if (project.description) {
					expect(project.description.length).toBeLessThan(1000);
				}
			});
		});
	});

	describe('Data Security', () => {
		it('contains no sensitive information', async () => {
			const files = [
				'./HeroData.json',
				'./Experience.json',
				'./Projects.json',
				'./Contact.json',
			];

			// Patterns that might indicate sensitive data
			const sensitivePatterns = [
				/password/i,
				/secret/i,
				/private.*key/i,
				/token/i,
			];

			for (const file of files) {
				const data = await import(file);
				const jsonString = JSON.stringify(data.default);

				sensitivePatterns.forEach((pattern) => {
					expect(
						pattern.test(jsonString),
						`Potential sensitive data found in ${file}: ${pattern}`,
					).toBe(false);
				});
			}
		});

		it('URLs point to expected domains', async () => {
			const contactData = await import('./Contact.json');
			const data = contactData.default;

			// Expected safe domains
			const safeDomains = [
				'github.com',
				'linkedin.com',
				'hackerrank.com',
				'mailto:',
				'tel:',
				'https://apps.apple.com',
				'https://play.google.com',
			];

			if (data.socialProfiles && data.socialProfiles.profiles) {
				data.socialProfiles.profiles.forEach((profile) => {
					const isSafeDomain = safeDomains.some((domain) =>
						profile.url.includes(domain),
					);

					// Allow localhost and common development URLs in test environment
					const isDevUrl =
						profile.url.includes('localhost') ||
						profile.url.includes('127.0.0.1') ||
						profile.url.includes('.dev') ||
						profile.url.includes('.local');

					expect(
						isSafeDomain || isDevUrl,
						`Potentially unsafe URL: ${profile.url}`,
					).toBe(true);
				});
			}
		});
	});
});
