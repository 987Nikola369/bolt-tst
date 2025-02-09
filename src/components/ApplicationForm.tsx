import React, { useState } from 'react';
import { LoginForm } from './auth/LoginForm';
import { RegisterForm } from './auth/RegisterForm';
import { PasswordResetForm } from './auth/PasswordResetForm';

const ApplicationForm: React.FC = () => {
  const [formType, setFormType] = useState<'login' | 'register' | 'reset'>('login');

  return (
    <section className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Application Form</h2>
        <p className="text-gray-300 text-center mb-12">Join our next football camp session</p>
        <div className="max-w-md mx-auto bg-gray-900 rounded-lg p-8">
          {formType === 'login' && <LoginForm />}
          {formType === 'register' && <RegisterForm />}
          {formType === 'reset' && <PasswordResetForm />}
        </div>
        <div className="text-center mt-4">
          {formType === 'login' && (
            <button
              onClick={() => setFormType('register')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Don't have an account? Register
            </button>
          )}
          {formType === 'register' && (
            <button
              onClick={() => setFormType('login')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Already have an account? Sign In
            </button>
          )}
          {formType === 'login' && (
            <button
              onClick={() => setFormType('reset')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Forgot your password? Reset
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
