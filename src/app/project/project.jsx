import React from 'react';
import { Button, Steps, message } from 'antd';
import Author from './author/author.jsx';
import Documents from './documents/documents.jsx';
import People from './people/people.jsx';
import Buildings from './buildings/buildings.jsx';
import './project.css';

const {Step} = Steps;

const steps = ['Initializare', 'Titulari', 'Documente', 'Imobile'];

const get_content = (index,data,changeData) => {
    const steps = [
        <Author data={data} changeData={changeData} />,
        <People data={data} changeData={changeData} />,
        <Documents data={data} changeData={changeData} />,
        <Buildings data={data} changeData={changeData} />
    ];

    return steps[index];
}

const createData = () =>( 
    {
        author:{
            name:'',
            series:''
        },
        type:'',
        documents:[],
        people:[],
        buildings:{},
    }
); 

export default function Project () {
    const [current, setCurrent ] = React.useState(0);
    const [data, setData] = React.useState(createData());

    const changeData = (obj) => {
        setData(Object.assign({},obj));
    };


    const handleChange = value => {
        setCurrent(value);
    };
    const handleNext = () => {
        if(current < steps.length-1)
            setCurrent(current+1); 
    };
    const handlePrev = () => {
        if(current > 0)
            setCurrent(current-1); 
    };

    return(
        <div className="root">
            <Steps
                current={current}
                onChange={handleChange}
                className="site-navigation-steps"
            >
                {steps.map((step,index) => (
                    <Step key={index} title={step}/>
                ))}
            </Steps>
            <div className="steps-content">
                {get_content(current,data,changeData)}
            </div>
            <div className="steps-action">
                <Button size='large' style={{ marginTop: 8 }} 
                    onClick={() => console.log(data)}
                >
                    Salvare temp.
                </Button>
                <div className="push"/>
                <div className="buttons">
                    {current > 0 && (
                        <Button 
                            style={{ marginRight: 8 }} 
                            size="large"
                            onClick={() => handlePrev()}
                        >
                            Inapoi
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button 
                            style={{ marginTop: 8 }}
                            size="large"
                            type="primary" 
                            onClick={() => handleNext()}
                        >
                            Urmatorul
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button 
                            style={{ marginTop: 8 }} 
                            size="large"
                            type="primary" 
                            onClick={() => message.success('Processing complete!')}
                            >
                            Finalizare
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
