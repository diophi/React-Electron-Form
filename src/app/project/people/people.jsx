import React from 'react';
import { Table, Tag, Empty, Tooltip, Typography } from 'antd';
import { Modal, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/ro_RO';
import './people.css'
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';
import 'moment/locale/ro';

import EditPeople from './editpeople';

const { Option } = Select;



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


export default function People(props){
    const [data, setData] = React.useState(props.data.people);
    const [formData, setFormData] = React.useState({});
    const [visible, setVisible] = React.useState(false);
    const [editState, setEditState] = React.useState({visible:false, index: 0});
    const visibleEdit = editState.visible;
    const editIndex = editState.index;

    const columns = [
      {
        title: 'Nume',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Prenume',
        dataIndex: 'surname',
        key: 'surname',
      },
      {
        title: 'CNP/CUI',
        key: 'CNP/CUI',
        render: (text, record, index) => (
          <span>
            {record.type == people_types[0] && record.CNP}
            {record.type == people_types[1] && record.CUI}
          </span>
        ),
      },
      {
        title: 'Tip',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '',
        key: 'action',
        align: 'center',
        render: (text, record, index) => (
          <span >
            <Tooltip title="Modifica">
              <Button 
                style={{ marginRight: 16 }}
                icon={<EditOutlined />}
                onClick={()=> setEditState({visible:true, index:index})}
              />
            </Tooltip>
            <Tooltip title="Sterge">
            <Button
              icon={<DeleteOutlined/>}
              onClick={()=> { data.splice(index,1); setData([...data]);  /*props.data.documents = [...data]; props.changeData(props.data);*/ }}
            />
            </Tooltip>
          </span>
        ),
      },
    ];

    const changeData = (obj) => {
      //local state
      data.push(obj);
      data.map((obj,index) => {
        Object.assign(obj,{key:index});
      });
      setData([...data]);

      //parent state
      props.data.people = [...data];
      props.changeData(props.data);
    };

    const editRow = (obj) => {
      data[editIndex] = obj;
      setData([...data]);

      //parent state
      props.data.people = [...data];
      props.changeData(props.data);
    };

    const onSubmit = () => {
      changeData(formData);
      onClose();
    }

    const onClose = () => {
      setFormData({});
      setVisible(false); 
      
    }

    return(
        <div>
          <div className="documents-root" >
              <Table
               scroll={{ y: 270 }}
                  columns={columns} 
                  dataSource={data} 
                  pagination={false} 
                  bordered={true}
                  locale={{emptyText:<Empty style={{minHeight:'calc(100vh - 525px)'}} description={'Fara titulari'}/>}}
              />
              <div className="buttons" style={{marginTop:20, marginBottom:20, float:'right'}}>
                  <Button size="large" type="primary" onClick={() => {setVisible(true);}}>Adauga</Button>
              </div>
          </div>
          <Modal
          title="Titular nou"
          width={850}
          visible={visible}
          onOk={onSubmit}
          onCancel={onClose}
          footer={[
            <Button onClick={onClose}>
              Anuleaza
            </Button>,
            <Button type="primary" onClick={onSubmit}>
              Adauga
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
                    <Col span={6}>
                      <Form.Item
                        wrapperCol={layout.wrapperCol}
                      >
                        <Typography>Act de identitate</Typography>
                      </Form.Item>
                    </Col>
                    <Col span={3}>
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
                    <Col span={22}>
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
          {data.length > 0 && <EditPeople visible={visibleEdit} changeVisible={setEditState} index={editIndex} data={data} changeData={editRow}/> }
        </div>
    );
}
