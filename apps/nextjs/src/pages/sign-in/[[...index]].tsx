import { ChangeEvent, FormEvent, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { UserResponse } from "@supabase/supabase-js";
import { get } from "lodash";
import { useUser } from "../../context/authContext";

type FormData = {
  email: string;
  password: string;
  terms: boolean;
};

type FormValidationErrors = {
  email: string;
  password: string;
  terms: string;
};

const SignInPage = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { user } = useUser();

  if (user) {
    router.push("/");
  }

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState<Partial<FormValidationErrors>>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      // setErrorMessage(error.message);
    } else {
      router.push("/");
    }
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Perform form validation
    const validationErrors: Partial<FormValidationErrors> = {};

    if (!formData.email.trim()) {
      validationErrors.email = "* Email is required";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "* Password is required";
    }

    if (!formData.terms) {
      validationErrors.terms = "You must accept the Terms and Conditions";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    handleSignIn(formData.email, formData.password);
  }

  return (
    <main className="bg-gray-50">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <a
          href="/"
          className="mb-6 flex items-center text-2xl font-semibold text-gray-900"
        >
          <h1 className="font-lato text-primary text-4xl font-extrabold tracking-tighter">
            Stockies
          </h1>
        </a>
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign In
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Your email
                  {errors.email && (
                    <span className="text-sm text-red-500">{errors.email}</span>
                  )}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900  sm:text-sm"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Password
                  {errors.password && (
                    <span className="text-sm text-red-500">
                      {errors.password}
                    </span>
                  )}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900  sm:text-sm"
                />
              </div>
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    aria-describedby="terms"
                    type="checkbox"
                    name="terms"
                    id="terms"
                    className="focus:ring-3 focus:ring-primary-300 h-4 w-4 rounded border border-gray-300 bg-gray-50"
                    checked={formData.terms}
                    onChange={handleChange}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500 ">
                    I accept the{" "}
                    <a
                      className="text-primary-600  font-medium hover:underline"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                  {errors.terms && (
                    <p className="text-sm text-red-500">{errors.terms}</p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 bg-primary w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500">
                {"Don't have an account? "}
                <a
                  href="/sign-up"
                  className="text-primary-600 font-medium hover:underline"
                >
                  Signup here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
