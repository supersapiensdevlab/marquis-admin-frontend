import React, { useState } from "react";
import placeholder from "../../public/images/person-placeholder.webp";
import axios, { AxiosError } from "axios";
import { useDatabase } from "@/lib/DatabaseContext";

function InviteTable({ data }: { data: Array<any> }) {
  const { state, setState } = useDatabase();
  const [formData, setFormData] = useState<any>();
  const [addNewInvite, setAddNewInvite] = useState<any | null>({
    invitee: "",
    invitation_date: null,
    invitation_time: null,
  });
  const { invitee, invitation_date, invitation_time } = addNewInvite;
  const fetchInvites = async () => {
    const data = await axios.get(
      "https://marquis-backend.onrender.com/invite/getAllInvites"
    );
    return data.data;
  };
  const handleInviteDelete = async (invite_id: string) => {
    if (invite_id) {
      const data = await axios
        .post("https://marquis-backend.onrender.com/invite/deleteInvite", {
          invite_id,
        })
        .then((response) => {
          console.log(response);
          fetchInvites()
            .then((p) =>
              setState((prevState: any) => ({
                ...prevState,
                invites: p.data,
              }))
            )
            .catch((e: Error | AxiosError) => console.log(e));
        });
    }
  };

  console.log(formData);

  const handleInviteUpdateModal = async (value: any) => {
    setFormData(value);
  };
  const handleUpdateInvite = async () => {
    if (formData) {
      const data = await axios
        .post(
          "https://marquis-backend.onrender.com/invite/updateInvite",
          formData
        )
        .then((response) => {
          console.log(response);
          fetchInvites()
            .then((p) =>
              setState((prevState: any) => ({
                ...prevState,
                invites: p.data,
              }))
            )
            .catch((e: Error | AxiosError) => console.log(e));
        });
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAddNewInvite((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAddNewInvite = async () => {
    console.log(addNewInvite);
    if (addNewInvite) {
      const data = await axios
        .post(
          "https://marquis-backend.onrender.com/invite/addInvite",
          addNewInvite
        )
        .then((response) => {
          console.log(response);
          fetchInvites()
            .then((p) =>
              setState((prevState: any) => ({
                ...prevState,
                invites: p.data,
              }))
            )
            .catch((e: Error | AxiosError) => console.log(e));
        });
    }
  };

  return (
    <div className="overflow-x-auto w-full ">
      <div className="flex w-full mb-4 justify-end">
        <label htmlFor="addinvite-modal" className="btn btn-primary">
          Add Invite
        </label>
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Invite Id</th>
            <th>Invitee</th>
            <th>Invitation Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((value, key) => {
              return (
                <tr key={key}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={placeholder.src}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{value.invite_id}</div>
                        {/* <div className="text-sm opacity-50">United States</div> */}
                      </div>
                    </div>
                  </td>
                  <td>
                    {value.invitee}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      Desktop Support Technician
                    </span>
                  </td>
                  <td>{value.invitation_date}</td>
                  <td className="flex space-x-1">
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => {
                        handleInviteDelete(value.invite_id);
                      }}
                    >
                      Delete
                    </button>
                    <label
                      htmlFor="edit-modal"
                      className="btn btn-info btn-xs"
                      onClick={() => {
                        handleInviteUpdateModal(value);
                      }}
                    >
                      Edit
                    </label>
                  </td>
                </tr>
              );
            })}
        </tbody>
        {/* <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </tfoot> */}
      </table>
      <div>
        <input type="checkbox" id="edit-modal" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box relative">
            <label
              htmlFor="edit-modal"
              className="btn btn-sm btn-circle bg-primary absolute right-6 top-4"
            >
              ✕
            </label>
            <h3 className="font-bold text-lg">Update Invite</h3>
            <hr className="my-2" />
            {formData ? (
              <form method="POST">
                <div className="flex flex-col space-y-2 justify-center mt-4">
                  <div className="flex space-x-2">
                    <p className="w-1/3">Invitee</p>
                    <input
                      type="textarea"
                      value={formData.invitee}
                      onChange={(e) => {
                        setFormData((prevState: any) => ({
                          ...prevState,
                          invitee: e.target.value,
                        }));
                      }}
                      className="h-5 w-full border border-black p-4 rounded-sm"
                    ></input>
                  </div>
                  <div className="flex space-x-2">
                    <p className="w-1/3">Invitation date</p>
                    <input
                      type="date"
                      value={formData.invitation_date}
                      onChange={(e) => {
                        setFormData((prevState: any) => ({
                          ...prevState,
                          invitation_date: e.target.value,
                        }));
                      }}
                      className="h-5 w-full border border-black p-4 rounded-sm"
                    ></input>
                  </div>
                  <div className="flex space-x-2">
                    <p className="w-1/3">Invitation time</p>
                    <input
                      type="time"
                      value={formData.invitation_time}
                      onChange={(e) => {
                        setFormData((prevState: any) => ({
                          ...prevState,
                          invitation_time: e.target.value,
                        }));
                      }}
                      className="h-5 w-full border border-black p-4 rounded-sm"
                    ></input>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleUpdateInvite();
                    }}
                    className="btn btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div>
        <input type="checkbox" id="addinvite-modal" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box relative">
            <label
              htmlFor="addinvite-modal"
              className="btn btn-sm btn-circle bg-primary absolute right-6 top-4"
            >
              ✕
            </label>
            <h3 className="font-bold text-lg">Add New Invite</h3>
            <hr className="my-2" />
            <form method="POST">
              <div className="flex flex-col space-y-2 justify-center mt-4">
                <div className="flex space-x-2">
                  <p className="w-1/3">Invitee</p>
                  <input
                    type="textarea"
                    value={invitee}
                    name="invitee"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="h-5 w-full border border-black p-4 rounded-sm"
                  ></input>
                </div>
                <div className="flex space-x-2">
                  <p className="w-1/3">Invitation date</p>
                  <input
                    type="date"
                    value={invitation_date}
                    name="invitation_date"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="h-5 w-full border border-black p-4 rounded-sm"
                  ></input>
                </div>
                <div className="flex space-x-2">
                  <p className="w-1/3">Invitation time</p>
                  <input
                    type="time"
                    value={invitation_time}
                    name="invitation_time"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="h-5 w-full border border-black p-4 rounded-sm"
                  ></input>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddNewInvite();
                  }}
                  className="btn btn-primary"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InviteTable;
