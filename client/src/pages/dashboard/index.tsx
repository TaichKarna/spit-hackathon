import { Layout } from '@/components/custom/layout'
import { Button } from '@/components/custom/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Search } from '@/components/search'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { FaThermometerHalf, FaCloudRain, FaWind, FaLeaf } from 'react-icons/fa'
import useUserWeatherData from '../../api/useWeatherData' // port your custom hook
import Map from '@/components/map'
import DataTable from '@/components/recommendation';

export default function Dashboard() {
  const { weatherData, aqiData, error } = useUserWeatherData();
  console.log(weatherData, aqiData, error)
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData || !aqiData) {
    return (
      <Layout>
        {/* ===== Top Heading ===== */}
        <Layout.Header>
          <div className='ml-auto flex items-center space-x-4'>
            <Search />
            <ThemeSwitch />
          </div>
        </Layout.Header>

        {/* ===== Main ===== */}
        <Layout.Body>
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
            <div className='flex items-center space-x-2'>
              <Button>Download</Button>
            </div>
          </div>
          <div className='text-center py-10'>
            <p className='text-xl'>Loading weather and AQI data...</p>
          </div>
        </Layout.Body>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
          <div className='flex items-center space-x-2'>
            <Button>Download</Button>
          </div>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='analytics'>Analytics</TabsTrigger>
              <TabsTrigger value='reports'>Reports</TabsTrigger>
              <TabsTrigger value='notifications'>Notifications</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              {/* AQI Card */}
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Air Quality (AQI)
                  </CardTitle>
                  <FaLeaf className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {aqiData?.[0]?.components.pm2_5 || 'N/A'}
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {aqiData?.[0]?.components.pm2_5 <= 100
                      ? 'Good'
                      : aqiData?.[0]?.main.aqi <= 150
                      ? 'Moderate'
                      : 'Unhealthy'}
                  </p>
                </CardContent>
              </Card>

              {/* Temperature Card */}
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Temperature
                  </CardTitle>
                  <FaThermometerHalf className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {weatherData?.main.temp}°C
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {weatherData?.weather[0]?.description}
                  </p>
                </CardContent>
              </Card>

              {/* Humidity Card */}
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Humidity
                  </CardTitle>
                  <FaCloudRain className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {weatherData?.main.humidity}%
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    Humidity level
                  </p>
                </CardContent>
              </Card>

              {/* Wind Speed Card */}
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Wind Speed
                  </CardTitle>
                  <FaWind className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {weatherData?.wind.speed} m/s
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    Wind speed at your location
                  </p>
                </CardContent>
              </Card>
            </div>
       
            <div className='flex w-full flex-row'>
              <Map/>
            </div>

            <div className=''>
              <Card className=''>
                <CardHeader>
                  <CardTitle>Eco Map</CardTitle>
                </CardHeader>
                <CardContent className='pl-2 h-[600px]'>
                <Map/>
                </CardContent>
              </Card>
              
            </div>
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  );
}

