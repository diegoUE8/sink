import { Component, getContext } from 'rxcomp';
import { first, map } from 'rxjs/operators';
import { BASE_HREF } from '../const';
import HttpService from '../http/http.service';
import LocationService from '../location/location.service';

export const DevicePlatform = {
	Unknown: 'Unknown',
	IOS: 'ios',
	Android: 'android',
	WindowsPhone: 'windowsPhone',
};

export default class TryInARComponent extends Component {

	onInit() {
		this.devicePlatform = this.getDevicePlatform();
		this.view = null;
		const viewId = this.viewId = this.getViewId();
		// console.log('TryInARComponent.viewId', viewId);
		if (viewId) {
			this.load$().pipe(
				first()
			).subscribe(data => {
				const view = data.products.find(x => x.id === viewId);
				// console.log('TryInARComponent.view', view);
				if (this.devicePlatform === DevicePlatform.Android) {
					const modelViewerNode = this.getModelViewerNode(view);
					const { node } = getContext(this);
					node.appendChild(modelViewerNode);
				} else if (this.devicePlatform === DevicePlatform.IOS) {
					const usdzSrc = `${window.location.protocol}//${this.getHost()}${BASE_HREF}${view.ar.usdz}`;
					window.location.href = usdzSrc;
				}
			});
		}
	}

	getDevicePlatform() {
		const userAgent = navigator.userAgent || navigator.vendor || window.opera;
		// Windows Phone must come first because its UA also contains "Android"
		if (/windows phone/i.test(userAgent)) {
			return DevicePlatform.WindowsPhone;
		}
		if (/android/i.test(userAgent)) {
			return DevicePlatform.Android;
		}
		// iOS detection from: http://stackoverflow.com/a/9039885/177710
		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			return DevicePlatform.IOS;
		}
		return DevicePlatform.Unknown;
	}

	getViewId() {
		let viewId = LocationService.get('viewId') || null;
		if (viewId) {
			viewId = parseInt(viewId);
		}
		return viewId;
	}

	getModelViewerNode(view) {
		const gltfSrc = `${window.location.protocol}//${this.getHost()}${BASE_HREF}${view.ar.gltf}`;
		const usdzSrc = `${window.location.protocol}//${this.getHost()}${BASE_HREF}${view.ar.usdz}`;
		const template = `<model-viewer alt="${view.name}" src="${gltfSrc}" ios-src="${usdzSrc}" magic-leap ar ar_preferred></model-viewer>`;
		const div = document.createElement("div");
		div.innerHTML = template;
		const node = div.firstElementChild;
		return node;
	}

	getHost() {
		let host = window.location.host.replace('127.0.0.1', '192.168.1.2');
		if (host.substr(host.length - 1, 1) === '/') {
			host = host.substr(0, host.length - 1);
		}
		return host;
	}

	load$() {
		return HttpService.get$('./api/data.json').pipe(
			map(data => {
				data.products.forEach(view => {
					view.items.forEach((item, index) => {
						item.index = index;
					});
				});
				return data;
			})
		);
	}

}

TryInARComponent.meta = {
	selector: '[try-in-ar]'
};
