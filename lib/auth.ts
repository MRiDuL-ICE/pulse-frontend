"use client"
import Cookies from "js-cookie"

const A = "pulse_a"
const R = "pulse_r"

export const setTokens = (a: string, r: string) => {
  Cookies.set(A, a, { expires: 1/96, sameSite: "strict", secure: process.env.NODE_ENV === "production" })
  Cookies.set(R, r, { expires: 7, sameSite: "strict", secure: process.env.NODE_ENV === "production" })
}
export const getAccessToken = () => Cookies.get(A)
export const getRefreshToken = () => Cookies.get(R)
export const clearTokens = () => { Cookies.remove(A); Cookies.remove(R) }
export const isAuthenticated = () => !!(Cookies.get(A) || Cookies.get(R))
