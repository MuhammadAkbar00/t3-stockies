import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { useUser } from "../../context/authContext";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

type FormValidationErrors = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword: string;
  passwordMatch: string;
  passwordLength: string;
  terms: string;
};

const SignUpPage = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { user } = useUser();

  if (user) {
    router.push("/");
  }

  const [errors, setErrors] = useState<Partial<FormValidationErrors>>({});

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  async function handleSignUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) {
    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error during sign-up:", (error as Error).message);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Perform form validation
    const validationErrors: Partial<FormValidationErrors> = {};

    if (!formData.firstName.trim()) {
      validationErrors.firstName = "*";
    }

    // if (!formData.lastName.trim()) {
    //   validationErrors.lastName = "*";
    // }

    if (!formData.email.trim()) {
      validationErrors.email = "*";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "*";
    }

    if (!formData.confirmPassword.trim()) {
      validationErrors.confirmPassword = "*";
    }

    if (formData.confirmPassword.trim() !== formData.password.trim()) {
      validationErrors.passwordMatch = "Password does not match";
    }

    if (!validationErrors.password && !validationErrors.confirmPassword) {
      if (
        formData.password.trim().length < 6 &&
        formData.confirmPassword.trim().length < 6
      ) {
        validationErrors.passwordMatch =
          "Password must be at least 6 characters";
      }
    }

    if (!formData.terms) {
      validationErrors.terms = "You must accept the Terms and Conditions";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log(formData);
    handleSignUp(
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName,
    );
  }

  return (
    <main className="bg-gray-50">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <a
          href="#"
          className="mb-6 flex items-center text-2xl font-semibold text-gray-900"
        >
          <h1 className="font-lato text-primary text-4xl font-extrabold tracking-tighter">
            Stockies
          </h1>
        </a>
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div className="flex justify-between">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    First Name
                    {errors.firstName && (
                      <span className="text-sm text-red-500">
                        {errors.firstName}
                      </span>
                    )}
                  </label>
                  <input
                    type="firstName"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Last Name
                    {errors.lastName && (
                      <span className="text-sm text-red-500">
                        {errors.lastName}
                      </span>
                    )}
                  </label>
                  <input
                    type="lastName"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900  sm:text-sm"
                    placeholder="Last name"
                  />
                </div>
              </div>
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
                  className="text-gray-90 mb-2 block text-sm font-medium"
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
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-gray-90 mb-2 block text-sm font-medium"
                >
                  Confirm password
                  {errors.confirmPassword && (
                    <span className="text-sm text-red-500">
                      {errors.confirmPassword}
                    </span>
                  )}
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900  sm:text-sm"
                />
                {errors.passwordMatch && (
                  <p className="text-sm text-red-500">{errors.passwordMatch}</p>
                )}
              </div>
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="terms"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    aria-describedby="terms"
                    type="checkbox"
                    className="focus:ring-3 focus:ring-primary-300 h-4 w-4 rounded border border-gray-300 bg-gray-50"
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
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <a
                  href="/sign-in"
                  className="text-primary-600 font-medium hover:underline"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
