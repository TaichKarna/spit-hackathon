import { Layout } from '@/components/custom/layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FaLeaf } from 'react-icons/fa';
import ThemeSwitch from '@/components/theme-switch'

export default function Analysis() {
  return (
    <Layout>
        <Layout.Header>
        <div className='text-3xl px-10'>
          Data from Edge Nodes
        </div>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
        </div>
      </Layout.Header>
      <Layout.Body>
        <div className="mb-2 grid gap-4 sm:grid-cols-2 px-10">
        <Card className='mx-auto'>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperature</CardTitle>
              <FaLeaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <iframe
                width="450"
                height="260"
                className="border border-gray-300"
                src="https://thingspeak.com/channels/2737024/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&timescale=10&title=TEMPERATURE&type=line"
              ></iframe>
            </CardContent>
          </Card>

          <Card className='mx-auto'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Humidity</CardTitle>
              <FaLeaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <iframe
                width="450"
                height="260"
                className="border border-gray-300"
                src="https://thingspeak.com/channels/2737024/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&timescale=15&title=HUMIDITY&type=line"
              ></iframe>
            </CardContent>
          </Card>

          <Card className='mx-auto'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gas Sensor</CardTitle>
              <FaLeaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <iframe
                width="450"
                height="260"
                className="border border-gray-300"
                src="https://thingspeak.com/channels/2737024/charts/3?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&timescale=15&title=GAS+SENSOR&type=line"
              ></iframe>
            </CardContent>
          </Card>

          <Card className='mx-auto'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AQI</CardTitle>
              <FaLeaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <iframe
                width="450"
                height="260"
                className="border border-gray-300"
                src="https://thingspeak.com/channels/2737024/charts/4?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=aqi&type=line"
              ></iframe>
            </CardContent>
          </Card>

          <Card className='mx-auto'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Widget</CardTitle>
              <FaLeaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <iframe
                width="450"
                height="260"
                className="border border-gray-300"
                src="https://thingspeak.com/channels/2737024/widgets/963058"
              ></iframe>
            </CardContent>
          </Card>
        </div>
      </Layout.Body>
    </Layout>
  );
}
