import { readdir } from 'node:fs/promises';

const previewJsonPath = '../lib/preview.json';

const previewInfo: Record<
	'block' | 'components' | 'ui',
	{
		name: string;
		title: string;
		demoList: string[];
	}[]
> = {
	block: [],
	components: [],
	ui: [],
};

let previewJsonContent = `{`;

const getPreviewTitle = (name: string) => {
	const title = name.charAt(0).toUpperCase() + name.slice(1);
	return title.replace(/-(\w)/g, (_, letter) => ` ${letter.toUpperCase()}`);
};

const uiFiles = await readdir('../components/ui', { recursive: true });
const uiFilesList = uiFiles.filter((name) => {
	return name.split('.').length === 1 && name !== 'components';
});

for (const name of uiFilesList) {
	const allFile = await readdir(`../components/ui/${name}`, {
		recursive: true,
	});
	previewInfo.ui.push({
		name,
		title: getPreviewTitle(name),
		demoList: allFile.filter((v) => v.includes('demo')),
	});
}

for (const [index, info] of Object.entries(previewInfo).entries()) {
	const [k, list] = info;
	const maxLen = Object.entries(previewInfo).length - 1;
	const maxI = list.length - 1;
	previewJsonContent += `
		"${k}": [
	`;

	list.forEach((item, i) => {
		const { name, title, demoList } = item;
		const demeNameList = demoList.sort().reduce((str, demo) => {
			return `${str ? `${str},` : ''} "${demo}"`;
		}, '');
		previewJsonContent += `
			{
				"name": "${name}",
				"title": "${title}",
				"demolist": [${demeNameList}]
			}${maxI === i ? '' : ','}
		`;
	});
	previewJsonContent += `
		]${maxLen === index ? '' : ','}
	`;
}

previewJsonContent += `
}
`;

await Bun.write(previewJsonPath, previewJsonContent);
