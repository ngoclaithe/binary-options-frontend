"use client";

import { useState, useEffect } from "react";
import { Trash2, Shield } from "lucide-react";
import { getAuthHeaders } from "../../../../lib/auth";

interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  createdAt: string;
  lastLogin?: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        // This would call an API to fetch users
        const response = await fetch("/api/v1/admin/users", {
          credentials: "include",
          headers: getAuthHeaders(),
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users || []);
        }
      } catch (error) {
        console.error("Failed to load users:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleToggleRole = async (userId: string, newRole: "user" | "admin") => {
    try {
      const response = await fetch(`/api/v1/admin/users/${userId}`, {
        method: "PUT",
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
        credentials: "include",
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
      }
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`/api/v1/admin/users/${userId}`, {
        method: "DELETE",
        credentials: "include",
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        setUsers(users.filter((u) => u.id !== userId));
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Manage Users</h1>

        <div className="rounded-lg border border-black/10 dark:border-white/10 overflow-hidden">
          {loading ? (
            <div className="text-center py-8 text-sm opacity-70">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="text-center py-8 text-sm opacity-70">No users found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 sticky top-0">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Email</th>
                    <th className="px-6 py-4 text-center font-semibold">Role</th>
                    <th className="px-6 py-4 text-left font-semibold">Joined</th>
                    <th className="px-6 py-4 text-left font-semibold">Last Login</th>
                    <th className="px-6 py-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-black/10 dark:border-white/10 hover:bg-black/2 dark:hover:bg-white/2"
                    >
                      <td className="px-6 py-4 font-semibold">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() =>
                            handleToggleRole(user.id, user.role === "admin" ? "user" : "admin")
                          }
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-semibold ${
                            user.role === "admin"
                              ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-100 hover:opacity-80"
                              : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-100 hover:opacity-80"
                          }`}
                        >
                          <Shield size={14} />
                          {user.role.toUpperCase()}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm opacity-70">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm opacity-70">
                        {user.lastLogin
                          ? new Date(user.lastLogin).toLocaleString()
                          : "Never"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
