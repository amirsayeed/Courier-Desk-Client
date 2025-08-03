import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../../components/Shared/Loading/Loading";

const AssignAgentModal = ({ parcelId, closeModalId }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedAgent, setSelectedAgent] = useState(null);

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users?role=delivery_agent");
      return res.data;
    }
  });

  const { mutateAsync: assignAgent, isPending } = useMutation({
    mutationFn: async () => {
      return await axiosSecure.patch(`/parcels/${parcelId}/assign-agent`, {
        assignedAgentId: selectedAgent._id,
        assignedAgentEmail: selectedAgent.email,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["parcels"]);
      Swal.fire("Success", "Agent assigned successfully!", "success");
      document.getElementById(closeModalId).click();
    },
    onError: () => {
      Swal.fire("Error", "Failed to assign agent.", "error");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAgent) {
      return Swal.fire("Please select an agent.");
    }
    await assignAgent();
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <input type="checkbox" id={closeModalId} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Assign Delivery Agent</h3>
          <form onSubmit={handleSubmit}>
            <select
              className="select select-bordered w-full mb-4"
              value={selectedAgent?._id || ""}
              onChange={(e) => {
                const selected = agents.find((agent) => agent._id === e.target.value);
                setSelectedAgent(selected);
              }}
              
            >
              <option value="">Select an agent</option>
              {agents.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.name} ({agent.email})
                </option>
              ))}
            </select>

            <div className="modal-action">
              <label htmlFor={closeModalId} className="btn btn-secondary">
                Cancel
              </label>
              <button type="submit" className="btn btn-primary" disabled={isPending}>
                {isPending ? "Assigning..." : "Assign"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AssignAgentModal;
