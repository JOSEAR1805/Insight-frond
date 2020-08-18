import App from "../../src/components/layout/app";
import FormSystem from '../../src/components/form';

const ProfilesForm = () => {
	const routes = [
		{
			key: '1',
			path: '/profiles',
			breadcrumbName: 'Perfiles',
		},
		{
			key: '2',
			path: '/profiles/add',
			breadcrumbName: 'Nuevo Perfil',
		},
	];
	
	const data = [
		{
			key: '1',
			label: 'Nombre',
			name: 'name',
			placeholder: 'Nombre del Perfil'
		},
		{
			key: '2',
			label: 'Descripción',
			name: 'description',
			placeholder: 'Descripción del Perfil'
		}
	];

	return (
		<App routes={routes}>
			<FormSystem items={data} />
		</App>
	);
}

export default ProfilesForm;