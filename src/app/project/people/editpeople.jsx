import React from 'react';
import { Modal, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/ro_RO';
import 'moment/locale/ro';

import moment from 'moment';


const {Option} = Select;

const layout = {
    wrapperCol: {
      span:15,
    },
    labelCol: {
      span:6,
    },
  };

  
  const createNatural = (name,surname,firstLetter,prevName,CNP,citizen, id_type, id_series, id_number, phone, email, address) => (
    {name,surname,firstLetter,prevName,CNP,citizen, id_type, id_series, id_number, phone, email, address}
  );
  
  const createJuridical = (name, CUI, phone, email, address) => ({name, CUI, phone, email, address});
  
  const createInstitution = (name) => ({name});
  
  const people_types = [
    'Persoana Fizica',
    'Persoana Juridica',
    'Institutiile Statului'
  ];
  
export default function EditPeople(props){

    const visible = props.visible;
    const [formData, setFormData] = React.useState({});

    React.useEffect(()=>{
      setFormData({...props.data[props.index]});
    },[props.index])

    const onSubmit = () => {
      props.changeData(formData);
      onClose();
    }
  
    const onClose = () => {
      props.changeVisible({visible:false, index:props.index}); 
    }

    return(
        <Modal
          title={"Modificare Titular"}
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
            
            <Form {...layout} hideRequiredMark >
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    wrapperCol={layout.wrapperCol}
                    label="Tip Persoana"
                  > 
                    <Select placeholder="Selecteaza"
                      value = {formData.type}
                      onChange={(value) => {
                          const new_formData= { type:value};
                          if(value == people_types[0]) setFormData(Object.assign(new_formData,createNatural('','','','','','','','','','','','')));
                          else if (value == people_types[1]) setFormData(Object.assign(new_formData,createJuridical('','','','','')));
                          else setFormData(Object.assign(new_formData,createInstitution('')));
                          }}
                    >
                      {people_types.map((type,index) => (
                        <Option key={index} value={type}>{type}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              {formData.type == people_types[2]  &&  // INSTITUTE
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      wrapperCol={layout.wrapperCol}
                      label="Denumire"
                    >
                      <Input 
                        value={formData.name || ''}
                        onChange={(event) => {formData.name= event.currentTarget.value; setFormData(Object.assign({},formData)) } }
                      />
                    </Form.Item>
                  </Col>
                </Row>
              }
              {formData.type == people_types[1] && // JURIDICAL
                <div>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        wrapperCol={layout.wrapperCol}
                        label="Denumire"
                      >
                        <Input
                         value={formData.name || ''}
                         onChange={(event) => {formData.name= event.currentTarget.value; setFormData(Object.assign({},formData)) } }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        wrapperCol={layout.wrapperCol}
                        label="CUI"
                      >
                        <Input
                         value={formData.CUI || ''}
                         onChange={(event) => {formData.CUI= event.currentTarget.value; setFormData(Object.assign({},formData)) } }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        wrapperCol={layout.wrapperCol}
                        label="Telefon"
                      >
                        <Input
                          value={formData.phone || ''}
                          onChange={(event) => {formData.phone= event.currentTarget.value; setFormData(Object.assign({},formData)) } }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        wrapperCol={layout.wrapperCol}
                        label="Email"
                      >
                        <Input
                         value={formData.email || ''}
                         onChange={(event) => {formData.email= event.currentTarget.value; setFormData(Object.assign({},formData)) } }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        wrapperCol={layout.wrapperCol}
                        label="Adresa"
                      >
                        <Input.TextArea rows={4}
                         value={formData.address || ''}
                         onChange={(event) => {formData.address= event.currentTarget.value; setFormData(Object.assign({},formData)) } }
                        />
                      </Form.Item>
                    </Col>
                  </Row>

               </div>
              }
              {formData.type == people_types[0] && // NATURAL
                <div>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        wrapperCol={layout.wrapperCol}
                        label="Nume"
                      >
                        <Input
                         value={formData.name || ''}
                         onChange={(event) => {formData.name= event.currentTarget.value; setFormData(Object.assign({},formData)) } }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        wrapperCol={layout.wrapperCol}
                        label="Prenume"
                      >
                        <Input
                         value={formData.surname || ''}
                         onChange={(event) => {formData.surname= event.currentTarget.value; setFormData(Object.assign({},formData)) } }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        wrapperCol={layout.wrapperCol}
                        label="Initiala tata"
                      >
                        <Input
                         value={formData.firstLetter || ''}
                         onChange={(event) => {formData.firstLetter= event.currentTarget.value; setFormData(Object.assign({},formData)) } }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        wrapperCol={layout.wrapperCol}
                        label="Nume anterior"
                      >
                        <Input
                         value={formData.prevName || ''}
                         onChange={(event) => {formData.prevName = event.currentTarget.value; setFormData(Object.assign({},formData)) } }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        wrapperCol={layout.wrapperCol}
                        label="CNP"
                      >
                        <Input
                         value={formData.CNP || ''}
                         onChange={(event) => {formData.CNP = event.currentTarget.value; setFormData(Object.assign({},formData)) } }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        wrapperCol={layout.wrapperCol}
                        label="Cetatenie"
                      >
                        <Input
                         value={formData.citizen || ''}
                         onChange={(event) => {formData.citizen = event.currentTarget.value; setFormData(Object.assign({},formData)) } }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={12}>
                    <Col span={5}>
                      <Form.Item
                        wrapperCol={layout.wrapperCol}
                      >
                        <Typography>Act de identitate</Typography>
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        wrapperCol={layout.wrapperCol}
                        label="Tip"
                      >
                        <Input
                         value={formData.id_type || ''}
                         onChange={(event) => {formData.id_type= event.currentTarget.value; setFormData(Object.assign({},formData)) } }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Form.Item
                        wrapperCol={layout.wrapperCol}
                        label="Serie"
                      >
                        <Input
                         value={formData.id_series || ''}
                         onChange={(event) => {formData.id_series= event.currentTarget.value; setFormData(Object.assign({},formData)) } }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Form.Item
                        wrapperCol={layout.wrapperCol}
                        label="Numar"
                      >
                        <Input
                         value={formData.id_number || ''}
                         onChange={(event) => {formData.id_number= event.currentTarget.value; setFormData(Object.assign({},formData)) } }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        wrapperCol={layout.wrapperCol}
                        label="Telefon"
                      >
                        <Input
                         value={formData.phone || ''}
                         onChange={(event) => {formData.phone= event.currentTarget.value; setFormData(Object.assign({},formData)) } }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        wrapperCol={layout.wrapperCol}
                        label="Email"
                      >
                        <Input
                         value={formData.email || ''}
                         onChange={(event) => {formData.email= event.currentTarget.value; setFormData(Object.assign({},formData)) } }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        wrapperCol={layout.wrapperCol}
                        label="Adresa"
                      >
                        <Input.TextArea rows={4}
                         value={formData.address || ''}
                         onChange={(event) => {formData.address= event.currentTarget.value; setFormData(Object.assign({},formData)) } }
                        />
                      </Form.Item>
                    </Col>
                  </Row>

               </div>
              }
            </Form>
          </Modal>
    );
}