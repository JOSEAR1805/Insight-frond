import { useState } from 'react';
import { Tag, Input, Row, Col, Form } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { PlusOutlined } from '@ant-design/icons';

const TagGroupSystem = () => {
  const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3']);
  const [inputVisible, setInputVisible] = useState();
  const [inputValue, setInputValue] = useState('');

  const handleClose = removedTag => {
    let aux = tags.filter(tag => tag !== removedTag);
    console.log(aux);
    setTags(aux);
  };

  const showInput = () => {
    setInputVisible(true, () => input.focus());
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    // const { inputValue } = inputValue;
    let aux = tags;
    if (inputValue && aux.indexOf(inputValue) === -1) {
      aux = [...aux, inputValue];
    }
    console.log(aux);
    setTags(aux);
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

    // const { tags, inputVisible, inputValue } = this.state;
    const tagChild = tags.map(forMap);
    return (
      <>
        <Row gutter={[16, 16]}>
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
      </>
    );
}

export default TagGroupSystem;