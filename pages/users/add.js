import App from "../../src/components/layout/app";
import FormSystem from "../../src/components/form";

const UserForm = () => {
  const routes = [
    {
      key: "1",
      path: "/users",
      breadcrumbName: "Usuarios",
    },
    {
      key: "2",
      path: "/users/add",
      breadcrumbName: "Nuevo Usuario",
    },
  ];

  const data = [
    {
      key: "1",
      label: "Nombre",
      name: "first_name",
      type: "text",
      placeholder: "Nombre",
    },
    {
      key: "2",
      label: "Apellido",
      name: "last_name",
      type: "text",
      placeholder: "Apellido",
    },
    {
      key: "3",
      label: "Usuario",
      name: "username",
      type: "text",
      placeholder: "Usuario",
    },
    {
      key: "4",
      label: "Contraseña",
      name: "password",
      type: "password",
      placeholder: "**********",
    },
    {
      key: "5",
      label: "Correo Electronico",
      name: "email",
      type: "email",
      placeholder: "Example@gmail.com",
    },
  ];

  return (
    <App routes={routes}>
      <FormSystem items={data} />
    </App>
  );
};

export default UserForm;
