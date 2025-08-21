import { describe, it, expect } from 'vitest';
import { z } from 'zod';

// Import all data files
import heroData from './data/HeroData.json';
import experienceData from './data/Experience.json';
import projectsData from './data/Projects.json';
import contactData from './data/Contact.json';

// Define Zod schemas
const HeroDataSchema = z.object({
	name: z.object({
		first: z.string().min(1),
		last: z.string().min(1),
	}),
	title: z.string().min(1),
	description: z.string().min(1),
	location: z.string().min(1),
	mainTechnologies: z.array(z.string()),
	navigationLinks: z.array(z.string()),
	socialLinks: z.array(
		z.object({
			platform: z.string(),
			url: z.url().or(z.email()),
			icon: z.string(),
		}),
	),
	ctaButtons: z.array(
		z.object({
			text: z.string(),
			url: z.string(),
			primary: z.boolean(),
			icon: z.string(),
		}),
	),
	particles: z.array(
		z.object({
			size: z.number().positive(),
			top: z.string().regex(/^\d+%$/),
			left: z.string().regex(/^\d+%$/),
			type: z.enum(['normal', 'large', 'small']),
		}),
	),
});

const TechnologySchema = z.object({
	name: z.string().min(1),
	icon: z.string().min(1),
	color: z.string().optional(),
	description: z.string().optional(),
});

const JobSchema = z.object({
	position: z.string().min(1),
	company: z.string().min(1),
	duration: z.string().regex(/^[A-Za-z]+ \d{4} - ([A-Za-z]+ \d{4}|Present)$/),
	location: z.string().min(1),
	responsibilities: z.array(z.string().min(1)),
	technologies: z.array(TechnologySchema),
});

const ExperienceDataSchema = z.object({
	title: z.string(),
	jobs: z.array(JobSchema).min(1),
	skills: z.array(z.string()),
});

const ProjectSchema = z.object({
	heading: z.string().min(1),
	description: z.string().min(20).max(500),
	features: z.array(z.string()).optional(),
	techDetails: z.string().optional(),
	languages: z.array(z.string()),
	linkAriaLabel: z.string(),
	repoLink: z.url().optional(),
	siteLink: z.url().optional(),
	shopLink: z.url().optional(),
	colorScheme: z.enum(['web', 'mobile']),
	challenges: z.array(z.string()).optional(),
});

const ProjectsDataSchema = z.array(ProjectSchema).min(1);

const ContactInfoItemSchema = z.object({
	icon: z.string(),
	label: z.string(),
	value: z.string(),
	link: z.string().nullable(),
});

const SocialProfileSchema = z.object({
	icon: z.string(),
	label: z.string(),
	url: z.string().regex(/^(mailto:|https?:\/\/).+/),
});

const WorkingHoursItemSchema = z
	.object({
		icon: z.string(),
		label: z.string(),
		value: z.string().optional(),
		badge: z
			.object({
				text: z.string(),
				color: z.string(),
			})
			.optional(),
	})
	.refine((data) => data.value || data.badge, {
		message: 'Either value or badge must be present',
	});

const ContactDataSchema = z.object({
	title: z.string(),
	intro: z.object({
		heading: z.string(),
		description: z.string().min(50).max(1000),
	}),
	contactInfo: z.array(ContactInfoItemSchema),
	socialProfiles: z.object({
		heading: z.string(),
		profiles: z.array(SocialProfileSchema),
	}),
	workingHours: z.object({
		heading: z.string(),
		items: z.array(WorkingHoursItemSchema),
	}),
	expertise: z.object({
		heading: z.string(),
		description: z.string(),
		skills: z.array(z.string()),
	}),
	footer: z.object({
		name: z.object({
			first: z.string(),
			last: z.string(),
		}),
		tagline: z.string(),
		message: z.string(),
	}),
});

