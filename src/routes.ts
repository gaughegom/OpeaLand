import React from "react";

// const Counter = React.lazy(() => import("./features/counter"));
// const ForgotPasswordPage = React.lazy(() => import("./features/forgotPassword"))
// const ResetPasswordPage = React.lazy(() => import("./features/resetPassword"))

const publicRoute: any = [
    // {
    //     path: "/counter",
    //     name: "Counter",
    //     element: <Counter />,
    // },
    // {
    //     path: "/forgot-password",
    //     name: "Forgot password",
    //     element: <ForgotPasswordPage />,
    // },
];

const commonRoute: any = [];

const protectedRoute: any = [

];

const managerRoute:any = [];

const routes = {
    publicRoute,
    protectedRoute,
    commonRoute,
    managerRoute,
};

export default routes;
