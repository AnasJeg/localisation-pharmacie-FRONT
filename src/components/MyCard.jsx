import React from 'react'; 
import { Card } from 'primereact/card';

export default function MyCard(props) {
    const { Icon, btn, title,subtitle } = props;
    const header = (
        <img alt="Card" src={Icon} style={{ height: 200 }}/>
    );
    return (
        <div className="card flex justify-content-center">
            <Card title={title} subTitle={subtitle} header={header} footer={btn} className="md:w-25rem"  style={{ border: '1px solid #ddd' }}>
            </Card>
        </div>
    )
}