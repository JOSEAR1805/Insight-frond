import App from "../../src/components/layout/app";
import FormSystem from '../../src/components/form';

const UserForm = () => {
	const routes = [
		{
			key: '1',
			path: '/users',
			breadcrumbName: 'Usuarios',
		},
		{
			key: '2',
			path: '/users/add',
			breadcrumbName: 'Nuevo Usuario',
		},
	];
	
	const data = [
		{
			key: '1',
			label: 'Nombre',
			name: 'name',
			placeholder: 'Nombre'
		},
		{
			key: '2',
			label: 'Apellido',
			name: 'last_name',
			placeholder: 'Apellido'
		},
		{
			key: '3',
			label: 'Telefono',
			name: 'phone',
			placeholder: '+57 000 0000000'
		},
		{
			key: '4',
			label: 'Direccion',
			name: 'address',
			placeholder: 'Dirección'
		},
		{
			key: '5',
			label: 'Correo Electronico',
			name: 'email',
			placeholder: 'Example@gmail.com'
		},
	];

	return (
		<App routes={routes}>
			<FormSystem items={data} />
		</App>
	);
}

export default UserForm;