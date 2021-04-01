import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
//slide page like

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'prefix' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'about', loadChildren: './about/about.module#AboutModule' },
            { path: 'contact', loadChildren: './contact/contact.module#ContactModule' },
            { path: 'career', loadChildren: './menu/menu.module#MenuModule' },
            { path: 'login', loadChildren: './login/login.module#LoginModule' },
            { path: 'reservation', loadChildren: './reservation/reservation.module#ReservationModule' },
            { path: 'cart', loadChildren: './cart/cart.module#CartModule' },
            { path: 'error', loadChildren: './error/error.module#ErrorModule' },
            { path: 'shop', loadChildren: './shop/shop.module#ShopPageModule' },
            { path: 'thanku', loadChildren: './thanku/thanku.module#ThankuModule' },
            { path: 'viewDetail', loadChildren: './view-detail/view-detail.module#ViewDetailModule' },
            { path: 'order-conform', loadChildren: './order-conform/order-conform.module#OrderConformModule' },
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
            { path: 'tandc', loadChildren: './terms-and-condition/terms-and-condition.module#TermsAndConditionModule' },
            { path: 'privacy', loadChildren: './privacy/privacy.module#PrivacyModule' },
        ]
    }
];    
 
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
