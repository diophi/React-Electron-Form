import { Form, Input, Button, Checkbox, Select, Typography } from 'antd';
import React from 'react';

import './author.css';

const {Option} = Select;

const layout = {
  wrapperCol: {
    span:10,
  },
  labelCol: {
    span:8,
  },
};

const options =['Inregistrare imobil','Actualizare date imobil' ,'Altele in curand'];

const Author = (props) => {
  
  let data = props.data;


  return (
    <Form
      {...layout}
      className="form1"
      size="large"
    >
      <Form.Item
        wrapperCol={layout.wrapperCol}
        label="Nume autorizat"
      >
        <Input 
          value={data.author.name} 
          onChange={(event) => { data.author.name = event.target.value; props.changeData(data);} }
        />
      </Form.Item>

      <Form.Item
        wrapperCol={layout.wrapperCol}
        label="Serie autorizata"
      >
        <Input 
          value={data.author.series} 
          onChange={(event) => { data.author.series = event.target.value; props.changeData(data);} }
        />
      </Form.Item>
      <Form.Item
        wrapperCol={layout.wrapperCol}
        label="Tip operatiune"
      >
        {data.type == '' ? 
          <Select
            placeholder="Selecteaza tipul operatiunii"
            allowClear
            onChange={(value) => { data.type = value; props.changeData(data);} }
          >
            {options.map((option,index) => (
              index != 2 ? <Option key={index} value={option}>{option}</Option> : <Option disabled key={index} value={option}>{option}</Option>
            ))}
          </Select>
          :
          <Select
          placeholder="Selecteaza tipul operatiunii"
          defaultValue={data.type}
          allowClear
          onChange={(value) => { data.type = value; props.changeData(data);} }
        >
          {options.map((option,index) => (
            index != 2 ? <Option key={index} value={option}>{option}</Option> : <Option disabled key={index} value={option}>{option}</Option>
          ))}
        </Select>

        }
      </Form.Item>

    </Form>
  );
};

export default Author;
