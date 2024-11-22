export type Collections = {
	home: Home;
	articoli: Articoli;
	blog: Blog;
	eventi: Eventi;
	about: About;
	settings: Settings;
};

export type CollectionName = keyof Collections;

export type Home = {
	hero_title: string;
	hero_description: string;
	hero_cover: string;
	introduction: string;
	features: { emoji: string; title: string; description: string };
};

export type Articoli = { title: string; content: string };

export type Blog = { title: string; content: string };

export type Eventi = {
	title: string;
	content: string;
	cover: string;
	date: string;
	time: string;
	location: string;
};

export type About = { title: string; content: string };

export type Settings = {
	title: string;
	description: string;
	logo: string;
	menu: { label: string; href: string };
	colors: { base: string; 'base-content': string; accent: string; 'accent-content': string };
};
