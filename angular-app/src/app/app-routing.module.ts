import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TeamsComponent } from './teams/teams.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './home/login/login.component';
import { RegistrationComponent } from './home/registration/registration.component';
import { ChannelComponent } from './channel/channel.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LogoutComponent } from './logout/logout.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegistrationComponent}
    ]
  },
  {
    path: 'Team',
    pathMatch: 'full',
    component: TeamsComponent,
  },
  {
    path: 'chat',
    pathMatch: 'full',
    component: ChatComponent,
    children: [],
  },
  {
    path: 'createchannel',
    pathMatch: 'full',
    component: ChannelComponent,
  },
  {
    path: 'editProfile',
    pathMatch: 'full',
    component: EditProfileComponent,
  },
  {
    path: 'logout',
    pathMatch: 'full',
    component: LogoutComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
