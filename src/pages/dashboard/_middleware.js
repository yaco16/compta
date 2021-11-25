import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req, event) {
  let token;
  let userDetails;
  const secret = process.env.ACCESS_TOKEN_SECRET;

  if (req.cookies.access_token) {
    token = req.cookies.access_token;
    userDetails = jwt.decode(token, secret, 'HS256')
  }

  if (userDetails && userDetails.isConnected) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect('/users/signin');
  }
}

