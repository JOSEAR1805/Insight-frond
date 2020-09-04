import { Form, Input, Row, Col, Button, Select, Tag } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { TweenOneGroup } from 'rc-tween-one';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import App from "../../src/components/layout/app";

const { TextArea } = Input;
const { Option } = Select;

const searchSettingsForm = () => {
	const countries = []; // paises para cargar el select
	const [categories, setCategories] = useState([]);
	const [words, setWords] = useState([]);
  const [inputVisible, setInputVisible] = useState();
  const [inputValue, setInputValue] = useState('');
	const router = useRouter();

	const routes = [
		{
			key: '1',
			path: '/searchSettings',
			breadcrumbName: 'Configuración de Búsqueda',
		},
		{
			key: '2',
			path: '/searchSettings/add',
			breadcrumbName: 'Nueva Conf. de Búsqueda',
		},
	];
	
	for (let i = 10; i < 36; i++) {
		countries.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
	}

	function handleChange(value) {
		console.log(`selected ${value}`);
	}

  const onGenderChange = value => {
    form.setFieldsValue({ country: value });
	};
	
	const handleClose = removedTag => {
    let aux = words.filter(tag => tag !== removedTag);
    console.log(aux);
    setWords(aux);
  };

  const showInput = () => {
    setInputVisible(true, () => input.focus());
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    // const { inputValue } = inputValue;
    let aux = words;
    if (inputValue && aux.indexOf(inputValue) === -1) {
      aux = [...aux, inputValue];
    }
    console.log(aux);
    setWords(aux);
    setInputVisible(false);
    setInputValue('');
  };

  const saveInputRef = input => {
    input = input;
  };

  const forMap = tag => {
    const tagElem = (
      <Tag
        closable
        onClose={e => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };
	
	const onFinish = async (values) => {
    const payload = await axios
			.post("https://api-insight.tk/search_settings/", values)
			.catch((err) => console.log(err));
		
    if (payload && payload.data) {
			router.push("/users");
    } else {
			alert("Error guardando");
    }
  };
	
	const tagChild = words.map(forMap);
	return (
		<App routes={routes}>
			<Row justify="center" style={{ "padding-top": "15px" }}>
				<Col md={24} lg={16}>
					<Form
						layout="vertical"
						name="basic"
						initialValues={{
							remember: true,
						}}
						onFinish={onFinish}
					>
						<Row gutter={[16, 16]}>

							<Col xs={24} sm={12} md={12}>
								<Form.Item
									label={'Nombre de la Institución'}
									name={'name'}
									rules={[
										{
											required: true,
											// message: "Por favor ingrese un nombre!",
										},
									]}
								>
									<Input
										placeholder={'Introduzca un Nombre de la Institución'}
										type={'text'}
										size="small"
									/>
								</Form.Item>
							</Col>

							<Col xs={24} sm={12} md={12}>
								<Form.Item
                  label="Selecciona Categoría"
                  name="category"
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                >
                    <Select 
                      size="small"
                      onChange={onGenderChange}
                      placeholder="Seleccionar Categoría"
                    >
                    {categories.map((resp) => {
                      return (
                        <Option value={resp.id}>{resp.name}</Option>
                      );
                    })} 
                  </Select>
                </Form.Item>
							</Col>

							<Col span={24}>
								<Form.Item
									label={'Url '}
									name={'url'}
									rules={[
										{
											required: true,
											// message: "Por favor ingrese un nombre!",
										},
									]}
								>
									<Input
										placeholder={'Introduzca la Url'}
										type={'text'}
										size="small"
									/>
								</Form.Item>
							</Col>

							<Col span={24}>
								<Form.Item
                  label="Seleccionar Pais(es)"
                  name="country"
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                >
									<Select 
										size="small"
										mode="tags" 
										placeholder="Selecionar Pais(es)" 
										onChange={handleChange}
									>
    								{countries}
  								</Select>
                </Form.Item>
							</Col>

							<Col span={24}>
								<Form.Item
									label={'Descripción'}
									name={'description'}
									rules={[
										{
											required: true,
											// message: "Por favor ingrese un nombre!",
										},
									]}
								>
									<TextArea
										rows={1}
										size="small"
										placeholder={'Introduzca una Descripción'}
									/>
								</Form.Item>
							</Col>

							<Col xs={24} sm={12} md={12}>
								<Form.Item
									label={"Palabras a buscar"}
								>
									{inputVisible && (
									<Input
										ref={saveInputRef}
										type="text"
										size="small"
										style={{ width: 78 }}
										value={inputValue}
										onChange={handleInputChange}
										onBlur={handleInputConfirm}
										onPressEnter={handleInputConfirm}
									/>
								)}
								{!inputVisible && (
									<Tag onClick={showInput} className="site-tag-plus">
										Agregar Palabra <PlusOutlined />
									</Tag>
								)}
								</Form.Item>
							</Col>
							<Col span={24}>
								<TweenOneGroup
									enter={{
										scale: 0.8,
										opacity: 0,
										type: 'from',
										duration: 100,
										onComplete: e => {
											e.target.style = '';
										},
									}}
									leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
									appear={false}
								>
									{tagChild}
								</TweenOneGroup>
							</Col>

						</Row>
						<Row justify="center">
							<Col xs={24} sm={12} md={6}>
								<Button
									type="primary"
									block="true"
									htmlType="buttom"
									size="small"
								>
									Guardar
								</Button>
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
		</App>
	);
}

export default searchSettingsForm;