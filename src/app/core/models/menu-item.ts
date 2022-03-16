export interface MenuItem {
  label: string;
  icon: string;
  showOnMobile: boolean;
  showOnTablet: boolean;
  showOnDesktop: boolean;
  routerLink: string;
  onlyForLogged: boolean;
  alwaysShow: boolean;
}
