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
            { path: 'blog', loadChildren: './blog/blog.module#BlogModule' },
            { path: 'contact', loadChildren: './contact/contact.module#ContactModule' },
            { path: 'career', loadChildren: './menu/menu.module#MenuModule' },
            { path: 'login', loadChildren: './login/login.module#LoginModule' },
            { path: 'reservation', loadChildren: './reservation/reservation.module#ReservationModule' },
            { path: 'cart', loadChildren: './cart/cart.module#CartModule' },
            { path: 'error', loadChildren: './error/error.module#ErrorModule' },
            { path: 'password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordModule' },
            { path: 'shop', loadChildren: './shop/shop.module#ShopPageModule' },
            { path: 'shopDetail', loadChildren: './shop-detail/shop-detail.module#ShopDetailModule' },
            { path: 'thanku', loadChildren: './thanku/thanku.module#ThankuModule' },
            { path: 'viewDetail', loadChildren: './view-detail/view-detail.module#ViewDetailModule' },
            { path: 'order-conform', loadChildren: './order-conform/order-conform.module#OrderConformModule' },
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
        ]
    }
];    
 
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
