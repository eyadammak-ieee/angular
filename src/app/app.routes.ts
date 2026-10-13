import { Routes } from '@angular/router';
import { MemberForm } from './member-form/member-form';
import { Member } from './member/member';
import { Dashboard } from './dashboard/dashboard';
import { Tool } from './tool/tool';
import { Event } from './event/event';
import { Login } from './login/login';

export const routes: Routes = [
  { path: 'login', component: Login },    
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'member', component: Member },
  { path: 'create', component: MemberForm },
  { path: 'edit/:id', component: MemberForm },
  { path: 'dashboard', component: Dashboard },
  { path: 'tools', component: Tool },
  { path: 'events', component: Event },
];


