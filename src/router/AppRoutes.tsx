import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import Error from '../components/error/Error';
import Login from '../components/login/Login';
import { PostFeed } from '../components/post-feed/PostFeed';
import Register from '../components/register/Register';
import ResetPassword from '../components/ResetPassword/ResetPassword';
import ResetPasswordSubmit from '../components/ResetPassword/ResetPasswordSubmit';
import UserAccount from '../components/user-profile/UserAccount';
import UserProfile from '../components/user-profile/UserProfile';

export const AppRoutes: React.FC<unknown> = () => (
  <Routes>
    <Route path="/" element={<PostFeed />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/reset-password/:email" element={<ResetPasswordSubmit />} />
    <Route path="/profile/:userid" element={<UserProfile />} />
    <Route path="/error-404" element={<Error />} />
    <Route path="/account" element={<UserAccount />} />


    {/* default redirect to home page */}
    <Route path="*" element={<Navigate to="/error-404"/>} />
  </Routes>
)