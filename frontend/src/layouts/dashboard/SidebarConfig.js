import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import eyeFill from '@iconify/icons-eva/eye-fill';
import layersFill from '@iconify/icons-eva/layers-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Benchmarks',
    path: '/dashboard/user',
    icon: getIcon(eyeFill)
  },
  {
    title: 'EXAMPLES',
    path: '/dashboard/products',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'Variants',
    path: '/dashboard/blog',
    icon: getIcon(layersFill)
  },

];

export default sidebarConfig;
