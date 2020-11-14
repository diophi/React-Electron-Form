import React from 'react';
import { Table, Tag, Empty, Tooltip, Typography } from 'antd';
import { Modal, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/ro_RO';
import './documents.css'
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';
import 'moment/locale/ro';

import EditDocuments from './editdocuments';

const { Option } = Select;


const layout = {
  wrapperCol: {
    span:20,
  },
  labelCol: {
    span:10,
  },
};


const createEntry = (number,date,type,authority) => ( {number,date,type,authority}  );

const doc_types = [
  'act administrativ','act normativ', 'act notarial',
  'actiune in instanta','certificat grefa','hotarare judecatoreasca',
  'inscris sub semnatura privata',
  'ordonanta','registrul cadastral al proprietarilor',
  'somatie',
];


export default function Documents(props){
    const [data, setData] = React.useState(props.data.documents);
    const [formData, setFormData] = React.useState(createEntry('','','',''));
    const [visible, setVisible] = React.useState(false);
    const [editState, setEditState] = React.useState({visible:false, index: 0});
    const visibleEdit = editState.visible;
    const editIndex = editState.index;

    const columns = [
      {
        title: 'Numar',
        dataIndex: 'number',
        key: 'number',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Data',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Tip',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Autoritate',
        key: 'authority',
        dataIndex: 'authority',
        render: tag => (
          <span>
                <Tag color={tag.length > 7 ? 'geekblue' : 'green'} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
          </span>
        ),
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
              onClick={()=> { data.splice(index,1); setData([...data]);  props.data.documents = [...data]; props.changeData(props.data); }}
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
      props.data.documents = [...data];
      props.changeData(props.data);
    };

    const editRow = (obj) => {
      data[editIndex] = obj;
      setData([...data]);

      //parent state
      props.data.documents = [...data];
      props.changeData(props.data);
    };

    const onSubmit = () => {
      changeData(formData);
      onClose();
    }

    const onClose = () => {
      setFormData(createEntry('','','',''));
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
                  locale={{emptyText:<Empty style={{minHeight:'calc(100vh - 525px)'}} description={'Fara documente'}/>}}
              />
              <div className="buttons" style={{marginTop:20, marginBottom:20, float:'right'}}>
                  <Button size="large" type="primary" onClick={() => {setVisible(true);}}>Adauga</Button>
              </div>
          </div>
          <Modal
          title="Document nou"
          width={650}
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
            <Form {...layout} hideRequiredMark size="large">
              <Row gutter={16}>
                <Col span={20}>
                  <Form.Item
                    wrapperCol={layout.wrapperCol}
                    label="Numar"
                  >
                    <Input
                      value={formData.number || ''}
                      onChange={(event) => {formData.number=event.currentTarget.value; setFormData(Object.assign({},formData));} } 
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
                    {formData.date == '' ?
                      <DatePicker
                        locale={locale}
                        format={'DD-MM-YYYY'}
                        value={null}
                        placeholder={'Selecteaza Data'}
                        onChange={(moment,date) => {formData.date=date; setFormData(Object.assign({},formData));}}
                      />:
                      <DatePicker
                        locale={locale}
                        format={'DD-MM-YYYY'}
                        placeholder={'Selecteaza Data'}
                        onChange={(moment,date) => {formData.date=date; setFormData(Object.assign({},formData));}}
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
                    {formData.type == '' ?
                      <Select placeholder="Selecteaza"  onChange={(value) => {formData.type = value;  setFormData(Object.assign({},formData));}}>
                        {doc_types.map((type,index) => (
                          <Option key={index} value={type}>{type}</Option>
                        ))}
                      </Select>:
                      <Select 
                        placeholder="Selecteaza"
                        value={formData.type} 
                        onChange={(value) => {formData.type = value;  setFormData(Object.assign({},formData));}}
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
                      value={formData.authority} 
                      onChange={(event) => {formData.authority=event.currentTarget.value; setFormData(Object.assign({},formData))}}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>
          {data.length > 0 && <EditDocuments visible={visibleEdit} changeVisible={setEditState} index={editIndex} data={data} changeData={editRow}/> }
        </div>
    );
}
