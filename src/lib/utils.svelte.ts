import { page } from '$app/stores';
import { Store } from 'runed';
import { base } from '$app/paths';

//

export class PageState {
	constructor() {}

	private readonly _state = new Store(page);

	url = $derived(this._state.current.url);
	pathname = $derived(this.url.pathname);
	rawPathname = $derived(this.pathname.replace(base, ''));
}
