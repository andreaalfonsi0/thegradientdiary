type Options = {
	repoUrl?: string; 
	user?: string; 
	repo?: string;
	body?: string; 
	title?: string;
	labels?: string[];
	template?: string;
	milestone?: string;
	assignee?: string;
	projects?: string[];
	type?: string;
}

export default function newGithubIssueUrl(options: Options = {}) {
	let repoUrl;
	if (options.repoUrl) {
		repoUrl = options.repoUrl;
	} else if (options.user && options.repo) {
		repoUrl = `https://github.com/${options.user}/${options.repo}`;
	} else {
		throw new Error('You need to specify either the `repoUrl` option or both the `user` and `repo` options');
	}

	const url = new URL(`${repoUrl}/issues/new`);

	const types = [
		'body',
		'title',
		'labels',
		'template',
		'milestone',
		'assignee',
		'projects',
		'type',
	];

	for (const type of types) {
		let value = options[type as keyof Options];
		if (value === undefined) {
			continue;
		}

		if (type === 'labels' || type === 'projects') {
			if (!Array.isArray(value)) {
				throw new TypeError(`The \`${type}\` option should be an array`);
			}

			value = value.join(',');
		}

		url.searchParams.set(type, value as string);
	}

	return url.toString();
}