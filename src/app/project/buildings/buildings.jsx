import React from 'react';
import { Button, message, Typography, Row, Col, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Plot from 'react-plotly.js';
import './buildings.css';
var { dialog } = require('electron').remote;
var dxfparsing = require('dxf-parsing');
var dxf = dxfparsing.Parser;



function open_dxf(setData){
    let filePath ;
    filePath =  dialog.showOpenDialogSync({
        properties: ['openFile']
    });

    if(filePath != undefined){
        
        filePath = filePath[0];

        dxf.toArray(filePath, function(error, sectionTab) {
            let layers = [];

            let layersByEntities = dxf.getLayersByEntities(sectionTab, ["polygon"]);
            let polygons = dxf.getPolygons(sectionTab);

            //extract parameters and dimension
            let parameters = dxf.getParameters(sectionTab);
            let dimensions = dxf.getDimensions(polygons);

           
            for(let layer of layersByEntities.polygon)
            {   
                let points = [];
                for (let point of polygons[layer]["0"].points)
                {
                    points.push(point);
                }
                points.push(points[0]);
                layers.push(points);
            }
            
            console.log(layers);
            setData(layers);

        });
    }
}

export default function Buildings(){

    const [data, setData] = React.useState([]);
    const [modalData, setModalData] = React.useState([]);
    const [currPlot, setCurrPlot] = React.useState([]);
    const [currLayer, setCurrLayer] = React.useState([]);
    const [entityShow, setEntityShow] = React.useState(false);


    const changeLayer = (layer) => {
        setCurrLayer(
            [{
                x: layer.map((point)=>point.x),
                y: layer.map((point)=>point.y),
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'red'},
            }]
        );
    };

    const add_toPlot = (layer) =>{
        currPlot.push(layer[0]);
        setCurrPlot([...currPlot]);
    };

    const displayEntityModal = () => {
        setEntityShow(true);
    }

    const handleEntitySubmit = () => {
        add_toPlot(currLayer);

        setEntityShow(false);
        console.log(currLayer);
        console.log(currPlot);
    };

    const handleEntityCancel = () => {
        setEntityShow(false);
    };
    
    
   
    return(
        <div className="buildings_root">
            <Button
                onClick={displayEntityModal}>
                Adauga entitate
            </Button>
            <Plot
                className="plot-frame"
                data={currPlot}
                layout={{dragmode:'pan'}}
                config={{displaylogo:false,responsive:true}}
            />

            <Modal
                className='entity-modal'
                width='85vh'
                title='Adauga entitate'
                visible={entityShow}
                onOk={handleEntitySubmit}
                onCancel={handleEntityCancel}
            >
                <Row>
                    <Col style={{marginTop:100,marginLeft:50, marginRight:10}}>
                        <Row>
                            <Button
                                icon={<UploadOutlined />}
                                onClick={()=>open_dxf(setModalData)}
                            >
                                Deschide DXF
                            </Button>
                        </Row>
                        {modalData.map((layer,index)=>(
                            <Row><Button style={{marginTop:10}}key={index} onClick={()=>changeLayer(layer)}> {'Polilinia'+index} </Button></Row>
                        ))}
                    </Col>
                    <Col>
                        <Plot
                            className="plot-frame"
                            data={currLayer}
                            layout={{dragmode:'pan'}}
                            config={{displaylogo:false,responsive:true}}
                        />
                    </Col>
                </Row>
            </Modal>
        </div>
    );
}