import React from 'react';
import { NextPage } from 'next';

import RegisterForm from '@/components/auth/RegisterForm';
import { AppProperty } from '@/constants';

export const metadata = {
  title: `Register | ${AppProperty.APP_NAME}`,
  description: `Registration page of ${AppProperty.APP_NAME} where users can create a new account.`,
};

const RegisterPage: NextPage = () => {
  return (
    <main className="flex-center min-h-[max(85vh,35rem)] px-3 md:px-5 xl:px-10 py-10 text-gray-700">
      <RegisterForm />
    </main>
  );
};

export default RegisterPage;