describe('Schema-Based Data Validation', () => {
	describe('Hero Data Schema Validation', () => {
		it('should validate hero data structure', () => {
			const result = HeroDataSchema.safeParse(heroData);

			if (!result.success) {
				console.error(
					'Hero data validation errors:',
					result.error.issues,
				);
			}

			expect(result.success).toBe(true);
		});

		it('should have valid social link URLs', () => {
			heroData.socialLinks.forEach((link, index) => {
				const urlSchema = z
					.string()
					.url()
					.or(z.string().startsWith('mailto:'));
				const result = urlSchema.safeParse(link.url);

				expect(
					result.success,
					`Social link ${index} has invalid URL: ${link.url}`,
				).toBe(true);
			});
		});
	});

	describe('Experience Data Schema Validation', () => {
		it('should validate experience data structure', () => {
			const result = ExperienceDataSchema.safeParse(experienceData);

			if (!result.success) {
				console.error(
					'Experience data validation errors:',
					result.error.issues,
				);
			}

			expect(result.success).toBe(true);
		});

		it('should validate all job entries', () => {
			experienceData.jobs.forEach((job, index) => {
				const result = JobSchema.safeParse(job);

				if (!result.success) {
					console.error(
						`Job ${index} validation errors:`,
						result.error.issues,
					);
				}

				expect(result.success, `Job ${index} failed validation`).toBe(
					true,
				);
			});
		});
	});

	describe('Projects Data Schema Validation', () => {
		it('should validate projects data structure', () => {
			const result = ProjectsDataSchema.safeParse(projectsData);

			if (!result.success) {
				console.error(
					'Projects data validation errors:',
					result.error.issues,
				);
			}

			expect(result.success).toBe(true);
		});

		it('should validate individual projects', () => {
			projectsData.forEach((project, index) => {
				const result = ProjectSchema.safeParse(project);

				if (!result.success) {
					console.error(
						`Project ${index} validation errors:`,
						result.error.issues,
					);
				}

				expect(
					result.success,
					`Project ${index} failed validation`,
				).toBe(true);
			});
		});

		it('should have diverse project color schemes', () => {
			const colorSchemes = projectsData.map((p) => p.colorScheme);
			const uniqueSchemes = [...new Set(colorSchemes)];

			expect(uniqueSchemes.length).toBeGreaterThan(1);
			expect(uniqueSchemes).toContain('web');
			expect(uniqueSchemes).toContain('mobile');
		});
	});

	describe('Contact Data Schema Validation', () => {
		it('should validate contact data structure', () => {
			const result = ContactDataSchema.safeParse(contactData);

			if (!result.success) {
				console.error(
					'Contact data validation errors:',
					result.error.issues,
				);
			}

			expect(result.success).toBe(true);
		});

		it('should validate email formats', () => {
			const emailRegex =
				/^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

			const emailLinks = [
				...contactData.contactInfo.filter((item) =>
					item.link?.includes('mailto:'),
				),
				...contactData.socialProfiles.profiles.filter((profile) =>
					profile.url.includes('mailto:'),
				),
			];

			emailLinks.forEach((item, index) => {
				const email = item.link || item.url;
				expect(
					emailRegex.test(email),
					`Invalid email format at index ${index}: ${email}`,
				).toBe(true);
			});
		});
	});

	describe('Cross-Data Consistency Validation', () => {
		it('should have consistent names across datasets', () => {
			const heroName = heroData.name;
			const contactName = contactData.footer.name;

			const nameConsistencySchema = z
				.object({
					hero: z.object({ first: z.string(), last: z.string() }),
					contact: z.object({ first: z.string(), last: z.string() }),
				})
				.refine(
					(data) =>
						data.hero.first === data.contact.first &&
						data.hero.last === data.contact.last,
					{
						message:
							'Names must be consistent across hero and contact data',
					},
				);

			const result = nameConsistencySchema.safeParse({
				hero: heroName,
				contact: contactName,
			});

			expect(result.success).toBe(true);
		});

		it('should have consistent social links', () => {
			const heroSocials = heroData.socialLinks.map((link) => ({
				platform: link.platform.toLowerCase(),
				url: link.url,
			}));
			const contactSocials = contactData.socialProfiles.profiles.map(
				(profile) => ({
					platform: profile.label.toLowerCase(),
					url: profile.url,
				}),
			);

			// Check for matching GitHub and LinkedIn URLs
			const commonPlatforms = ['github', 'linkedin'];

			commonPlatforms.forEach((platform) => {
				const heroLink = heroSocials.find(
					(social) => social.platform === platform,
				);
				const contactLink = contactSocials.find(
					(social) => social.platform === platform,
				);

				if (heroLink && contactLink) {
					expect(heroLink.url).toBe(contactLink.url);
				}
			});
		});
	});

	describe('Data Security and Safety Validation', () => {
		it('should not contain sensitive patterns', () => {
			const sensitivePatternSchema = z.string().refine(
				(data) => {
					const sensitivePatterns = [
						/\bpassword\s*[:=]/i,
						/\bsecret\s*[:=]/i,
						/\bapi[_-]?key\s*[:=]/i,
						/\bprivate[_-]?key\s*[:=]/i,
						/\baccess[_-]?token\s*[:=]/i,
					];

					return !sensitivePatterns.some((pattern) =>
						pattern.test(data),
					);
				},
				{ message: 'Data contains sensitive information patterns' },
			);

			const allDataSources = [
				heroData,
				experienceData,
				projectsData,
				contactData,
			];

			allDataSources.forEach((dataSource, index) => {
				const dataString = JSON.stringify(dataSource);
				const result = sensitivePatternSchema.safeParse(dataString);

				expect(
					result.success,
					`Data source ${index} contains sensitive patterns`,
				).toBe(true);
			});
		});

		it('should have safe external URLs', () => {
			const safeUrlSchema = z.string().refine(
				(url) => {
					if (url.startsWith('mailto:') || url.startsWith('tel:'))
						return true;

					return (
						url.startsWith('https://') &&
						!url.includes('javascript:') &&
						!url.includes('data:') &&
						!url.includes('vbscript:')
					);
				},
				{ message: 'URL is not safe' },
			);

			const allUrls = [
				...heroData.socialLinks.map((link) => link.url),
				...contactData.socialProfiles.profiles.map(
					(profile) => profile.url,
				),
				...projectsData.flatMap((project) =>
					[
						project.repoLink,
						project.siteLink,
						project.shopLink,
					].filter(Boolean),
				),
			];

			allUrls.forEach((url, index) => {
				const result = safeUrlSchema.safeParse(url);
				expect(
					result.success,
					`Unsafe URL at index ${index}: ${url}`,
				).toBe(true);
			});
		});
	});

	describe('Data Completeness Validation', () => {
		it('should have minimum required content', () => {
			const completenessSchema = z.object({
				heroLinksCount: z.number().min(3),
				jobsCount: z.number().min(1),
				projectsCount: z.number().min(4),
				contactInfoCount: z.number().min(1),
				skillsCount: z.number().min(8),
			});

			const completenessData = {
				heroLinksCount: heroData.socialLinks.length,
				jobsCount: experienceData.jobs.length,
				projectsCount: projectsData.length,
				contactInfoCount: contactData.contactInfo.length,
				skillsCount: contactData.expertise.skills.length,
			};

			const result = completenessSchema.safeParse(completenessData);

			if (!result.success) {
				console.error(
					'Completeness validation errors:',
					result.error.issues,
				);
			}

			expect(result.success).toBe(true);
		});
	});

	describe('Performance and Quality Validation', () => {
		it('should have reasonable data sizes', () => {
			const sizeSchema = z.object({
				heroDataSize: z.number().max(10000),
				experienceDataSize: z.number().max(20000),
				projectsDataSize: z.number().max(50000),
				contactDataSize: z.number().max(15000),
			});

			const sizeData = {
				heroDataSize: JSON.stringify(heroData).length,
				experienceDataSize: JSON.stringify(experienceData).length,
				projectsDataSize: JSON.stringify(projectsData).length,
				contactDataSize: JSON.stringify(contactData).length,
			};

			const result = sizeSchema.safeParse(sizeData);
			expect(result.success).toBe(true);
		});

		it('should have quality text content', () => {
			const qualityTextSchema = z.string().min(10).max(1000);

			// Test project descriptions
			projectsData.forEach((project, index) => {
				const result = qualityTextSchema.safeParse(project.description);
				expect(
					result.success,
					`Project ${index} description quality issue`,
				).toBe(true);
			});

			// Test contact intro
			const introResult = qualityTextSchema.safeParse(
				contactData.intro.description,
			);
			expect(
				introResult.success,
				'Contact intro description quality issue',
			).toBe(true);
		});
	});
});
