import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Shared/Loading/Loading";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const { mutateAsync: updateRole, isPending: isUpdating } = useMutation({
    mutationFn: async ({ id, newRole }) => {
      const res = await axiosSecure.patch(`/users/${id}/role`, { newRole });
      return res.data;
    },
    onSuccess: (data, variables) => {
      Swal.fire("Success!", `User is now a ${variables.newRole}.`, "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Failed to update user role", "error");
    },
  });

  const handleMakeRole = async (id, role) => {
    const confirm = await Swal.fire({
      title: `Make this user ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, make ${role}`,
    });

    if (confirm.isConfirmed) {
      await updateRole({ id, newRole: role });
    }
  };

  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-center mt-4 text-red-500">Failed to load users.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover">
                <td>{index + 1}</td>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role || "customer"}</td>
                <td>
                  <div className="flex gap-2 flex-wrap justify-center">
                    <button
                      className="btn btn-sm btn-primary"
                      disabled={user.role === "admin" || isUpdating}
                      onClick={() => handleMakeRole(user._id, "admin")}
                    >
                      Make Admin
                    </button>
                    <button
                      className="btn btn-sm btn-accent"
                      disabled={user.role === "delivery_agent" || isUpdating}
                      onClick={() => handleMakeRole(user._id, "delivery_agent")}
                    >
                      Make Agent
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-warning p-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
