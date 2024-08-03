import { NextResponse } from 'next/server'

 

export function middleware(request) {
    
    const token = request.cookies.get('access_token')
    console.log(token)

    if(!token){
        return NextResponse.redirect(new URL('/signin', request.url))
    }
    return NextResponse.next()
  
}
 

export const config = {
  matcher: '/dashbord/:path*',
}