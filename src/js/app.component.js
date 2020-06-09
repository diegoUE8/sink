import { Component, getContext } from 'rxcomp';

export default class AppComponent extends Component {

	onInit() {
		const { node } = getContext(this);
		node.classList.remove('hidden');
	}

	// onView() { const context = getContext(this); }

	// onChanges() {}

	// onDestroy() {}

}

AppComponent.meta = {
	selector: '[app-component]',
};
