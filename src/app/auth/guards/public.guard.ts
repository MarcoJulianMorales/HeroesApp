import { Observable, map, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { inject } from "@angular/core";

const checkAuthStatus = (): boolean | Observable<boolean> => {
    //se inyectan el AuthService y el Router
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    return authService.checkAuthentication().pipe(
        tap(isAuthenticated => console.log('Authenticated:', isAuthenticated)),
        map(isAuth => !isAuth),
        tap((isAuthenticated) => {
            if (!isAuthenticated) {
                router.navigate(['/heroes']);
            }
        })
    );
};

export const canActivatePublicGuard: CanActivateFn = ( //Hay que tener en cuenta el tipado CanActiveFn
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    console.log('CanActivate');
    console.log({ route, state });

    return checkAuthStatus();
};

export const canMatchPublicGuard: CanMatchFn = ( //Tipado CanMatchFN
    route: Route,
    segments: UrlSegment[]
) => {
    console.log('CanMatch');
    console.log({ route, segments });

    return checkAuthStatus();
};