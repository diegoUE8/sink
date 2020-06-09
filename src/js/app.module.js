import { CoreModule, Module } from 'rxcomp';
import { FormModule } from 'rxcomp-form';
import { AgoraComponent } from './agora/agora.component';
import AppComponent from './app.component';
import ControlRequestModalComponent from './control-request/control-request-modal.component';
import DropdownItemDirective from './dropdown/dropdown-item.directive';
import DropdownDirective from './dropdown/dropdown.directive';
import ControlCustomSelectComponent from './forms/control-custom-select.component';
import ModalOutletComponent from './modal/modal-outlet.component';
import ModalComponent from './modal/modal.component';
import { ModelGltfComponent } from './model-viewer/model-gltf.component';
import { ModelPictureComponent } from './model-viewer/model-picture.component';
import { ModelTextComponent } from './model-viewer/model-text.component';
import { ModelViewerComponent } from './model-viewer/model-viewer.component';
import { ModelComponent } from './model-viewer/model.component';
import { SliderDirective } from './slider/slider.directive';
import TryInARModalComponent from './try-in-ar/try-in-ar-modal.component';
import TryInARComponent from './try-in-ar/try-in-ar.component';

export class AppModule extends Module {}

AppModule.meta = {
	imports: [
		CoreModule,
		FormModule,
	],
	declarations: [
		AgoraComponent,
		ControlCustomSelectComponent,
		ControlRequestModalComponent,
		DropdownDirective,
		DropdownItemDirective,
		ModalComponent,
		ModalOutletComponent,
		ModelComponent,
		ModelGltfComponent,
		ModelPictureComponent,
		ModelTextComponent,
		ModelViewerComponent,
		SliderDirective,
		TryInARComponent,
		TryInARModalComponent,
	],
	bootstrap: AppComponent,
};
