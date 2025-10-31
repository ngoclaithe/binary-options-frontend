"use client";

import { useState, useCallback } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { getAuthHeaders } from "../../../lib/auth";

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // This would call a profile update API
      const response = await fetch("/api/v1/users/profile", {
        method: "PUT",
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setMessage({ type: "success", text: "Profile updated successfully" });
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to update profile" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      await signOut();
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

        {user && (
          <>
            <div className="rounded-lg border border-black/10 dark:border-white/10 p-6 mb-6">
              <h2 className="text-lg font-semibold mb-6">Account Information</h2>

              {message && (
                <div
                  className={`px-4 py-3 rounded-lg mb-6 text-sm font-medium ${
                    message.type === "success"
                      ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                      : "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full h-10 bg-foreground text-background font-medium hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>

            <div className="rounded-lg border border-black/10 dark:border-white/10 p-6 mb-6">
              <h2 className="text-lg font-semibold mb-6">Security</h2>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="showPassword" className="text-sm">
                    Show password
                  </label>
                </div>

                <button
                  type="button"
                  className="w-full rounded-full h-10 border border-black/10 dark:border-white/10 font-medium hover:bg-black/5 dark:hover:bg-white/5"
                >
                  Change Password
                </button>
              </form>
            </div>

            <div className="rounded-lg border border-red-200 dark:border-red-900 p-6 bg-red-50 dark:bg-red-900/20">
              <h2 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-4">
                Danger Zone
              </h2>

              <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                Logging out will clear your session. You can log back in anytime.
              </p>

              <button
                onClick={handleLogout}
                className="w-full rounded-full h-10 bg-red-600 text-white font-medium hover:opacity-90"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
