import React from 'react';
import { Modal, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/ro_RO';
import 'moment/locale/ro';

import moment from 'moment';


const {Option} = Select;

const layout = {
    wrapperCol: {
      span:20,
    },
    labelCol: {
      span:10,
    },
  };

  
const doc_types = [
    'act administrativ','act normativ', 'act notarial',
    'actiune in instanta','certificat grefa','hotarare judecatoreasca',
    'inscris sub semnatura privata',
    'ordonanta','registrul cadastral al proprietarilor',
    'somatie',
];

export default function EditDocuments(props){

    const visible = props.visible;
    const [data, setData] = React.useState({});

    React.useEffect(()=>{
      setData({...props.data[props.index]});
    },[props.index])

    const onSubmit = () => {
        props.changeData(data);
        onClose();
    }
  
      const onClose = () => {
        props.changeVisible({visible:false, index:props.index}); 
    }

    return(
        <Modal
          title={"Modificare document"}
          width={650}
          visible={visible}
          onOk={onSubmit}
          onCancel={onClose}
          footer={[
            <Button onClick={onClose}>
              Anuleaza
            </Button>,
            <Button type="primary" onClick={onSubmit}>
              Modifica
            </Button>,
          ]}
          >
            <Form {...layout} hideRequiredMark size="large">
              <Row gutter={16}>
                <Col span={20}>
                  <Form.Item
                    wrapperCol={layout.wrapperCol}
                    label="Numar"
                  >
                    <Input
                        value={data.number || ''}
                        onChange={(event) => {data.number=event.currentTarget.value; setData(Object.assign({},data));} } 
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={20}>
                  <Form.Item 
                    label="Data"
                    wrapperCol={layout.wrapperCol}
                  >
                    {data.date != ''?
                      <DatePicker
                        locale={locale}
                        defaultValue={moment(data.date, 'DD-MM-YYYY')} 
                        format={'DD-MM-YYYY'}
                        placeholder={'Selecteaza Data'}
                        onChange={(moment,date) => {data.date=date; setData(Object.assign({},data));}}
                      />:
                      <DatePicker
                        locale={locale}
                        defaultValue={null} 
                        format={'DD-MM-YYYY'}
                        placeholder={'Selecteaza Data'}
                        onChange={(moment,date) => {data.date=date; setData(Object.assign({},data));}}
                      />
                    }
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={20}>
                  <Form.Item
                    wrapperCol={layout.wrapperCol}
                    label="Tip Document"
                  >
                    {data.type != '' ? 
                      <Select placeholder="Selecteaza"
                        value={data.type}
                        onChange={(value) => {data.type = value;  setData(Object.assign({},data));}}
                       >
                        {doc_types.map((type,index) => (
                          <Option key={index} value={type}>{type}</Option>
                        ))}
                      </Select>:
                      <Select placeholder="Selecteaza"
                        onChange={(value) => {data.type = value;  setData(Object.assign({},data));}}
                      >
                        {doc_types.map((type,index) => (
                          <Option key={index} value={type}>{type}</Option>
                        ))}
                      </Select>
                   }                   
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={20}>
                  <Form.Item
                    wrapperCol={layout.wrapperCol}
                    label="Autoritate"
                  >
                    <Input
                      value={data.authority} 
                      onChange={(event) => {data.authority=event.currentTarget.value; setData(Object.assign({},data))}}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>
    );
}