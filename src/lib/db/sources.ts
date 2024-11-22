import yaml from 'yaml';
import PagesCmsConfigRaw from '$root/.pages.yml?raw';
import type { PagesCmsConfig } from './pages-cms.types';

//

export const SITE_FOLDER_PATH = 'src/lib/site';

export const SITE_CONTENT_INDEX = import.meta.glob('$lib/site/**', {
	query: '?raw',
	import: 'default'
}) as Record<string, () => Promise<string>>;
//                         ^ Promise<string> because we're using ?raw

export const PAGES_CMS_CONFIG = yaml.parse(PagesCmsConfigRaw) as PagesCmsConfig;
