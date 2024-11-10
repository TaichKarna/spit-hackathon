import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import DataTable from '@/components/recommendation';

// Fake Data

export default function Chats() {
  

  return (
    <Layout >
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='sm:overflow-hidden'>
      <div className='flex w-full flex-row'>
              <DataTable/>
        </div>
          
      </Layout.Body>
    </Layout>
  )
}
