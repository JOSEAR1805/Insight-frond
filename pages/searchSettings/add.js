import App from "../../src/components/layout/app";
import FormSystem from '../../src/components/form';
import TagGroupSystem from '../../src/components/form/tagGroup';


const searchSettingsForm = () => {
	const routes = [
		{
			key: '1',
			path: '/searchSettings',
			breadcrumbName: 'Urls de Busquedas',
		},
		{
			key: '2',
			path: '/searchSettings/add',
			breadcrumbName: 'Nueva Url de Busquedad',
		},
	];
	
	const data = [
		{
			key: '1',
			label: 'Nombre',
			name: 'page_name',
			placeholder: 'Nombre de Página'
		},
		{
			key: '2',
			label: 'Url',
			name: 'page_url',
			placeholder: 'Url de Página'
		},
		{
			key: '3',
			label: 'Pais',
			name: 'country',
			placeholder: 'Pais de Página'
		},
		{
			key: '4',
			label: 'Descripción',
			name: 'description',
			placeholder: ''
		},
	];

	return (
		<App routes={routes}>
			<FormSystem items={data}>
				<TagGroupSystem />
			</FormSystem>
		</App>
	);
}

export default searchSettingsForm;