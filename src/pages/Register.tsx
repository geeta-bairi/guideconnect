
import { Link } from "react-router-dom";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

const Register = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-gray">
      <div className="max-w-md w-full bg-white rounded-xl p-8 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-travel-blue">{t('register')}</h1>
          <LanguageSwitcher />
        </div>
        
        <RegisterForm />

        <p className="text-sm text-gray-600 mt-6 text-center">
          {t('alreadyHaveAccount')}{" "}
          <Link to="/login" className="text-travel-blue hover:underline">
            {t('signIn')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
