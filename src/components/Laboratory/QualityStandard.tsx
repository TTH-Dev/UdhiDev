import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProductUsageMonitor from './ProductUsageMonitor';
import TemperatureMonitor from './TemperatureMonitor';

const QualityStandard = () => {
  return (
    <>
        <Tabs
      defaultActiveKey="Product Usage Monitor"
      id="uncontrolled-tab-example"
     className='ms-4'
    >
      <Tab eventKey="Product Usage Monitor" title="Product Usage Monitor">
     <ProductUsageMonitor/>
      </Tab>
      <Tab eventKey="Temperature Monitor" title="Temperature Monitor">
     <TemperatureMonitor/>
      </Tab>
    </Tabs>
    </>
  )
}

export default QualityStandard