import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route('/auth','layout/authLayout.tsx', [
        route('', 'routes/home.tsx'),
        route('login', 'routes/member/loginPage.tsx')
    ])
] satisfies RouteConfig;
