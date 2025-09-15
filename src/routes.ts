import Dashboard from '@/components/Dashboard.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Overview from '@/views/dashboard/Overview.vue';
import List from '@/views/dashboard/items/List.vue';
import Settings from '@/views/dashboard/Settings.vue';
import Item from './views/dashboard/items/Item.vue';
import Locations from './views/dashboard/locations/List.vue';
import LocationsItem from './views/dashboard/locations/Item.vue';

const routes = [
  {path: '/', component: Home},
  {path: '/login', component: Login},
  {path: '/dashboard', component: Dashboard, children: [
    {path: '', redirect: '/dashboard/overview'},
    {path: 'overview', component: Overview},
    {path: 'items', children: [
      {path: '', component: List},
      {path: 'new', component: Item},
      {path: ':id', component: Item}
    ]},
    {path: 'locations', children: [
      {path: '', component: Locations},
      {path: 'new', component: LocationsItem},
      {path: ':id', component: LocationsItem},
    ]},
    {path: 'settings', component: Settings}
  ]}
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
});