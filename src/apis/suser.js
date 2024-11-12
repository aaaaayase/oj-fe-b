import service from "@/utils/request";

export function loginService(userAccount, password) {
    return service({
        url:"/sysUser/login",
        method:"post",
        data:{
            userAccount,
            password
        }
    })
}

export function getUserInfoService(userAccount, password) {
    return service({
        url:"/sysUser/info",
        method:"get",
    })
}

export function logoutService(userAccount, password) {
    return service({
        url:"/sysUser/logout",
        method:"delete",
    })
}