"use client";

import {
  useState,
} from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { useAuth } from "../../hooks/useAuth";

import type {
  UserRole,
} from "../../types/auth";

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
  } = useAuth();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState<UserRole>(
      "PASSENGER"
    );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const user = await register({
        name,
        email,
        password,
        role,
      });

      if (
        user.role === "PASSENGER"
      ) {
        router.replace(
          "/passenger/dashboard"
        );
      } else {
        router.replace(
          "/driver/dashboard"
        );
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Create account
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Join Dhaka Tesla Pool
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <Input
          label="Name"
          placeholder="Your name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="Minimum 6 characters"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          minLength={6}
          required
        />

        <div>
          <label className="mb-2 block text-sm font-medium">
            Account Type
          </label>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() =>
                setRole("PASSENGER")
              }
              className={`
                rounded-lg border p-3 text-sm
                ${
                  role === "PASSENGER"
                    ? "border-black bg-black text-white"
                    : "border-gray-300"
                }
              `}
            >
              Passenger
            </button>

            <button
              type="button"
              onClick={() =>
                setRole("DRIVER")
              }
              className={`
                rounded-lg border p-3 text-sm
                ${
                  role === "DRIVER"
                    ? "border-black bg-black text-white"
                    : "border-gray-300"
                }
              `}
            >
              Driver
            </button>
          </div>
        </div>

        <Button
          type="submit"
          loading={loading}
          className="w-full"
        >
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-black underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}