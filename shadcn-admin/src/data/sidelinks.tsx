import {
  IconApps,
  IconBarrierBlock,
  IconBoxSeam,
  IconChartHistogram,
  IconChecklist,
  IconComponents,
  IconError404,
  IconExclamationCircle,
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
  IconHexagonNumber5,
  IconLayoutDashboard,
  IconMessages,
  IconRouteAltLeft,
  IconServerOff,
  IconSettings,
  IconTruck,
  IconUserShield,
  IconUsers,
  IconLock,
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Analysis',
    label: '',
    href: '/analysis',
    icon: <IconChartHistogram size={18} />,
  },
  {
    title: 'AQI',
    label: '3',
    href: '/tasks',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Recommendations',
    href: '/chats',
    icon: <IconApps size={18} />
  },
  {
    title: 'Map',
    href: '/maps',
    icon: <IconBoxSeam/>
  },
  {
    title: 'Authentication',
    label: '',
    href: '',
    icon: <IconUserShield size={18} />,
    sub: [
      {
        title: 'Sign In (email + password)',
        label: '',
        href: '/sign-in',
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: 'Sign In (Box)',
        label: '',
        href: '/sign-in-2',
        icon: <IconHexagonNumber2 size={18} />,
      },
      {
        title: 'Sign Up',
        label: '',
        href: '/sign-up',
        icon: <IconHexagonNumber3 size={18} />,
      },

     
    ],
  },

  {
    title: 'Settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18} />,
  },
]
