import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    // 포빙빙
    route("/reviews/product/:productId", "routes/reviews/productListPage.tsx"),
    route("/reviews/user", "routes/reviews/userListPage.tsx"),
    route("/reviews/add/:pid", "routes/reviews/addPage.tsx"),
    route("/reviews/modify/:rid", "routes/reviews/modifyPage.tsx"),
    route("/reviews/:rid", "routes/reviews/detailPage.tsx"),

    // 소연
    route("/signup", "layout/signupLayout.tsx", [
        index("routes/users/signupPage.tsx"),
        route("profile", "routes/users/signupProfilePage.tsx"),
        route("tag", "routes/users/signupTagPage.tsx"),
    ]),

    // 근화
    route("/admin/points", "layout/points/pointLayout.tsx", [
        route("list", 'routes/admin/points/listPage.tsx'),
        route("read/:id", 'routes/admin/points/readPage.tsx'),
        route("add", 'routes/admin/points/addPage.tsx'),
        route("edit/:id", 'routes/admin/points/editPage.tsx')
    ]),
      
    // 동훈
    route("admin/notices/list",   "routes/admin/notices/listPage.tsx"),
    route("admin/notices/add",    "routes/admin/notices/addPage.tsx"),
    route("admin/notices/:id",    "routes/admin/notices/detailPage.tsx"),
    route("admin/notices/:id/edit","routes/admin/notices/editPage.tsx"),
    
    // 강민
    route('/','layout/authLayout.tsx', [
        route("home", "routes/home.tsx"),
        route('login', 'routes/auth/loginPage.tsx'),
    ]),
    route('login/google', 'routes/auth/googleRedirect.tsx'),
  
] satisfies RouteConfig;
